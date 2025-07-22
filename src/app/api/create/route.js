import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

export async function POST(req) {
  await dbConnect(); // Connect to MongoDB

  try {
    const body = await req.json();
    const {
      category,
      badge,
      badgeColor,
      title,
      description,
      subtitle,
      subtitleType,
      icon,
      price,
      multiplier,
      features
    } = body;

    // Validate required fields
    if (
      !category || !badge || !badgeColor || !title || !description ||
      !subtitle || !subtitleType || !icon || price === undefined || !multiplier
    ) {
      return NextResponse.json({ error: 'All required fields must be provided.' }, { status: 400 });
    }

    // Validate price
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json({ error: 'Price must be a non-negative number.' }, { status: 400 });
    }

    const newService = await Service.create({
      category,
      badge,
      badgeColor,
      title,
      description,
      subtitle,
      subtitleType,
      icon,
      price,
      multiplier,
      features: Array.isArray(features) ? features : [],
    });

    return NextResponse.json({ message: 'Service created successfully', data: newService }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
