import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const supabase = createServerSupabaseClient({ cookies })
  const data = await req.json()

  const {
    email,
    nom_complet,
    tel,
    whatsapp,
    same_number,
    langue_native,
    volume_conteneurs,
    password_hash,
  } = data

  const { error } = await supabase
    .from('clients')
    .upsert({
      email,
      nom_complet,
      tel,
      whatsapp,
      same_number,
      langue_native,
      volume_conteneurs,
      password_hash,
      status: 'pending',
      created_at: new Date().toISOString(),
    })

  if (error) {
    console.error('[REGISTER CLIENT ERROR]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}