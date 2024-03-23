import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  const data = cookiesStore.get("next-auth.session-token");
  const signInUrl = new URL("/auth/login", request.url);
  const homeUrl = new URL("/feed", request.url);

  if (!data) {
    return NextResponse.redirect(signInUrl);
  } else {
    if (request.nextUrl.pathname === "/feed") {
      return NextResponse.next();
    } else if (request.nextUrl.pathname === "/auth/login") {
      return NextResponse.redirect(homeUrl);
    }
  }
}

export const config = {
  matcher: ["/", "/feed", "/messages", "/profile/:id*","/profile"],
};
