'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Typography } from './Typography';
import { Button } from './Button';

interface TestCase {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'error';
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  executionTime?: number; // in milliseconds
  memoryUsed?: number; // in MB
}

interface PerformanceMetrics {
  totalExecutionTime: number;
  averageExecutionTime: number;
  memoryUsage: number;
  timeComplexity?: string;
  spaceComplexity?: string;
}

interface TestResultsProps {
  testCases: TestCase[];
  performance: PerformanceMetrics;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  errorTests: number;
  onRetry?: () => void;
  onViewSolution?: () => void;
  className?: string;
}

export function TestResults({
  testCases,
  performance,
  totalTests,
  passedTests,
  failedTests,
  errorTests,
  onRetry,
  onViewSolution,
  className = '',
}: TestResultsProps) {
  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'error':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'failed':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'error':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        );
    }
  };

  const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

  return (
    <Card className={className}>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <Typography
              variant='h3'
              className='text-lg sm:text-xl font-semibold'
            >
              Test Results
            </Typography>
            <Typography
              variant='p'
              className='text-sm text-gray-600 dark:text-gray-400'
            >
              {passedTests} of {totalTests} tests passed
            </Typography>
          </div>

          <div className='flex items-center space-x-3'>
            <Badge
              className={`text-sm ${
                successRate >= 80
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : successRate >= 60
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}
            >
              {successRate.toFixed(1)}% Success
            </Badge>
          </div>
        </div>

        {/* Summary Stats */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
            <Typography variant='h4' className='text-green-600 dark:text-green-400'>
              {passedTests}
            </Typography>
            <Typography variant='p' className='text-sm text-green-600 dark:text-green-400'>
              Passed
            </Typography>
          </div>
          <div className='text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg'>
            <Typography variant='h4' className='text-red-600 dark:text-red-400'>
              {failedTests}
            </Typography>
            <Typography variant='p' className='text-sm text-red-600 dark:text-red-400'>
              Failed
            </Typography>
          </div>
          <div className='text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
            <Typography variant='h4' className='text-yellow-600 dark:text-yellow-400'>
              {errorTests}
            </Typography>
            <Typography variant='p' className='text-sm text-yellow-600 dark:text-yellow-400'>
              Errors
            </Typography>
          </div>
          <div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
            <Typography variant='h4' className='text-blue-600 dark:text-blue-400'>
              {performance?.totalExecutionTime?.toFixed(2) || '0'}ms
            </Typography>
            <Typography variant='p' className='text-sm text-blue-600 dark:text-blue-400'>
              Total Time
            </Typography>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className='space-y-4'>
          <Typography variant='h4' className='text-base font-semibold'>
            Performance Metrics
          </Typography>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
              <Typography variant='p' className='text-sm text-gray-600 dark:text-gray-400'>
                Average Time
              </Typography>
              <Typography variant='p' className='font-semibold'>
                {performance?.averageExecutionTime?.toFixed(2) || '0'}ms
              </Typography>
            </div>
            <div className='p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
              <Typography variant='p' className='text-sm text-gray-600 dark:text-gray-400'>
                Memory Usage
              </Typography>
              <Typography variant='p' className='font-semibold'>
                {performance?.memoryUsage?.toFixed(2) || '0'} MB
              </Typography>
            </div>
            <div className='p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
              <Typography variant='p' className='text-sm text-gray-600 dark:text-gray-400'>
                Time Complexity
              </Typography>
              <Typography variant='p' className='font-semibold'>
                {performance?.timeComplexity || 'N/A'}
              </Typography>
            </div>
            <div className='p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
              <Typography variant='p' className='text-sm text-gray-600 dark:text-gray-400'>
                Space Complexity
              </Typography>
              <Typography variant='p' className='font-semibold'>
                {performance?.spaceComplexity || 'N/A'}
              </Typography>
            </div>
          </div>
        </div>

        {/* Test Cases */}
        <div className='space-y-4'>
          <Typography variant='h4' className='text-base font-semibold'>
            Test Cases ({testCases?.length || 0})
          </Typography>
          <div className='space-y-3'>
            {testCases?.map((testCase, index) => (
              <div
                key={testCase?.id || index}
                className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg'
              >
                <div className='flex items-start justify-between gap-3 mb-3'>
                  <div className='flex items-center space-x-2'>
                    {getStatusIcon(testCase?.status)}
                    <Typography variant='p' className='font-medium'>
                      {testCase?.name}
                    </Typography>
                    <Badge className={getStatusColor(testCase?.status)}>
                      {testCase?.status}
                    </Badge>
                  </div>
                  {testCase?.executionTime && (
                    <Typography variant='p' className='text-sm text-gray-500 dark:text-gray-400'>
                      {testCase.executionTime}ms
                    </Typography>
                  )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                  <div>
                    <Typography variant='p' className='font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Input
                    </Typography>
                    <pre className='bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto'>
                      {testCase?.input}
                    </pre>
                  </div>
                  <div>
                    <Typography variant='p' className='font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Expected Output
                    </Typography>
                    <pre className='bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto'>
                      {testCase?.expectedOutput}
                    </pre>
                  </div>
                </div>

                {testCase?.actualOutput && (
                  <div className='mt-3'>
                    <Typography variant='p' className='font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Actual Output
                    </Typography>
                    <pre className='bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto'>
                      {testCase.actualOutput}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
          <Button
            onClick={onRetry}
            variant='outline'
            className='flex-1 sm:flex-none'
          >
            Retry Tests
          </Button>
          <Button
            onClick={onViewSolution}
            className='flex-1 sm:flex-none'
          >
            View Solution
          </Button>
        </div>
      </div>
    </Card>
  );
}
