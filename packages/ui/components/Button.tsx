'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 dark:focus:ring-offset-gray-800 shadow-theme hover:shadow-theme-lg',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800',
    outline:
      'border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-primary-500 dark:focus:ring-offset-gray-800',
    ghost:
      'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-primary-500 dark:focus:ring-offset-gray-800',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
