'use client';

export function ColorTest() {
  return (
    <div className='p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg'>
      <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4'>
        Primary Color Test
      </h3>

      <div className='grid grid-cols-5 gap-2'>
        <div className='h-12 bg-primary-50 rounded flex items-center justify-center text-xs'>
          50
        </div>
        <div className='h-12 bg-primary-100 rounded flex items-center justify-center text-xs'>
          100
        </div>
        <div className='h-12 bg-primary-200 rounded flex items-center justify-center text-xs'>
          200
        </div>
        <div className='h-12 bg-primary-300 rounded flex items-center justify-center text-xs'>
          300
        </div>
        <div className='h-12 bg-primary-400 rounded flex items-center justify-center text-xs'>
          400
        </div>
        <div className='h-12 bg-primary-500 rounded flex items-center justify-center text-xs text-white'>
          500
        </div>
        <div className='h-12 bg-primary-600 rounded flex items-center justify-center text-xs text-white'>
          600
        </div>
        <div className='h-12 bg-primary-700 rounded flex items-center justify-center text-xs text-white'>
          700
        </div>
        <div className='h-12 bg-primary-800 rounded flex items-center justify-center text-xs text-white'>
          800
        </div>
        <div className='h-12 bg-primary-900 rounded flex items-center justify-center text-xs text-white'>
          900
        </div>
      </div>

      <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          If you see colored boxes above, the primary colors are working. If
          they're gray, there's an issue with the Tailwind configuration.
        </p>
      </div>
    </div>
  );
}
