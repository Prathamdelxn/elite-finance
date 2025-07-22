import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const newService = await Service.create(data);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
  }
}
