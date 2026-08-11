import { NextRequest, NextResponse } from 'next/server';

// All auth checks are bypassed — Clerk will be wired in once keys are available.
// Protected routes are listed here for reference only.
export function middleware(_req: NextRequest) {
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
