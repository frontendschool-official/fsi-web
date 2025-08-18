# Zustand State Management

This document explains how to use Zustand for state management in the fsi-web project.

## Overview

Zustand is a lightweight state management library that provides a simple and intuitive API for managing application state. We've set up several stores to handle different aspects of the application:

- **User Store**: Authentication state and user data
- **UI Store**: Global UI state (theme, sidebar, notifications)
- **Problem Store**: Coding problems and problem-related state
- **Progress Store**: User progress tracking

## Stores

### User Store (`useUserStore`)

Manages authentication state and user data.

```typescript
import { useUserStore } from '@config/stores';

// In a component
const { user, isLoading, isInitialized, setUser, signOut } = useUserStore();
```

**State:**

- `user`: Current Firebase user or null
- `isLoading`: Whether auth state is loading
- `isInitialized`: Whether auth has been initialized

**Actions:**

- `setUser(user)`: Set the current user
- `setLoading(loading)`: Set loading state
- `setInitialized(initialized)`: Set initialization state
- `signOut()`: Clear user data

### UI Store (`useUIStore`)

Manages global UI state including theme, sidebar, and notifications.

```typescript
import { useUIStore } from '@config/stores';

// In a component
const {
  theme,
  sidebarOpen,
  notifications,
  setTheme,
  toggleSidebar,
  addNotification,
} = useUIStore();
```

**State:**

- `theme`: Current theme ('light' | 'dark' | 'system')
- `sidebarOpen`: Whether sidebar is open
- `notifications`: Array of active notifications

**Actions:**

- `setTheme(theme)`: Set the theme
- `toggleSidebar()`: Toggle sidebar state
- `setSidebarOpen(open)`: Set sidebar state
- `addNotification(notification)`: Add a notification
- `removeNotification(id)`: Remove a notification
- `clearNotifications()`: Clear all notifications

### Problem Store (`useProblemStore`)

Manages coding problems and problem-related state.

```typescript
import { useProblemStore } from '@config/stores';

// In a component
const {
  problems,
  currentProblem,
  isLoading,
  setProblems,
  setCurrentProblem,
  addProblem,
} = useProblemStore();
```

**State:**

- `problems`: Array of all problems
- `currentProblem`: Currently selected problem
- `isLoading`: Whether problems are loading
- `error`: Error message if any

**Actions:**

- `setProblems(problems)`: Set all problems
- `setCurrentProblem(problem)`: Set current problem
- `setLoading(loading)`: Set loading state
- `setError(error)`: Set error state
- `addProblem(problem)`: Add a new problem
- `updateProblem(id, updates)`: Update a problem
- `removeProblem(id)`: Remove a problem

### Progress Store (`useProgressStore`)

Manages user progress tracking.

```typescript
import { useProgressStore } from '@config/stores';

// In a component
const { userProgress, updateProgress, getProgress, getCompletedProblems } =
  useProgressStore();
```

**State:**

- `userProgress`: Object mapping problem IDs to progress data
- `isLoading`: Whether progress is loading
- `error`: Error message if any

**Actions:**

- `setUserProgress(progress)`: Set all user progress
- `updateProgress(problemId, progress)`: Update progress for a problem
- `getProgress(problemId)`: Get progress for a specific problem
- `getCompletedProblems()`: Get array of completed problem IDs
- `getInProgressProblems()`: Get array of in-progress problem IDs

## Custom Hooks

We provide several custom hooks that combine multiple stores for common use cases:

### `useAuthSync()`

Syncs Firebase auth state with the user store.

```typescript
import { useAuthSync } from '@config/hooks';

// In your app root or auth component
const { user, loading, error } = useAuthSync();
```

### `useCurrentUser()`

Gets current user with loading state.

```typescript
import { useCurrentUser } from '@config/hooks';

// In a component
const { user, isLoading, isInitialized } = useCurrentUser();
```

### `useTheme()`

Gets theme state and controls.

```typescript
import { useTheme } from '@config/hooks';

// In a component
const { theme, setTheme } = useTheme();
```

### `useSidebar()`

Gets sidebar state and controls.

