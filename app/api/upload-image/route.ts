// app/api/upload-image/route.js
import { NextResponse } from 'next/server';
import Cloudflare from 'cloudflare';

const client = new Cloudflare({
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
});

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

export async function POST(request) {
  try {
    // Check if environment variables are set
    if (!CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
      return NextResponse.json(
        { error: 'Missing Cloudflare credentials' },
        { status: 500 }
      );
    }

    // Create direct upload URL using Cloudflare SDK
    const directUpload = await client.images.v2.directUploads.create({
      account_id: CLOUDFLARE_ACCOUNT_ID,
      // Optional parameters
      expiry: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      requireSignedURLs: false,
      metadata: {}
    });

    return NextResponse.json({
      success: true,
      uploadURL: directUpload.uploadURL,
      id: directUpload.id,
    });

  } catch (error) {
    console.error('Cloudflare SDK error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create upload URL', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to get upload URL.' },
    { status: 405 }
  );
}