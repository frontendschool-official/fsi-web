import { AuthGate, Card, Button } from '@fsi/ui';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <AuthGate>
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <Link href='/zustand-demo'>
            <Button variant='outline'>View Zustand Demo</Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card>
            <h2 className='text-xl font-semibold mb-2'>My Practice</h2>
            <p>Coming soon</p>
          </Card>
          <Card>
            <h2 className='text-xl font-semibold mb-2'>Simulations</h2>
            <p>Coming soon</p>
          </Card>
          <Card>
            <h2 className='text-xl font-semibold mb-2'>Resources</h2>
            <p>Coming soon</p>
          </Card>
        </div>
      </div>
    </AuthGate>
  );
}
