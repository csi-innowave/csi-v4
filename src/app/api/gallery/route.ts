import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || process.env.CLOUDINARY_FOLDER || 'gallery';

    // Verify credentials
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ 
        error: 'Cloudinary API credentials missing in environment variables.' 
      }, { status: 400 });
    }

    // Search for images inside specified folder
    const result = await cloudinary.search
      .expression(`folder:${folder}* AND resource_type:image`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const imageUrls = result.resources.map((resource: any) => resource.secure_url);

    return NextResponse.json({ images: imageUrls });
  } catch (error: any) {
    console.error('Cloudinary API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch gallery images' }, { status: 500 });
  }
}
