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
      className={`rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-theme transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
