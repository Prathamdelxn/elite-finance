import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Simple test endpoint called');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);
    
    return NextResponse.json({
      success: true,
      message: 'Server is running',
      mongodbUriExists: !!process.env.MONGODB_URI,
      mongodbUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0
    });
  } catch (error) {
    console.error('Simple test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 