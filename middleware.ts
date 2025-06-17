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

  console.log('[MIDDLEWARE]', {
    path: currentPath,
    user: session?.user?.email || 'AUCUNE',
  });

  if (currentPath.startsWith('/login') || currentPath.startsWith('/auth')) {
    return response;
  }

  if (!session?.user) {
    console.log('[REDIRECT] vers /login depuis', currentPath);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}
