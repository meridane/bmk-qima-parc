'use client';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

type SidebarWrapperProps = {
  children: ReactNode;
};

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar visible en md+ ou toggleable en mobile */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1">
        <Navbar>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-2xl px-4 py-2"
          >
            ☰
          </button>
        </Navbar>

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
