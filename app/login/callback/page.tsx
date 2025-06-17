'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Erreur de session Supabase:', error.message);
        router.push('/login');
        return;
      }

      const user = session?.user;
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: userData } = await supabase
        .from('utilisateurs')
        .select('role, is_approved, superadmin, secroadmin')
        .eq('id', user.id)
        .single();

      const role = userData?.role;
      const isApproved = userData?.is_approved;
      const isSuperadmin = userData?.superadmin;
      const isSecroadmin = userData?.secroadmin;

      if (!isApproved && !isSuperadmin) {
        router.push('/onboarding');
        return;
      }

      if (isSuperadmin || isSecroadmin || role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    };

    handleRedirect();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Connexion en cours...
    </div>
  );
}