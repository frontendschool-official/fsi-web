'use client';

import { useTheme } from './ThemeProvider';
import { useUser } from '@config/auth';

export function ThemeDebug() {
  const { theme, toggleTheme, setTheme, mounted, loading } = useTheme();
  const { user, loading: authLoading } = useUser();

  if (!mounted || loading) {
    return (
      <div className='p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4'>
          Theme Debug
        </h3>
        <div className='text-sm text-gray-600 dark:text-gray-300'>
          <p>Loading theme state...</p>
          <p className='mt-2 text-xs text-gray-500'>
            {loading ? 'Determining theme from Firebase...' : 'Initializing...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg'>
      <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4'>
        Theme Debug
      </h3>

      <div className='space-y-2 text-sm'>
        <p className='text-gray-600 dark:text-gray-300'>
          Current theme:{' '}
          <span className='font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>
            {theme}
          </span>
        </p>

        <p className='text-gray-600 dark:text-gray-300'>
          User:{' '}
          <span className='font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>
            {user ? user?.email : 'Not signed in'}
          </span>
        </p>

        <p className='text-gray-600 dark:text-gray-300'>
          Firebase sync:{' '}
          <span className='font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>
            {user ? 'Enabled' : 'Disabled (not signed in)'}
          </span>
        </p>

        <p className='text-gray-600 dark:text-gray-300'>
          Auth loading:{' '}
          <span className='font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>
            {authLoading ? 'Yes' : 'No'}
          </span>
        </p>

        <p className='text-gray-600 dark:text-gray-300'>
          HTML class:{' '}
          <span className='font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>
            {typeof document !== 'undefined'
              ? document?.documentElement?.className
              : 'SSR'}
          </span>
        </p>

        <p className='text-gray-600 dark:text-gray-300'>
          localStorage:{' '}
          <span className='font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>
            {typeof window !== 'undefined'
              ? localStorage?.getItem('theme') || 'null'
              : 'SSR'}
          </span>
        </p>
      </div>

      <div className='mt-4 space-x-2'>
        <button
          onClick={toggleTheme}
          className='px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600'
        >
          Toggle Theme
        </button>
        <button
          onClick={() => setTheme?.('light')}
          className='px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600'
        >
          Force Light
        </button>
        <button
          onClick={() => setTheme?.('dark')}
          className='px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-900'
        >
          Force Dark
        </button>
      </div>

      <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          This component shows the current theme state and allows manual
          control. Theme preferences are synced with Firebase when signed in.
        </p>
      </div>
    </div>
  );
}
