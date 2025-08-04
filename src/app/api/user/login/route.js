import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    console.log(email);
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // Optionally, set a session or token here
    return NextResponse.json({ message: 'Login successful', user: { email: user.email , role:user.role } });
  } catch (err) {
    console.error('Login Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 