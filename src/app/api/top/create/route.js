import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Top from '@/models/Top';
import connectDB from '@/lib/db'; // Assuming you have a connectDB utility

export async function POST(req) {
  await connectDB();

  try {
    const { title, sitelink } = await req.json();

    if (!title || !sitelink) {
      return NextResponse.json(
        { success: false, message: 'Title and Site Link are required' },
        { status: 400 }
      );
    }

    const newTop = await Top.create({ title, sitelink });

    return NextResponse.json(
      { success: true, data: newTop, message: 'Top created successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating Top:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
