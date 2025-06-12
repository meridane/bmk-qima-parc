import '../styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Gestion complète de vos conteneurs et véhicules.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main className="p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
