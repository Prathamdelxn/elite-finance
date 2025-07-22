import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Top from '@/models/Top';
import connectDB from '@/lib/db';

export async function PUT(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const { title, sitelink } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ID' },
        { status: 400 }
      );
    }

    const updatedTop = await Top.findByIdAndUpdate(
      id,
      { title, sitelink },
      { new: true }
    );

    if (!updatedTop) {
      return NextResponse.json(
        { success: false, message: 'Top not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedTop, message: 'Top updated successfully' },
      { status: 200 }
    );

  } catch (err) {
    console.error('Error updating Top:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
