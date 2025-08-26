// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 保護 /romance 及其子路徑
  if (pathname === "/romance" || pathname.startsWith("/romance/")) {
    const cookie = req.cookies.get("share");
    if (cookie?.value === "ok") return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/locked";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/romance/:path*", "/romance"],
};
