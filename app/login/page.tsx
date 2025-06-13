'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import useUser from '@/lib/useUser';

export default function LoginPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  // Si session trouvée → redirection vers /dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      alert('Erreur lors de la connexion : ' + error.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-lg font-semibold">Chargement...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg hover:bg-orange-600"
      >
        Se connecter avec Google
      </button>
    </div>
  );
}
