'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardClientPage() {
  const router = useRouter()
  const [voitures, setVoitures] = useState<any[]>([])
  const [conteneur, setConteneur] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')

      const { data: profil } = await supabase.from('users').select('*').eq('id', user.id).single()
      setProfile(profil)

      const { data: mesVoitures } = await supabase
        .from('voitures')
        .select('*')
        .eq('client_id', user.id)
      setVoitures(mesVoitures || [])

      const conteneurs = await supabase
        .from('conteneurs')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      setConteneur(conteneurs.data || null)

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const voitureChargeeSansBMK = voitures.some(
    v => v.statut === 'chargée' && v.avec_papiers_bmk === false
  )

  if (isLoading) return <p className="p-4">Chargement...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur votre espace client</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Informations personnelles</h2>
        <div className="bg-white rounded shadow p-4">
          <p><strong>Nom :</strong> {profile?.name}</p>
          <p><strong>Email :</strong> {profile?.email}</p>
          <p><strong>Téléphone :</strong> {profile?.telephone || 'Non renseigné'}</p>
          <p><strong>Langue préférée :</strong> {profile?.langue || 'Français'}</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Vos véhicules</h2>
        {voitures.length === 0 ? (
          <p>Aucune voiture enregistrée.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voitures.map((v, idx) => (
              <li key={idx} className="border p-4 rounded shadow bg-white">
                <p><strong>Modèle :</strong> {v.modele}</p>
                <p><strong>Châssis :</strong> {v.numero_chassis}</p>
                <p><strong>Statut :</strong> {v.statut}</p>
                <p><strong>Avec papiers BMK :</strong> {v.avec_papiers_bmk ? 'Oui' : 'Non'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {conteneur && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Conteneur assigné</h2>
          <div className="bg-white p-4 rounded shadow">
            <p><strong>Numéro :</strong> {conteneur.numero}</p>
            <p><strong>Pays de destination :</strong> {conteneur.pays_destination}</p>
            <p><strong>Seal :</strong> {conteneur.seal}</p>
            <p><strong>Date de chargement :</strong> {conteneur.date_chargement || 'Non précisée'}</p>
          </div>
        </section>
      )}

      {voitureChargeeSansBMK && (
        <section className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>⚠️ Vous avez une ou plusieurs voitures chargées sans papiers BMK. Veuillez envoyer les documents d’exportation.</p>
        </section>
      )}

      <div className="text-center text-sm text-gray-500 mt-10">BMK Qima Parc © 2025</div>
    </div>
  )
}
