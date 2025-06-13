'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      } else {
        setUser(data.session.user);
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading || !user) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <SidebarWrapper>
      <div>
        <h1 className="text-2xl font-bold mb-4">Bienvenue, {user.email}</h1>
        <p className="text-gray-700">Voici votre tableau de bord.</p>
      </div>
    </SidebarWrapper>
  );
}
