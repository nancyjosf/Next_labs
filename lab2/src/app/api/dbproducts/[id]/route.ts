import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(product);
}
