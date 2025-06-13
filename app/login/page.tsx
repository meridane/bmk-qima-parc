'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    console.log('[PAGE: login] chargée');

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[PAGE: login] getSession →', session);

      if (session) {
        console.log('[PAGE: login] session trouvée → redirection /dashboard');

        // 🔥 Redirection navigateur (plus fiable que router.push)
        window.location.href = '/dashboard';
      }
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://bmk-qima-parc.vercel.app/auth/callback',
      },
    });

    if (error) {
      console.error('❌ Erreur Google login:', error.message);
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
