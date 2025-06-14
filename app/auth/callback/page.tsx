'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        router.push('/login');
        return;
      }

      const userId = session.user.id;

      // 🔍 DEBUG : tu peux retirer les console.log plus tard
      console.log("Session user ID:", userId);

      const { data: userDetails, error: userError } = await supabase
        .from('users')
        .select('role, is_approved')
        .eq('id', userId)
        .single();

      if (userError || !userDetails) {
        console.log("Erreur userDetails:", userError?.message);
        router.push('/login');
        return;
      }

      const { role, is_approved } = userDetails;

      console.log("Role:", role, "is_approved:", is_approved);

      if (!is_approved) {
        router.push('/waiting-validation');
      } else if (role === 'client') {
        router.push('/dashboard');
      } else if (role === 'admin' || role === 'superadmin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="text-center mt-20 text-lg font-semibold">
      Connexion en cours...
    </div>
  );
}