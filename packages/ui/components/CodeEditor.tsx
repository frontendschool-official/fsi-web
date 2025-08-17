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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      onChange?.(newCode);

      // Set cursor position after tab
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
          start + 2;
      }, 0);
    }
  };

  const getLineNumbers = () => {
    const lines = code.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const baseClasses = 'font-mono text-sm leading-relaxed';
  const themeClasses = {
    light: 'bg-gray-50 text-gray-900 border-gray-200',
    dark: 'bg-gray-900 text-gray-100 border-gray-700',
  };

  return (
    <div className={`relative ${className}`}>
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
          <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
            {language}
          </span>
        </div>
        <Button
          variant='ghost'
          size='sm'
          onClick={copyToClipboard}
          className='text-xs'
        >
          Copy
        </Button>
      </div>

      {/* Editor */}
      <div className={`relative border ${themeClasses[theme]}`}>
        {showLineNumbers && (
          <div
            ref={lineNumbersRef}
            className={`absolute left-0 top-0 w-12 p-3 text-xs text-gray-500 dark:text-gray-400 select-none ${baseClasses}`}
            style={{ lineHeight: '1.5rem' }}
          >
            {getLineNumbers()}
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full p-3 resize-none focus:outline-none ${baseClasses} ${
            showLineNumbers ? 'pl-16' : ''
          } ${themeClasses[theme]}`}
          style={{
            lineHeight: '1.5rem',
            minHeight: '200px',
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
        />
      </div>
    </div>
  );
}
