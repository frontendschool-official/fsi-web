'use client';

import React, { ReactNode, useState } from 'react';
import { AccordionItem } from '@config/typings/types';

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  variant?: 'default' | 'bordered' | 'separated';
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default',
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev?.includes(itemId)
          ? prev?.filter(id => id !== itemId)
          : [...(prev || []), itemId]
      );
    } else {
      setOpenItems(prev => (prev?.includes(itemId) ? [] : [itemId]));
    }
  };

  const isOpen = (itemId: string) => openItems?.includes(itemId);

  const variantClasses = {
    default: {
      container: 'space-y-2',
      item: 'border border-gray-200 dark:border-gray-700 rounded-lg',
      header: 'px-4 py-3',
      content: 'px-4 pb-3',
    },
    bordered: {
      container:
        'border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700',
      item: '',
      header: 'px-4 py-3',
      content: 'px-4 pb-3',
    },
    separated: {
      container: 'space-y-4',
      item: 'border border-gray-200 dark:border-gray-700 rounded-lg',
      header: 'px-4 py-3',
      content: 'px-4 pb-3',
    },
  };

  const baseClasses =
    'w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400';

  return (
    <div className={`${variantClasses[variant]?.container} ${className}`}>
      {items?.map(item => {
        const itemOpen = isOpen(item?.id);
        const isDisabled = item?.disabled;

        const headerClasses = `${baseClasses} ${
          variantClasses[variant]?.header
        } ${
          itemOpen
            ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

        return (
          <div key={item?.id} className={variantClasses[variant]?.item}>
            <button
              onClick={() => !isDisabled && toggleItem(item?.id)}
              disabled={isDisabled}
              className={headerClasses}
            >
              <div className='flex items-center justify-between'>
                <div className='font-medium'>{item?.title}</div>
                <svg
                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    itemOpen ? 'rotate-180' : ''
                  }`}
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
            </button>

            {itemOpen && (
              <div className={variantClasses[variant]?.content}>
                <div className='text-gray-600 dark:text-gray-400'>
                  {item?.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
