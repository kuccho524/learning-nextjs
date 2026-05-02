import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log('API Routeで受け取りました', data.name)

  return NextResponse.json({ message: '成功しました' });
}