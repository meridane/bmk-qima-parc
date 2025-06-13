import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import OAuthHandler from './components/OAuthHandler';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Plateforme de gestion de conteneurs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <OAuthHandler />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
