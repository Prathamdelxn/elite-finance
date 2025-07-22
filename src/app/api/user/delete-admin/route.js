import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/user';

export async function DELETE(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Delete User Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
