'use client';

import { ReactNode } from 'react';

type NavbarProps = {
  children?: ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="BMK Logo" className="h-10 w-auto" />
        <span className="ml-3 font-bold text-lg">BMK Qima Parc</span>
      </div>
      <div className="flex items-center">
        {children}
      </div>
    </header>
  );
}
