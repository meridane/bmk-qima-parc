'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';


export default function DashboardClient() {
  const [user, setUser] = useState<any>(null);
  const [voitures, setVoitures] = useState<any[]>([]);
  const [conteneur, setConteneur] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: v } = await supabase
          .from('voitures')
          .select('*')
          .eq('client_id', user.id);
        setVoitures(v || []);

        const { data: c } = await supabase
          .from('conteneurs')
          .select('*')
          .eq('client_id', user.id)
          .single();
        setConteneur(c || null);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-auto">
          <div className="bg-white rounded-2xl shadow p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <img src="/assets/logo.png" alt="BMK" className="h-10" />
              <span className="text-sm text-gray-500">Bienvenue {user?.email}</span>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">Tableau de bord Client</h2>

            {conteneur ? (
              <div className="mb-6">
                <p>Conteneur assigné : <strong>{conteneur.numero}</strong></p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div
                    className="bg-orange-600 h-4 rounded-full text-right px-2 text-white text-xs"
                    style={{ width: `${conteneur.pourcentage || 0}%` }}
                  >
                    {conteneur.pourcentage || 0}%
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mb-6">Aucun conteneur assigné pour l’instant.</p>
            )}

            <h3 className="text-xl font-semibold mb-2 text-gray-800">Mes voitures</h3>
            <ul className="space-y-2">
              {voitures.map((v) => (
                <li key={v.id} className="p-3 bg-gray-100 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>Modèle :</strong> {v.modele}</p>
                      <p><strong>Châssis :</strong> {v.numero_chassis}</p>
                    </div>
                    {v.statut === 'chargée' ? (
                      <a
                        href={`https://wa.me/?text=La voiture ${v.modele} (${v.numero_chassis}) a été chargée.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-bold underline"
                      >
                        WhatsApp
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">En attente de chargement</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
