import './globals.css';
import { Providers } from './providers';
import { Header } from '@fsi/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend School',
  description: 'Learn by doing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-50'>
        <Providers>
          <Header />
          <main className='p-4'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
