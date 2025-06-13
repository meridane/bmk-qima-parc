'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import useUser from '@/lib/useUser';

export default function LoginPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      if (!loading && user) {
        const { data, error } = await supabase
          .from('clients')
          .select('status')
          .eq('email', user.email)
          .single();

        if (!data) {
          router.push('/onboarding'); // Nouvel utilisateur
        } else if (data.status === 'pending') {
          router.push('/waiting-validation');
        } else {
          router.push('/dashboard');
        }
      }
      setCheckingStatus(false);
    };

    checkStatus();
  }, [user, loading, router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      alert('Erreur lors de la connexion : ' + error.message);
    }
  };

  if (loading || checkingStatus) {
    return <div className="text-center mt-20 text-lg font-semibold">Chargement...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <h1 className="text-2xl font-bold mb-6">Bienvenue sur BMK Qima Shoring</h1>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 mb-4 w-full max-w-sm"
      >
        🔵 S'inscrire avec Google
      </button>

      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded-md text-lg hover:bg-gray-800 w-full max-w-sm"
      >
        ⚫ Se connecter avec Google
      </button>

      <p className="text-sm text-gray-500 mt-6 text-center max-w-sm">
        Votre compte doit être validé par un admin pour accéder à votre espace personnel.
      </p>
    </div>
  );
}