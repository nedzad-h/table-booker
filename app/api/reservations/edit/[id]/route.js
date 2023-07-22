import { verifyJwtToken } from "@lib/jwt";
import connectMongoDB from "@lib/mongodb";
import Reservation from "@models/reservation";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const accessToken = req.headers.get("authorization")
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
      return new NextResponse.json({ message: "Unauthorized!" }, { status: 403 });
  }
  try {
    await connectMongoDB();

    const body = await req.json();
    const updateBooking = await Reservation.findByIdAndUpdate(id, { $set: { ...body } }, { new: true });

    return NextResponse.json({ updateBooking }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
  
}