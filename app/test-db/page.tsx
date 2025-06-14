'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestDbPage() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users').select('*').limit(5);

      if (error) {
        setError(error.message);
        setData([]);
      } else {
        setData(data);
        setError(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Test de Connexion Supabase</h1>

      {error && <p className="text-red-500">❌ Erreur : {error}</p>}

      {!error && data.length > 0 && (
        <ul className="list-disc pl-6">
          {data.map((item, index) => (
            <li key={index}>
              {item.email ?? 'Utilisateur sans email'} - rôle: {item.role ?? 'N/A'}
            </li>
          ))}
        </ul>
      )}

      {!error && data.length === 0 && <p>✅ Connexion réussie, mais aucune donnée trouvée.</p>}
    </div>
  );
}