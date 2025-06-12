'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';


export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'client' | 'admin' | null>(null);

  const handleLogin = async () => {
    if (!role) return alert('Veuillez choisir votre rôle');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/dashboard?role=${role}`,
      },
    });

    if (error) alert('Erreur de connexion : ' + error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-orange-500 to-black">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-sm w-full">
        <img src="/assets/logo.png" alt="BMK Logo" className="w-32 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Connexion à BMK Qima Parc
        </h1>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => setRole('client')}
            className={`px-4 py-2 rounded-xl text-white font-semibold ${
              role === 'client' ? 'bg-orange-600' : 'bg-gray-500'
            }`}
          >
            Client
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`px-4 py-2 rounded-xl text-white font-semibold ${
              role === 'admin' ? 'bg-black' : 'bg-gray-500'
            }`}
          >
            Superviseur
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-black hover:bg-orange-600 text-white py-2 px-4 rounded-xl"
        >
          Connexion avec Google
        </button>
      </div>
    </div>
  );
}
