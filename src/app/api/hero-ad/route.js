import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET: Return current hero ad config
export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'data/hero-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      // Ensure heroAdImages is always an array
      return NextResponse.json({
        heroAdImages: Array.isArray(config.heroAdImages) ? config.heroAdImages : (config.heroAdImage ? [config.heroAdImage] : []),
        updatedAt: config.updatedAt || null
      });
    } else {
      return NextResponse.json({ heroAdImages: [] });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch current ad' }, { status: 500 });
  }
}

// Helper to parse multipart form data (for app router)
async function parseFormData(request) {
  const formData = await request.formData();
  const file = formData.get('heroAd');
  return file;
}

// POST: Upload new hero ad image
export async function POST(request) {
  try {
    const file = await parseFormData(request);
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Save file to /public/uploads
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = file.name.split('.').pop();
    const fileName = `hero-ad-${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    // Write file to disk
    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    // Update config
    const configPath = path.join(process.cwd(), 'data/hero-config.json');
    const configDir = path.dirname(configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    let config = { heroAdImages: [], updatedAt: new Date().toISOString() };
    if (fs.existsSync(configPath)) {
      const oldConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (Array.isArray(oldConfig.heroAdImages)) {
        config.heroAdImages = oldConfig.heroAdImages;
      } else if (oldConfig.heroAdImage) {
        config.heroAdImages = [oldConfig.heroAdImage];
      }
    }
    config.heroAdImages.push(`/uploads/${fileName}`);
    config.updatedAt = new Date().toISOString();
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    return NextResponse.json({
      message: 'Upload successful',
      imagePath: `/uploads/${fileName}`,
      heroAdImages: config.heroAdImages
    });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// DELETE: Remove a hero ad image
export async function DELETE(request) {
  try {
    const { imagePath } = await request.json();
    if (!imagePath) {
      return NextResponse.json({ error: 'No image path provided' }, { status: 400 });
    }
    const configPath = path.join(process.cwd(), 'data/hero-config.json');
    if (!fs.existsSync(configPath)) {
      return NextResponse.json({ error: 'No config found' }, { status: 404 });
    }
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    let images = Array.isArray(config.heroAdImages) ? config.heroAdImages : [];
    images = images.filter(img => img !== imagePath);
    config.heroAdImages = images;
    config.updatedAt = new Date().toISOString();
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    // Delete the file from uploads
    const filePath = path.join(process.cwd(), 'public', imagePath.replace(/^\/|\//, ''));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return NextResponse.json({ message: 'Image deleted', heroAdImages: images });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
} 