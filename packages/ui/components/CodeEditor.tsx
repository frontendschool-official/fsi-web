'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

interface CodeEditorProps {
  code: string;
  language?: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  className?: string;
  showLineNumbers?: boolean;
  theme?: 'light' | 'dark';
  placeholder?: string;
}

export function CodeEditor({
  code: initialCode,
  language = 'javascript',
  onChange,
  readOnly = false,
  className = '',
  showLineNumbers = true,
  theme = 'dark',
  placeholder = '// Start coding here...',
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e?.target?.value || '';
    setCode(newCode);
    onChange?.(newCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e?.key === 'Tab') {
      e.preventDefault();
      const start = e?.currentTarget?.selectionStart || 0;
      const end = e?.currentTarget?.selectionEnd || 0;
      const newCode = code?.substring(0, start) + '  ' + code?.substring(end);
      setCode(newCode);
      onChange?.(newCode);

      // Set cursor position after tab
      setTimeout(() => {
        if (e?.currentTarget) {
          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const getLineNumbers = () => {
    const lines = code?.split('\n') || [];
    return lines?.map((_, index) => index + 1)?.join('\n') || '';
  };

  const copyToClipboard = async () => {
    try {
      await navigator?.clipboard?.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const baseClasses = 'font-mono text-sm leading-relaxed';
  const themeClasses = {
    light: 'bg-gray-50 text-gray-900 border-gray-200',
    dark: 'bg-gray-900 text-gray-100 border-gray-700',
  };

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900'
    : 'relative';

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between p-3 border-b ${
          themeClasses[theme]
        } ${isFullscreen ? 'sticky top-0 z-10' : ''}`}
      >
        <div className='flex items-center space-x-2 min-w-0 flex-1'>
          <div className='flex space-x-1 flex-shrink-0'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <span className='text-xs font-medium text-gray-500 dark:text-gray-400 truncate'>
            {language}
          </span>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            onClick={copyToClipboard}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            Copy
          </Button>
          <Button
            onClick={toggleFullscreen}
            variant='outline'
            size='sm'
            className='text-xs'
          >
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className='relative'>
        {showLineNumbers && (
          <div
            ref={lineNumbersRef}
            className={`absolute left-0 top-0 bottom-0 w-12 p-3 text-xs text-gray-500 dark:text-gray-400 select-none ${
              themeClasses[theme]
            } border-r`}
          >
            <pre className='font-mono'>{getLineNumbers()}</pre>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full p-3 resize-none outline-none ${
            showLineNumbers ? 'pl-16' : 'pl-3'
          } ${baseClasses} ${themeClasses[theme]}`}
          style={{
            minHeight: '300px',
            ...(isFullscreen && { height: 'calc(100vh - 80px)' }),
          }}
        />
      </div>
    </div>
  );
}
