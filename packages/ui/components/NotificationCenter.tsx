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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg
            className='w-5 h-5 text-green-500'
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
            className='w-5 h-5 text-blue-500'
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
            className='w-5 h-5 text-yellow-500'
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
            className='w-5 h-5 text-red-500'
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
            className='w-5 h-5 text-purple-500'
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

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors'
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
          <Badge className='absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center'>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className='absolute right-0 top-full mt-2 w-80 z-50'>
          <Card className='shadow-lg'>
            <div className='space-y-4'>
              {/* Header */}
              <div className='flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700'>
                <Typography variant='h4' className='font-semibold'>
                  Notifications
                </Typography>
                <div className='flex items-center space-x-2'>
                  {unreadCount > 0 && onMarkAllAsRead && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={onMarkAllAsRead}
                      className='text-xs'
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className='space-y-2 overflow-y-auto' style={{ maxHeight }}>
                {notifications.length === 0 ? (
                  <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-12 h-12 mx-auto mb-3 opacity-50'
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
                    <Typography variant='p' className='text-sm'>
                      No notifications yet
                    </Typography>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 transition-colors ${
                        notification.isRead
                          ? 'opacity-75'
                          : 'ring-2 ring-primary-200 dark:ring-primary-700'
                      } ${getTypeColor(notification.type)}`}
                    >
                      <div className='flex items-start space-x-3'>
                        <div className='flex-shrink-0 mt-0.5'>
                          {notification.icon || getTypeIcon(notification.type)}
                        </div>

                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between'>
                            <Typography
                              variant='p'
                              className='font-medium text-sm'
                            >
                              {notification.title}
                            </Typography>
                            <div className='flex items-center space-x-1'>
                              {!notification.isRead && onMarkAsRead && (
                                <button
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                >
                                  <svg
                                    className='w-3 h-3'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                                    <path
                                      fillRule='evenodd'
                                      d='M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  onClick={() => onDelete(notification.id)}
                                  className='p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                                >
                                  <svg
                                    className='w-3 h-3'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>

                          <Typography
                            variant='p'
                            className='text-sm text-gray-600 dark:text-gray-400 mt-1'
                          >
                            {notification.message}
                          </Typography>

                          <div className='flex items-center justify-between mt-2'>
                            <Typography
                              variant='span'
                              className='text-xs text-gray-500 dark:text-gray-400'
                            >
                              {formatTimestamp(notification.timestamp)}
                            </Typography>

                            {notification.action && (
                              <Button
                                variant='ghost'
                                size='sm'
                                onClick={notification.action.onClick}
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
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className='fixed inset-0 z-40' onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
