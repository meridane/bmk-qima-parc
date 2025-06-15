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

  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith('/auth') || currentPath === '/login') {
    return response;
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userId = session.user.id;

  const { data: userData, error } = await supabase
    .from('users')
    .select('role, is_approved')
    .eq('id', userId)
    .single();

  if (error || !userData) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { role, is_approved } = userData;

  if (!is_approved && currentPath !== '/waiting-validation') {
    return NextResponse.redirect(new URL('/waiting-validation', request.url));
  }

  // ✅ Autorisation des routes client
  if (
    role === 'client' &&
    !['/dashboard', '/upload', '/profile', '/logout', '/waiting-validation'].some((allowed) =>
      currentPath.startsWith(allowed)
    )
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ✅ Autorisation admin/superadmin/secroadmin
  if (
    (role === 'admin' || role === 'superadmin' || role === 'secroadmin') &&
    !currentPath.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};