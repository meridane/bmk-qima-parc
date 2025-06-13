'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        // Authentification réussie
        router.push('/dashboard');
      } else {
        // Pas de session trouvée (échec)
        router.push('/login?error=1');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Connexion en cours...</p>
    </div>
  );
}
