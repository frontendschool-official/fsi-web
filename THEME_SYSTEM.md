# Theme System Documentation

This document describes the theme system implementation in the Frontend School project.

## Overview

The theme system provides:

- Light and dark theme support
- Theme persistence across sessions
- Firebase sync for authenticated users
- System preference detection
- Smooth transitions between themes

## Architecture

### Core Components

1. **ThemeProvider** (`packages/ui/components/ThemeProvider.tsx`)

   - Manages theme state
   - Syncs with Firebase for authenticated users
   - Applies theme to HTML element
   - Provides theme context to child components

2. **ThemeToggle** (`packages/ui/components/ThemeToggle.tsx`)

   - Interactive toggle button
   - Shows loading state when not mounted
   - Triggers theme changes

3. **ThemeDebug** (`packages/ui/components/ThemeDebug.tsx`)
   - Debug panel showing theme state
   - Firebase sync status
   - Manual theme controls

### Database Integration

The theme system integrates with Firebase Firestore to sync user preferences:

#### User Document Structure

```typescript
{
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Timestamp;
  role: 'admin' | 'user';
  theme: 'light' | 'dark'; // NEW: Theme preference
  updatedAt: Timestamp; // NEW: Last update timestamp
}
```

#### Database Functions (`packages/config/db.ts`)

- `getUserTheme(user: User | null): Promise<Theme>`

  - Retrieves user's theme preference from Firebase
  - Returns 'light' as fallback if user not found or error occurs

- `updateUserTheme(user: User | null, theme: Theme): Promise<void>`
  - Updates user's theme preference in Firebase
  - Includes timestamp for tracking changes

## Theme Priority

The theme system follows this priority order:

1. **Firebase User Preference** (if user is authenticated)
2. **localStorage** (for immediate access and fallback)
3. **System Preference** (detected via `prefers-color-scheme`)
4. **Default** (light theme)

## Usage

### Basic Theme Usage

```tsx
import { useTheme } from '@fsi/ui';

function MyComponent() {
  const { theme, toggleTheme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
    >
      <button onClick={toggleTheme}>Current theme: {theme}</button>
    </div>
  );
}
```

### Theme Toggle Component

```tsx
import { ThemeToggle } from '@fsi/ui';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

### Debug Component

```tsx
import { ThemeDebug } from '@fsi/ui';

function DebugPage() {
  return (
    <div>
      <ThemeDebug />
    </div>
  );
}
```

## Firebase Sync Behavior

### For Authenticated Users

1. **On Login**: Theme preference is loaded from Firebase
2. **On Theme Change**: Preference is saved to both localStorage and Firebase
3. **On Logout**: Falls back to localStorage/system preference

### For Unauthenticated Users

1. **Theme Changes**: Only saved to localStorage
2. **No Firebase Sync**: No user document to sync with

### Error Handling

- If Firebase operations fail, the system falls back to localStorage
- Console errors are logged for debugging
- Theme functionality continues to work even if Firebase is unavailable

## CSS Classes

The theme system uses Tailwind's dark mode with the `class` strategy:

```css
/* Light theme (default) */
.bg-white {
  background-color: white;
}
.text-gray-900 {
  color: rgb(17 24 39);
}

/* Dark theme (when .dark class is present on html element) */
.dark .bg-white {
  background-color: rgb(17 24 39);
}
.dark .text-gray-900 {
  color: white;
}
```

## Primary Colors

The system includes a custom primary color palette:

```css
.bg-primary-50 {
  background-color: #f0fdf4;
}
.bg-primary-100 {
  background-color: #dcfce7;
}
.bg-primary-200 {
  background-color: #bbf7d0;
}
.bg-primary-300 {
  background-color: #86efac;
}
.bg-primary-400 {
  background-color: #4ade80;
}
.bg-primary-500 {
  background-color: #04aa6d;
} /* Main brand color */
.bg-primary-600 {
  background-color: #059669;
}
.bg-primary-700 {
  background-color: #047857;
}
.bg-primary-800 {
  background-color: #065f46;
}
.bg-primary-900 {
  background-color: #064e3b;
}
```

## Configuration

### Tailwind Config

Both apps use the shared Tailwind preset:

```javascript
// apps/consumer/tailwind.config.js
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,tsx}'),
    join(__dirname, '../../packages/ui/**/*.{ts,tsx}'),
  ],
  presets: [require('../../packages/ui/tailwind-preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          /* ... */
        },
      },
    },
  },
};
```

### Theme Preset

The shared theme configuration is in `packages/ui/tailwind-preset.js`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          /* ... */
        },
      },
      boxShadow: {
        theme: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'theme-lg':
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'theme-xl':
          '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
};
```

## Testing

### Manual Testing

1. **Theme Toggle**: Click the theme toggle button in the header
2. **Firebase Sync**: Sign in and change theme, then check Firebase console
3. **Cross-device**: Sign in on different devices to verify sync
4. **Offline**: Test theme persistence when offline

### Debug Information

The ThemeDebug component shows:

- Current theme
- User authentication status
- Firebase sync status
- HTML element classes
- localStorage value

## Troubleshooting

### Common Issues

1. **Theme not applying**: Check if `dark` class is present on HTML element
2. **Firebase sync not working**: Verify user authentication and Firestore permissions
3. **Primary colors not showing**: Ensure Tailwind config includes the preset
4. **Hydration mismatch**: Check for SSR/client differences in theme detection

### Debug Steps

1. Open browser console and look for theme-related logs
2. Check ThemeDebug component for current state
3. Verify Firebase user document has `theme` field
4. Test with and without authentication

## Future Enhancements

- [ ] Theme presets (custom color schemes)
- [ ] Automatic theme detection based on time
- [ ] Theme transition animations
- [ ] Per-page theme overrides
- [ ] Theme export/import functionality
