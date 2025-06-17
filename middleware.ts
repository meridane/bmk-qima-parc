import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './types/supabase'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req: request, res: response })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  const currentPath = request.nextUrl.pathname

  console.log('[MIDDLEWARE]', {
    path: currentPath,
    user: session?.user?.email || 'AUCUNE'
  })

  // Autoriser les chemins publics et les fichiers statiques
  const isPublicPath =
    currentPath.startsWith('/login') ||
    currentPath.startsWith('/auth') ||
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/favicon.ico') ||
    currentPath.startsWith('/assets') ||
    currentPath.match(/\.(css|js|png|jpg|jpeg|svg|webp)$/)

  if (isPublicPath) {
    return response
  }

  // Si pas connecté : rediriger vers /login
  if (!session?.user) {
    console.log('[REDIRECT] vers /login depuis', currentPath)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}
