'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      default:
        'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      filled:
        'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      outline:
        'border-2 border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-md',
      lg: 'px-4 py-3 text-base rounded-lg',
    };

    const errorClasses = error
      ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
      : '';

    const iconClasses = {
      left: leftIcon ? 'pl-10' : '',
      right: rightIcon ? 'pr-10' : '',
    };

    const inputClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${iconClasses.left} ${iconClasses.right} ${className}`;

    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {label}
          </label>
        )}

        <div className='relative'>
          {leftIcon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <div className='h-5 w-5 text-gray-400 dark:text-gray-500'>
                {leftIcon}
              </div>
            </div>
          )}

          <input ref={ref} id={inputId} className={inputClasses} {...props} />

          {rightIcon && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <div className='h-5 w-5 text-gray-400 dark:text-gray-500'>
                {rightIcon}
              </div>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className='mt-1'>
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

Input.displayName = 'Input';
