'use client';

import React from 'react';
import { Card } from './Card';
import { Progress } from './Progress';
import { Typography } from './Typography';
import { Badge } from './Badge';

interface ProgressData {
  category: 'dsa' | 'machine-coding' | 'system-design';
  completed: number;
  total: number;
  streak?: number;
}

interface ProgressTrackerProps {
  progress: ProgressData[];
  totalCompleted: number;
  totalProblems: number;
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export function ProgressTracker({
  progress,
  totalCompleted,
  totalProblems,
  currentStreak,
  longestStreak,
  className = '',
}: ProgressTrackerProps) {
  const overallProgress =
    totalProblems > 0 ? (totalCompleted / totalProblems) * 100 : 0;

  const categoryColors = {
    dsa: 'bg-blue-500',
    'machine-coding': 'bg-purple-500',
    'system-design': 'bg-orange-500',
  };

  const categoryLabels = {
    dsa: 'DSA',
    'machine-coding': 'Machine Coding',
    'system-design': 'System Design',
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Progress */}
      <Card>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Typography variant='h3' className='text-lg font-semibold'>
              Overall Progress
            </Typography>
            <Badge className='bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'>
              {totalCompleted}/{totalProblems} completed
            </Badge>
          </div>

          <Progress
            value={overallProgress}
            className='h-3'
            variant={
              overallProgress >= 80
                ? 'success'
                : overallProgress >= 60
                ? 'warning'
                : 'error'
            }
          />

          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div className='text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <div className='text-2xl font-bold text-primary-600 dark:text-primary-400'>
                {currentStreak}
              </div>
              <div className='text-gray-600 dark:text-gray-400'>
                Current Streak
              </div>
            </div>
            <div className='text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <div className='text-2xl font-bold text-primary-600 dark:text-primary-400'>
                {longestStreak}
              </div>
              <div className='text-gray-600 dark:text-gray-400'>
                Longest Streak
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Progress */}
      <Card>
        <Typography variant='h3' className='text-lg font-semibold mb-4'>
          Progress by Category
        </Typography>

        <div className='space-y-4'>
          {progress.map(item => {
            const percentage =
              item.total > 0 ? (item.completed / item.total) * 100 : 0;

            return (
              <div key={item.category} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        categoryColors[item.category]
                      }`}
                    />
                    <Typography variant='p' className='font-medium'>
                      {categoryLabels[item.category]}
                    </Typography>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {item.streak && item.streak > 0 && (
                      <Badge className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs'>
                        🔥 {item.streak} day streak
                      </Badge>
                    )}
                    <Badge className='text-xs'>
                      {item.completed}/{item.total}
                    </Badge>
                  </div>
                </div>

                <Progress
                  value={percentage}
                  className='h-2'
                  variant='primary'
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievements Preview */}
      <Card>
        <Typography variant='h3' className='text-lg font-semibold mb-4'>
          Recent Achievements
        </Typography>

        <div className='space-y-3'>
          {currentStreak >= 7 && (
            <div className='flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
              <div className='text-2xl'>🔥</div>
              <div>
                <div className='font-medium'>Week Warrior</div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Maintained a 7-day streak
                </div>
              </div>
            </div>
          )}

          {overallProgress >= 50 && (
            <div className='flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <div className='text-2xl'>🎯</div>
              <div>
                <div className='font-medium'>Halfway There</div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Completed 50% of all problems
                </div>
              </div>
            </div>
          )}

          {totalCompleted >= 10 && (
            <div className='flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <div className='text-2xl'>🚀</div>
              <div>
                <div className='font-medium'>Getting Started</div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Completed your first 10 problems
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
