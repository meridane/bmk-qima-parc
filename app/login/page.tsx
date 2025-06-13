'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AuthLayout from '@/components/AuthLayout';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard');
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://bmk-qima-parc.vercel.app/auth/callback',
      },
    });
  };

  return (
    <AuthLayout>
      <button
        className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-md font-semibold"
        onClick={handleGoogleLogin}
      >
        Se connecter avec Google
      </button>
    </AuthLayout>
  );
}
