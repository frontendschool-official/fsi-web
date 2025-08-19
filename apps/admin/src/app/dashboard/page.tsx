'use client';
import { Card, Button, H2, H1, P, LoadingSpinner } from '@fsi/ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { httpClient } from '@fsi/config/http';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await httpClient.get('/api/companies/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='space-y-8'>
      {/* Header */}
      <H1>Admin Dashboard</H1>
      <P>Manage your Frontend School platform</P>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>
              {loading ? '...' : stats?.total || 0}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Total Companies
            </div>
          </div>
        </Card>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>
              {loading ? '...' : stats?.byCountry?.India || 0}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Indian Companies
            </div>
          </div>
        </Card>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>
              {loading ? '...' : stats?.byCountry?.Global || 0}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Global Companies
            </div>
          </div>
        </Card>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>
              {loading ? '...' : stats?.byStatus?.active || 0}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Active Companies
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <H2>Quick Actions</H2>
        <div className='flex flex-wrap gap-4'>
          <Link href='/companies'>
            <Button>Manage Companies</Button>
          </Link>
          <Button variant='secondary'>Manage Users</Button>
          <Button variant='outline'>View Analytics</Button>
          <Button variant='ghost'>Settings</Button>
        </div>
      </Card>

      {/* Recent Companies */}
      <Card>
        <H2>Recent Companies</H2>
        <div className='space-y-3'>
          {loading ? (
            <LoadingSpinner size='sm' />
          ) : stats?.recentCompanies?.length > 0 ? (
            stats.recentCompanies.map((company: any, index: number) => (
              <div
                key={index}
                className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
              >
                <div>
                  <div className='text-gray-900 dark:text-gray-100 font-medium'>
                    {company.name}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-300'>
                    {company.country} •{' '}
                    {new Date(company.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Link
                  href={`/companies/${company.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                >
                  <Button size='sm' variant='outline'>
                    View
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <div className='text-center py-4 text-gray-500'>
              No companies found
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
