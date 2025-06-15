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

  if (!session?.user) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  const user = session.user;

  const { data: userData } = await supabase
    .from('utilisateurs')
    .select('role, isConfirmed, superadmin, is_approved')
    .eq('email', user.email)
    .single<UserData>();

  const role = userData?.role;
  const isSuperadmin = userData?.superadmin === true;
  const currentPath = request.nextUrl.pathname;

  // Rediriger vers onboarding si pas approuvé et pas superadmin
  if (!userData?.is_approved && !isSuperadmin && currentPath !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // Redirection client
  if ((currentPath === '/' || currentPath === '/login') && role === 'client') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirection admin/superadmin/secroadmin
  if (
    (currentPath === '/' || currentPath === '/login') &&
    (role === 'admin' || role === 'secroadmin' || isSuperadmin)
  ) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/upload', '/profile', '/onboarding', '/admin/:path*'],
};