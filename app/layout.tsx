'use client';

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Plateforme de gestion de conteneurs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const { error } = await supabase.auth.setSessionFromUrl({ storeSession: true });
        if (error) {
          console.error('Erreur lors de la récupération de la session via URL :', error.message);
        }

        // Redirection propre vers dashboard (ou login si nécessaire)
        window.location.replace('/dashboard');
      }
    };

    handleOAuthRedirect();
  }, []);

  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
