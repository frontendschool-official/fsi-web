'use client';

import React, { useState } from 'react';
import { Typography } from './Typography';
import { SidebarItem, SidebarSection } from '@config/types/types';

interface SidebarProps {
  sections: SidebarSection[];
  onItemClick?: (item: SidebarItem) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export function Sidebar({
  sections,
  onItemClick,
  className = '',
  variant = 'default',
}: SidebarProps) {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const handleItemClick = (item: SidebarItem) => {
    onItemClick?.(item);
  };

  const renderItem = (item: SidebarItem, level: number = 0) => {
    const isActive = item?.isActive;
    const hasChildren = item?.children && item.children.length > 0;
    const paddingLeft = level * 16;

    return (
      <div key={item?.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2 text-left transition-colors duration-200 rounded-md touch-manipulation ${
            isActive
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600'
          } ${variant === 'compact' ? 'py-1.5' : 'py-2'}`}
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
        >
          <div className='flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1'>
            {item?.icon && (
              <div className='flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5'>
                {item.icon}
              </div>
            )}
            <Typography
              variant='span'
              className={`truncate text-sm sm:text-base ${
                variant === 'compact' ? 'text-sm' : ''
              }`}
            >
              {item?.label}
            </Typography>
          </div>
          {item?.badge && (
            <span className='flex-shrink-0 ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full'>
              {item.badge}
            </span>
          )}
        </button>

        {hasChildren && (
          <div className='ml-2 sm:ml-4'>
            {item?.children?.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto ${className}`}
    >
      <div className='p-4 space-y-6'>
        {sections?.map(section => {
          const isCollapsed = collapsedSections.has(section?.id);
          const hasItems = section?.items && section.items.length > 0;

          return (
            <div key={section?.id} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Typography
                  variant='h4'
                  className='text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide'
                >
                  {section?.title}
                </Typography>
                {section?.isCollapsible && hasItems && (
                  <button
                    onClick={() => toggleSection(section?.id)}
                    className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isCollapsed ? 'rotate-0' : 'rotate-180'
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
                  </button>
                )}
              </div>

              {(!section?.isCollapsible || !isCollapsed) && hasItems && (
                <div className='space-y-1'>
                  {section?.items?.map(item => renderItem(item))}
                </div>
              )}

              {(!section?.isCollapsible || !isCollapsed) && !hasItems && (
                <div className='text-center py-4'>
                  <Typography
                    variant='p'
                    className='text-sm text-gray-500 dark:text-gray-400'
                  >
                    No items
                  </Typography>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
