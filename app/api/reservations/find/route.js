import connectMongoDB from "@lib/mongodb";
import Reservation from "@models/reservation";
import { NextResponse } from "next/server";

export async function GET(req) {
  const code = req.nextUrl.searchParams.get("code");
  const email = req.nextUrl.searchParams.get("email");
  const query = {
    code,
    email
  }
  await connectMongoDB();
  const reservations = await Reservation.find(query);
  return NextResponse.json({ reservations }, { status: 200 })
}