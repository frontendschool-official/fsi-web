'use client';

import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from './Button';
import { CopyIcon, FormatIcon, RunIcon } from '../icons';

interface DSAEditorProps {
  code: string;
  language?: 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'csharp';
  onChange?: (code: string) => void;
  readOnly?: boolean;
  className?: string;
  theme?: 'vs-dark' | 'light' | 'hc-black';
  placeholder?: string;
  height?: string;
  showRunButton?: boolean;
  onRun?: (code: string) => void;
}

export function DSAEditor({
  code: initialCode,
  language = 'javascript',
  onChange,
  readOnly = false,
  className = '',
  theme = 'vs-dark',
  placeholder = '// Write your DSA solution here...',
  height = '500px',
  showRunButton = true,
  onRun,
}: DSAEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Set up common DSA snippets
    const snippets = [
      {
        label: 'binary-search',
        insertText: [
          'function binarySearch(arr: number[], target: number): number {',
          '    let left = 0;',
          '    let right = arr.length - 1;',
          '    ',
          '    while (left <= right) {',
          '        const mid = Math.floor((left + right) / 2);',
          '        ',
          '        if (arr[mid] === target) {',
          '            return mid;',
          '        } else if (arr[mid] < target) {',
          '            left = mid + 1;',
          '        } else {',
          '            right = mid - 1;',
          '        }',
          '    }',
          '    ',
          '    return -1;',
          '}',
        ].join('\n'),
        documentation: 'Binary search implementation',
      },
      {
        label: 'dfs',
        insertText: [
          'function dfs(node: TreeNode | null, result: number[] = []): number[] {',
          '    if (!node) return result;',
          '    ',
          '    result.push(node.val);',
          '    dfs(node.left, result);',
          '    dfs(node.right, result);',
          '    ',
          '    return result;',
          '}',
        ].join('\n'),
        documentation: 'Depth-first search implementation',
      },
      {
        label: 'bfs',
        insertText: [
          'function bfs(root: TreeNode | null): number[] {',
          '    if (!root) return [];',
          '    ',
          '    const result: number[] = [];',
          '    const queue: TreeNode[] = [root];',
          '    ',
          '    while (queue.length > 0) {',
          '        const node = queue.shift()!;',
          '        result.push(node.val);',
          '        ',
          '        if (node.left) queue.push(node.left);',
          '        if (node.right) queue.push(node.right);',
          '    }',
          '    ',
          '    return result;',
          '}',
        ].join('\n'),
        documentation: 'Breadth-first search implementation',
      },
    ];

    // Add snippets to the editor
    if (typeof window !== 'undefined' && (window as any).monaco) {
      const monaco = (window as any).monaco;
      monaco?.languages?.registerCompletionItemProvider(language, {
        provideCompletionItems: () => {
          return {
            suggestions: snippets.map(snippet => ({
              label: snippet.label,
              kind: monaco?.languages?.CompletionItemKind?.Snippet,
              insertText: snippet.insertText,
              insertTextRules:
                monaco?.languages?.CompletionItemInsertTextRule
                  ?.InsertAsSnippet,
              documentation: snippet.documentation,
            })),
          };
        },
      });
    }
  };

  const handleRunCode = () => {
    if (onRun && editorRef.current) {
      const code = editorRef.current.getValue();
      onRun(code);
    }
  };

  const copyToClipboard = async () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      try {
        await navigator?.clipboard?.writeText(code);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className='flex items-center justify-between p-3 bg-gray-800 text-white border-b border-gray-700'>
        <div className='flex items-center space-x-2'>
          <div className='flex space-x-1'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <span className='text-sm font-medium'>
            DSA Editor - {language.toUpperCase()}
          </span>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            onClick={formatCode}
            variant='outline'
            size='sm'
            className='text-xs bg-gray-700 hover:bg-gray-600 flex items-center gap-1'
          >
            <FormatIcon size={12} />
            Format
          </Button>
          <Button
            onClick={copyToClipboard}
            variant='outline'
            size='sm'
            className='text-xs bg-gray-700 hover:bg-gray-600 flex items-center gap-1'
          >
            <CopyIcon size={12} />
            Copy
          </Button>
          {showRunButton && onRun && (
            <Button
              onClick={handleRunCode}
              size='sm'
              className='text-xs bg-green-600 hover:bg-green-700 flex items-center gap-1'
            >
              <RunIcon size={12} />
              Run
            </Button>
          )}
        </div>
      </div>

      {/* Editor */}
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={initialCode}
        theme={theme}
        onChange={value => onChange?.(value || '')}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          parameterHints: { enabled: true },
          hover: { enabled: true },
          contextmenu: true,
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          matchBrackets: 'always',
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
}
