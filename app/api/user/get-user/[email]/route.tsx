import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, params: { params: { email: string } }) {
  if (params.params.email === undefined) {
    return NextResponse.json({ error: 'no email provided' }, { status: 415 });
  }

  console.log('[GET] params.params.email: ', params.params.email);
  const user = await db.user.findUnique({
    where: { email: params.params.email },
    include: { roles: { select: { name: true } } }
  });

  // console.log('[GET] user: ', user);

  if (user) {
    return NextResponse.json({ roles: user.roles }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'no user found' }, { status: 200 });
  }
}
