import { verifyJwtToken } from "@lib/jwt";
import connectMongoDB from "@lib/mongodb";
import User from "@models/user";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(req) {
  const accessToken = req.headers.get("authorization")
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
      return new NextResponse.json({ message: "Unauthorized!" }, { status: 403 });
  }
  try {
    await connectMongoDB();
    const {email, password, name, role} = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role
    });

    const { pass, ...user } = newUser._doc

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  const accessToken = req.headers.get("authorization")
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
      return new NextResponse.json({ message: "Unauthorized!" }, { status: 403 });
  }

  try {
    await connectMongoDB();
    const sort = { role: 1 };
    const allUsers = await User.find().sort(sort);
    return NextResponse.json({ allUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}