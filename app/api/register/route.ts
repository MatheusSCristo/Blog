import prisma from "@/lib/prisma";
import { createUserFormSchema } from "@/schemas/createUserSchema";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password, username, displayName } =
      createUserFormSchema.parse(body);
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email.toLocaleLowerCase(),
      },
    });
    if (emailExists) {
      return NextResponse.json(
        { user: null, message: "Email already registered" },
        { status: 409 }
      );
    }
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: username.toLocaleLowerCase(),
      },
    });
    if (usernameExists) {
      return NextResponse.json(
        { user: null, message: "Username already registered" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        displayName,
      },
    });
    return NextResponse.json({ data: user, message: "User created" });
  } catch (error) {
    console.error(error);
  }
}
