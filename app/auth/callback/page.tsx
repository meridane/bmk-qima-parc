'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Erreur lors de la récupération de session :", error.message);
        router.push('/login');
        return;
      }

      if (data.session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <p className="text-gray-700 text-lg">Connexion en cours...</p>
    </div>
  );
}
