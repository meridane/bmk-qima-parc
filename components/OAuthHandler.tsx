'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function OAuthHandler() {
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const hash = window.location.hash
      if (hash.includes('access_token') || hash.includes('code')) {
        const { data, error } = await supabase.auth.exchangeCodeForSession()
        if (error) {
          console.error('OAuth Error:', error.message)
        }
        window.location.replace('/dashboard')
      }
    }

    handleOAuthRedirect()
  }, [])

  return null
}