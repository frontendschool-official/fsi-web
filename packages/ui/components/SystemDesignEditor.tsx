'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from './Button';
import {
  SaveIcon,
  ExportIcon,
  FullscreenIcon,
  ExitFullscreenIcon,
  SunIcon,
  MoonIcon,
} from '../icons';

// Dynamically import Excalidraw to avoid SSR issues
const Excalidraw = dynamic(
  () =>
    import('@excalidraw/excalidraw').then(mod => ({ default: mod.Excalidraw })),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Loading Excalidraw...
          </p>
        </div>
      </div>
    ),
  }
);

const MainMenu = dynamic(
  () =>
    import('@excalidraw/excalidraw').then(mod => ({ default: mod.MainMenu })),
  { ssr: false }
);

const WelcomeScreen = dynamic(
  () =>
    import('@excalidraw/excalidraw').then(mod => ({
      default: mod.WelcomeScreen,
    })),
  { ssr: false }
);

// Import Excalidraw CSS dynamically
const importExcalidrawCSS = async () => {
  if (typeof window !== 'undefined') {
    try {
      await import('@excalidraw/excalidraw/index.css');
    } catch (error) {
      console.warn('Failed to import Excalidraw CSS:', error);
    }
  }
};

interface SystemDesignEditorProps {
  initialData?: any;
  className?: string;
  height?: string;
  readOnly?: boolean;
  onSave?: (data: any) => void;
  onExport?: (data: any, format: 'png' | 'svg' | 'json') => void;
  theme?: 'light' | 'dark';
  showWelcomeScreen?: boolean;
  showMainMenu?: boolean;
}

export function SystemDesignEditor({
  initialData,
  className = '',
  height = '600px',
  readOnly = false,
  onSave,
  onExport,
  theme = 'dark',
  showWelcomeScreen = true,
  showMainMenu = true,
}: SystemDesignEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme);
  const [isExcalidrawLoaded, setIsExcalidrawLoaded] = useState(false);
  const excalidrawRef = useRef<any>(null);

  // Import CSS on component mount
  useEffect(() => {
    importExcalidrawCSS();
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSave = async () => {
    if (excalidrawRef.current && onSave) {
      const data = await excalidrawRef.current.getSceneElements();
      onSave(data);
    }
  };

  const handleExport = async (format: 'png' | 'svg' | 'json') => {
    if (excalidrawRef.current && onExport) {
      const data = await excalidrawRef.current.getSceneElements();
      onExport(data, format);
    }
  };

  const loadSystemDesignTemplates = () => {
    // Common system design templates
    const templates = {
      microservices: {
        elements: [
          // API Gateway
          {
            type: 'rectangle',
            x: 100,
            y: 50,
            width: 120,
            height: 60,
            text: 'API Gateway',
            backgroundColor: '#e3f2fd',
            strokeColor: '#1976d2',
          },
          // Load Balancer
          {
            type: 'rectangle',
            x: 100,
            y: 150,
            width: 120,
            height: 60,
            text: 'Load Balancer',
            backgroundColor: '#f3e5f5',
            strokeColor: '#7b1fa2',
          },
          // Service 1
          {
            type: 'rectangle',
            x: 300,
            y: 50,
            width: 100,
            height: 50,
            text: 'User Service',
            backgroundColor: '#e8f5e8',
            strokeColor: '#388e3c',
          },
          // Service 2
          {
            type: 'rectangle',
            x: 300,
            y: 120,
            width: 100,
            height: 50,
            text: 'Order Service',
            backgroundColor: '#e8f5e8',
            strokeColor: '#388e3c',
          },
          // Database
          {
            type: 'rectangle',
            x: 500,
            y: 80,
            width: 100,
            height: 50,
            text: 'Database',
            backgroundColor: '#fff3e0',
            strokeColor: '#f57c00',
          },
        ],
      },
      distributed: {
        elements: [
          // Client
          {
            type: 'rectangle',
            x: 50,
            y: 100,
            width: 80,
            height: 40,
            text: 'Client',
            backgroundColor: '#e1f5fe',
            strokeColor: '#0277bd',
          },
          // CDN
          {
            type: 'rectangle',
            x: 200,
            y: 50,
            width: 80,
            height: 40,
            text: 'CDN',
            backgroundColor: '#fce4ec',
            strokeColor: '#c2185b',
          },
          // Web Server
          {
            type: 'rectangle',
            x: 200,
            y: 120,
            width: 80,
            height: 40,
            text: 'Web Server',
            backgroundColor: '#e8f5e8',
            strokeColor: '#388e3c',
          },
          // Application Server
          {
            type: 'rectangle',
            x: 350,
            y: 100,
            width: 100,
            height: 50,
            text: 'App Server',
            backgroundColor: '#fff3e0',
            strokeColor: '#f57c00',
          },
          // Database
          {
            type: 'rectangle',
            x: 500,
            y: 100,
            width: 80,
            height: 40,
            text: 'Database',
            backgroundColor: '#f3e5f5',
            strokeColor: '#7b1fa2',
          },
        ],
      },
    };

    return templates;
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
        <Excalidraw
          ref={excalidrawRef}
          initialData={initialData}
          theme={currentTheme}
          viewModeEnabled={readOnly}
          zenModeEnabled={false}
          gridModeEnabled={false}
          welcomeScreen={showWelcomeScreen ? <WelcomeScreen /> : null}
          mainMenu={showMainMenu ? <MainMenu /> : null}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              saveAsImage: false,
            },
            dockedSidebarBreakpoint: 0,
            showWelcomeScreen: showWelcomeScreen,
            showMainMenu: showMainMenu,
          }}
          excalidrawAPI={api => {
            excalidrawRef.current = api;
            setIsExcalidrawLoaded(true);
          }}
          langCode='en'
          renderTopRightUI={() => null}
          renderSidebar={() => null}
          onError={error => {
            console.error('Excalidraw error:', error);
          }}
        />
      </div>
    </div>
  );
}

