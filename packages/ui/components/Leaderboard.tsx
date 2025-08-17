'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Typography } from './Typography';

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar?: string;
  score: number;
  problemsSolved: number;
  streak: number;
  isCurrentUser?: boolean;
  badges?: string[];
  lastActive?: string;
}

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
          <div className='w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold'>
            🥇
          </div>
        );
      case 2:
        return (
          <div className='w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold'>
            🥈
          </div>
        );
      case 3:
        return (
          <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold'>
            🥉
          </div>
        );
      default:
        return (
          <div className='w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-sm'>
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

  const displayedEntries = entries.slice(0, showTop);

  return (
    <Card className={className}>
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <Typography variant='h3' className='text-lg font-semibold'>
              {title}
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400'
            >
              {getTimeFrameLabel(timeFrame)}
            </Typography>
          </div>
          <Badge className='bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'>
            Top {showTop}
          </Badge>
        </div>

        {/* Leaderboard */}
        <div className='space-y-2'>
          {displayedEntries.map(entry => (
            <div
              key={entry.id}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                entry.isCurrentUser
                  ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {/* Rank */}
              <div className='flex-shrink-0'>{getRankIcon(entry.rank)}</div>

              {/* Avatar */}
              <div className='flex-shrink-0'>
                {entry.avatar ? (
                  <img
                    src={entry.avatar}
                    alt={entry.username}
                    className='w-10 h-10 rounded-full'
                  />
                ) : (
                  <div className='w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center'>
                    <span className='text-gray-600 dark:text-gray-400 font-medium'>
                      {entry.username.charAt(0).toUpperCase()}
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
                      entry.isCurrentUser
                        ? 'text-primary-700 dark:text-primary-300'
                        : ''
                    }`}
                  >
                    {entry.username}
                  </Typography>
                  {entry.isCurrentUser && (
                    <Badge className='bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs'>
                      You
                    </Badge>
                  )}
                </div>

                <div className='flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400'>
                  <span>{entry.problemsSolved} problems solved</span>
                  {entry.streak > 0 && (
                    <span className='flex items-center space-x-1'>
                      <span>🔥</span>
                      <span>{entry.streak} day streak</span>
                    </span>
                  )}
                </div>

                {/* Badges */}
                {entry.badges && entry.badges.length > 0 && (
                  <div className='flex items-center space-x-1 mt-1'>
                    {entry.badges.slice(0, 3).map((badge, index) => (
                      <span
                        key={index}
                        className='text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full'
                      >
                        {badge}
                      </span>
                    ))}
                    {entry.badges.length > 3 && (
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        +{entry.badges.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Score */}
              <div className='flex-shrink-0 text-right'>
                <Typography variant='p' className='font-bold text-lg'>
                  {entry.score.toLocaleString()}
                </Typography>
                <Typography
                  variant='p'
                  className='text-sm text-gray-600 dark:text-gray-400'
                >
                  points
                </Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {entries.length > showTop && (
          <div className='text-center pt-4 border-t border-gray-200 dark:border-gray-700'>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400'
            >
              Showing top {showTop} of {entries.length} participants
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
}
