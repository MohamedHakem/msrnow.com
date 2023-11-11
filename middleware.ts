import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('middleware');

  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/marketplace`;
    return NextResponse.rewrite(url);
  }

  if (request.nextUrl.pathname.match(/^\/(?:[a-zA-Z0-9]{3})$/) && request.nextUrl.pathname != '/rss') {
    const url = request.nextUrl.clone();
    url.pathname = `/news${url.pathname}`;
    return NextResponse.redirect(url);
  }


  if (request.nextUrl.pathname === '/dashboard') {
    const url = request.nextUrl.clone();
    url.pathname = `/dashboard/purchases`;
    return NextResponse.redirect(url);
  }
}
