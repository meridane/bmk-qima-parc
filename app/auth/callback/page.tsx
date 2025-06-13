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

        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        console.log('📦 Résultat setSession →', data, error);

        if (error) {
          console.error('❌ setSession a échoué:', error.message);
          router.push('/login?error=setSession');
        } else {
          console.log('✅ Session enregistrée, redirection vers /dashboard');
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
    <div className="flex justify-center items-center h-screen">
      Connexion en cours...
    </div>
  );
}
