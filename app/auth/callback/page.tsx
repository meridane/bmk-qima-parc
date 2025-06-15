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

      const { data: userDetails } = await supabase
        .from('users')
        .select('role, is_approved')
        .eq('id', session.user.id)
        .single();

      if (!userDetails) {
        router.push('/login');
        return;
      }

      const { role, is_approved } = userDetails;

      if (!is_approved) {
        router.push('/waiting-validation');
      } else if (role === 'client') {
        router.push('/dashboard');
      } else if (['admin', 'superadmin', 'secroadmin'].includes(role)) {
        router.push('/admin/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleRedirect();
  }, [router]);

  return <p className="text-center mt-20">Connexion en cours...</p>;
}