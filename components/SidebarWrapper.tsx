'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1">
        {/* Bouton burger en mobile */}
        <div className="p-4 md:hidden">
          <button onClick={() => setOpen(!open)} className="text-2xl">☰</button>
        </div>

        <div className="p-4 md:ml-64">{children}</div>
      </div>
    </div>
  );
}
