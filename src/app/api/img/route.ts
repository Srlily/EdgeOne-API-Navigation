import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const targetUrl = `https://img.srliy.com/img`;
  return NextResponse.rewrite(targetUrl);
}

export async function HEAD(request: NextRequest) {
  const targetUrl = `https://img.srliy.com/img`;
  return NextResponse.rewrite(targetUrl);
}
