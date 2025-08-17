'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e?.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document?.addEventListener('keydown', handleEscape);
      document?.body?.style && (document.body.style.overflow = 'hidden');
    }

    return () => {
      document?.removeEventListener('keydown', handleEscape);
      document?.body?.style && (document.body.style.overflow = 'unset');
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e?.target === e?.currentTarget) {
      onClose?.();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-full items-center justify-center p-4 text-center'>
        {/* Backdrop */}
        <div
          className='fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50 transition-opacity'
          onClick={handleBackdropClick}
        />

        {/* Modal */}
        <div
          className={`relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all ${sizeClasses[size]} w-full ${className}`}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4'>
              {title && (
                <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className='rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400'
                >
                  <span className='sr-only'>Close</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className='px-6 py-4'>{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document?.body || document?.documentElement || document);
}
