'use client';

import React, { useState } from 'react';
import {
  DSAEditor,
  MachineCodingEditor,
  MachineCodingTemplates,
  SystemDesignEditorSimple,
  SystemDesignTemplates,
  ExcalidrawMinimalWrapper,
  TheoryEditor,
  TheoryTemplates,
  ExcalidrawDebug,
  Tabs,
  Card,
  Typography,
  H1,
  H2,
  H3,
  P,
} from '@fsi/ui';

export default function EditorsDemoPage() {
  const [dsaCode, setDsaCode] =
    useState(`function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

// Test the function
const arr = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(arr, 7)); // Output: 3
console.log(binarySearch(arr, 10)); // Output: -1`);

  const [theoryContent, setTheoryContent] = useState(
    TheoryTemplates.algorithm.content
  );

  const handleDSARun = (code: string) => {
    console.log('Running DSA code:', code);
    // In a real application, you would send this to a code execution service
    alert('Code execution would happen here in a real application');
  };

  const handleTheorySave = (content: string) => {
    console.log('Saving theory content:', content);
    alert('Content saved!');
  };

  const handleSystemDesignSave = (data: any) => {
    console.log('Saving system design:', data);
    alert('System design saved!');
  };

  const handleSystemDesignExport = (data: any, format: string) => {
    console.log(`Exporting system design as ${format}:`, data);
    alert(`System design exported as ${format}!`);
  };

  const tabs = [
    {
      id: 'dsa',
      label: 'DSA Editor',
      content: (
        <div className='space-y-4'>
          <div>
            <H3>DSA Editor Features</H3>
            <P>
              Monaco Editor with DSA-specific snippets and syntax highlighting
              for common programming languages.
            </P>
            <ul className='list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400'>
              <li>
                Syntax highlighting for JavaScript, TypeScript, Python, Java,
                C++, C#
              </li>
              <li>DSA code snippets (binary search, DFS, BFS)</li>
              <li>Code formatting and copy functionality</li>
              <li>Run button for code execution</li>
              <li>Fullscreen mode</li>
            </ul>
          </div>
          <DSAEditor
            code={dsaCode}
            language='typescript'
            onChange={setDsaCode}
            onRun={handleDSARun}
            height='400px'
            showRunButton={true}
          />
        </div>
      ),
    },
    {
      id: 'machine-coding',
      label: 'Machine Coding Editor',
      content: (
        <div className='space-y-4'>
          <div>
            <H3>Machine Coding Editor Features</H3>
            <P>
              Sandpack-powered editor with live preview for building interactive
              components and applications.
            </P>
            <ul className='list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400'>
              <li>Live preview with hot reload</li>
              <li>Multiple templates (React, Vue, Angular, etc.)</li>
              <li>File explorer and console</li>
              <li>Built-in templates for common challenges</li>
              <li>Fullscreen mode</li>
            </ul>
          </div>
          <MachineCodingEditor
            files={MachineCodingTemplates.todoApp.files}
            template='react-ts'
            height='500px'
            showFileExplorer={true}
            showConsole={true}
            showNavigator={true}
          />
        </div>
      ),
    },
    {
      id: 'system-design',
      label: 'System Design Editor',
      content: (
        <div className='space-y-4'>
          <div>
            <H3>System Design Editor Features</H3>
            <P>
              Excalidraw-powered editor for creating system architecture
              diagrams and flowcharts.
            </P>
            <ul className='list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400'>
              <li>Interactive drawing canvas</li>
              <li>Pre-built system design templates</li>
              <li>Export to PNG, SVG, JSON</li>
              <li>Theme switching</li>
              <li>Fullscreen mode</li>
            </ul>
          </div>
          <SystemDesignEditorSimple
            height='500px'
            onSave={handleSystemDesignSave}
            onExport={handleSystemDesignExport}
          />
        </div>
      ),
    },
    {
      id: 'theory',
      label: 'Theory Editor',
      content: (
        <div className='space-y-4'>
          <div>
            <H3>Theory Editor Features</H3>
            <P>
              Rich text editor with markdown support for writing detailed
              explanations and documentation.
            </P>
            <ul className='list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400'>
              <li>Markdown formatting toolbar</li>
              <li>Live preview mode</li>
              <li>Word and character count</li>
              <li>Pre-built templates for common topics</li>
              <li>Copy and save functionality</li>
            </ul>
          </div>
          <TheoryEditor
            content={theoryContent}
            onChange={setTheoryContent}
            height='400px'
            showToolbar={true}
            showWordCount={true}
            showPreview={false}
            onSave={handleTheorySave}
          />
        </div>
      ),
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <div className='space-y-6'>
        <div>
          <H1>Editor Components Demo</H1>
          <P>
            Explore the four specialized editor components designed for
            different types of programming challenges.
          </P>
        </div>

        <Card className='p-6'>
          <Tabs tabs={tabs} />
        </Card>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='p-6'>
            <H3>Quick Start Templates</H3>
            <P className='mb-4'>
              Each editor comes with pre-built templates to help you get started
              quickly.
            </P>
            <div className='space-y-2 text-sm'>
              <div>
                <strong>DSA Editor:</strong> Binary search, DFS, BFS snippets
              </div>
              <div>
                <strong>Machine Coding:</strong> Todo app, Counter app templates
              </div>
              <div>
                <strong>System Design:</strong> Microservices, Distributed
                systems, Event-driven architecture
              </div>
              <div>
                <strong>Theory Editor:</strong> Algorithm explanation, Data
                structure overview, System design analysis
              </div>
            </div>
          </Card>

          <Card className='p-6'>
            <H3>Usage Examples</H3>
            <P className='mb-4'>
              Here are some common use cases for each editor component.
            </P>
            <div className='space-y-2 text-sm'>
              <div>
                <strong>DSA Editor:</strong> Algorithm implementation, coding
                interviews, problem solving
              </div>
              <div>
                <strong>Machine Coding:</strong> Frontend challenges, component
                building, interactive demos
              </div>
              <div>
                <strong>System Design:</strong> Architecture diagrams, system
                flows, component relationships
              </div>
              <div>
                <strong>Theory Editor:</strong> Documentation, explanations,
                technical writing
              </div>
            </div>
          </Card>
        </div>

        <Card className='p-6'>
          <H3>Excalidraw Debug</H3>
          <P className='mb-4'>
            Use this debug component to test if Excalidraw is loading properly.
          </P>
          <ExcalidrawDebug />
        </Card>

        <Card className='p-6'>
          <H3>Minimal Excalidraw Test</H3>
          <P className='mb-4'>
            A simplified version of the Excalidraw editor for testing.
          </P>
          <ExcalidrawMinimalWrapper
            height='400px'
            onSave={data => {
              console.log('Minimal Excalidraw save:', data);
              alert('Drawing saved!');
            }}
          />
        </Card>
      </div>
    </div>
  );
}
