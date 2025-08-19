'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Typography } from './Typography';
import { RoundType } from '../../config/typings/companies.types';
import { ProblemDifficulty } from '../../config/typings/types';

interface ProblemCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  category: RoundType;
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
    DSA: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    MachineCoding:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    SystemDesign:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    FrontendCore:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Behavioral:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    BarRaiser:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    HiringManager:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    CodingPair:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    TakeHome:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };

  const categoryLabels = {
    DSA: 'DSA',
    MachineCoding: 'Machine Coding',
    SystemDesign: 'System Design',
    FrontendCore: 'Frontend Core',
    Behavioral: 'Behavioral',
    BarRaiser: 'Bar Raiser',
    HiringManager: 'Hiring Manager',
    CodingPair: 'Coding Pair',
    TakeHome: 'Take Home',
  };

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-200 active:scale-95 ${className}`}
    >
      <div className='space-y-3 sm:space-y-4'>
        {/* Header */}
        <div className='flex items-start justify-between gap-3'>
          <div className='flex-1 min-w-0'>
            <div className='flex flex-wrap items-center gap-1 sm:gap-2 mb-2'>
              <Badge
                className={`${
                  categoryColors?.[category] ?? ''
                } text-xs px-2 py-1`}
              >
                {categoryLabels?.[category] ?? category}
              </Badge>
              <Badge
                className={`${
                  difficultyColors?.[difficulty] ?? ''
                } text-xs px-2 py-1`}
              >
                {difficulty?.charAt(0)?.toUpperCase() + difficulty?.slice(1)}
              </Badge>
              {isCompleted && (
                <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1'>
                  ✓ Completed
                </Badge>
              )}
            </div>
            <Typography
              variant='h3'
              className='text-base sm:text-lg font-semibold mb-2 line-clamp-2'
            >
              {title}
            </Typography>
          </div>
          <button
            onClick={() => onBookmark?.(id)}
            className={`p-2 rounded-full transition-colors flex-shrink-0 touch-manipulation ${
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
          variant='p'
          className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3'
        >
          {description}
        </Typography>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className='px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md'
              >
                {tag}
              </span>
            ))}
            {tags?.length > 3 && (
              <span className='px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md'>
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className='flex items-center justify-between pt-2'>
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
            onClick={() => onStart?.(id)}
            size='sm'
            className='text-xs sm:text-sm'
          >
            {isCompleted ? 'Review' : 'Start'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
