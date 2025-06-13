'use client';

import Providers from './providers';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Plateforme de gestion de conteneurs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialise Supabase pour que les cookies soient bien pris en compte
    createBrowserSupabaseClient();
  }, []);

  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
