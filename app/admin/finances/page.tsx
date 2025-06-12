
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminFinances() {
  const [depenses, setDepenses] = useState<any[]>([]);
  const [montantTotal, setMontantTotal] = useState(0);

  useEffect(() => {
    const fetchDepenses = async () => {
      const { data, error } = await supabase
        .from('depenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDepenses(data);
        const total = data.reduce((sum, d) => sum + (d.montant || 0), 0);
        setMontantTotal(total);
      }
    };

    fetchDepenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Finances – Dépenses</h1>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <p className="text-lg">💰 Total des dépenses : <strong>{montantTotal.toLocaleString()} ₩</strong></p>
        </div>

        <div className="space-y-4">
          {depenses.map((d) => (
            <div key={d.id} className="bg-white p-4 rounded-xl shadow">
              <p><strong>Description :</strong> {d.description}</p>
              <p><strong>Montant :</strong> {d.montant.toLocaleString()} ₩</p>
              <p><strong>Date :</strong> {new Date(d.created_at).toLocaleDateString()}</p>
              <div className="mt-2">
                <p className="font-semibold">Photo de l'item :</p>
                <img src={d.photo_item} alt="Item" className="w-32 h-auto rounded mt-1" />
              </div>
              <div className="mt-2">
                <p className="font-semibold">Reçu :</p>
                <img src={d.photo_recu} alt="Reçu" className="w-32 h-auto rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
