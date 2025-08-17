import Link from 'next/link';
import { Button } from '@fsi/ui';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center py-20 space-y-6'>
      <h1 className='text-4xl font-bold'>Frontend School</h1>
      <p className='text-lg text-gray-600'>Learn by doing</p>
      <Link href='/dashboard'>
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
