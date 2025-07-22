import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    console.log('MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Database connection successful');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      mongodbUri: 'Configured'
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      errorName: error.name,
      mongodbUri: process.env.MONGODB_URI ? 'Configured' : 'Not configured'
    }, { status: 500 });
  }
} 