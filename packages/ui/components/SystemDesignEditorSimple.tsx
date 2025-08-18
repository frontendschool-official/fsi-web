'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from './Button';
import {
  SaveIcon,
  FullscreenIcon,
  ExitFullscreenIcon,
  SunIcon,
  MoonIcon,
  ExportIcon,
} from '../icons';

// Dynamically import Excalidraw with a simpler approach
const ExcalidrawComponent = dynamic(
  () => import('@excalidraw/excalidraw').then(mod => mod.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Loading System Design Editor...
          </p>
        </div>
      </div>
    ),
  }
);

interface SystemDesignEditorSimpleProps {
  initialData?: any;
  className?: string;
  height?: string;
  readOnly?: boolean;
  onSave?: (data: any) => void;
  onExport?: (data: any, format: 'png' | 'svg' | 'json') => void;
  theme?: 'light' | 'dark';
}

export function SystemDesignEditorSimple({
  initialData,
  className = '',
  height = '600px',
  readOnly = false,
  onSave,
  onExport,
  theme = 'dark',
}: SystemDesignEditorSimpleProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme);
  const excalidrawRef = useRef<any>(null);

  // Import CSS on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@excalidraw/excalidraw/index.css').catch(error => {
        console.warn('Failed to import Excalidraw CSS:', error);
      });
    }
  }, []);

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

  const handleExport = async (format: 'png' | 'svg' | 'json') => {
    if (excalidrawRef.current && onExport) {
      try {
        const data = await excalidrawRef.current.getSceneElements();
        onExport(data, format);
      } catch (error) {
        console.error('Error exporting:', error);
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
          <span className='text-sm font-medium'>System Design Editor</span>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            onClick={() =>
              setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
            }
            variant='outline'
            size='sm'
            className='text-xs bg-gray-700 hover:bg-gray-600 flex items-center gap-1'
          >
            {currentTheme === 'light' ? (
              <MoonIcon size={12} />
            ) : (
              <SunIcon size={12} />
            )}
            Theme
          </Button>
          <Button
            onClick={() => handleExport('png')}
            variant='outline'
            size='sm'
            className='text-xs bg-gray-700 hover:bg-gray-600 flex items-center gap-1'
          >
            <ExportIcon size={12} />
            PNG
          </Button>
          <Button
            onClick={() => handleExport('svg')}
            variant='outline'
            size='sm'
            className='text-xs bg-gray-700 hover:bg-gray-600 flex items-center gap-1'
          >
            <ExportIcon size={12} />
            SVG
          </Button>
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
        <ExcalidrawComponent
          ref={excalidrawRef}
          initialData={initialData}
          theme={currentTheme}
          viewModeEnabled={readOnly}
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
