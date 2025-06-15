import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types/supabase'; // adapte ce chemin si besoin

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const currentPath = request.nextUrl.pathname;

  // Autoriser librement la connexion
  if (currentPath.startsWith('/auth') || currentPath === '/login') {
    return response;
  }

  // Pas connecté → redirect vers /login
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

  // Si non approuvé → vers /waiting-validation
  if (!is_approved && currentPath !== '/waiting-validation') {
    return NextResponse.redirect(new URL('/waiting-validation', request.url));
  }

  // Si client → vers /dashboard
  if (role === 'client' && !currentPath.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si admin/superadmin/secroadmin → vers /admin/dashboard
  if (
    (role === 'admin' || role === 'superadmin' || role === 'secroadmin') &&
    !currentPath.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

// Active le middleware pour toutes les pages sauf fichiers statiques/API
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};