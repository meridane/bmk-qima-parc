'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function OAuthHandler() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('access_token')) {
      supabase.auth.getSessionFromUrl({ storeSession: true }).then(({ data, error }) => {
        if (error) console.error('OAuth Error:', error.message)
        window.location.replace('/dashboard')
      })
    }
  }, [])

  return null
}