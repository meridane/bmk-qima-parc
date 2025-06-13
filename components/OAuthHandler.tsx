'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function OAuthHandler() {
  useEffect(() => {
    const url = new URL(window.location.href)
    const hasCode = url.searchParams.get('code')

    if (hasCode) {
      supabase.auth.exchangeCodeForSession(window.location.href).then(({ error }) => {
        if (error) {
          console.error('OAuth Error:', error.message)
        }
        window.location.replace('/dashboard')
      })
    }
  }, [])

  return null
}