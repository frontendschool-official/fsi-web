# @fsi/ui - UI Component Library

A comprehensive collection of theme-aware React components built with Tailwind CSS and TypeScript.

## Features

- 🌙 **Full Theme Support**: All components automatically adapt to light and dark themes
- 🎨 **Consistent Design**: Built with a cohesive design system using Tailwind CSS
- ♿ **Accessible**: All components follow accessibility best practices
- 📱 **Responsive**: Mobile-first responsive design
- 🔧 **TypeScript**: Full TypeScript support with strict typing
- ⚡ **Performance**: Optimized for performance with minimal bundle size

## Installation

The UI package is already included in the monorepo. To use components in your app:

```tsx
import { Button, Card, Typography } from '@fsi/ui';
```

## Theme Setup

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@fsi/ui';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Components

### Layout & Structure

#### `Card`

A versatile container component with theme support.

```tsx
import { Card } from '@fsi/ui';

<Card className='p-6'>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>;
```

#### `Divider`

Horizontal or vertical dividers with theme support.

```tsx
import { Divider } from '@fsi/ui';

<Divider orientation='horizontal' variant='solid' size='md' />;
```

### Typography

#### `Typography`, `H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `P`, `Text`

Flexible typography components with theme support.

```tsx
import { Typography, H1, H2, P } from '@fsi/ui';

<H1>Main Heading</H1>
<H2>Section Heading</H2>
<P>Regular paragraph text</P>
<Typography size="lg" weight="semibold" color="primary">
  Custom styled text
</Typography>
```

### Form Components

#### `Input`

Text input with various variants and theme support.

```tsx
import { Input } from '@fsi/ui';

<Input
  label='Email'
  type='email'
  placeholder='Enter your email'
  variant='default'
  size='md'
  error='Invalid email'
  helperText="We'll never share your email"
/>;
```

#### `Textarea`

Multi-line text input with theme support.

```tsx
import { Textarea } from '@fsi/ui';

<Textarea
  label='Message'
  placeholder='Enter your message'
  variant='default'
  size='md'
/>;
```

#### `Select`

Dropdown select with theme support.

```tsx
import { Select } from '@fsi/ui';

<Select
  label='Category'
  options={[
    { value: 'general', label: 'General' },
    { value: 'support', label: 'Support' },
  ]}
  placeholder='Select a category'
  onChange={value => console.log(value)}
/>;
```

#### `Checkbox`

Checkbox input with theme support.

```tsx
import { Checkbox } from '@fsi/ui';

<Checkbox
  label='Subscribe to newsletter'
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
/>;
```

#### `Radio`

Radio button input with theme support.

```tsx
import { Radio } from '@fsi/ui';

<Radio
  label='Email notifications'
  name='notifications'
  value='email'
  checked={value === 'email'}
  onChange={e => setValue(e.target.value)}
/>;
```

### Interactive Components

#### `Button`

Versatile button component with multiple variants.

```tsx
import { Button } from '@fsi/ui';

<Button variant='primary' size='md' onClick={handleClick}>
  Click me
</Button>;
```

#### `Modal`

Modal dialog with backdrop and theme support.

```tsx
import { Modal } from '@fsi/ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title='Example Modal'
  size='md'
>
  <p>Modal content goes here</p>
</Modal>;
```

#### `Tooltip`

Tooltip component with positioning and theme support.

```tsx
import { Tooltip } from '@fsi/ui';

<Tooltip content='This is a tooltip!' position='top'>
  <button>Hover me</button>
</Tooltip>;
```

#### `Tabs`

Tabbed interface with theme support.

```tsx
import { Tabs } from '@fsi/ui';

<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  variant='default'
/>;
```

#### `Accordion`

Collapsible accordion with theme support.

