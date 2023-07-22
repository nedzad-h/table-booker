import { verifyJwtToken } from "@lib/jwt";
import connectMongoDB from "@lib/mongodb";
import Reservation from "@models/reservation";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const reservation = await Reservation.findOne({ _id: id });
    return NextResponse.json({ reservation }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const accessToken = req.headers.get("authorization")
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
      return new NextResponse.json({ message: "Unauthorized!" }, { status: 403 });
  }
  try {
    const booking = await Reservation.findByIdAndDelete(id);
    return NextResponse.json({ response: { message: 'Deleted!', ...booking} }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}