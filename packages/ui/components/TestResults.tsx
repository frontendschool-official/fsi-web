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
    <div className={`space-y-6 ${className}`}>
      {/* Summary */}
      <Card>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Typography variant='h3' className='text-lg font-semibold'>
              Test Results
            </Typography>
            <div className='flex items-center space-x-2'>
              <Badge
                className={
                  successRate === 100
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }
              >
                {successRate.toFixed(1)}% Success
              </Badge>
            </div>
          </div>

          <div className='grid grid-cols-4 gap-4'>
            <div className='text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {totalTests}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Total Tests
              </div>
            </div>
            <div className='text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                {passedTests}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Passed
              </div>
            </div>
            <div className='text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg'>
              <div className='text-2xl font-bold text-red-600 dark:text-red-400'>
                {failedTests}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Failed
              </div>
            </div>
            <div className='text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
              <div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400'>
                {errorTests}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Errors
              </div>
            </div>
          </div>

          <div className='flex space-x-2'>
            {onRetry && (
              <Button variant='primary' size='sm' onClick={onRetry}>
                Retry
              </Button>
            )}
            {onViewSolution && (
              <Button variant='outline' size='sm' onClick={onViewSolution}>
                View Solution
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <Typography variant='h3' className='text-lg font-semibold mb-4'>
          Performance Metrics
        </Typography>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
            <div className='text-lg font-semibold text-blue-600 dark:text-blue-400'>
              {performance.totalExecutionTime.toFixed(2)}ms
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Total Time
            </div>
          </div>
          <div className='text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
            <div className='text-lg font-semibold text-purple-600 dark:text-purple-400'>
              {performance.averageExecutionTime.toFixed(2)}ms
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Avg Time
            </div>
          </div>
          <div className='text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg'>
            <div className='text-lg font-semibold text-orange-600 dark:text-orange-400'>
              {performance.memoryUsage.toFixed(2)}MB
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Memory
            </div>
          </div>
          <div className='text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg'>
            <div className='text-lg font-semibold text-green-600 dark:text-green-400'>
              {performance.timeComplexity || 'N/A'}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Time Complexity
            </div>
          </div>
        </div>
      </Card>

      {/* Test Cases */}
      <Card>
        <Typography variant='h3' className='text-lg font-semibold mb-4'>
          Test Cases
        </Typography>

        <div className='space-y-3'>
          {testCases.map(testCase => (
            <div
              key={testCase.id}
              className='border border-gray-200 dark:border-gray-700 rounded-lg p-4'
            >
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center space-x-2'>
                  {getStatusIcon(testCase.status)}
                  <Typography variant='p' className='font-medium'>
                    {testCase.name}
                  </Typography>
                </div>
                <Badge className={getStatusColor(testCase.status)}>
                  {testCase.status.charAt(0).toUpperCase() +
                    testCase.status.slice(1)}
                </Badge>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                <div>
                  <div className='font-medium text-gray-700 dark:text-gray-300 mb-1'>
                    Input:
                  </div>
                  <div className='bg-gray-50 dark:bg-gray-700 p-2 rounded font-mono text-xs'>
                    {testCase.input}
                  </div>
                </div>
                <div>
                  <div className='font-medium text-gray-700 dark:text-gray-300 mb-1'>
                    Expected:
                  </div>
                  <div className='bg-gray-50 dark:bg-gray-700 p-2 rounded font-mono text-xs'>
                    {testCase.expectedOutput}
                  </div>
                </div>
                <div>
                  <div className='font-medium text-gray-700 dark:text-gray-300 mb-1'>
                    Actual:
                  </div>
                  <div
                    className={`p-2 rounded font-mono text-xs ${
                      testCase.status === 'passed'
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    {testCase.actualOutput || 'N/A'}
                  </div>
                </div>
              </div>

              {testCase.executionTime && (
                <div className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
                  Execution time: {testCase.executionTime.toFixed(2)}ms
                  {testCase.memoryUsed &&
                    ` | Memory: ${testCase.memoryUsed.toFixed(2)}MB`}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
