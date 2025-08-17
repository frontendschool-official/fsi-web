'use client';

import React, { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical';

    const variantClasses = {
      default:
        'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      filled:
        'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      outline:
        'border-2 border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm rounded-md min-h-[80px]',
      md: 'px-4 py-3 text-sm rounded-md min-h-[100px]',
      lg: 'px-4 py-3 text-base rounded-lg min-h-[120px]',
    };

    const errorClasses = error
      ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
      : '';

    const textareaClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${className}`;

    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={textareaId}
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          {...props}
        />

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

Textarea.displayName = 'Textarea';
