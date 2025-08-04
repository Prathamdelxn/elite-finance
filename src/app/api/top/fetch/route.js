import { NextResponse } from 'next/server';
import Top from '@/models/Top';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    
    const allTops = await Top.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { 
        success: true, 
        data: allTops,
        count: allTops.length,
        message: 'Companies fetched successfully'
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('Error fetching all Tops:', err);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
      { status: 500 }
    );
  }
} 