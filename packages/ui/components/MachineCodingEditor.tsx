'use client';

import React, { useState } from 'react';
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import { Button } from './Button';
import { FullscreenIcon, ExitFullscreenIcon } from '../icons';

interface MachineCodingEditorProps {
  files?: Record<string, string>;
  template?:
    | 'react'
    | 'react-ts'
    | 'vanilla'
    | 'vanilla-ts'
    | 'angular'
    | 'vue'
    | 'vue-ts'
    | 'svelte';
  theme?: 'dark' | 'light';
  className?: string;
  height?: string;
  showFileExplorer?: boolean;
  showConsole?: boolean;
  showNavigator?: boolean;
  readOnly?: boolean;
  onCodeChange?: (files: Record<string, string>) => void;
  customSetup?: {
    dependencies?: Record<string, string>;
    entry?: string;
  };
}

export function MachineCodingEditor({
  files,
  template = 'react-ts',
  theme = 'dark',
  className = '',
  height = '600px',
  showFileExplorer = true,
  showConsole = true,
  showNavigator = true,
  readOnly = false,
  onCodeChange,
  customSetup,
}: MachineCodingEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const defaultFiles = {
    '/App.tsx': `import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Machine Coding Challenge</h1>
      <p>Start building your component here!</p>
    </div>
  );
}`,
    '/index.tsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);`,
    '/styles.css': `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`,
  };

  const handleFilesChange = (newFiles: Record<string, string>) => {
    onCodeChange?.(newFiles);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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
          <span className='text-sm font-medium'>
            Machine Coding Editor - {template.toUpperCase()}
          </span>
        </div>

        <div className='flex items-center space-x-2'>
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

      {/* Sandpack Editor */}
      <div style={{ height: isFullscreen ? 'calc(100vh - 60px)' : height }}>
        <SandpackProvider
          template={template}
          theme={theme}
          files={files || defaultFiles}
          customSetup={customSetup}
        >
          <SandpackLayout>
            {showFileExplorer && <SandpackFileExplorer />}
            <SandpackCodeEditor />
            <SandpackPreview />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

// Predefined templates for common machine coding challenges
export const MachineCodingTemplates = {
  todoApp: {
    files: {
      '/App.tsx': `import React, { useState } from 'react';
import './styles.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      '/styles.css': `.app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #0056b3;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #888;
}

.delete-button {
  margin-left: auto;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}`,
    },
  },
  counterApp: {
    files: {
      '/App.tsx': `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="app">
      <h1>Counter App</h1>
      <div className="counter">
        <h2>{count}</h2>
        <div className="buttons">
          <button onClick={decrement} className="btn btn-decrement">
            -
          </button>
          <button onClick={reset} className="btn btn-reset">
            Reset
          </button>
          <button onClick={increment} className="btn btn-increment">
            +
          </button>
        </div>
      </div>
    </div>
  );
}`,
      '/styles.css': `.app {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.counter {
  margin-top: 40px;
}

.counter h2 {
  font-size: 4rem;
  margin: 0;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn {
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-increment {
  background-color: #28a745;
  color: white;
}

.btn-increment:hover {
  background-color: #218838;
}

.btn-decrement {
  background-color: #dc3545;
  color: white;
}

.btn-decrement:hover {
  background-color: #c82333;
}

.btn-reset {
  background-color: #6c757d;
  color: white;
}

.btn-reset:hover {
  background-color: #5a6268;
}`,
    },
  },
};
