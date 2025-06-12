'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-gray-800">BMK Admin</h1>
      <button
        onClick={handleLogout}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
      >
        Déconnexion
      </button>
    </header>
  );
}

