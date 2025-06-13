'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        router.push('/dashboard');
      } else {
        console.error('Session non trouvée :', error);
        router.push('/login?error=session');
      }
    };

    verifySession();
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center text-lg font-semibold">
      Connexion en cours...
    </div>
  );
}