```typescript
import { useSidebar } from '@config/hooks';

// In a component
const { sidebarOpen, toggleSidebar, setSidebarOpen } = useSidebar();
```

### `useNotifications()`

Gets notifications and notification controls.

```typescript
import { useNotifications } from '@config/hooks';

// In a component
const {
  notifications,
  addNotification,
  removeNotification,
  clearNotifications,
} = useNotifications();

// Add a notification
addNotification({
  type: 'success',
  message: 'Operation completed successfully!',
  duration: 5000, // Auto-remove after 5 seconds
});
```

### `useProblems()`

Gets problem-related state and actions.

```typescript
import { useProblems } from '@config/hooks';

// In a component
const { problems, currentProblem, isLoading, setProblems, setCurrentProblem } =
  useProblems();
```

### `useUserProgress()`

Gets user progress with current user context.

```typescript
import { useUserProgress } from '@config/hooks';

// In a component
const { userProgress, updateProgress, getProgress, getCompletedProblems } =
  useUserProgress();

// Update progress for a problem
updateProgress('problem-123', {
  status: 'completed',
  attempts: 3,
  bestScore: 95,
  completedAt: new Date(),
});
```

### `useProblemWithProgress(problemId)`

Gets a specific problem with its progress.

```typescript
import { useProblemWithProgress } from '@config/hooks';

// In a component
const { problem, progress } = useProblemWithProgress('problem-123');
```

### `useProblemsWithProgress()`

Gets all problems with their progress.

```typescript
import { useProblemsWithProgress } from '@config/hooks';

// In a component
const problemsWithProgress = useProblemsWithProgress();
```

## Usage Examples

### Basic Store Usage

```typescript
import { useUserStore, useUIStore } from '@config/stores';

function MyComponent() {
  const { user } = useUserStore();
  const { theme, setTheme } = useUIStore();

  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={() => setTheme('dark')}>Switch to Dark Mode</button>
    </div>
  );
}
```

### Using Custom Hooks

```typescript
import { useCurrentUser, useNotifications } from '@config/hooks';

function Dashboard() {
  const { user, isLoading } = useCurrentUser();
  const { addNotification } = useNotifications();

  const handleCompleteTask = () => {
    // Do something
    addNotification({
      type: 'success',
      message: 'Task completed!',
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleCompleteTask}>Complete Task</button>
    </div>
  );
}
```

### Working with Problems and Progress

```typescript
import { useProblemsWithProgress, useUserProgress } from '@config/hooks';

function ProblemList() {
  const problemsWithProgress = useProblemsWithProgress();
  const { updateProgress } = useUserProgress();

  const handleStartProblem = (problemId: string) => {
    updateProgress(problemId, {
      status: 'in_progress',
      attempts: 1,
      lastAttempted: new Date(),
    });
  };

  return (
    <div>
      {problemsWithProgress.map(({ problem, progress }) => (
        <div key={problem.id}>
          <h3>{problem.title}</h3>
          <p>Status: {progress?.status || 'not_started'}</p>
          <button onClick={() => handleStartProblem(problem.id)}>
            Start Problem
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Persistence

Some stores use Zustand's persist middleware to save state to localStorage:

- **User Store**: Persists user data
- **UI Store**: Persists theme preference
- **Progress Store**: Persists user progress

This ensures that user preferences and progress are maintained across browser sessions.

## DevTools

All stores include Zustand devtools for debugging. You can install the Redux DevTools browser extension to inspect store state and actions in development.

## Best Practices

1. **Use custom hooks**: Prefer the custom hooks over directly accessing stores when possible
2. **Keep stores focused**: Each store should handle a specific domain
3. **Use TypeScript**: All stores are fully typed for better development experience
4. **Handle loading states**: Always check loading states before rendering data
5. **Use notifications**: Use the notification system for user feedback
6. **Persist important data**: Use persistence for user preferences and progress

## Demo Component

You can import and use the `ZustandDemo` component to see all stores in action:

```typescript
import { ZustandDemo } from '@fsi/ui';

function DemoPage() {
  return <ZustandDemo />;
}
```

This component demonstrates all the stores and their interactions.
