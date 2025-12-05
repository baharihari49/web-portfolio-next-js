import { NextRequest, NextResponse } from 'next/server';
import { getPreviewUrl } from '@/lib/previewToken';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get('id');

  if (!collectionId) {
    return NextResponse.json(
      { success: false, error: 'Missing collection ID' },
      { status: 400 }
    );
  }

  const previewUrl = getPreviewUrl(collectionId);

  return NextResponse.json({
    success: true,
    previewUrl,
  });
}
