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

  // 🚫 Rediriger vers onboarding si pas confirmé et pas superadmin
  if (!userData?.is_approved && !isSuperadmin && currentPath !== '/onboarding') {
    const onboardUrl = new URL('/onboarding', request.url);
    return NextResponse.redirect(onboardUrl);
  }

  // ✅ Redirection selon rôle, si pas déjà sur la bonne page
  if (
    (currentPath === '/' || currentPath === '/login') &&
    role === 'client' &&
    currentPath !== '/dashboard'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (
    (currentPath === '/' || currentPath === '/login') &&
    (role === 'admin' || isSuperadmin || role === 'secroadmin') &&
    currentPath !== '/admin/dashboard'
  ) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/admin/:path*', '/upload', '/profile'],
};