'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        router.push('/dashboard');
      } else {
        router.push('/login?error=session');
      }
    };

    fetchSession();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-lg font-semibold">
      Connexion en cours...
    </div>
  );
}
