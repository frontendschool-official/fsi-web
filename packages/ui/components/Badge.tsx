'use client';

import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
}: BadgeProps) {
  const baseClasses =
    'inline-flex items-center font-medium transition-colors duration-200';

  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    primary:
      'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200',
    success:
      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    warning:
      'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  };

  const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${className}`;

  return <span className={classes}>{children}</span>;
}
