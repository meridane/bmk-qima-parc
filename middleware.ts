import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'  // adapte ce chemin si besoin

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req: request, res: response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const currentPath = request.nextUrl.pathname

  // Autorise librement l'accès à ces chemins
  const publicPaths = [
    '/login',
    '/auth',
    '/auth/callback',
    '/onboarding',
    '/maintenance'
  ]

  if (session) {
    return response
  }

  const isPublic = publicPaths.some((path) => currentPath.startsWith(path))

  if (!isPublic) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
