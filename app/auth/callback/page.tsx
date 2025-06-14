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

      // Récupération des infos depuis la table `users`
      const { data: userDetails, error: userError } = await supabase
        .from('users')
        .select('role, is_approved')
        .eq('id', userId)
        .single();

      if (userError || !userDetails) {
        router.push('/login');
        return;
      }

      const { role, is_approved } = userDetails;

      if (!is_approved) {
        router.push('/waiting-validation');
      } else if (role === 'client') {
        router.push('/dashboard');
      } else {
        router.push('/admin/dashboard');
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