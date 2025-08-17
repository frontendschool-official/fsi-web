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
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Overall Progress */}
      <Card>
        <div className='space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <Typography
              variant='h3'
              className='text-base sm:text-lg font-semibold'
            >
              Overall Progress
            </Typography>
            <Badge className='bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs sm:text-sm'>
              {totalCompleted}/{totalProblems} completed
            </Badge>
          </div>

          <Progress
            value={overallProgress}
            className='h-2 sm:h-3'
            variant={
              overallProgress >= 80
                ? 'success'
                : overallProgress >= 60
                ? 'warning'
                : 'error'
            }
          />

          <div className='grid grid-cols-2 gap-3 sm:gap-4 text-sm'>
            <div className='text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <div className='text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400'>
                {currentStreak}
              </div>
              <div className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm'>
                Current Streak
              </div>
            </div>
            <div className='text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <div className='text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400'>
                {longestStreak}
              </div>
              <div className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm'>
                Longest Streak
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Progress */}
      <Card>
        <Typography
          variant='h3'
          className='text-base sm:text-lg font-semibold mb-4'
        >
          Category Progress
        </Typography>

        <div className='space-y-4'>
          {progress?.map((categoryProgress, index) => {
            const percentage =
              categoryProgress?.total > 0
                ? (categoryProgress?.completed / categoryProgress?.total) * 100
                : 0;

            return (
              <div key={categoryProgress?.category || index} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div
                      className={`w-3 h-3 rounded-full ${categoryColors[categoryProgress?.category]}`}
                    />
                    <Typography
                      variant='p'
                      className='font-medium text-sm sm:text-base'
                    >
                      {categoryLabels[categoryProgress?.category]}
                    </Typography>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Typography
                      variant='p'
                      className='text-sm text-gray-600 dark:text-gray-400'
                    >
                      {categoryProgress?.completed}/{categoryProgress?.total}
                    </Typography>
                    <Badge
                      className={`text-xs ${
                        percentage >= 80
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : percentage >= 60
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : percentage >= 40
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {percentage.toFixed(1)}%
                    </Badge>
                  </div>
                </div>

                <Progress
                  value={percentage}
                  className='h-2'
                  variant={
                    percentage >= 80
                      ? 'success'
                      : percentage >= 60
                      ? 'warning'
                      : 'error'
                  }
                />

                {categoryProgress?.streak && categoryProgress.streak > 0 && (
                  <div className='flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400'>
                    <span>🔥</span>
                    <span>{categoryProgress.streak} day streak</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {(!progress || progress.length === 0) && (
          <div className='text-center py-8'>
            <Typography
              variant='p'
              className='text-gray-500 dark:text-gray-400'
            >
              No progress data available
            </Typography>
          </div>
        )}
      </Card>

      {/* Achievements */}
      <Card>
        <Typography
          variant='h3'
          className='text-base sm:text-lg font-semibold mb-4'
        >
          Recent Achievements
        </Typography>

        <div className='space-y-3'>
          {overallProgress >= 25 && (
            <div className='flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm'>🎯</span>
              </div>
              <div>
                <Typography variant='p' className='font-medium text-sm'>
                  Getting Started
                </Typography>
                <Typography variant='p' className='text-xs text-gray-600 dark:text-gray-400'>
                  Completed 25% of problems
                </Typography>
              </div>
            </div>
          )}

          {overallProgress >= 50 && (
            <div className='flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm'>🚀</span>
              </div>
              <div>
                <Typography variant='p' className='font-medium text-sm'>
                  Halfway There
                </Typography>
                <Typography variant='p' className='text-xs text-gray-600 dark:text-gray-400'>
                  Completed 50% of problems
                </Typography>
              </div>
            </div>
          )}

          {overallProgress >= 75 && (
            <div className='flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
              <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm'>🏆</span>
              </div>
              <div>
                <Typography variant='p' className='font-medium text-sm'>
                  Almost There
                </Typography>
                <Typography variant='p' className='text-xs text-gray-600 dark:text-gray-400'>
                  Completed 75% of problems
                </Typography>
              </div>
            </div>
          )}

          {overallProgress >= 100 && (
            <div className='flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
              <div className='w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm'>👑</span>
              </div>
              <div>
                <Typography variant='p' className='font-medium text-sm'>
                  Master
                </Typography>
                <Typography variant='p' className='text-xs text-gray-600 dark:text-gray-400'>
                  Completed all problems
                </Typography>
              </div>
            </div>
          )}

          {currentStreak >= 7 && (
            <div className='flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg'>
              <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm'>🔥</span>
              </div>
              <div>
                <Typography variant='p' className='font-medium text-sm'>
                  Week Warrior
                </Typography>
                <Typography variant='p' className='text-xs text-gray-600 dark:text-gray-400'>
                  7-day streak achieved
                </Typography>
              </div>
            </div>
          )}

          {currentStreak >= 30 && (
            <div className='flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg'>
              <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm'>⚡</span>
              </div>
              <div>
                <Typography variant='p' className='font-medium text-sm'>
                  Consistency King
                </Typography>
                <Typography variant='p' className='text-xs text-gray-600 dark:text-gray-400'>
                  30-day streak achieved
                </Typography>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
