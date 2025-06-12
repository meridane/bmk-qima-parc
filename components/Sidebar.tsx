'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Mes Photos', href: '/upload' },
    { name: 'Profil', href: '/profile' },
  ];

  return (
    <aside className="w-64 h-full bg-white shadow-md fixed top-0 left-0 z-50 hidden md:block">
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
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
