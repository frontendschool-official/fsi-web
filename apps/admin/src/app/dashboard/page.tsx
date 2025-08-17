import { Card, Button, ThemeToggle } from '@fsi/ui';

export default function AdminDashboard() {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            Admin Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Manage your Frontend School platform
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>1,234</div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Total Students
            </div>
          </div>
        </Card>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>56</div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Active Courses
            </div>
          </div>
        </Card>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>89%</div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Completion Rate
            </div>
          </div>
        </Card>
        <Card>
          <div className='text-center'>
            <div className='text-2xl font-bold text-primary-500'>$12.5K</div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              Monthly Revenue
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>
          Quick Actions
        </h2>
        <div className='flex flex-wrap gap-4'>
          <Button>Add New Course</Button>
          <Button variant='secondary'>Manage Users</Button>
          <Button variant='outline'>View Analytics</Button>
          <Button variant='ghost'>Settings</Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>
          Recent Activity
        </h2>
        <div className='space-y-3'>
          {[
            {
              action: 'New student enrolled',
              time: '2 minutes ago',
              user: 'john@example.com',
            },
            {
              action: 'Course completed',
              time: '15 minutes ago',
              user: 'sarah@example.com',
            },
            {
              action: 'Payment received',
              time: '1 hour ago',
              user: 'mike@example.com',
            },
            {
              action: 'New course published',
              time: '2 hours ago',
              user: 'admin@frontendschool.com',
            },
          ].map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
            >
              <div>
                <div className='text-gray-900 dark:text-gray-100 font-medium'>
                  {item.action}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-300'>
                  {item.user}
                </div>
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Theme Information */}
      <Card>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>
          Theme System
        </h2>
        <div className='space-y-4'>
          <p className='text-gray-600 dark:text-gray-300'>
            This admin dashboard showcases the new theme system with the primary
            color #04AA6D. The theme automatically adapts to light and dark
            modes with smooth transitions.
          </p>
          <div className='flex items-center space-x-4'>
            <div className='w-8 h-8 rounded-full bg-primary-500'></div>
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              Primary Color: #04AA6D
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
