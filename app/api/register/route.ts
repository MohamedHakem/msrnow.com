import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse('[/api/register] MissingInfo', { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log('[/api/register] REGISTRATION_ERROR: ', error);
    return new NextResponse('[/api/register] Internal Error', { status: 500 });
  }
}
