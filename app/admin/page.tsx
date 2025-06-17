'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminHome() {
  const [voitures, setVoitures] = useState<any[]>([]);
  const [conteneurs, setConteneurs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: v } = await supabase.from('voitures').select('*');
      const { data: c } = await supabase.from('conteneurs').select('*');
      setVoitures(v || []);
      setConteneurs(c || []);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard Administrateur</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Total voitures enregistrées</h2>
            <p className="text-3xl font-bold text-orange-600">{voitures.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Conteneurs actifs</h2>
            <p className="text-3xl font-bold text-orange-600">{conteneurs.length}</p>
          </div>
        </div>

        <p className="text-gray-600">Bienvenue dans le panneau de gestion de BMK Qima Parc.</p>
      </main>
    </div>
  );
}

