'use client';

import useUser from '@/lib/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
