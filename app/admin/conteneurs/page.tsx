'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function Page() {
  const [conteneurs, setConteneurs] = useState<any[]>([]);

  useEffect(() => {
    const fetchConteneurs = async () => {
      const { data, error } = await supabase
        .from('conteneurs')
        .select('*, clients (*)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setConteneurs(data);
      }
    };

    fetchConteneurs();
  }, []);

  return (
    <SidebarWrapper>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tous les conteneurs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {conteneurs.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded-xl shadow">
              <p><strong>Numéro :</strong> {c.numero}</p>
              <p><strong>Pays destination :</strong> {c.pays}</p>
              <p><strong>Pourcentage :</strong> {c.pourcentage || 0}%</p>
              <p><strong>Client :</strong> {c.clients?.email || 'Non assigné'}</p>
              {c.document_url && (
                <a
                  href={c.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  Voir le document
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </SidebarWrapper>
  );
}
