import { Card, Button, ComponentDemo } from '@fsi/ui';
import MultiSelectDemo from './multiselect-demo/page';

export default function HomePage() {
  return (
    <div className='space-y-8'>
      {/* Hero Section */}
      <section className='text-center py-12'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
          Welcome to Frontend School
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
          Learn frontend development by building real projects. Master React,
          TypeScript, and modern web technologies.
        </p>
        <div className='flex justify-center space-x-4'>
          <Button size='lg'>Get Started</Button>
          <Button variant='outline' size='lg'>
            Learn More
          </Button>
        </div>
      </section>
      <ComponentDemo />
      <MultiSelectDemo />
      {/* Theme Showcase */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>
          Theme System Showcase
        </h2>

        {/* Color Palette */}
        <Card>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4'>
            Color Palette
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
              <div key={shade} className='text-center'>
                <div
                  className={`h-16 rounded-lg mb-2 bg-primary-${shade}`}
                  title={`primary-${shade}`}
                />
                <span className='text-xs text-gray-600 dark:text-gray-300'>
                  {shade}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
