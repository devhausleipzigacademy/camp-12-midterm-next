import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  return Response.json({ message: "Hello" });
}

export function POST(req: NextRequest) {
  return Response.json({ message: "Post request" });
}
