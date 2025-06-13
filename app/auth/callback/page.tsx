'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState('Connexion en cours...');

  useEffect(() => {
    const extractHashTokens = () => {
      const hash = window.location.hash.substring(1); // retire le #
      const params = new URLSearchParams(hash);
      return {
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
      };
    };

    const handleAuth = async () => {
      setMessage('Extraction des tokens...');

      const { access_token, refresh_token } = extractHashTokens();

      if (!access_token || !refresh_token) {
        setMessage("❌ Token manquant dans l'URL");
        return;
      }

      setMessage('Connexion sécurisée en cours...');

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      console.log('✅ setSession:', data, error);

      if (data?.session) {
        setMessage('✅ Session active, redirection...');
        router.push('/dashboard');
      } else {
        setMessage('❌ Session invalide, retour au login...');
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-gray-700 font-medium">
      {message}
    </div>
  );
}
