'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from './Button';
import { SaveIcon, FullscreenIcon, ExitFullscreenIcon } from '../icons';

// Minimal Excalidraw import
const ExcalidrawMinimal = dynamic(
  () => import('@excalidraw/excalidraw').then(mod => mod.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Loading Drawing Editor...
          </p>
        </div>
      </div>
    ),
  }
);

interface ExcalidrawMinimalProps {
  className?: string;
  height?: string;
  onSave?: (data: any) => void;
  theme?: 'light' | 'dark';
}

export function ExcalidrawMinimalWrapper({
  className = '',
  height = '600px',
  onSave,
  theme = 'dark',
}: ExcalidrawMinimalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const excalidrawRef = useRef<any>(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSave = async () => {
    if (excalidrawRef.current && onSave) {
      try {
        const data = await excalidrawRef.current.getSceneElements();
        onSave(data);
      } catch (error) {
        console.error('Error saving:', error);
      }
    }
  };

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900'
    : 'relative';

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Header */}
      <div className='flex items-center justify-between p-3 bg-gray-800 text-white border-b border-gray-700'>
        <div className='flex items-center space-x-2'>
          <div className='flex space-x-1'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <span className='text-sm font-medium'>Drawing Editor</span>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            onClick={handleSave}
            variant='outline'
            size='sm'
            className='text-xs bg-gray-700 hover:bg-gray-600 flex items-center gap-1'
          >
            <SaveIcon size={12} />
            Save
          </Button>
          <Button
            onClick={toggleFullscreen}
            variant='outline'
            size='sm'
            className='text-xs bg-gray-700 hover:bg-gray-600 flex items-center gap-1'
          >
            {isFullscreen ? (
              <ExitFullscreenIcon size={12} />
            ) : (
              <FullscreenIcon size={12} />
            )}
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Excalidraw Editor */}
      <div style={{ height: isFullscreen ? 'calc(100vh - 60px)' : height }}>
        <ExcalidrawMinimal
          ref={excalidrawRef}
          theme={theme}
          viewModeEnabled={false}
          zenModeEnabled={false}
          gridModeEnabled={false}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              saveAsImage: false,
            },
            dockedSidebarBreakpoint: 0,
          }}
          excalidrawAPI={api => {
            excalidrawRef.current = api;
          }}
          langCode='en'
        />
      </div>
    </div>
  );
}
