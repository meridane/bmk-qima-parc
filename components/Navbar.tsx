'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 pl-64 flex items-center justify-between px-6 fixed top-0 right-0 left-0 z-40">
      <h1 className="text-lg font-semibold">Espace Client</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Déconnexion
      </button>
    </header>
  );
}
