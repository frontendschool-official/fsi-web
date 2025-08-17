'use client';

import { ButtonHTMLAttributes } from 'react';

export function Button({
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
