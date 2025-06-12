'use client';

import { ReactNode } from 'react';

type NavbarProps = {
  children?: ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="text-xl font-bold text-orange-600">BMK Qima</div>
      <div>{children}</div>
    </header>
  );
}
