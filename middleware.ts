"use server"
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";

export default async function middleware(request: NextRequest) {
  const { value: token } = request.cookies.get("auth-token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const signInUrl = new URL("/auth/login", request.url);

  if (!hasVerifiedToken) {
    return NextResponse.redirect(signInUrl);
  } 
}

export const config = {
  matcher: ["/", "/feed", "/messages", "/profile/:id*", "/profile"],
};
