'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Mes Photos', href: '/upload' },
    { name: 'Profil', href: '/profile' },
  ];

  return (
    <aside className="h-screen bg-white shadow-lg w-60 fixed top-0 left-0 z-50 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <img src="/logo.png" alt="BMK Logo" className="w-32 mx-auto" />
      </div>
      <nav className="flex-1 p-4 space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-lg ${
              pathname === link.href
                ? 'bg-orange-600 text-white'
                : 'text-gray-700 hover:bg-orange-100'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
