// app/layout.tsx
import '@/styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Gestion complète de vos conteneurs et véhicules.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
