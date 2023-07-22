import { verifyJwtToken } from "@lib/jwt";
import connectMongoDB from "@lib/mongodb";
import User from "@models/user";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const accessToken = req.headers.get("authorization")
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
      return new NextResponse.json({ message: "Unauthorized!" }, { status: 403 });
  }

  const { id } = params;

  console.log(id);
  try{
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}