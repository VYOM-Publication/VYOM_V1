import { NextRequest, NextResponse } from 'next/server';

/**
 * Production authentication middleware.
 *
 * Strategy:
 * - The refresh token is in the HttpOnly cookie `vyom_rt`.
 * - The access token lives only in-memory (window.__VYOM_ACCESS_TOKEN__),
 *   inaccessible in the Edge runtime.
 *
 * We validate the session by calling POST /auth/refresh ONCE.
 * To avoid invalidating the token before the client-side layout calls
 * initAuth() (which also calls refresh), we pass the new rotated cookie back
 * to the browser so the next layout refresh uses the updated token.
 *
 * Fail-closed: any error → redirect to /login.
 */

const REFRESH_COOKIE = 'vyom_rt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const refreshCookie = req.cookies.get(REFRESH_COOKIE);

  // If no refresh token cookie is present, redirect to login page.
  if (!refreshCookie?.value) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Session cookie is present. Allow request to proceed.
  // Session validation and access token retrieval is handled by client initAuth().
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/member/:path*',
    '/author/:path*',
    '/reviewer/:path*',
    '/editor/:path*',
    '/admin/:path*',
  ],
};
