// app/layout.tsx

import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Suivi client et chargement conteneur.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
