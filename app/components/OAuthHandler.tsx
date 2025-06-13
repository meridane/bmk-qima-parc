'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function OAuthHandler() {
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const hash = window.location.hash;
      if (hash.includes('access_token')) {
        const { error } = await supabase.auth.setSessionFromUrl({ storeSession: true });
        if (error) {
          console.error('Erreur Supabase OAuth:', error.message);
        }
        window.location.replace('/dashboard');
      }
    };

    handleOAuthRedirect();
  }, []);

  return null;
}
