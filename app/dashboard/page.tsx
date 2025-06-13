'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/lib/useUser';
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
    return <div className="text-center mt-20 text-lg font-semibold">Chargement...</div>;
  }

  return (
    <SidebarWrapper>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Bienvenue dans le Dashboard</h1>
      </div>
    </SidebarWrapper>
  );
}
