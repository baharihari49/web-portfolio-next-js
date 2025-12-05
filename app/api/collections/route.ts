import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/collections`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return NextResponse.json(
      { success: false, data: [], error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}
