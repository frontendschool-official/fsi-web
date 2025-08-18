'use client';

import { ReactNode, useEffect } from 'react';
import { useUIStore } from '@config/stores';

interface ZustandProviderProps {
  children: ReactNode;
}

export function ZustandProvider({ children }: ZustandProviderProps) {
  const { theme, setTheme } = useUIStore();

  // Sync theme with system preference and apply to document
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(systemTheme);
      } else {
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
      }
    };

    applyTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return <>{children}</>;
}
