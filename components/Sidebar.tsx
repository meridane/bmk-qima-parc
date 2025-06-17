'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menu = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Mes Photos', href: '/upload' },
    { name: 'Profil', href: '/profile' },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block
      `}
    >
      {/* Bouton fermer en mode mobile */}
      <div className="md:hidden flex justify-end p-2">
        <button onClick={() => setIsOpen(false)} className="text-2xl">✕</button>
      </div>

      <div className="p-4 flex items-center gap-2 border-b">
        <Image src="/logo.png" alt="BMK Logo" width={32} height={32} />
        <span className="font-bold text-lg">BMK Qima</span>
      </div>

      <nav className="flex flex-col mt-4">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`px-4 py-2 hover:bg-orange-100 ${
              pathname === item.href ? 'bg-orange-500 text-white font-semibold' : 'text-gray-700'
            }`}
            onClick={() => setIsOpen(false)} // Fermer sur clic mobile
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
