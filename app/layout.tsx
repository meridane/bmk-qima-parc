import '../styles/globals.css';
import { Inter } from 'next/font/google';
import SidebarWrapper from './components/SidebarWrapper';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Application de gestion des chargements de conteneurs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionProvider>
          <SidebarWrapper>{children}</SidebarWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
