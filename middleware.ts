import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type UserData = {
  role: string;
  isConfirmed?: boolean;
  superadmin?: boolean;
  is_approved?: boolean;
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const currentPath = request.nextUrl.pathname;

  if (!session?.user) {
    if (currentPath !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  const user = session.user;

  const { data: userData } = await supabase
    .from('utilisateurs')
    .select('role, isConfirmed, superadmin, is_approved')
    .eq('email', user.email)
    .single<UserData>();

  const role = userData?.role;
  const isSuperadmin = userData?.superadmin === true;

  // 1. Rediriger vers /onboarding si non approuvé (sauf pour superadmin)
  if (
    !userData?.is_approved &&
    !isSuperadmin &&
    currentPath !== '/onboarding'
  ) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // 2. Redirection pour client vers /dashboard
  if (
    (currentPath === '/' || currentPath === '/login') &&
    role === 'client'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Redirection pour admin/superadmin vers /admin/dashboard
  if (
    (currentPath === '/' || currentPath === '/login') &&
    (role === 'admin' || role === 'secroadmin' || isSuperadmin)
  ) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard',
    '/upload',
    '/profile',
    '/logout',
    '/onboarding',
    '/admin/:path*',
  ],
};