'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Login error:', error.message);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        onClick={handleGoogleLogin}
      >
        Se connecter avec Google
      </button>
    </div>
  );
}
