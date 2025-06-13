'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRedirect = async () => {
      const access_token = searchParams.get('access_token');
      const refresh_token = searchParams.get('refresh_token');

      if (access_token && refresh_token) {
        console.log('TOKEN DETECTÉ ✅');
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error('Erreur setSession:', error.message);
          router.push('/login?error=setSession');
        } else {
          router.push('/dashboard');
        }
      } else {
        console.log('Pas de token trouvé dans URL ❌');
        router.push('/login?error=no-token');
      }
    };

    handleRedirect();
  }, [router, searchParams]);

  return (
    <div className="flex justify-center items-center h-screen">
      Connexion en cours...
    </div>
  );
}
