'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function OAuthHandler() {
  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes('code=')

    if (hasCode) {
      supabase.auth.exchangeCodeForSession(url).then(({ error }) => {
        if (error) {
          console.error('OAuth Error:', error.message)
        }
        window.location.replace('/dashboard')
      })
    }
  }, [])

  return null
}