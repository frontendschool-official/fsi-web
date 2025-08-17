'use client';

import { ReactNode } from 'react';
import { getFirebaseApp } from '@config/firebase';

/**
 * Global providers for the admin app.  At present we only ensure that
 * Firebase is initialised on the client; more providers can be added here
 * (e.g. for theme or state management) in the future.
 */
export function Providers({ children }: { children: ReactNode }) {
  getFirebaseApp();
  return <>{children}</>;
}
