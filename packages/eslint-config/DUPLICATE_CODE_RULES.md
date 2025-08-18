# Duplicate Code Detection Rules

This ESLint configuration includes comprehensive duplicate code detection using the SonarJS plugin. These rules help maintain code quality by identifying and preventing code duplication.

## Installed Rules

### 1. **sonarjs/no-duplicate-string** (Error)

- **Threshold**: 3 occurrences
- **Purpose**: Detects when the same string literal is duplicated 3 or more times
- **Example**:

  ```typescript
  // ❌ Bad - String duplicated 3 times
  const message1 = 'This is a very long string that might be duplicated';
  const message2 = 'This is a very long string that might be duplicated';
  const message3 = 'This is a very long string that might be duplicated';

  // ✅ Good - Use a constant
  const DUPLICATE_MESSAGE =
    'This is a very long string that might be duplicated';
  const message1 = DUPLICATE_MESSAGE;
  const message2 = DUPLICATE_MESSAGE;
  const message3 = DUPLICATE_MESSAGE;
  ```

### 2. **sonarjs/no-identical-functions** (Error)

- **Purpose**: Detects when two functions have identical implementations
- **Example**:

  ```typescript
  // ❌ Bad - Identical functions
  function getGreeting1() {
    return 'Hello World';
  }

  function getGreeting2() {
    return 'Hello World';
  }

  // ✅ Good - Single function or different implementations
  function getGreeting() {
    return 'Hello World';
  }
  ```

### 3. **sonarjs/no-identical-expressions** (Error)

- **Purpose**: Detects when the same expression is used multiple times
- **Example**:

  ```typescript
  // ❌ Bad - Identical expressions
  const result1 = 1 + 2 + 3;
  const result2 = 1 + 2 + 3;

  // ✅ Good - Calculate once and reuse
  const calculation = 1 + 2 + 3;
  const result1 = calculation;
  const result2 = calculation;
  ```

### 4. **sonarjs/cognitive-complexity** (Error)

- **Threshold**: 15
- **Purpose**: Limits the cognitive complexity of functions to maintain readability
- **Example**:

  ```typescript
  // ❌ Bad - High cognitive complexity
  function complexFunction(a: number, b: number, c: number) {
    if (a > 0) {
      if (b > 0) {
        if (c > 0) {
          if (a + b > c) {
            if (a + c > b) {
              if (b + c > a) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  // ✅ Good - Simplified logic
  function isTriangle(a: number, b: number, c: number) {
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
  }
  ```

### 5. **sonarjs/no-all-duplicated-branches** (Error)

- **Purpose**: Detects when all branches of a conditional statement are identical
- **Example**:

  ```typescript
  // ❌ Bad - All branches are identical
  if (condition) {
    doSomething();
  } else {
    doSomething();
  }

  // ✅ Good - Single execution
  doSomething();
  ```

### 6. **sonarjs/no-element-overwrite** (Error)

- **Purpose**: Detects when an array element is overwritten immediately after assignment
- **Example**:

  ```typescript
  // ❌ Bad - Element overwritten
  const arr = [1, 2, 3];
  arr[0] = 4;
  arr[0] = 5; // Overwrites immediately

  // ✅ Good - Direct assignment
  const arr = [1, 2, 3];
  arr[0] = 5;
  ```

### 7. **sonarjs/no-one-iteration-loop** (Error)

- **Purpose**: Detects loops that will only execute once
- **Example**:

  ```typescript
  // ❌ Bad - Loop with only one iteration
  for (let i = 0; i < 1; i++) {
    doSomething();
  }

  // ✅ Good - Direct execution
  doSomething();
  ```

### 8. **sonarjs/prefer-immediate-return** (Error)

- **Purpose**: Encourages immediate returns instead of storing values in variables
- **Example**:

  ```typescript
  // ❌ Bad - Unnecessary variable
  function getValue() {
    const result = 42;
    return result;
  }

  // ✅ Good - Immediate return
  function getValue() {
    return 42;
  }
  ```

### 9. **sonarjs/prefer-single-boolean-return** (Error)

- **Purpose**: Encourages single boolean returns instead of if-else statements
- **Example**:

  ```typescript
  // ❌ Bad - If-else for boolean return
  function isValid(value: string) {
    if (value.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // ✅ Good - Single boolean expression
  function isValid(value: string) {
    return value.length > 0;
  }
  ```

## Additional Code Quality Rules

The configuration also includes several other SonarJS rules for maintaining code quality:

- **sonarjs/no-use-of-empty-return-value**: Detects unused return values
- **sonarjs/no-redundant-boolean**: Detects redundant boolean operations
- **sonarjs/no-redundant-jump**: Detects unnecessary break/continue statements
- **sonarjs/no-small-switch**: Detects switch statements with too few cases
- **sonarjs/no-useless-catch**: Detects catch blocks that don't handle errors
- **sonarjs/prefer-object-literal**: Encourages object literals over constructors
- **sonarjs/prefer-while**: Encourages while loops over for loops when appropriate

## Benefits

1. **Code Maintainability**: Reduces code duplication, making maintenance easier
2. **Bug Prevention**: Identifies potential issues early in development
3. **Performance**: Encourages efficient code patterns
4. **Readability**: Promotes cleaner, more readable code
5. **Consistency**: Ensures consistent coding patterns across the project

## Usage

These rules are automatically applied when you run:

```bash
pnpm lint
```

The rules will highlight duplicate code and other code smells in your editor and during the linting process, helping you maintain high code quality standards.
