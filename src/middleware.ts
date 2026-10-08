// import { NextResponse, type NextRequest } from "next/server";
// const PROTECTED = ["/permintaan", "/pesan", "/jadwal"];
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   if (PROTECTED.some((p) => pathname.startsWith(p)) && !request.cookies.get("ss_session")?.value) {
//     const login = new URL("/login", request.url); login.searchParams.set("next", pathname);
//     return NextResponse.redirect(login);
//   }
//   return NextResponse.next();
// }
// export const config = { matcher: ["/((?!_next|favicon.ico|api).*)"] };

import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = !!request.cookies.get("ss_session")?.value;

  if (pathname === "/login") {
    return loggedIn ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
  }
  if (loggedIn) return NextResponse.next();

  const login = new URL("/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = { matcher: ["/((?!_next|favicon.ico|api).*)"] };