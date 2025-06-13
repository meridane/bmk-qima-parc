'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard');
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Ce paramètre force Supabase à utiliser ?access_token= au lieu de #access_token=
        redirectTo: 'https://bmk-qima-parc.vercel.app/auth/callback',
      },
    });

    if (error) {
      console.error('Erreur Google login:', error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <button
        className="bg-orange-600 text-white px-6 py-3 rounded-lg"
        onClick={handleGoogleLogin}
      >
        Se connecter avec Google
      </button>
    </div>
  );
}
