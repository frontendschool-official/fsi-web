'use client';

import { useState } from 'react';
import {
  useCurrentUser,
  useTheme,
  useSidebar,
  useNotifications,
  useProblems,
} from '@config/hooks';
import { Button } from './Button';
import { Card } from './Card';
import { H1, H2, H3 } from './Typography';
import { Badge } from './Badge';
import { Alert } from './Alert';

export function ZustandDemo() {
  const { user, isLoading } = useCurrentUser();
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useNotifications();
  const { problems, addProblem } = useProblems();

  const [newProblemTitle, setNewProblemTitle] = useState('');

  const handleAddNotification = (
    type: 'success' | 'error' | 'warning' | 'info'
  ) => {
    addNotification({
      type,
      message: `This is a ${type} notification!`,
      duration: 3000,
    });
  };

  const handleAddProblem = () => {
    if (newProblemTitle.trim()) {
      addProblem({
        id: Math.random().toString(36).substr(2, 9),
        title: newProblemTitle,
        description: 'Sample problem description',
        difficulty: 'medium',
        category: 'dsa',
        tags: ['array', 'sorting'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setNewProblemTitle('');
      addNotification({
        type: 'success',
        message: 'Problem added successfully!',
      });
    }
  };

  return (
    <div className='space-y-6 p-6'>
      <H1>Zustand State Management Demo</H1>

      {/* User State */}
      <Card>
        <H2>User State</H2>
        <div className='space-y-2'>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p>User: {user ? user.email : 'Not signed in'}</p>
        </div>
      </Card>

      {/* Theme State */}
      <Card>
        <H2>Theme State</H2>
        <div className='space-y-4'>
          <p>
            Current theme: <Badge variant='default'>{theme}</Badge>
          </p>
          <div className='flex gap-2'>
            <Button onClick={() => setTheme('light')} variant='outline'>
              Light
            </Button>
            <Button onClick={() => setTheme('dark')} variant='outline'>
              Dark
            </Button>
            <Button onClick={() => setTheme('system')} variant='outline'>
              System
            </Button>
          </div>
        </div>
      </Card>

      {/* Sidebar State */}
      <Card>
        <H2>Sidebar State</H2>
        <div className='space-y-4'>
          <p>
            Sidebar open:{' '}
            <Badge variant={sidebarOpen ? 'default' : 'info'}>
              {sidebarOpen ? 'Yes' : 'No'}
            </Badge>
          </p>
          <Button onClick={toggleSidebar} variant='outline'>
            Toggle Sidebar
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <H2>Notifications</H2>
        <div className='space-y-4'>
          <div className='flex gap-2'>
            <Button
              onClick={() => handleAddNotification('success')}
              variant='outline'
              size='sm'
            >
              Success
            </Button>
            <Button
              onClick={() => handleAddNotification('error')}
              variant='outline'
              size='sm'
            >
              Error
            </Button>
            <Button
              onClick={() => handleAddNotification('warning')}
              variant='outline'
              size='sm'
            >
              Warning
            </Button>
            <Button
              onClick={() => handleAddNotification('info')}
              variant='outline'
              size='sm'
            >
              Info
            </Button>
            <Button onClick={clearNotifications} variant='outline' size='sm'>
              Clear All
            </Button>
          </div>

          <div className='space-y-2'>
            {notifications.map(notification => (
              <Alert key={notification.id} variant={notification.type}>
                <div className='flex justify-between items-center'>
                  <span>{notification.message}</span>
                  <Button
                    onClick={() => removeNotification(notification.id)}
                    variant='ghost'
                    size='sm'
                  >
                    ×
                  </Button>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      </Card>

      {/* Problems */}
      <Card>
        <H2>Problems</H2>
        <div className='space-y-4'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={newProblemTitle}
              onChange={e => setNewProblemTitle(e.target.value)}
              placeholder='Enter problem title'
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <Button
              onClick={handleAddProblem}
              disabled={!newProblemTitle.trim()}
            >
              Add Problem
            </Button>
          </div>

          <div className='space-y-2'>
            {problems.map(problem => (
              <div key={problem.id} className='p-3 border rounded-md'>
                <H3>{problem.title}</H3>
                <div className='flex gap-2 mt-2'>
                  <Badge variant='primary'>{problem.difficulty}</Badge>
                  <Badge variant='primary'>{problem.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
