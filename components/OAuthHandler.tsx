'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function OAuthHandler() {
  const router = useRouter()

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const hash = window.location.hash
      const searchParams = new URLSearchParams(window.location.search)

      const hasCode = searchParams.has('code')
      const hasAccessToken = hash.includes('access_token')

      if (hasCode || hasAccessToken) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)

        if (error) {
          console.error('OAuth Error:', error.message)
          return
        }

        if (data?.session) {
          router.push('/dashboard')
        }
      }
    }

    handleOAuthRedirect()
  }, [router])

  return null
}