# Editor Components

This document provides comprehensive documentation for the four specialized editor components designed for different types of programming challenges.

## Overview

The editor components are built to provide specialized editing experiences for different types of programming problems:

1. **DSAEditor** - Monaco Editor with DSA-specific features
2. **MachineCodingEditor** - Sandpack-powered editor with live preview
3. **SystemDesignEditor** - Excalidraw-powered diagram editor
4. **TheoryEditor** - Rich text editor with markdown support

## DSAEditor

A Monaco Editor wrapper specifically designed for Data Structures and Algorithms problems with built-in snippets and syntax highlighting.

### Features

- Syntax highlighting for multiple languages (JavaScript, TypeScript, Python, Java, C++, C#)
- DSA-specific code snippets (binary search, DFS, BFS)
- Code formatting and copy functionality
- Run button for code execution
- Fullscreen mode
- Theme support (light/dark)

### Usage

```tsx
import { DSAEditor } from '@fsi/ui';

function MyComponent() {
  const [code, setCode] = useState('// Your code here');

  const handleRun = (code: string) => {
    // Execute the code
    console.log('Running:', code);
  };

  return (
    <DSAEditor
      code={code}
      language='typescript'
      onChange={setCode}
      onRun={handleRun}
      height='500px'
      showRunButton={true}
      theme='dark'
    />
  );
}
```

### Props

| Prop            | Type                                                                      | Default                                | Description                         |
| --------------- | ------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------- |
| `code`          | `string`                                                                  | -                                      | Initial code content                |
| `language`      | `'javascript' \| 'typescript' \| 'python' \| 'java' \| 'cpp' \| 'csharp'` | `'javascript'`                         | Programming language                |
| `onChange`      | `(code: string) => void`                                                  | -                                      | Callback when code changes          |
| `readOnly`      | `boolean`                                                                 | `false`                                | Whether editor is read-only         |
| `className`     | `string`                                                                  | `''`                                   | Additional CSS classes              |
| `theme`         | `'vs-dark' \| 'light' \| 'hc-black'`                                      | `'vs-dark'`                            | Editor theme                        |
| `placeholder`   | `string`                                                                  | `'// Write your DSA solution here...'` | Placeholder text                    |
| `height`        | `string`                                                                  | `'500px'`                              | Editor height                       |
| `showRunButton` | `boolean`                                                                 | `true`                                 | Show run button                     |
| `onRun`         | `(code: string) => void`                                                  | -                                      | Callback when run button is clicked |

## MachineCodingEditor

A Sandpack-powered editor with live preview for building interactive components and applications.

### Features

- Live preview with hot reload
- Multiple templates (React, Vue, Angular, etc.)
- File explorer and console
- Built-in templates for common challenges
- Fullscreen mode
- Custom dependencies support

### Usage

```tsx
import { MachineCodingEditor, MachineCodingTemplates } from '@fsi/ui';

function MyComponent() {
  const handleCodeChange = (files: Record<string, string>) => {
    console.log('Files changed:', files);
  };

  return (
    <MachineCodingEditor
      files={MachineCodingTemplates.todoApp.files}
      template='react-ts'
      height='600px'
      showFileExplorer={true}
      showConsole={true}
      onCodeChange={handleCodeChange}
    />
  );
}
```

### Props

| Prop               | Type                                                                                               | Default      | Description                 |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------ | --------------------------- |
| `files`            | `Record<string, string>`                                                                           | -            | Initial files content       |
| `template`         | `'react' \| 'react-ts' \| 'vanilla' \| 'vanilla-ts' \| 'angular' \| 'vue' \| 'vue-ts' \| 'svelte'` | `'react-ts'` | Sandpack template           |
| `theme`            | `'dark' \| 'light'`                                                                                | `'dark'`     | Editor theme                |
| `className`        | `string`                                                                                           | `''`         | Additional CSS classes      |
| `height`           | `string`                                                                                           | `'600px'`    | Editor height               |
| `showFileExplorer` | `boolean`                                                                                          | `true`       | Show file explorer          |
| `showConsole`      | `boolean`                                                                                          | `true`       | Show console                |
| `showNavigator`    | `boolean`                                                                                          | `true`       | Show navigator              |
| `readOnly`         | `boolean`                                                                                          | `false`      | Whether editor is read-only |
| `onCodeChange`     | `(files: Record<string, string>) => void`                                                          | -            | Callback when files change  |
| `customSetup`      | `object`                                                                                           | -            | Custom setup configuration  |

### Built-in Templates

```tsx
// Todo App Template
MachineCodingTemplates.todoApp;

// Counter App Template
MachineCodingTemplates.counterApp;
```

## SystemDesignEditor

An Excalidraw-powered editor for creating system architecture diagrams and flowcharts.

### Features

- Interactive drawing canvas
- Pre-built system design templates
- Export to PNG, SVG, JSON
- Theme switching
- Fullscreen mode
- Save and load functionality

### Usage

```tsx
import { SystemDesignEditor, SystemDesignTemplates } from '@fsi/ui';

function MyComponent() {
  const handleSave = (data: any) => {
    console.log('Saving system design:', data);
  };

  const handleExport = (data: any, format: string) => {
    console.log(`Exporting as ${format}:`, data);
  };

  return (
    <SystemDesignEditor
      height='600px'
      onSave={handleSave}
      onExport={handleExport}
      showWelcomeScreen={true}
      showMainMenu={true}
    />
  );
}
```

### Props

| Prop                | Type                                                    | Default   | Description                 |
| ------------------- | ------------------------------------------------------- | --------- | --------------------------- |
| `initialData`       | `any`                                                   | -         | Initial drawing data        |
| `className`         | `string`                                                | `''`      | Additional CSS classes      |
| `height`            | `string`                                                | `'600px'` | Editor height               |
| `readOnly`          | `boolean`                                               | `false`   | Whether editor is read-only |
| `onSave`            | `(data: any) => void`                                   | -         | Callback when saving        |
| `onExport`          | `(data: any, format: 'png' \| 'svg' \| 'json') => void` | -         | Callback when exporting     |
| `theme`             | `'light' \| 'dark'`                                     | `'dark'`  | Editor theme                |
| `showWelcomeScreen` | `boolean`                                               | `true`    | Show welcome screen         |
| `showMainMenu`      | `boolean`                                               | `true`    | Show main menu              |

### Built-in Templates

```tsx
// Microservices Architecture
SystemDesignTemplates.microservices;

// Distributed System
SystemDesignTemplates.distributed;

// Event-Driven Architecture
SystemDesignTemplates.eventDriven;
```

## TheoryEditor

A rich text editor with markdown support for writing detailed explanations and documentation.

### Features

- Markdown formatting toolbar
- Live preview mode
- Word and character count
- Pre-built templates for common topics
- Copy and save functionality
- Fullscreen mode

### Usage

```tsx
import { TheoryEditor, TheoryTemplates } from '@fsi/ui';

function MyComponent() {
  const [content, setContent] = useState(TheoryTemplates.algorithm.content);

  const handleSave = (content: string) => {
    console.log('Saving content:', content);
  };

  return (
    <TheoryEditor
      content={content}
      onChange={setContent}
      height='400px'
      showToolbar={true}
      showWordCount={true}
      showPreview={false}
      onSave={handleSave}
    />
  );
}
```

### Props

| Prop            | Type                        | Default                                      | Description                   |
| --------------- | --------------------------- | -------------------------------------------- | ----------------------------- |
| `content`       | `string`                    | -                                            | Initial content               |
| `onChange`      | `(content: string) => void` | -                                            | Callback when content changes |
| `readOnly`      | `boolean`                   | `false`                                      | Whether editor is read-only   |
| `className`     | `string`                    | `''`                                         | Additional CSS classes        |
| `height`        | `string`                    | `'400px'`                                    | Editor height                 |
| `placeholder`   | `string`                    | `'Start writing your theory answer here...'` | Placeholder text              |
| `theme`         | `'light' \| 'dark'`         | `'dark'`                                     | Editor theme                  |
| `showToolbar`   | `boolean`                   | `true`                                       | Show formatting toolbar       |
| `showWordCount` | `boolean`                   | `true`                                       | Show word/character count     |
| `showPreview`   | `boolean`                   | `false`                                      | Show preview mode by default  |
| `onSave`        | `(content: string) => void` | -                                            | Callback when saving          |

### Built-in Templates

```tsx
// Algorithm Explanation Template
TheoryTemplates.algorithm;

// Data Structure Overview Template
TheoryTemplates.dataStructure;

// System Design Analysis Template
TheoryTemplates.systemDesign;
```

## Markdown Formatting

The TheoryEditor supports the following markdown formatting:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Code**: `` `code` ``
- **Links**: `[link text](url)`
- **Images**: `![alt text](image-url)`
- **Lists**: `- item` or `1. item`
- **Quotes**: `> quote text`
- **Code blocks**: ` ```code block``` `
- **Tables**: `| Header | Header |\n|--------|--------|\n| Cell | Cell |`

## Common Use Cases

### DSA Problems

- Algorithm implementation
- Coding interview practice
- Problem-solving exercises

### Machine Coding Challenges

- Frontend component building
- Interactive application development
- Code sandbox demonstrations

### System Design

- Architecture diagramming
- System flow documentation
- Component relationship mapping

### Theory Problems

- Algorithm explanations
- Data structure documentation
- System design analysis
- Technical writing

## Demo

Visit `/editors-demo` in the consumer app to see all editors in action with examples and usage instructions.

## Dependencies

The editor components require the following dependencies:

```json
{
  "@monaco-editor/react": "^4.7.0",
  "@codesandbox/sandpack-react": "^2.20.0",
  "@excalidraw/excalidraw": "^0.18.0"
}
```

These are installed at the workspace root level and available to all apps in the monorepo.
