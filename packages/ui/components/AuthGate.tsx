'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@config/auth';
import { isAdmin } from '@config/db';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthGateProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function AuthGate({ children, adminOnly = false }: AuthGateProps) {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    // client‑side redirect to auth page if not signed in
    if (typeof window !== 'undefined') {
      router.push('/auth');
    }
    return null;
  }

  if (adminOnly && !isAdmin(user.email ?? '')) {
    return (
      <div className='p-4 text-center'>
        <h2 className='text-lg font-semibold mb-2'>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
