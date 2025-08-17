'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Typography } from './Typography';

interface ProblemCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'dsa' | 'machine-coding' | 'system-design';
  tags: string[];
  estimatedTime?: number; // in minutes
  isCompleted?: boolean;
  isBookmarked?: boolean;
  onStart?: (id: string) => void;
  onBookmark?: (id: string) => void;
  className?: string;
}

export function ProblemCard({
  id,
  title,
  description,
  difficulty,
  category,
  tags,
  estimatedTime,
  isCompleted = false,
  isBookmarked = false,
  onStart,
  onBookmark,
  className = '',
}: ProblemCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const categoryColors = {
    dsa: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'machine-coding':
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'system-design':
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };

  const categoryLabels = {
    dsa: 'DSA',
    'machine-coding': 'Machine Coding',
    'system-design': 'System Design',
  };

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-200 ${className}`}
    >
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center space-x-2 mb-2'>
              <Badge className={categoryColors[category]}>
                {categoryLabels[category]}
              </Badge>
              <Badge className={difficultyColors[difficulty]}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              {isCompleted && (
                <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'>
                  ✓ Completed
                </Badge>
              )}
            </div>
            <Typography variant='h3' className='text-lg font-semibold mb-2'>
              {title}
            </Typography>
          </div>
          <button
            onClick={() => onBookmark?.(id)}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <svg
              className='w-5 h-5'
              fill={isBookmarked ? 'currentColor' : 'none'}
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
              />
            </svg>
          </button>
        </div>

        {/* Description */}
        <Typography
          variant='body'
          className='text-gray-600 dark:text-gray-300 line-clamp-3'
        >
          {description}
        </Typography>

        {/* Tags */}
        {tags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className='px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md'
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className='px-2 py-1 text-xs text-gray-500 dark:text-gray-400'>
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className='flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400'>
            {estimatedTime && (
              <div className='flex items-center space-x-1'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>{estimatedTime} min</span>
              </div>
            )}
          </div>
          <Button
            variant={isCompleted ? 'secondary' : 'primary'}
            size='sm'
            onClick={() => onStart?.(id)}
          >
            {isCompleted ? 'Review' : 'Start Problem'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
