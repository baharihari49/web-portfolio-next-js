import { NextRequest, NextResponse } from 'next/server';
import { validatePreviewToken } from '@/lib/previewToken';

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    // Validate token
    if (!token) {
      return new NextResponse('Missing token', { status: 401 });
    }

    const { valid, collectionId } = validatePreviewToken(token);

    if (!valid) {
      return new NextResponse('Invalid or expired token', { status: 401 });
    }

    // Verify the token matches the requested ID
    if (collectionId !== id) {
      return new NextResponse('Token mismatch', { status: 403 });
    }

    // Fetch HTML content from backend API
    const response = await fetch(`${API_BASE_URL}/api/collections/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return new NextResponse('Collection not found', { status: 404 });
    }

    const data = await response.json();

    if (!data.success || !data.data?.htmlContent) {
      return new NextResponse('HTML content not available', { status: 404 });
    }

    // Return HTML with security headers
    return new NextResponse(data.data.htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Preview error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
