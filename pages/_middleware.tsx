import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextResponse) {
  if(req.url == "/")
    return NextResponse.redirect("/coins/bitcoin");

  return NextResponse.next();
}