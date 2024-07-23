import { NextRequest, NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    console.log("started");
    console.log(await req.json())
    const idToken = await req.json(); // Use await req.json() to parse the body
    console.log(idToken);
    
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken) {
      return NextResponse.json(
        { message: "Token not found" },
        { status: 400 }
      );
    }
    
    console.log(decodedToken);
    const user = await prisma.user.create({
      data: {
        uid: decodedToken.uid,
        displayName: decodedToken.name,
        email: decodedToken.email,
        photoURL: decodedToken.picture,
        emailVerified: decodedToken.email_verified,
        phoneNumber: decodedToken.phone_number,
        providerId: decodedToken.firebase.sign_in_provider,
      },
    });

    const payload = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name,
      photoURL: decodedToken.picture,
    };

    const secretKey = process.env.SECRET_KEY || '';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return NextResponse.json(
      { data: { token, user } },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
