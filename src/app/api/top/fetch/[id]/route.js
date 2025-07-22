import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Top from '@/models/Top';
import connectDB from '@/lib/db';

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ID' },
        { status: 400 }
      );
    }

    const top = await Top.findById(id);

    if (!top) {
      return NextResponse.json(
        { success: false, message: 'Top not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: top },
      { status: 200 }
    );

  } catch (err) {
    console.error('Error fetching Top:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
