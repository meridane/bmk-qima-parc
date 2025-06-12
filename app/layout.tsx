// app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Gestion complète de vos conteneurs et véhicules.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';

  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        {!isLoginPage && (
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Navbar />
              <main className="p-4">{children}</main>
            </div>
          </div>
        )}
        {isLoginPage && children}
      </body>
    </html>
  );
}
