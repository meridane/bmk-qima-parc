'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState('Connexion en cours...');

  useEffect(() => {
    const handleAuth = async () => {
      setMessage('Vérification de session...');

      const { data, error } = await supabase.auth.getSession();

      console.log('📦 Résultat final getSession:', data, error);

      if (data?.session) {
        setMessage('✅ Session active, redirection...');
        router.push('/dashboard');
      } else {
        console.error('❌ Session invalide ou expirée:', error?.message);
        setMessage("Erreur : session invalide. Retour à la page d'accueil...");
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
