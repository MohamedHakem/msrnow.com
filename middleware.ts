import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
// import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest): NextResponse | Promise<NextResponse> {
//   console.log('middleware');
//   if (request.nextUrl.pathname.match(/^localhost:3001\/(?:[a-zA-Z0-9]{3})$/)) {
//     console.log('middleware pattern match');
//     return NextResponse.redirect(new URL('/about', request.url));
//   }

//   return withAuth(request);
//   return withAuth(request, { pages: { signIn: '/login' } });
// }

// export default withAuth(
//   function middleware(request: NextRequest) {
//     // console.log('middleware');
//     // if (request.nextUrl.pathname.match(/^localhost:3001\/(?:[a-zA-Z0-9]{3})$/)) {
//     // console.log("request.url.endsWith('localhost:3001/coZ'): ", request.url.endsWith('localhost:3001/coZ'));
//     // if (request.url.endsWith('localhost:3001/coZ')) {
//     // console.log('request.nextUrl: ', request.nextUrl);
//     // console.log('request.nextUrl.pathname: ', request.nextUrl.pathname);
//     // console.log(
//     //   'request.nextUrl.pathname.match(/^localhost:3001/(?:[a-zA-Z0-9]{3})$/): ',
//     //   request.nextUrl.pathname.match(/^localhost:3001\/(?:[a-zA-Z0-9]{3})$/)
//     // );
//     // console.log(
//     //   'request.nextUrl.pathname.match(/^/(?:[a-zA-Z0-9]{3})$/): ',
//     //   request.nextUrl.pathname.match(/^\/(?:[a-zA-Z0-9]{3})$/)
//     // );

//     if (request.nextUrl.pathname.match(/^\/(?:[a-zA-Z0-9]{3})$/)) {
//       // console.log('middleware pattern match, request.nextUrl.pathname: ', request.nextUrl.pathname);
//       // return NextResponse.rewrite(`http::localhost:3001/news/${'coZ'}`);
//       const url = request.nextUrl.clone();
//       url.pathname = `/news${url.pathname}`;
//       return NextResponse.redirect(url);
//     }
//   },
//   {
//     // callbacks: {
//     //   authorized: function ({ req }) {
//     //     console.log('authorized');
//     //     if (req.nextUrl.pathname.match(/^\/(?:[a-zA-Z0-9]{3})$/)) {
//     //       console.log('authorized pattern match');
//     //       return true;
//     //     }
//     //     return false;
//     //   }
//     // },
//     pages: { signIn: '/login' }
//   }
// );

export async function middleware(request: NextRequest) {
  // console.log('middleware');
  if (request.nextUrl.pathname.match(/^\/(?:[a-zA-Z0-9]{3})$/) && request.nextUrl.pathname != '/rss' ) {
    const url = request.nextUrl.clone();
    url.pathname = `/news${url.pathname}`;
    return NextResponse.redirect(url);
  }
  // if (request.nextUrl.pathname.match(/^(?:dashboard\/|.*dashboard\/).*$/)) {
  // if (request.nextUrl.pathname.match(/^dashboard\/(?:[a-zA-Z0-9])$/)) {
  //   console.log('middleware dashboard');
  //   const url = request.nextUrl.clone();
  //   url.pathname = `/login?callback=http://localhost:3001/dashboard`;
  //   return NextResponse.redirect(url);
  // }
}

// export default withAuth({
//   pages: {
//     signIn: '/login'
//   }
// });

// export const config = {
//   matcher: ['/dashboard/:path*']
// };
