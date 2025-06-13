import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Pages protégées par login
const protectedRoutes = ['/dashboard', '/admin', '/upload', '/profile'];

export async function middleware(request: NextRequest) {
  const supabaseToken = request.cookies.get('sb-access-token')?.value;

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !supabaseToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/upload/:path*', '/profile/:path*'],
};
