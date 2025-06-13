'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const { error } = await supabase.auth.getSession(); // Just to init
      const session = await supabase.auth.getSession();

      if (session.data.session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleOAuthRedirect();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-600 text-lg">Connexion en cours...</p>
    </div>
  );
}
