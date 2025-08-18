'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export function ExcalidrawDebug() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const testExcalidrawImport = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('Testing Excalidraw import...');

      // Test if the module exists
      const excalidrawModule = await import('@excalidraw/excalidraw');
      console.log('Excalidraw module loaded:', excalidrawModule);

      // Test if Excalidraw component exists
      if (excalidrawModule.Excalidraw) {
        console.log('Excalidraw component found');
        setSuccess(true);
      } else {
        throw new Error('Excalidraw component not found in module');
      }
    } catch (err) {
      console.error('Excalidraw import error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const testCSSImport = async () => {
    try {
      console.log('Testing CSS import...');
      await import('@excalidraw/excalidraw/index.css');
      console.log('CSS imported successfully');
    } catch (err) {
      console.error('CSS import error:', err);
    }
  };

  useEffect(() => {
    // Test on component mount
    testExcalidrawImport();
    testCSSImport();
  }, []);

  return (
    <div className='p-4 border rounded-lg bg-gray-50 dark:bg-gray-800'>
      <h3 className='text-lg font-semibold mb-4'>Excalidraw Debug Info</h3>

      <div className='space-y-4'>
        <div>
          <Button
            onClick={testExcalidrawImport}
            disabled={isLoading}
            className='mr-2'
          >
            {isLoading ? 'Testing...' : 'Test Import'}
          </Button>

          <Button onClick={testCSSImport} variant='outline'>
            Test CSS
          </Button>
        </div>

        {error && (
          <div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className='p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
            <strong>Success:</strong> Excalidraw loaded successfully!
          </div>
        )}

        <div className='text-sm text-gray-600 dark:text-gray-400'>
          <p>
            <strong>User Agent:</strong>{' '}
            {typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR'}
          </p>
          <p>
            <strong>Window Object:</strong>{' '}
            {typeof window !== 'undefined' ? 'Available' : 'Not Available'}
          </p>
          <p>
            <strong>Document Object:</strong>{' '}
            {typeof document !== 'undefined' ? 'Available' : 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
}
