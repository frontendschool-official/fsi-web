'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useUser } from '@config/auth';
import { getUserTheme, updateUserTheme, type Theme } from '@config/db';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useUser();

  useEffect(() => {
    console.log('ThemeProvider: Initializing...');
    console.log('ThemeProvider: typeof window =', typeof window);
    console.log('ThemeProvider: typeof document =', typeof document);

    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.log(
        'ThemeProvider: Window or document not available, skipping initialization'
      );
      setMounted(true);
      setLoading(false);
      return;
    }

    const initializeTheme = async () => {
      let initialTheme: Theme = defaultTheme;

      // If user is logged in, try to get theme from Firebase
      if (user && !authLoading) {
        try {
          const userTheme = await getUserTheme?.(user);
          initialTheme = userTheme;
          console.log('ThemeProvider: Got theme from Firebase:', userTheme);
        } catch (error) {
          console.error(
            'ThemeProvider: Error getting theme from Firebase:',
            error
          );
          // Fallback to localStorage
          const savedTheme = localStorage?.getItem('theme') as Theme;
          const systemTheme = window?.matchMedia?.('(prefers-color-scheme: dark)')
            ?.matches
            ? 'dark'
            : 'light';
          initialTheme = savedTheme || systemTheme;
        }
      } else if (!authLoading) {
        // Auth is not loading and no user, use localStorage and system preference
        const savedTheme = localStorage?.getItem('theme') as Theme;
        const systemTheme = window?.matchMedia?.('(prefers-color-scheme: dark)')
          ?.matches
          ? 'dark'
          : 'light';
        initialTheme = savedTheme || systemTheme;
      }

      console.log('ThemeProvider: Initial theme setup', {
        user: user?.email,
        authLoading,
        initialTheme,
        currentHtmlClass: document?.documentElement?.className,
      });

      setThemeState(initialTheme);

      // Apply theme to HTML element
      if (document?.documentElement) {
        document.documentElement.className = initialTheme;
      }

      setMounted(true);
      setLoading(false);
    };

    initializeTheme();
  }, [user, authLoading, defaultTheme]);

  const setTheme = async (newTheme: Theme) => {
    console.log('ThemeProvider: Setting theme to', newTheme);

    setThemeState(newTheme);

    // Apply theme to HTML element
    if (document?.documentElement) {
      document.documentElement.className = newTheme;
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage?.setItem('theme', newTheme);
    }

    // Save to Firebase if user is logged in
    if (user && !authLoading) {
      try {
        await updateUserTheme?.(user, newTheme);
        console.log('ThemeProvider: Theme saved to Firebase');
      } catch (error) {
        console.error('ThemeProvider: Error saving theme to Firebase:', error);
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    mounted,
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
