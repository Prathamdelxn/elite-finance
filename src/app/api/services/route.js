import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({});
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['category', 'badge', 'badgeColor', 'title', 'description', 'subtitle', 'subtitleType', 'icon', 'price', 'multiplier'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Convert price to number
    if (typeof data.price === 'string') {
      data.price = parseFloat(data.price);
    }

    // Convert features string to array if needed
    if (typeof data.features === 'string') {
      data.features = data.features.split(',').map(f => f.trim());
    }
    
    // Create new service
    const service = new Service(data);
    await service.save();
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create service', 
        details: error.message,
        validationErrors: error.errors // Include Mongoose validation errors if any
      },
      { status: 500 }
    );
  }
} 