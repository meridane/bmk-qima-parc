import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const protectedRoutes = ['/dashboard', '/admin', '/upload', '/profile']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ NE PAS exposer cette clé côté client
  )

  const accessToken = request.cookies.get('sb-access-token')?.value
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !accessToken) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (accessToken) {
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken)

    const { data: clientData } = await supabase
      .from('clients')
      .select('status')
      .eq('email', user?.email)
      .single()

    const { data: userData } = await supabase
      .from('users')
      .select('role, isConfirmed, superadmin')
      .eq('email', user?.email)
      .single()

    const isClient = !!clientData
    const isSuperadmin = userData?.superadmin === true

    if (isClient && clientData?.status === 'pending') {
      const waitUrl = new URL('/waiting-validation', request.url)
      return NextResponse.redirect(waitUrl)
    }

    // Rediriger vers onboarding si pas confirmé et pas superadmin
    if (!userData?.isConfirmed && !isSuperadmin) {
      const onboardUrl = new URL('/onboarding', request.url)
      return NextResponse.redirect(onboardUrl)
    }
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/upload/:path*', '/profile/:path*'],
}