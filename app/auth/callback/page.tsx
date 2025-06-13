'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const extractTokenFromHash = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      return {
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
      };
    };

    const handleAuth = async () => {
      const { access_token, refresh_token } = extractTokenFromHash();

      if (access_token && refresh_token) {
        console.log('✅ Tokens extraits depuis #hash');

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
        console.error('❌ Aucun token détecté dans le hash');
        router.push('/login?error=no-token');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center">
      Connexion en cours...
    </div>
  );
}
