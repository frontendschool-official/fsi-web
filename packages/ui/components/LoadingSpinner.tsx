'use client';

import { useTheme } from './ThemeProvider';

interface LoadingSpinnerProps {
  className?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
}

export function LoadingSpinner({
  className = '',
  text,
  size = 'md',
  variant = 'spinner',
}: LoadingSpinnerProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  // Theme-aware color classes
  const primaryColor = 'border-primary-500 bg-primary-500';
  const textColor = 'text-gray-600 dark:text-gray-300';

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className='flex space-x-1'>
            <div
              className={`${sizeClasses[size]} ${primaryColor} rounded-full animate-bounce`}
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className={`${sizeClasses[size]} ${primaryColor} rounded-full animate-bounce`}
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className={`${sizeClasses[size]} ${primaryColor} rounded-full animate-bounce`}
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        );
      case 'pulse':
        return (
          <div
            className={`${sizeClasses[size]} ${primaryColor} rounded-full animate-pulse`}
          ></div>
        );
      default:
        return (
          <div
            className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 ${primaryColor} ${className}`}
          />
        );
    }
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
      {renderSpinner()}
      {text && <p className={`text-sm font-medium ${textColor}`}>{text}</p>}
    </div>
  );
}
