'use client';

import { ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3">
      <div>{children}</div>
      <div className="font-semibold text-gray-800">BMK Qima Client</div>
    </header>
  );
}
