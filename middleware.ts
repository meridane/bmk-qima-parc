import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs' // ✅ ici
import type { Database } from '@/types/supabase'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req: request, res: response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const currentPath = request.nextUrl.pathname

  const publicPaths = ['/login', '/auth', '/auth/callback', '/onboarding', '/maintenance']
  const isPublic = publicPaths.some((path) => currentPath.startsWith(path))

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
