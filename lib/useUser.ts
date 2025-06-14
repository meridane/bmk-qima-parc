'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';

export default function useUser() {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessionAndUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        setUser(null);
        setSession(null);
        setLoading(false);
        return;
      }

      setSession(session);

      // 🔽 Récupère les infos dans la table `users`
      const { data: userDetails, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userDetails && !userError) {
        setUser({ ...session.user, ...userDetails }); // fusion des données
      } else {
        setUser(session.user); // fallback
      }

      setLoading(false);
    };

    getSessionAndUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        getSessionAndUser(); // re-fetch
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, session, loading };
}