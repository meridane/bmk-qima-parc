'use client';

import useUser from '@/lib/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log('[DASHBOARD] Pas de session → redirection /login');
        router.push('/login');
      } else {
        console.log('[DASHBOARD] Utilisateur connecté:', user.email);
      }

      setInitialCheckDone(true);
    }
  }, [user, loading, router]);

  if (!initialCheckDone) {
    return <div className="p-6">Vérification de la session...</div>;
  }

  return (
    <SidebarWrapper>
      <div>
        <h1 className="text-2xl font-bold mb-4">Bienvenue, {user?.email}</h1>
        <p className="text-gray-700">Voici votre tableau de bord.</p>
      </div>
    </SidebarWrapper>
  );
}
