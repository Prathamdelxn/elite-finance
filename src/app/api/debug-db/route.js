import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('=== DEBUG DATABASE CONNECTION ===');
    console.log('1. Environment variable check:');
    console.log('   MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('   MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);
    
    if (process.env.MONGODB_URI) {
      console.log('2. Connection string analysis:');
      const uri = process.env.MONGODB_URI;
      console.log('   Contains "mongodb+srv":', uri.includes('mongodb+srv'));
      console.log('   Contains username:', uri.includes('dhirajrdelxn'));
      console.log('   Contains database name:', uri.includes('/elite-admin'));
      console.log('   Contains retryWrites:', uri.includes('retryWrites=true'));
    }
    
    console.log('3. Attempting connection...');
    
    // Try to connect with detailed error handling
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    
    console.log('4. Connection successful!');
    console.log('   Database name:', connection.connection.name);
    console.log('   Host:', connection.connection.host);
    console.log('   Port:', connection.connection.port);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      database: connection.connection.name,
      host: connection.connection.host,
      port: connection.connection.port
    });
    
  } catch (error) {
    console.log('5. Connection failed with error:');
    console.log('   Error name:', error.name);
    console.log('   Error message:', error.message);
    console.log('   Error code:', error.code);
    console.log('   Full error:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        name: error.name,
        message: error.message,
        code: error.code
      },
      mongodbUriExists: !!process.env.MONGODB_URI,
      mongodbUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0
    }, { status: 500 });
  }
} 