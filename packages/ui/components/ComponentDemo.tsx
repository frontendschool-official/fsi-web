'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import {
  Button,
  Card,
  Typography,
  H1,
  H2,
  H3,
  H4,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Badge,
  Alert,
  Divider,
  Progress,
  Modal,
  Tooltip,
  Tabs,
  Accordion,
  LoadingSpinner,
  CodeEditor,
  ProblemCard,
  ProgressTracker,
  Sidebar,
  TestResults,
  Leaderboard,
  NotificationCenter,
} from '../index';

export function ComponentDemo() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: '',
    newsletter: false,
    notifications: 'email',
  });

  // Demo data for frontend school components
  const demoCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

  const demoProblems = [
    {
      id: '1',
      title: 'Two Sum',
      description:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      difficulty: 'easy' as const,
      category: 'dsa' as const,
      tags: ['Array', 'Hash Table'],
      estimatedTime: 15,
      isCompleted: false,
      isBookmarked: true,
    },
    {
      id: '2',
      title: 'Build a Todo App',
      description:
        'Create a fully functional todo application with add, edit, delete, and mark as complete functionality.',
      difficulty: 'medium' as const,
      category: 'machine-coding' as const,
      tags: ['React', 'State Management', 'CRUD'],
      estimatedTime: 45,
      isCompleted: true,
      isBookmarked: false,
    },
  ];

  const demoProgress = [
    {
      category: 'dsa' as const,
      completed: 15,
      total: 50,
      streak: 7,
    },
    {
      category: 'machine-coding' as const,
      completed: 8,
      total: 25,
      streak: 3,
    },
    {
      category: 'system-design' as const,
      completed: 3,
      total: 20,
      streak: 1,
    },
  ];

  const demoSidebarSections = [
    {
      id: 'problems',
      title: 'Problems',
      items: [
        {
          id: 'dsa',
          label: 'Data Structures & Algorithms',
          badge: 50,
          isActive: true,
        },
        {
          id: 'machine-coding',
          label: 'Machine Coding',
          badge: 25,
        },
        {
          id: 'system-design',
          label: 'System Design',
          badge: 20,
        },
      ],
    },
    {
      id: 'progress',
      title: 'Progress',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
        },
        {
          id: 'achievements',
          label: 'Achievements',
          badge: 5,
        },
        {
          id: 'leaderboard',
          label: 'Leaderboard',
        },
      ],
    },
  ];

  const demoTestResults = {
    testCases: [
      {
        id: '1',
        name: 'Basic Test Case',
        status: 'passed' as const,
        input: '[2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        actualOutput: '[0, 1]',
        executionTime: 2.5,
        memoryUsed: 0.8,
      },
      {
        id: '2',
        name: 'Edge Case - No Solution',
        status: 'failed' as const,
        input: '[1, 2, 3, 4], target = 10',
        expectedOutput: '[]',
        actualOutput: '[3, 4]',
        executionTime: 1.8,
        memoryUsed: 0.7,
      },
    ],
    performance: {
      totalExecutionTime: 15.2,
      averageExecutionTime: 7.6,
      memoryUsage: 2.1,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
    totalTests: 2,
    passedTests: 1,
    failedTests: 1,
    errorTests: 0,
  };

  const demoLeaderboardEntries = [
    {
      id: '1',
      rank: 1,
      username: 'alice_coder',
      score: 1250,
      problemsSolved: 45,
      streak: 12,
      badges: ['Speed Demon', 'Problem Solver'],
    },
    {
      id: '2',
      rank: 2,
      username: 'bob_dev',
      score: 1180,
      problemsSolved: 42,
      streak: 8,
      badges: ['Consistent'],
    },
    {
      id: '3',
      rank: 3,
      username: 'charlie_tech',
      score: 1100,
      problemsSolved: 38,
      streak: 5,
      isCurrentUser: true,
    },
  ];

  const demoNotifications = [
    {
      id: '1',
      type: 'achievement' as const,
      title: 'Week Warrior!',
      message: 'You maintained a 7-day streak. Keep up the great work!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
    },
    {
      id: '2',
      type: 'success' as const,
      title: 'Problem Solved!',
      message: 'Congratulations! You successfully solved "Two Sum" problem.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true,
    },
    {
      id: '3',
      type: 'info' as const,
      title: 'New Problem Available',
      message: 'A new machine coding challenge has been added to your queue.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: false,
    },
  ];

  const selectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'feature', label: 'Feature Request' },
  ];

  const tabsData = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className='space-y-4'>
          <Typography>
            This is a comprehensive demo of all UI components with full theme
            support. The components automatically adapt to light and dark
            themes.
          </Typography>
          <div className='grid grid-cols-2 gap-4'>
            <Card>
              <H4>Light Theme</H4>
              <Typography size='sm' color='muted'>
                Clean, bright interface for daytime use
              </Typography>
            </Card>
            <Card>
              <H4>Dark Theme</H4>
              <Typography size='sm' color='muted'>
                Easy on the eyes for nighttime use
              </Typography>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'components',
      label: 'Components',
      content: (
        <div className='space-y-6'>
          <div>
            <H4>Typography</H4>
            <div className='space-y-2 mt-2'>
              <H1>Heading 1</H1>
              <H2>Heading 2</H2>
              <H3>Heading 3</H3>
              <Typography>Regular paragraph text</Typography>
              <Typography size='sm' color='muted'>
                Small muted text
              </Typography>
            </div>
          </div>

          <Divider />

          <div>
            <H4>Buttons</H4>
            <div className='flex flex-wrap gap-2 mt-2'>
              <Button variant='primary'>Primary</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='outline'>Outline</Button>
              <Button variant='ghost'>Ghost</Button>
            </div>
          </div>

          <Divider />

          <div>
            <H4>Badges</H4>
            <div className='flex flex-wrap gap-2 mt-2'>
              <Badge variant='default'>Default</Badge>
              <Badge variant='primary'>Primary</Badge>
              <Badge variant='success'>Success</Badge>
              <Badge variant='warning'>Warning</Badge>
              <Badge variant='error'>Error</Badge>
              <Badge variant='info'>Info</Badge>
            </div>
          </div>

          <Divider />

          <div>
            <H4>Progress</H4>
            <div className='space-y-2 mt-2'>
              <Progress value={75} showLabel />
              <Progress value={45} variant='success' />
              <Progress value={90} variant='warning' />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'forms',
      label: 'Forms',
      content: (
        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='Name'
              placeholder='Enter your name'
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label='Email'
              type='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <Select
            label='Category'
            options={selectOptions}
            placeholder='Select a category'
            value={formData.category}
            onChange={(value: string) =>
              setFormData({ ...formData, category: value })
            }
          />

          <Textarea
            label='Message'
            placeholder='Enter your message'
            value={formData.message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <div className='space-y-3'>
            <Checkbox
              label='Subscribe to newsletter'
              checked={formData.newsletter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, newsletter: e.target.checked })
              }
            />

            <div>
              <Typography size='sm' className='mb-2'>
                Notification preferences:
              </Typography>
              <div className='space-y-2'>
                <Radio
                  label='Email notifications'
                  name='notifications'
                  value='email'
                  checked={formData.notifications === 'email'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, notifications: e.target.value })
                  }
                />
                <Radio
                  label='SMS notifications'
                  name='notifications'
                  value='sms'
                  checked={formData.notifications === 'sms'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, notifications: e.target.value })
                  }
                />
                <Radio
                  label='No notifications'
                  name='notifications'
                  value='none'
                  checked={formData.notifications === 'none'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, notifications: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'frontend-school',
      label: 'Frontend School',
      content: (
        <div className='space-y-8'>
          <div>
            <H4>Code Editor</H4>
            <div className='mt-4'>
              <CodeEditor
                code={demoCode}
                language='javascript'
                onChange={code => console.log('Code changed:', code)}
                placeholder='Start coding here...'
              />
            </div>
          </div>

          <Divider />

          <div>
            <H4>Problem Cards</H4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {demoProblems.map(problem => (
                <ProblemCard
                  key={problem.id}
                  {...problem}
                  onStart={id => console.log('Starting problem:', id)}
                  onBookmark={id => console.log('Bookmarking problem:', id)}
                />
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <H4>Progress Tracker</H4>
            <div className='mt-4'>
              <ProgressTracker
                progress={demoProgress}
                totalCompleted={26}
                totalProblems={95}
                currentStreak={7}
                longestStreak={12}
              />
            </div>
          </div>

          <Divider />

          <div>
            <H4>Test Results</H4>
            <div className='mt-4'>
              <TestResults
                {...demoTestResults}
                onRetry={() => console.log('Retrying...')}
                onViewSolution={() => console.log('Viewing solution...')}
              />
            </div>
          </div>

          <Divider />

          <div>
            <H4>Leaderboard</H4>
            <div className='mt-4'>
              <Leaderboard
                entries={demoLeaderboardEntries}
                title='Weekly Leaderboard'
                timeFrame='weekly'
                showTop={5}
              />
            </div>
          </div>

          <Divider />

          <div>
            <H4>Notification Center</H4>
            <div className='mt-4 flex justify-center'>
              <NotificationCenter
                notifications={demoNotifications}
                onMarkAsRead={id => console.log('Marking as read:', id)}
                onMarkAllAsRead={() => console.log('Marking all as read')}
                onDelete={id => console.log('Deleting notification:', id)}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const accordionData = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: (
        <div className='space-y-2'>
          <Typography size='sm'>
            Welcome to the UI component library! This demo showcases all
            available components with full theme support.
          </Typography>
          <Button size='sm' onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
        </div>
      ),
    },
    {
      id: 'theme-support',
      title: 'Theme Support',
      content: (
        <div className='space-y-2'>
          <Typography size='sm'>
            All components automatically adapt to the current theme. The current
            theme is:
            <Badge variant='primary' className='ml-2'>
              {theme}
            </Badge>
          </Typography>
        </div>
      ),
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      content: (
        <Typography size='sm'>
          All components are built with accessibility in mind, including proper
          ARIA labels, keyboard navigation, and screen reader support.
        </Typography>
      ),
    },
  ];

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <div className='text-center'>
        <H1>UI Component Library</H1>
        <Typography size='lg' color='muted'>
          A comprehensive collection of theme-aware components
        </Typography>
      </div>

      {/* Alerts */}
      <div className='space-y-4'>
        <Alert variant='info' title='Welcome!'>
          This demo showcases all available components with full theme support.
        </Alert>
        <Alert variant='success' title='Theme Support'>
          All components automatically adapt to light and dark themes.
        </Alert>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <Tabs tabs={tabsData} />
          </Card>

          <Card>
            <H3>Interactive Components</H3>
            <div className='space-y-4 mt-4'>
              <div className='flex flex-wrap gap-4'>
                <Tooltip content='This is a tooltip!'>
                  <Button variant='outline'>Hover for tooltip</Button>
                </Tooltip>
                <Button variant='outline' onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </Button>
                <div className='flex items-center gap-2'>
                  <LoadingSpinner size='sm' />
                  <Typography size='sm'>Loading...</Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          <Card>
            <H3>Sidebar Navigation</H3>
            <div className='mt-4'>
              <Sidebar
                sections={demoSidebarSections}
                onItemClick={item => console.log('Clicked:', item.label)}
                variant='compact'
              />
            </div>
          </Card>

          <Card>
            <H3>Accordion</H3>
            <div className='mt-4'>
              <Accordion items={accordionData} />
            </div>
          </Card>

          <Card>
            <H3>Current Theme</H3>
            <div className='mt-4 space-y-2'>
              <Typography size='sm'>
                Active theme: <Badge variant='primary'>{theme}</Badge>
              </Typography>
              <Progress value={theme === 'dark' ? 100 : 0} showLabel />
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Example Modal'
        size='lg'
      >
        <div className='space-y-4'>
          <Typography>
            This is an example modal that demonstrates the modal component with
            theme support.
          </Typography>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
