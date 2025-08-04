import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import Top from '@/models/Top';
import connectDB from '@/lib/db';

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get('title')?.toString().trim();
    const sitelink = formData.get('sitelink')?.toString().trim();
    const imageFile = formData.get('image');
    
    // Validate required fields
    if (!title || !sitelink) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Title and Site Link are required',
          missing: {
            title: !title,
            sitelink: !sitelink
          }
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(sitelink);
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please provide a valid URL for the site link'
        },
        { status: 400 }
      );
    }
    
    let imagePath = '';
    
    if (imageFile && imageFile instanceof File) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Please upload a valid image file (JPEG, PNG, or WebP)'
          },
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Image file size must be less than 5MB'
          },
          { status: 400 }
        );
      }

      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      // Generate unique filename
      const timestamp = Date.now();
      const originalName = imageFile.name;
      const extension = path.extname(originalName);
      const filename = `${timestamp}-${originalName}`;
      const filepath = path.join(uploadDir, filename);
      
      // Convert File to Buffer and save
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filepath, buffer);
      
      imagePath = `/uploads/${filename}`;
    }

    const newTop = await Top.create({ title, sitelink, image: imagePath });

    return NextResponse.json(
      { 
        success: true, 
        data: newTop, 
        message: 'Company created successfully' 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating Top:', err);
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
