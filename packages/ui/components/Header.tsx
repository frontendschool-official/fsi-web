'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { Typography } from './Typography';

interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  isActive?: boolean;
}

interface HeaderProps {
  navigationItems?: NavigationItem[];
  onNavigationClick?: (item: NavigationItem) => void;
  className?: string;
  user?: {
    email?: string;
  } | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export function Header({
  navigationItems = [],
  onNavigationClick,
  className = '',
  user = null,
  onSignIn,
  onSignOut,
}: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigationClick = (item: NavigationItem) => {
    onNavigationClick?.(item);
    setIsDrawerOpen(false);
  };

  const defaultNavigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z'
          />
        </svg>
      ),
      isActive: true,
    },
    {
      id: 'problems',
      label: 'Problems',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
      ),
      badge: 95,
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      ),
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      ),
    },
  ];

  const items =
    navigationItems?.length > 0 ? navigationItems : defaultNavigationItems;

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 ${className}`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo and Mobile Menu Button */}
            <div className='flex items-center space-x-4'>
              {/* Mobile Menu Button */}
              <button
                onClick={toggleDrawer}
                className='lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className='flex items-center'>
                <h1 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100'>
                  <span className='lg:hidden'>FS</span>
                  <span className='hidden lg:inline'>Frontend School</span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-8'>
              {items?.map(item => (
                <button
                  key={item?.id}
                  onClick={() => handleNavigationClick(item)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item?.isActive
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item?.icon}
                  <span>{item?.label}</span>
                  {item?.badge && (
                    <span className='px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full'>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className='flex items-center space-x-3 sm:space-x-4'>
              <div className='scale-75 sm:scale-90 lg:scale-100'>
                <ThemeToggle />
              </div>

              {user ? (
                <div className='flex items-center space-x-2 sm:space-x-3'>
                  <span className='hidden sm:block text-sm text-gray-600 dark:text-gray-300'>
                    {user?.email}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={onSignOut}
                    className='text-xs sm:text-sm'
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onSignIn}
                  size='sm'
                  className='text-xs sm:text-sm'
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
            onClick={toggleDrawer}
          />

          {/* Drawer */}
          <div className='fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden'>
            <div className='flex flex-col h-full'>
              {/* Drawer Header */}
              <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
                <Typography variant='h3' className='text-lg font-semibold'>
                  Menu
                </Typography>
                <button
                  onClick={toggleDrawer}
                  className='p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                >
                  <svg
                    className='w-5 h-5'
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
              </div>

              {/* Navigation Items */}
              <nav className='flex-1 p-4 space-y-2'>
                {items?.map(item => (
                  <button
                    key={item?.id}
                    onClick={() => handleNavigationClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors touch-manipulation ${
                      item?.isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      {item?.icon}
                      <span className='font-medium'>{item?.label}</span>
                    </div>
                    {item?.badge && (
                      <span className='px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full'>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* User Info */}
              {user && (
                <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center'>
                      <span className='text-sm font-medium text-primary-600 dark:text-primary-400'>
                        {user?.email?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <Typography
                        variant='p'
                        className='text-sm font-medium truncate'
                      >
                        {user?.email}
                      </Typography>
                    </div>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={onSignOut}
                    className='w-full mt-3'
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
