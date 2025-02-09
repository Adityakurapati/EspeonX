import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, code } = await request.json();

    // Get stored verification data
    const storedData = global.verificationCodes?.get(email);

    if (!storedData) {
      return NextResponse.json(
        { message: 'No verification code found' },
        { status: 400 }
      );
    }

    // Check if code is expired (10 minutes)
    if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
      global.verificationCodes.delete(email);
      return NextResponse.json(
        { message: 'Verification code expired' },
        { status: 400 }
      );
    }

    // Verify the code
    if (storedData.code.toString() === code) {
      global.verificationCodes.delete(email);
      return NextResponse.json(
        { message: 'Verification successful' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid verification code' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { message: 'Verification failed' },
      { status: 500 }
    );
  }
}