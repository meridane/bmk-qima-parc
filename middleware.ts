import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const protectedRoutes = ['/dashboard', '/admin', '/upload', '/profile'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const supabaseToken = request.cookies.get('sb-access-token')?.value;
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !supabaseToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Vérification du status client s’il est connecté
  if (supabaseToken && request.nextUrl.pathname.startsWith('/dashboard')) {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user?.email) {
      const { data: client } = await supabase
        .from('clients')
        .select('status')
        .eq('email', session.user.email)
        .single();

      if (client?.status === 'pending') {
        const waitUrl = new URL('/waiting-validation', request.url);
        return NextResponse.redirect(waitUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/upload/:path*', '/profile/:path*'],
};