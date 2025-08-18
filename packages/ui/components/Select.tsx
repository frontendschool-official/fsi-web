'use client';

import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { SelectOption } from '@config/typings/types';

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      options,
      placeholder,
      onChange,
      className = '',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed appearance-none';

    const variantClasses = {
      default:
        'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      filled:
        'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
      outline:
        'border-2 border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-md',
      lg: 'px-4 py-3 text-base rounded-lg',
    };

    const errorClasses = error
      ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
      : '';

    const selectClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${className}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e?.target?.value || '');
      }
    };

    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={selectId}
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {label}
          </label>
        )}

        <div className='relative'>
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            value={value}
            onChange={handleChange}
            {...props}
          >
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options?.map(option => (
              <option
                key={option?.value}
                value={option?.value}
                disabled={option?.disabled}
              >
                {option?.label}
              </option>
            ))}
          </select>

          {/* Custom arrow icon */}
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <svg
              className='h-4 w-4 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>

        {error && (
          <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{error}</p>
        )}

        {helperText && !error && (
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
