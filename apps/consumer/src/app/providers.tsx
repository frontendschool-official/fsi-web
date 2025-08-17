'use client';

import { ReactNode } from 'react';
import { getFirebaseApp } from '@config/firebase';

export function Providers({ children }: { children: ReactNode }) {
  getFirebaseApp();
  return <>{children}</>;
}
