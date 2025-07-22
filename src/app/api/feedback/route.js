import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback from '@/models/Feedback';

export async function GET() {
  await dbConnect();
  try {
    const feedback = await Feedback.find({}).sort({ createdAt: -1 });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const newFeedback = await Feedback.create(data);
    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}

export async function DELETE(request) {
  await dbConnect();
  try {
    const { id } = await request.json();
    await Feedback.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
} 