'use client';

import { ReactNode } from 'react';
import { getFirebaseApp } from '@config/firebase';
import { ThemeProvider } from '@fsi/ui';

export function Providers({ children }: { children: ReactNode }) {
  getFirebaseApp();

  return <ThemeProvider>{children}</ThemeProvider>;
}
