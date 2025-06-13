'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      // 👇👇 récupère les tokens depuis l'URL (#access_token...)
      const { error } = await supabase.auth.getSessionFromUrl();

      if (error) {
        console.error('Erreur de récupération de session depuis URL :', error.message);
        router.push('/login');
        return;
      }

      // 👇 récupère maintenant la session active
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <p className="text-gray-700 text-lg">Connexion en cours...</p>
    </div>
  );
}
