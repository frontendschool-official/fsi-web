'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Typography } from './Typography';
import { LeaderboardEntry } from '@config/types/types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
  timeFrame?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  showTop?: number;
  className?: string;
}

export function Leaderboard({
  entries,
  title = 'Leaderboard',
  timeFrame = 'all-time',
  showTop = 10,
  className = '',
}: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className='w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base'>
            🥇
          </div>
        );
      case 2:
        return (
          <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base'>
            🥈
          </div>
        );
      case 3:
        return (
          <div className='w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base'>
            🥉
          </div>
        );
      default:
        return (
          <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm'>
            {rank}
          </div>
        );
    }
  };

  const getTimeFrameLabel = (timeFrame: string) => {
    switch (timeFrame) {
      case 'daily':
        return 'Today';
      case 'weekly':
        return 'This Week';
      case 'monthly':
        return 'This Month';
      case 'all-time':
        return 'All Time';
      default:
        return 'All Time';
    }
  };

  const displayedEntries = entries?.slice(0, showTop);

  return (
    <Card className={className}>
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
          <div>
            <Typography
              variant='h3'
              className='text-base sm:text-lg font-semibold'
            >
              {title}
            </Typography>
            <Typography
              variant='p'
              className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'
            >
              {getTimeFrameLabel(timeFrame)}
            </Typography>
          </div>

          <div className='flex items-center space-x-2'>
            <Badge className='bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs'>
              {displayedEntries?.length || 0} participants
            </Badge>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className='space-y-2'>
          {displayedEntries?.map((entry, index) => (
            <div
              key={entry?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                entry?.isCurrentUser
                  ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              {/* Rank */}
              <div className='flex-shrink-0'>{getRankIcon(entry?.rank)}</div>

              {/* Avatar */}
              <div className='flex-shrink-0'>
                {entry?.avatar ? (
                  <img
                    src={entry.avatar}
                    alt={entry?.username}
                    className='w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center'>
                    <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                      {entry?.username?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center space-x-2'>
                  <Typography
                    variant='p'
                    className={`font-medium truncate ${
                      entry?.isCurrentUser
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {entry?.username}
                  </Typography>
                  {entry?.isCurrentUser && (
                    <Badge className='bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs'>
                      You
                    </Badge>
                  )}
                </div>
                <div className='flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400'>
                  <span>{entry?.problemsSolved} problems solved</span>
                  <span>{entry?.streak} day streak</span>
                </div>
              </div>

              {/* Score */}
              <div className='flex-shrink-0 text-right'>
                <Typography
                  variant='p'
                  className='font-bold text-lg text-gray-900 dark:text-gray-100'
                >
                  {entry?.score?.toLocaleString()}
                </Typography>
                <Typography
                  variant='p'
                  className='text-xs text-gray-500 dark:text-gray-400'
                >
                  points
                </Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!displayedEntries || displayedEntries.length === 0) && (
          <div className='text-center py-8'>
            <Typography
              variant='p'
              className='text-gray-500 dark:text-gray-400'
            >
              No participants yet
            </Typography>
          </div>
        )}

        {/* Footer */}
        {displayedEntries && displayedEntries.length > 0 && (
          <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
            <Typography
              variant='p'
              className='text-xs text-gray-500 dark:text-gray-400 text-center'
            >
              Showing top {displayedEntries.length} of {entries?.length || 0}{' '}
              participants
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
}
