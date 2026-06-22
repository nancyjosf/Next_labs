import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  await connectDB();
  const data = await Product.find({});
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const created = await Product.create(body);
  return NextResponse.json(created, { status: 201 });
}
