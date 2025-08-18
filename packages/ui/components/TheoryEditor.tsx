'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import {
  CopyIcon,
  SaveIcon,
  FullscreenIcon,
  ExitFullscreenIcon,
  PreviewIcon,
  EditIcon,
} from '../icons';

interface TheoryEditorProps {
  content: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
  className?: string;
  height?: string;
  placeholder?: string;
  theme?: 'light' | 'dark';
  showToolbar?: boolean;
  showWordCount?: boolean;
  showPreview?: boolean;
  onSave?: (content: string) => void;
}

export function TheoryEditor({
  content: initialContent,
  onChange,
  readOnly = false,
  className = '',
  height = '400px',
  placeholder = 'Start writing your theory answer here...',
  theme = 'dark',
  showToolbar = true,
  showWordCount = true,
  showPreview = false,
  onSave,
}: TheoryEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isPreviewMode, setIsPreviewMode] = useState(showPreview);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (isPreviewMode && previewRef.current) {
      previewRef.current.innerHTML = markdownToHtml(content);
    }
  }, [content, isPreviewMode]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e?.target?.value || '';
    setContent(newContent);
    onChange?.(newContent);
  };

  const insertText = (text: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart || 0;
      const end = textareaRef.current.selectionEnd || 0;
      const newContent =
        content?.substring(0, start) + text + content?.substring(end);
      setContent(newContent);
      onChange?.(newContent);

      // Set cursor position after inserted text
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + text.length;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const formatText = (format: string) => {
    const formats = {
      bold: '**bold text**',
      italic: '*italic text*',
      code: '`code`',
      link: '[link text](url)',
      image: '![alt text](image-url)',
      heading1: '# Heading 1',
      heading2: '## Heading 2',
      heading3: '### Heading 3',
      bullet: '- List item',
      numbered: '1. Numbered item',
      quote: '> Quote text',
      codeblock: '```\ncode block\n```',
      table:
        '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
    };

    insertText(formats[format as keyof typeof formats] || '');
  };

  const copyToClipboard = async () => {
    try {
      await navigator?.clipboard?.writeText(content);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleSave = () => {
    onSave?.(content);
  };

  const getWordCount = () => {
    return (
      content
        ?.trim()
        ?.split(/\s+/)
        ?.filter(word => word.length > 0)?.length || 0
    );
  };

  const getCharacterCount = () => {
    return content?.length || 0;
  };

  const markdownToHtml = (markdown: string): string => {
    // Simple markdown to HTML conversion
    return (
      markdown
        ?.replace(/^### (.*$)/gim, '<h3>$1</h3>')
        ?.replace(/^## (.*$)/gim, '<h2>$1</h2>')
        ?.replace(/^# (.*$)/gim, '<h1>$1</h1>')
        ?.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        ?.replace(/\*(.*)\*/gim, '<em>$1</em>')
        ?.replace(/`(.*)`/gim, '<code>$1</code>')
        ?.replace(
          /\[(.*?)\]\((.*?)\)/gim,
          '<a href="$2" target="_blank">$1</a>'
        )
        ?.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />')
        ?.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        ?.replace(/^- (.*$)/gim, '<li>$1</li>')
        ?.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
        ?.replace(/\n\n/gim, '</p><p>')
        ?.replace(/^(?!<[h|b|u|o|l|t|d|p])(.+)$/gim, '<p>$1</p>')
        ?.replace(/<p><\/p>/gim, '')
        ?.replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/gim, '$1')
        ?.replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/gim, '$1')
        ?.replace(/<p>(<ul>.*<\/ul>)<\/p>/gim, '$1')
        ?.replace(/<p>(<ol>.*<\/ol>)<\/p>/gim, '$1')
        ?.replace(/<p>(<table>.*<\/table>)<\/p>/gim, '$1') || ''
    );
  };

  const themeClasses = {
    light: 'bg-white text-gray-900 border-gray-200',
    dark: 'bg-gray-900 text-gray-100 border-gray-700',
  };

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900'
    : 'relative';

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between p-3 border-b ${themeClasses[theme]}`}
      >
        <div className='flex items-center space-x-2'>
          <div className='flex space-x-1'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <span className='text-sm font-medium'>Theory Editor</span>
        </div>

        <div className='flex items-center space-x-2'>
          {showWordCount && (
            <span className='text-xs text-gray-500'>
              {getWordCount()} words, {getCharacterCount()} chars
            </span>
          )}
          <Button
            onClick={togglePreview}
            variant='outline'
            size='sm'
            className='text-xs flex items-center gap-1'
          >
            {isPreviewMode ? <EditIcon size={12} /> : <PreviewIcon size={12} />}
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            onClick={copyToClipboard}
            variant='outline'
            size='sm'
            className='text-xs flex items-center gap-1'
          >
            <CopyIcon size={12} />
            Copy
          </Button>
          {onSave && (
            <Button
              onClick={handleSave}
              variant='outline'
              size='sm'
              className='text-xs flex items-center gap-1'
            >
              <SaveIcon size={12} />
              Save
            </Button>
          )}
          <Button
            onClick={toggleFullscreen}
            variant='outline'
            size='sm'
            className='text-xs flex items-center gap-1'
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

      {/* Toolbar */}
      {showToolbar && !isPreviewMode && (
        <div
          className={`flex items-center space-x-1 p-2 border-b ${themeClasses[theme]}`}
        >
          <Button
            onClick={() => formatText('heading1')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            H1
          </Button>
          <Button
            onClick={() => formatText('heading2')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            H2
          </Button>
          <Button
            onClick={() => formatText('heading3')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            H3
          </Button>
          <div className='w-px h-4 bg-gray-300 dark:bg-gray-600'></div>
          <Button
            onClick={() => formatText('bold')}
            variant='outline'
            size='sm'
            className='text-xs font-bold'
          >
            B
          </Button>
          <Button
            onClick={() => formatText('italic')}
            variant='outline'
            size='sm'
            className='text-xs italic'
          >
            I
          </Button>
          <Button
            onClick={() => formatText('code')}
            variant='outline'
            size='sm'
            className='text-xs font-mono'
          >
            {'</>'}
          </Button>
          <div className='w-px h-4 bg-gray-300 dark:bg-gray-600'></div>
          <Button
            onClick={() => formatText('link')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            Link
          </Button>
          <Button
            onClick={() => formatText('image')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            Image
          </Button>
          <div className='w-px h-4 bg-gray-300 dark:bg-gray-600'></div>
          <Button
            onClick={() => formatText('bullet')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            • List
          </Button>
          <Button
            onClick={() => formatText('numbered')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            1. List
          </Button>
          <Button
            onClick={() => formatText('quote')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            Quote
          </Button>
          <div className='w-px h-4 bg-gray-300 dark:bg-gray-600'></div>
          <Button
            onClick={() => formatText('codeblock')}
            variant='outline'
            size='sm'
            className='text-xs font-mono'
          >
            Code Block
          </Button>
          <Button
            onClick={() => formatText('table')}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            Table
          </Button>
        </div>
      )}

      {/* Editor/Preview */}
      <div style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}>
        {isPreviewMode ? (
          <div
            ref={previewRef}
            className={`w-full h-full p-4 overflow-auto ${themeClasses[theme]}`}
            style={{
              lineHeight: '1.6',
            }}
          >
            {content || <p className='text-gray-500 italic'>{placeholder}</p>}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            readOnly={readOnly}
            placeholder={placeholder}
            className={`w-full h-full p-4 resize-none outline-none font-sans text-sm leading-relaxed ${themeClasses[theme]}`}
            style={{
              lineHeight: '1.6',
            }}
          />
        )}
      </div>
    </div>
  );
}

// Markdown templates for common theory problems
export const TheoryTemplates = {
  algorithm: {
    name: 'Algorithm Explanation',
    content: `# Algorithm Name

## Problem Statement
Describe the problem this algorithm solves.

## Approach
Explain the high-level approach and strategy.

### Time Complexity
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

## Implementation
\`\`\`
// Your implementation here
function algorithm() {
  // Code here
}
\`\`\`

## Example
Walk through an example step by step.

## Edge Cases
Discuss important edge cases to consider.

## Applications
Where this algorithm is commonly used.
`,
  },
  dataStructure: {
    name: 'Data Structure Overview',
    content: `# Data Structure Name

## Definition
What is this data structure and what does it represent?

## Properties
- Property 1: Description
- Property 2: Description
- Property 3: Description

## Operations
### Insertion
- **Time Complexity**: O(1)
- **Description**: How insertion works

### Deletion
- **Time Complexity**: O(1)
- **Description**: How deletion works

### Search
- **Time Complexity**: O(n)
- **Description**: How search works

## Implementation
\`\`\`
// Implementation example
class DataStructure {
  // Implementation here
}
\`\`\`

## Use Cases
When to use this data structure.

## Advantages
- Advantage 1
- Advantage 2

## Disadvantages
- Disadvantage 1
- Disadvantage 2
`,
  },
  systemDesign: {
    name: 'System Design Analysis',
    content: `# System Design: [System Name]

## Requirements
### Functional Requirements
- Requirement 1
- Requirement 2

### Non-Functional Requirements
- **Scalability**: Handle X users
- **Availability**: 99.9% uptime
- **Latency**: < 200ms response time

## High-Level Architecture
Describe the overall system architecture.

## Components
### 1. Component Name
- **Purpose**: What this component does
- **Technology**: What technology is used
- **Responsibilities**: Key responsibilities

### 2. Component Name
- **Purpose**: What this component does
- **Technology**: What technology is used
- **Responsibilities**: Key responsibilities

## Data Flow
Describe how data flows through the system.

## Database Design
### Tables
- **Table 1**: Description
- **Table 2**: Description

## Scalability Considerations
How the system scales horizontally and vertically.

## Security
Security measures and considerations.

## Monitoring & Logging
How the system is monitored and logged.
`,
  },
};
