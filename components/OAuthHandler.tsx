'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function OAuthHandler() {
  const router = useRouter()

  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes('code=')

    if (hasCode) {
      supabase.auth.exchangeCodeForSession()
        .then(({ error }) => {
          if (error) {
            console.error('OAuth Error:', error.message)
          } else {
            router.push('/dashboard')
          }
        })
    }
  }, [])

  return null
}