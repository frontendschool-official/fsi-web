'use client';

import React, { useState } from 'react';
import { Typography } from './Typography';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
  isActive?: boolean;
}

interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
  isCollapsible?: boolean;
  isCollapsed?: boolean;
}

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
    const isActive = item.isActive;
    const hasChildren = item.children && item.children.length > 0;
    const paddingLeft = level * 16;

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={`w-full flex items-center justify-between px-4 py-2 text-left transition-colors duration-200 rounded-md ${
            isActive
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          } ${variant === 'compact' ? 'py-1.5' : 'py-2'}`}
          style={{ paddingLeft: `${paddingLeft + 16}px` }}
        >
          <div className='flex items-center space-x-3 min-w-0 flex-1'>
            {item.icon && (
              <div className='flex-shrink-0 w-5 h-5'>{item.icon}</div>
            )}
            <Typography
              variant='span'
              className={`truncate ${variant === 'compact' ? 'text-sm' : ''}`}
            >
              {item.label}
            </Typography>
          </div>
          {item.badge && (
            <span className='flex-shrink-0 ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full'>
              {item.badge}
            </span>
          )}
        </button>

        {hasChildren && (
          <div className='ml-4'>
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className='p-4'>
        {sections.map(section => {
          const isCollapsed = collapsedSections.has(section.id);
          const isCollapsible = section.isCollapsible !== false;

          return (
            <div key={section.id} className='mb-6'>
              <div className='flex items-center justify-between mb-3'>
                <Typography
                  variant='h4'
                  className={`font-semibold text-gray-900 dark:text-gray-100 ${
                    variant === 'compact' ? 'text-sm' : 'text-base'
                  }`}
                >
                  {section.title}
                </Typography>
                {isCollapsible && (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className='p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                  >
                    <svg
                      className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
                        isCollapsed ? 'rotate-90' : ''
                      }`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                )}
              </div>

              {!isCollapsed && (
                <div className='space-y-1'>
                  {section.items.map(item => renderItem(item))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
