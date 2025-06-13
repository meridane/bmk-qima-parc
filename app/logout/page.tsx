'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.push('/login');
    };

    logout();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-600 text-lg">Déconnexion en cours...</p>
    </div>
  );
}
