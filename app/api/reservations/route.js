import generateRandomString from "@helper/codeGenerator";
import { verifyJwtToken } from "@lib/jwt";
import connectMongoDB from "@lib/mongodb";
import Reservation from "@models/reservation";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    name,
    phone,
    email,
    numberOfPeople,
    numberOfChildren,
    date,
    start,
    durationInHours,
    specialRequests,
  } = await req.json();

  await connectMongoDB();
  await Reservation.create({
    name,
    phone,
    email,
    numberOfPeople,
    numberOfChildren,
    date,
    start,
    durationInHours,
    specialRequests,
    code: generateRandomString(8),
    status: 'nije potvrdjena'
  });

  return NextResponse.json({ message: "Reservation added" }, { status: 201 })
}

export async function GET(req) {
  const accessToken = req.headers.get("authorization")
  const token = accessToken.split(' ')[1]

  console.log(accessToken);

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
      return new NextResponse.json({ message: "Unauthorized!" }, { status: 403 });
  }

  try {
    await connectMongoDB();
    const allReservations = await Reservation.find();
    return NextResponse.json({ allReservations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Reservation.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully." }, { status: 200 })
}