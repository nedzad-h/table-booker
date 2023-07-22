import { verifyJwtToken } from "@lib/jwt";
import connectMongoDB from "@lib/mongodb";
import Reservation from "@models/reservation";
import { NextResponse } from "next/server";

export async function GET(req) {
  const email = req.nextUrl.searchParams.get("email");

  const accessToken = req.headers.get("authorization")
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
      return new NextResponse.json({ message: "Unauthorized!" }, { status: 403 });
  }

  try {
    await connectMongoDB();
    const reservations = await Reservation.find({ email: new RegExp("^" + email.toLowerCase(), "i") });
    return NextResponse.json({ reservations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}