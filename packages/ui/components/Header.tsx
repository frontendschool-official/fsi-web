'use client';

import { useUser, signInWithGoogle, signOut } from '@config/auth';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { user } = useUser();

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
              Frontend School
            </h1>
          </div>

          <div className='flex items-center space-x-4'>
            <ThemeToggle />

            {user ? (
              <div className='flex items-center space-x-3'>
                <span className='text-sm text-gray-600 dark:text-gray-300'>
                  {user.email}
                </span>
                <Button variant='outline' size='sm' onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={signInWithGoogle}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
