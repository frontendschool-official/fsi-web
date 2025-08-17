import { AuthGate, Card } from '@fsi/ui';

export default function DashboardPage() {
  return (
    <AuthGate>
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
    </AuthGate>
  );
}
