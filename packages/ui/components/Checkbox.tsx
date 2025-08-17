'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, error, helperText, size = 'md', className = '', id, ...props },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const baseClasses = `${sizeClasses[size]} rounded border-gray-300 dark:border-gray-600 text-primary-600 dark:text-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`;

    const errorClasses = error
      ? 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
      : '';

    const checkboxClasses = `${baseClasses} ${errorClasses} ${className}`;

    return (
      <div className='w-full'>
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              ref={ref}
              id={checkboxId}
              type='checkbox'
              className={checkboxClasses}
              {...props}
            />
          </div>

          {label && (
            <div className='ml-3 text-sm'>
              <label
                htmlFor={checkboxId}
                className='font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none'
              >
                {label}
              </label>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className='mt-1 ml-8'>
            {error && (
              <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
            )}
            {helperText && !error && (
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
