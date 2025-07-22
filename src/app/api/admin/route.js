import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await connectDB();
    const admin = await Admin.findOne({});
    if (!admin) {
      return NextResponse.json({ error: 'Admin profile not found' }, { status: 404 });
    }
    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admin profile' }, { status: 500 });
  }
}

export async function PUT(request) {
  const data = await request.json();
  console.log(data)
  try {
    await connectDB();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' }, 
        { status: 400 }
      );
    }

    // Only allow specific fields
    const allowedFields = ['name', 'title', 'imageUrl', 'description'];
    const updateData = {};
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const admin = await Admin.findOneAndUpdate(
      {}, 
      updateData, 
      { 
        new: true, 
        upsert: true, 
        runValidators: true,
        setDefaultsOnInsert: true 
      }
    );
    
    return NextResponse.json(admin);
    
  } catch (error) {
    console.error("Error updating admin:", error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Database error', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const { name, title, imageUrl, description, email, password } = await request.json();
    if (!email || !password || !name || !title || !imageUrl || !description) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return NextResponse.json({ error: 'Admin already exists.' }, { status: 400 });
    }
    admin = await Admin.create({ name, title, imageUrl, description, email, password });
    return NextResponse.json({ success: true, admin });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create admin', details: error.message }, { status: 500 });
  }
}