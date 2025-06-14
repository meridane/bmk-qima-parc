'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function OAuthHandler() {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes('access_token') || hash.includes('code')) {
      supabase.auth.exchangeCodeForSession(window.location.href).then(async ({ data, error }) => {
        if (error) {
          console.error('OAuth Error:', error.message);
          return;
        }

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: userData } = await supabase
          .from('users')
          .select('role, superadmin, isConfirmed')
          .eq('email', user?.email)
          .single();

        if (userData?.superadmin || userData?.role === 'admin') {
          window.location.replace('/admin/dashboard');
        } else if (userData?.isConfirmed) {
          window.location.replace('/dashboard');
        } else {
          window.location.replace('/onboarding');
        }
      });
    }
  }, []);

  return null;
}