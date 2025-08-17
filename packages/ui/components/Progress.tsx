'use client';

import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  animated = false,
  className = '',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-primary-600 dark:bg-primary-500',
    primary: 'bg-primary-600 dark:bg-primary-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    error: 'bg-red-600 dark:bg-red-500',
  };

  const baseClasses =
    'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-200';
  const progressClasses = `${
    variantClasses[variant]
  } transition-all duration-300 ease-out ${animated ? 'animate-pulse' : ''}`;

  return (
    <div className={className}>
      {showLabel && (
        <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1'>
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`${baseClasses} ${sizeClasses[size]}`}>
        <div
          className={`${progressClasses} ${sizeClasses[size]} rounded-full`}
          style={{ width: `${percentage}%` }}
          role='progressbar'
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
