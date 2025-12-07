import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, phone } = await request.json();

    if (!email && !phone) {
      return NextResponse.json(
        { message: 'Email or phone is required' },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.akafco.com';
    
    // Check if user exists
    const response = await fetch(`${apiUrl}/api/auth/check-existing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phone }),
    });

    if (!response.ok) {
      // If API doesn't exist yet, return not found (allow signup)
      if (response.status === 404) {
        return NextResponse.json({ exists: false });
      }
      throw new Error('Failed to check existing user');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Check existing user error:', error);
    // On error, allow signup (fail open)
    return NextResponse.json({ exists: false, duplicateField: null });
  }
}


