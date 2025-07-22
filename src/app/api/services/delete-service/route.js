import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

export async function DELETE(request) {
  await dbConnect();
  try {
    const { id } = await request.json();
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
} 