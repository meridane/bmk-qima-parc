'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`, // ✅ Redirection vers la bonne page
        },
      });

      if (error) {
        setErrorMsg('Erreur lors de la connexion : ' + error.message);
      }
    } catch (err: any) {
      setErrorMsg('Erreur : ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 to-black">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <img src="/assets/logo.png" alt="BMK Logo" className="w-32 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-6">Connexion à BMK Qima Parc</h1>
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Connexion avec Google
        </button>
        {errorMsg && <p className="mt-4 text-red-600 text-sm">{errorMsg}</p>}
      </div>
    </div>
  );
}