'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/login/callback`,
      },
    });

    if (error) {
      alert('Erreur de connexion : ' + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.email) {
        const { data, error } = await supabase
          .from('utilisateurs')
          .select('role, is_approved')
          .eq('email', session.user.email)
          .single();

        if (error || !data) {
          router.push('/onboarding');
        } else {
          const { role, is_approved } = data;

          if (['admin', 'superadmin', 'secroadmin'].includes(role)) {
            router.push('/admin/dashboard');
          } else if (is_approved) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        }
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-orange-500 to-black">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-sm w-full">
        <img src="/assets/logo.png" alt="BMK Logo" className="w-32 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Connexion à BMK Qima Parc
        </h1>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black hover:bg-orange-600 text-white py-2 px-4 rounded-xl"
        >
          {loading ? 'Connexion...' : 'Connexion avec Google'}
        </button>
      </div>
    </div>
  );
}