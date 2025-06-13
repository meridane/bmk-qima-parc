'use client';

import useUser from '@/lib/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [waited, setWaited] = useState(false);

  // Petit délai pour laisser Supabase hydrater la session après redirection
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWaited(true);
    }, 300); // 300ms suffisent souvent

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading && waited && !user) {
      router.push('/login');
    }
  }, [user, loading, waited, router]);

  if (loading || !user || !waited) {
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
