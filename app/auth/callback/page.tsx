'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const handleAuth = async () => {
      // Cette ligne est inutile avec supabase-js v2
const { data, error } = await supabase.auth.getSession()

      
      if (data?.session?.user) {
        router.replace('/profile') // Redirige vers la page du client une fois connecté
      } else {
        router.replace('/login') // Si l’auth échoue, retour au login
      }
    }

    handleAuth()
  }, [supabase, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <p>Connexion en cours...</p>
    </div>
  )
}
