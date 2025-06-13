'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function AdminVoitures() {
  const [voitures, setVoitures] = useState<any[]>([]);

  useEffect(() => {
    const fetchVoitures = async () => {
      const { data, error } = await supabase
        .from('voitures')
        .select('*, clients (*)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setVoitures(data);
      }
    };

    fetchVoitures();
  }, []);

  return (
    <SidebarWrapper>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Toutes les voitures</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {voitures.map((v) => (
            <div key={v.id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={v.photo}
                alt={v.modele}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <p><strong>Modèle :</strong> {v.modele}</p>
              <p><strong>Châssis :</strong> {v.numero_chassis}</p>
              <p><strong>Client :</strong> {v.clients?.email || 'Non assigné'}</p>
              <p>
                <strong>Statut :</strong>{' '}
                <span
                  className={
                    v.statut === 'chargée' ? 'text-green-600' : 'text-gray-500 italic'
                  }
                >
                  {v.statut || 'non chargé'}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </SidebarWrapper>
  );
}
