'use client';

import { ReactNode } from 'react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow ${className}`}
    >
      {children}
    </div>
  );
}
