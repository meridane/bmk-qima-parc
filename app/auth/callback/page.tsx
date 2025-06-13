'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      // ✅ Cette ligne extrait les tokens depuis l’URL et crée la session
      const { error } = await supabase.auth.exchangeCodeForSession();

      if (error) {
        console.error("Erreur lors de l’échange du token :", error.message);
        router.push('/login');
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (data.session) {
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
