// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirige automatiquement vers /login
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Redirection...
    </div>
  );
}
