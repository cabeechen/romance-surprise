// app/unlock/route.js
import { NextResponse } from "next/server";

const SHARE_KEY = process.env.SHARE_KEY || "iloveyou1211";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key !== SHARE_KEY) {
    return new NextResponse("Invalid key", { status: 401 });
  }

  const res = NextResponse.redirect(new URL("/romance", req.url));
  res.cookies.set("share", "ok", {
    httpOnly: true,
    // 本地 (http) 不能設 secure；上線 (https) 再設
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 天
  });
  return res;
}
