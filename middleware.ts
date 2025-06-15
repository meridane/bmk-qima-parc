import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types/supabase';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = request.nextUrl.pathname;

  if (path.startsWith('/auth') || path === '/login') return response;

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data: userData, error } = await supabase
    .from('users')
    .select('role, is_approved')
    .eq('id', session.user.id)
    .single();

  if (error || !userData) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { role, is_approved } = userData;

  if (!is_approved && path !== '/waiting-validation') {
    return NextResponse.redirect(new URL('/waiting-validation', request.url));
  }

  if (role === 'client' && !['/dashboard', '/upload', '/profile', '/logout', '/waiting-validation'].some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (
    ['admin', 'superadmin', 'secroadmin'].includes(role) &&
    !path.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};