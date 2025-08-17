'use client';

import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'md',
  className = '',
}: DividerProps) {
  const baseClasses = 'border-gray-200 dark:border-gray-700';

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'border-t' : 'border-l',
    md: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    lg: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4',
  };

  const orientationClasses = {
    horizontal: 'w-full my-4',
    vertical: 'h-full mx-4 self-stretch',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${orientationClasses[orientation]} ${className}`;

  return <div className={classes} />;
}
