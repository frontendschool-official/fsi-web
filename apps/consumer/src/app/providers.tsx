'use client';

import { ReactNode } from 'react';
import { getFirebaseApp } from '@config/firebase';
import { ThemeProvider, ZustandProvider } from '@fsi/ui';

export function Providers({ children }: { children: ReactNode }) {
  getFirebaseApp();

  return (
    <ZustandProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ZustandProvider>
  );
}