```tsx
import { Accordion } from '@fsi/ui';

<Accordion
  items={[
    { id: 'item1', title: 'Section 1', content: <div>Content 1</div> },
    { id: 'item2', title: 'Section 2', content: <div>Content 2</div> },
  ]}
  allowMultiple={false}
/>;
```

### Display Components

#### `Badge`

Small status indicators with theme support.

```tsx
import { Badge } from '@fsi/ui';

<Badge variant='success' size='md' rounded>
  Success
</Badge>;
```

#### `Alert`

Alert messages with icons and theme support.

```tsx
import { Alert } from '@fsi/ui';

<Alert variant='success' title='Success!' onClose={() => {}}>
  Your action was completed successfully.
</Alert>;
```

#### `Progress`

Progress bar with theme support.

```tsx
import { Progress } from '@fsi/ui';

<Progress value={75} max={100} showLabel variant='primary' />;
```

#### `LoadingSpinner`

Loading indicators with theme support.

```tsx
import { LoadingSpinner } from '@fsi/ui';

<LoadingSpinner size='md' variant='spinner' text='Loading...' />;
```

### Theme Components

#### `ThemeProvider`

Context provider for theme management.

```tsx
import { ThemeProvider, useTheme } from '@fsi/ui';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function Component() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

#### `ThemeToggle`

Theme toggle button component.

```tsx
import { ThemeToggle } from '@fsi/ui';

<ThemeToggle />;
```

### Utility Components

#### `AuthGate`

Authentication gate component.

```tsx
import { AuthGate } from '@fsi/ui';

<AuthGate adminOnly={false}>
  <ProtectedContent />
</AuthGate>;
```

## Theme System

The UI library uses a comprehensive theme system that automatically adapts all components to light and dark themes. The theme is managed through the `ThemeProvider` and persists across sessions.

### Theme Colors

- **Primary**: `#04AA6D` (green)
- **Gray Scale**: Full gray palette with dark mode variants
- **Semantic Colors**: Success (green), Warning (yellow), Error (red), Info (blue)

### Dark Mode

Dark mode is automatically applied when the theme is set to 'dark'. All components include dark mode variants using Tailwind's `dark:` prefix.

## Usage Examples

### Basic Form

```tsx
import { Input, Textarea, Button, Card } from '@fsi/ui';

function ContactForm() {
  return (
    <Card className='max-w-md mx-auto'>
      <Input label='Name' placeholder='Your name' />
      <Input label='Email' type='email' placeholder='your@email.com' />
      <Textarea label='Message' placeholder='Your message' />
      <Button variant='primary'>Send Message</Button>
    </Card>
  );
}
```

### Dashboard Layout

```tsx
import { Card, H1, H2, Badge, Progress } from '@fsi/ui';

function Dashboard() {
  return (
    <div className='space-y-6'>
      <H1>Dashboard</H1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <H2>Total Users</H2>
          <Badge variant='primary'>1,234</Badge>
        </Card>

        <Card>
          <H2>Progress</H2>
          <Progress value={65} showLabel />
        </Card>
      </div>
    </div>
  );
}
```

## Development

### Running the Demo

To see all components in action, you can use the `ComponentDemo` component:

```tsx
import { ComponentDemo } from '@fsi/ui';

function DemoPage() {
  return <ComponentDemo />;
}
```

### Adding New Components

When adding new components:

1. Create the component in `packages/ui/components/`
2. Add theme support using Tailwind's `dark:` prefix
3. Export from `packages/ui/index.ts`
4. Add to the demo in `ComponentDemo.tsx`
5. Update this README

### Theme Guidelines

- Always use semantic color names (e.g., `text-gray-900 dark:text-gray-100`)
- Use the primary color for interactive elements
- Ensure sufficient contrast ratios in both themes
- Test components in both light and dark modes

## Contributing

1. Follow the existing code style and patterns
2. Ensure all components have theme support
3. Add proper TypeScript types
4. Include accessibility features
5. Test in both light and dark themes
6. Update the demo and documentation
