'use client';

import React, { ReactNode, useState } from 'react';

interface Tab {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  variant = 'default',
  orientation = 'horizontal',
  className = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs?.[0]?.id || '');

  const baseClasses =
    'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ';

  const variantClasses = {
    default: {
      tab: 'px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
      active:
        'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400',
      inactive: 'text-gray-500 dark:text-gray-400',
    },
    pills: {
      tab: 'px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700',
      active:
        'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300',
      inactive: 'text-gray-600 dark:text-gray-400',
    },
    underline: {
      tab: 'px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300',
      active:
        'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400',
      inactive: 'text-gray-500 dark:text-gray-400',
    },
  };

  const orientationClasses = {
    horizontal: 'flex space-x-8 border-b border-gray-200 dark:border-gray-700',
    vertical: 'flex flex-col space-y-1',
  };

  const contentClasses = {
    horizontal: 'mt-4',
    vertical: 'ml-4',
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const activeTabContent = tabs?.find(tab => tab?.id === activeTab)?.content;

  return (
    <div className={className}>
      <div className={orientationClasses[orientation]}>
        {tabs?.map(tab => {
          const isActive = tab?.id === activeTab;
          const isDisabled = tab?.disabled;

          const tabClasses = `${baseClasses} ${variantClasses[variant]?.tab} ${
            isActive
              ? variantClasses[variant]?.active
              : variantClasses[variant]?.inactive
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

          return (
            <button
              key={tab?.id}
              onClick={() => !isDisabled && handleTabClick(tab?.id)}
              disabled={isDisabled}
              className={tabClasses}
            >
              {tab?.label}
            </button>
          );
        })}
      </div>

      <div className={contentClasses[orientation]}>{activeTabContent}</div>
    </div>
  );
}
