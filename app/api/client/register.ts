import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const data = await request.json()

  const {
    email,
    nom_complet,
    tel,
    whatsapp,
    same_number,
    langue_native,
    volume_conteneurs,
    password_hash
  } = data

  // Vérifie si l'email existe déjà
  const { data: existingClient, error: checkError } = await supabase
    .from('clients')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (checkError) {
    console.error('Erreur vérif email :', checkError)
    return NextResponse.json({ error: 'Erreur vérification email' }, { status: 500 })
  }

  if (existingClient) {
    return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 })
  }

  const { error } = await supabase.from('clients').insert({
    email,
    nom_complet,
    tel,
    whatsapp,
    same_number,
    langue_native,
    volume_conteneurs,
    password_hash,
    status: 'pending',
    created_at: new Date().toISOString()
  })

  if (error) {
    console.error('Erreur insertion client :', error)
    return NextResponse.json({ error: 'Échec enregistrement client' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}