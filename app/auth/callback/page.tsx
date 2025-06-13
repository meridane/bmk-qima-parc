'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState('Connexion sécurisée en cours...');

  useEffect(() => {
    const extractTokensFromHash = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      return {
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
      };
    };

    const handleAuth = async () => {
      const { access_token, refresh_token } = extractTokensFromHash();

      if (!access_token || !refresh_token) {
        console.log('❌ Tokens non trouvés');
        setMessage('❌ Tokens manquants. Retour à /login');
        setTimeout(() => router.push('/login'), 3000);
        return;
      }

      console.log('🔑 Tokens trouvés', { access_token, refresh_token });

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error('❌ Erreur setSession:', error.message);
        setMessage('Erreur de session : retour à /login...');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        console.log('✅ Session enregistrée');
        router.push('/dashboard');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-gray-700 text-lg font-medium">
      {message}
    </div>
  );
}
