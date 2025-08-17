import './globals.css';
import { Providers } from './providers';
import { Header } from '@fsi/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend School Admin',
  description: 'Admin dashboard for Frontend School',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Immediately set theme to prevent flash
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = savedTheme || systemTheme;

                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Ignore errors during SSR
                }
              })();
            `,
          }}
        />
      </head>
      <body className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200'>
        <Providers>
          <Header />
          <main className='p-4 max-w-7xl mx-auto'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
