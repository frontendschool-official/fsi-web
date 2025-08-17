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
          const userTheme = await getUserTheme(user);
          initialTheme = userTheme;
          console.log('ThemeProvider: Got theme from Firebase:', userTheme);
        } catch (error) {
          console.error(
            'ThemeProvider: Error getting theme from Firebase:',
            error
          );
          // Fallback to localStorage
          const savedTheme = localStorage.getItem('theme') as Theme;
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
          initialTheme = savedTheme || systemTheme;
        }
      } else if (!authLoading) {
        // Auth is not loading and no user, use localStorage and system preference
        const savedTheme = localStorage.getItem('theme') as Theme;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        initialTheme = savedTheme || systemTheme;
      }

      console.log('ThemeProvider: Initial theme setup', {
        user: user?.email,
        authLoading,
        initialTheme,
        currentHtmlClass: document.documentElement.className,
      });

      setThemeState(initialTheme);

      // Apply theme to HTML element
      const htmlElement = document.documentElement;
      if (initialTheme === 'dark') {
        htmlElement.classList.add('dark');
        console.log('ThemeProvider: Added dark class to HTML element');
      } else {
        htmlElement.classList.remove('dark');
        console.log('ThemeProvider: Removed dark class from HTML element');
      }

      console.log(
        'ThemeProvider: HTML element classes after setup:',
        htmlElement.className
      );

      // Mark as mounted and not loading after theme is set
      setMounted(true);
      setLoading(false);
    };

    // Only initialize when auth is not loading
    if (!authLoading) {
      initializeTheme();
    }
  }, [user, authLoading, defaultTheme]);

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      console.log('ThemeProvider: Theme changed to', theme);
      const htmlElement = document.documentElement;

      if (theme === 'dark') {
        htmlElement.classList.add('dark');
        console.log('ThemeProvider: Added dark class to HTML element');
      } else {
        htmlElement.classList.remove('dark');
        console.log('ThemeProvider: Removed dark class from HTML element');
      }

      console.log(
        'ThemeProvider: HTML element classes after change:',
        htmlElement.className
      );

      // Save to localStorage for immediate access
      localStorage.setItem('theme', theme);

      // Sync with Firebase if user is logged in
      if (user && !authLoading) {
        updateUserTheme(user, theme).catch(error => {
          console.error(
            'ThemeProvider: Error syncing theme to Firebase:',
            error
          );
        });
      }
    }
  }, [theme, mounted, user, authLoading]);

  const toggleTheme = () => {
    console.log('ThemeProvider: Toggling theme from', theme);
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    console.log('ThemeProvider: Setting theme to', newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme, mounted, loading }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
