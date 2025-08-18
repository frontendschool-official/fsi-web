'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Simple Excalidraw test
const ExcalidrawTest = dynamic(
  () =>
    import('@excalidraw/excalidraw').then(mod => ({ default: mod.Excalidraw })),
  {
    ssr: false,
    loading: () => <div>Loading Excalidraw...</div>,
  }
);

export default function ExcalidrawTestPage() {
  // Import CSS on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@excalidraw/excalidraw/index.css').catch(error => {
        console.warn('Failed to import Excalidraw CSS:', error);
      });
    }
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Excalidraw Test</h1>
      <div style={{ height: '600px', border: '1px solid #ccc' }}>
        <ExcalidrawTest
          theme='dark'
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
          }}
        />
      </div>
    </div>
  );
}
