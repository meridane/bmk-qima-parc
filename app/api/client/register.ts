import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' })

  try {
    const data = JSON.parse(req.body)

    const { email, nom_complet, tel, whatsapp, same_number, langue_native, volume_conteneurs, password_hash } = data

    const { error } = await supabase.from('clients').upsert({
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
      console.error(error)
      return res.status(500).json({ error: 'Erreur lors de l’insertion' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}