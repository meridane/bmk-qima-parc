'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/voitures', label: 'Voitures' },
  { href: '/admin/conteneurs', label: 'Conteneurs' },
  { href: '/admin/finances', label: 'Finances' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/upload', label: 'Upload' },
  { href: '/admin/logs', label: 'Logs' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black text-white flex flex-col p-4 min-h-screen">
      <div className="text-center mb-8">
        <img src="/assets/logo.png" alt="BMK Logo" className="h-12 mx-auto" />
        <h2 className="mt-2 font-bold text-lg">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-4 py-2 rounded-lg ${
              pathname === href ? 'bg-orange-500 font-semibold' : 'hover:bg-gray-800'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

