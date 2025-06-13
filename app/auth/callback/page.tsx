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
        // Manually set session
        const { data, error } = await supabase.auth.setSession({
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
        console.log('Pas de tokens trouvés');
        router.push('/login?error=token-missing');
      }
    };

    handleRedirect();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      Connexion en cours...
    </div>
  );
}