// System design templates for quick start
export const SystemDesignTemplates = {
  microservices: {
    name: 'Microservices Architecture',
    description:
      'Basic microservices setup with API Gateway, Load Balancer, and multiple services',
    elements: [
      {
        type: 'rectangle',
        x: 100,
        y: 50,
        width: 120,
        height: 60,
        text: 'API Gateway',
        backgroundColor: '#e3f2fd',
        strokeColor: '#1976d2',
      },
      {
        type: 'rectangle',
        x: 100,
        y: 150,
        width: 120,
        height: 60,
        text: 'Load Balancer',
        backgroundColor: '#f3e5f5',
        strokeColor: '#7b1fa2',
      },
      {
        type: 'rectangle',
        x: 300,
        y: 50,
        width: 100,
        height: 50,
        text: 'User Service',
        backgroundColor: '#e8f5e8',
        strokeColor: '#388e3c',
      },
      {
        type: 'rectangle',
        x: 300,
        y: 120,
        width: 100,
        height: 50,
        text: 'Order Service',
        backgroundColor: '#e8f5e8',
        strokeColor: '#388e3c',
      },
      {
        type: 'rectangle',
        x: 500,
        y: 80,
        width: 100,
        height: 50,
        text: 'Database',
        backgroundColor: '#fff3e0',
        strokeColor: '#f57c00',
      },
    ],
  },
  distributed: {
    name: 'Distributed System',
    description:
      'Classic distributed system with CDN, web server, and database',
    elements: [
      {
        type: 'rectangle',
        x: 50,
        y: 100,
        width: 80,
        height: 40,
        text: 'Client',
        backgroundColor: '#e1f5fe',
        strokeColor: '#0277bd',
      },
      {
        type: 'rectangle',
        x: 200,
        y: 50,
        width: 80,
        height: 40,
        text: 'CDN',
        backgroundColor: '#fce4ec',
        strokeColor: '#c2185b',
      },
      {
        type: 'rectangle',
        x: 200,
        y: 120,
        width: 80,
        height: 40,
        text: 'Web Server',
        backgroundColor: '#e8f5e8',
        strokeColor: '#388e3c',
      },
      {
        type: 'rectangle',
        x: 350,
        y: 100,
        width: 100,
        height: 50,
        text: 'App Server',
        backgroundColor: '#fff3e0',
        strokeColor: '#f57c00',
      },
      {
        type: 'rectangle',
        x: 500,
        y: 100,
        width: 80,
        height: 40,
        text: 'Database',
        backgroundColor: '#f3e5f5',
        strokeColor: '#7b1fa2',
      },
    ],
  },
  eventDriven: {
    name: 'Event-Driven Architecture',
    description: 'Event-driven system with message queues and event processors',
    elements: [
      {
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 100,
        height: 50,
        text: 'Event Producer',
        backgroundColor: '#e8f5e8',
        strokeColor: '#388e3c',
      },
      {
        type: 'rectangle',
        x: 250,
        y: 100,
        width: 100,
        height: 50,
        text: 'Message Queue',
        backgroundColor: '#fff3e0',
        strokeColor: '#f57c00',
      },
      {
        type: 'rectangle',
        x: 400,
        y: 50,
        width: 100,
        height: 50,
        text: 'Event Processor 1',
        backgroundColor: '#e3f2fd',
        strokeColor: '#1976d2',
      },
      {
        type: 'rectangle',
        x: 400,
        y: 120,
        width: 100,
        height: 50,
        text: 'Event Processor 2',
        backgroundColor: '#e3f2fd',
        strokeColor: '#1976d2',
      },
      {
        type: 'rectangle',
        x: 550,
        y: 80,
        width: 100,
        height: 50,
        text: 'Database',
        backgroundColor: '#f3e5f5',
        strokeColor: '#7b1fa2',
      },
    ],
  },
};
