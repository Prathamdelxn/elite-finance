import { NextResponse } from 'next/server';
import Top from '@/models/Top';
import connectDB from '@/lib/db';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Company ID is required' 
        },
        { status: 400 }
      );
    }

    const deletedCompany = await Top.findByIdAndDelete(id);

    if (!deletedCompany) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Company not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Company deleted successfully',
        data: deletedCompany
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('Error deleting company:', err);
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