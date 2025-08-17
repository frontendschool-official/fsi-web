'use client';

import React, { ReactNode, HTMLAttributes } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Typography({
  children,
  variant = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default',
  className = '',
  ...props
}: TypographyProps) {
  const baseClasses = 'transition-colors duration-200';

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const colorClasses = {
    default: 'text-gray-900 dark:text-gray-100',
    muted: 'text-gray-600 dark:text-gray-400',
    primary: 'text-primary-600 dark:text-primary-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
  };

  const variantClasses = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-bold tracking-tight',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    p: 'leading-relaxed',
    span: '',
    div: '',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${variantClasses[variant]} ${className}`;

  const renderComponent = () => {
    switch (variant) {
      case 'h1':
        return (
          <h1 className={classes} {...props}>
            {children}
          </h1>
        );
      case 'h2':
        return (
          <h2 className={classes} {...props}>
            {children}
          </h2>
        );
      case 'h3':
        return (
          <h3 className={classes} {...props}>
            {children}
          </h3>
        );
      case 'h4':
        return (
          <h4 className={classes} {...props}>
            {children}
          </h4>
        );
      case 'h5':
        return (
          <h5 className={classes} {...props}>
            {children}
          </h5>
        );
      case 'h6':
        return (
          <h6 className={classes} {...props}>
            {children}
          </h6>
        );
      case 'p':
        return (
          <p className={classes} {...props}>
            {children}
          </p>
        );
      case 'span':
        return (
          <span className={classes} {...props}>
            {children}
          </span>
        );
      case 'div':
        return (
          <div className={classes} {...props}>
            {children}
          </div>
        );
      default:
        return (
          <p className={classes} {...props}>
            {children}
          </p>
        );
    }
  };

  return renderComponent();
}

// Convenience components for common use cases
export function H1({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='h1' {...props}>
      {children}
    </Typography>
  );
}

export function H2({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='h2' {...props}>
      {children}
    </Typography>
  );
}

export function H3({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='h3' {...props}>
      {children}
    </Typography>
  );
}

export function H4({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='h4' {...props}>
      {children}
    </Typography>
  );
}

export function H5({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='h5' {...props}>
      {children}
    </Typography>
  );
}

export function H6({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='h6' {...props}>
      {children}
    </Typography>
  );
}

export function P({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='p' {...props}>
      {children}
    </Typography>
  );
}

export function Text({ children, ...props }: Omit<TypographyProps, 'variant'>) {
  return (
    <Typography variant='span' {...props}>
      {children}
    </Typography>
  );
}
