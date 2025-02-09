import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Generate a random 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Store the code in memory (in production, use a database)
    global.verificationCodes = global.verificationCodes || new Map();
    global.verificationCodes.set(email, {
      code: verificationCode,
      timestamp: Date.now()
    });

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tournament Access Verification Code',
      text: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verification Code</h2>
          <p>Your verification code for tournament access is:</p>
          <h1 style="color: #4A5568; font-size: 32px; letter-spacing: 5px;">${verificationCode}</h1>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `
    });

    return NextResponse.json(
      { message: 'Verification code sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}