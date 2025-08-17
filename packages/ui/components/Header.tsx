'use client';

import Link from 'next/link';
import { useUser, signOut } from '@config/auth';
import { Button } from './Button';

export function Header() {
  const { user } = useUser();
  return (
    <header className='flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
      <Link href='/' className='text-xl font-bold'>
        Frontend School
      </Link>
      <nav className='flex items-center space-x-4'>
        {user ? (
          <>
            <span className='text-sm text-gray-600'>
              Hello, {user.displayName ?? user.email}
            </span>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          <Link href='/auth'>
            <Button>Sign In</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
