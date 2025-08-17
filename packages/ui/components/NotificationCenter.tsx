'use client';

import React, { useState } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Typography } from './Typography';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  maxHeight?: string;
  className?: string;
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  maxHeight = '400px',
  className = '',
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length || 0;

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg
            className='w-4 h-4 sm:w-5 sm:h-5 text-green-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'info':
        return (
          <svg
            className='w-4 h-4 sm:w-5 sm:h-5 text-blue-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className='w-4 h-4 sm:w-5 sm:h-5 text-red-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'achievement':
        return (
          <svg
            className='w-4 h-4 sm:w-5 sm:h-5 text-purple-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'error':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'achievement':
        return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (id: string) => {
    onMarkAsRead?.(id);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead?.();
  };

  const handleDelete = (id: string) => {
    onDelete?.(id);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={toggleDropdown}
        className='relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
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
            d='M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 006 6h3a6 6 0 006-6V9.75a6 6 0 00-6-6h-3z'
          />
        </svg>
        {unreadCount > 0 && (
          <Badge className='absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center'>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40'
            onClick={toggleDropdown}
          />

          {/* Dropdown Content */}
          <Card className='absolute right-0 mt-2 w-80 sm:w-96 z-50 shadow-xl border border-gray-200 dark:border-gray-700'>
            <div className='p-4'>
              {/* Header */}
              <div className='flex items-center justify-between mb-4'>
                <Typography variant='h4' className='text-base font-semibold'>
                  Notifications
                </Typography>
                <div className='flex items-center space-x-2'>
                  {unreadCount > 0 && (
                    <Button
                      onClick={handleMarkAllAsRead}
                      variant='outline'
                      size='sm'
                      className='text-xs'
                    >
                      Mark all read
                    </Button>
                  )}
                  <button
                    onClick={toggleDropdown}
                    className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div
                className='space-y-2 max-h-96 overflow-y-auto'
                style={{ maxHeight }}
              >
                {notifications?.length > 0 ? (
                  notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-3 rounded-lg border-l-4 transition-colors ${
                        notification?.isRead
                          ? 'bg-white dark:bg-gray-800 border-l-gray-300 dark:border-l-gray-600'
                          : getTypeColor(notification?.type)
                      }`}
                    >
                      <div className='flex items-start space-x-3'>
                        <div className='flex-shrink-0 mt-0.5'>
                          {notification?.icon || getTypeIcon(notification?.type)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between'>
                            <Typography
                              variant='p'
                              className={`font-medium text-sm ${
                                notification?.isRead
                                  ? 'text-gray-600 dark:text-gray-400'
                                  : 'text-gray-900 dark:text-gray-100'
                              }`}
                            >
                              {notification?.title}
                            </Typography>
                            <div className='flex items-center space-x-1 ml-2'>
                              {!notification?.isRead && (
                                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                              )}
                              <button
                                onClick={() => handleDelete(notification?.id)}
                                className='p-1 text-gray-400 hover:text-red-500 transition-colors'
                              >
                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <Typography
                            variant='p'
                            className='text-sm text-gray-600 dark:text-gray-400 mt-1'
                          >
                            {notification?.message}
                          </Typography>
                          <div className='flex items-center justify-between mt-2'>
                            <Typography
                              variant='p'
                              className='text-xs text-gray-500 dark:text-gray-400'
                            >
                              {formatTimestamp(notification?.timestamp)}
                            </Typography>
                            {notification?.action && (
                              <Button
                                onClick={notification.action.onClick}
                                variant='outline'
                                size='sm'
                                className='text-xs'
                              >
                                {notification.action.label}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-8'>
                    <Typography variant='p' className='text-gray-500 dark:text-gray-400'>
                      No notifications
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
