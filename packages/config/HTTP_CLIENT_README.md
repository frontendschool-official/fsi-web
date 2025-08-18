# HTTP Client with Curl Logging

This package provides a configured axios instance with automatic curl logging for all API calls. Every HTTP request will automatically log the equivalent curl command to the console for easy debugging and API testing.

## Features

- ✅ **Automatic curl logging** - Every request logs the equivalent curl command
- ✅ **Response logging** - Detailed response information with status codes
- ✅ **Error handling** - Comprehensive error logging
- ✅ **TypeScript support** - Full type safety
- ✅ **Customizable** - Create custom clients with different base URLs
- ✅ **Production ready** - Proper timeout and header configuration

## Quick Start

### Basic Usage

```typescript
import { http } from '@config/http';

// GET request
const response = await http.get('/api/users');

// POST request with data
const response = await http.post('/api/users', {
  name: 'John Doe',
  email: 'john@example.com',
});

// PUT request
const response = await http.put('/api/users/1', {
  name: 'Jane Doe',
});

// DELETE request
const response = await http.delete('/api/users/1');
```

### Custom API Client

```typescript
import { createApiClient } from '@config/http';

// Create a client for a specific API
const apiClient = createApiClient('https://api.example.com');

const response = await apiClient.get('/v1/users');
```

### Direct Client Usage

```typescript
import { httpClient } from '@config/http';

const response = await httpClient.get('/api/data', {
  headers: {
    Authorization: 'Bearer your-token-here',
  },
});
```

## Console Output

Every API call will automatically log to the console:

### Request Log

```
🌐 API Request (curl): curl -X GET -H "Content-Type: application/json" "http://localhost:3000/api/users"
```

### Response Log

```
✅ API Response [200]: {
  url: "http://localhost:3000/api/users",
  method: "GET",
  status: 200,
  data: { users: [...] }
}
```

### Error Log

```
❌ Response Error: {
  url: "http://localhost:3000/api/nonexistent",
  method: "GET",
  status: 404,
  message: "Request failed with status code 404",
  data: { error: "Not found" }
}
```

## Configuration

The HTTP client comes with sensible defaults:

- **Timeout**: 10 seconds
- **Default headers**: `Content-Type: application/json`
- **Base URL**: None (relative URLs)

### Custom Configuration

```typescript
import { createHttpClient } from '@config/http';

const customClient = createHttpClient('https://api.example.com');

// The client will automatically log curl commands for all requests
const response = await customClient.get('/v1/data');
```

## Error Handling

The client provides comprehensive error handling:

```typescript
try {
  const response = await http.get('/api/users');
  console.log('Success:', response.data);
} catch (error: any) {
  if (error.response) {
    // Server responded with error status
    console.error('Server error:', {
      status: error.response.status,
      data: error.response.data,
    });
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network error:', error.request);
  } else {
    // Something else happened
    console.error('Error:', error.message);
  }
}
```

## TypeScript Support

Full TypeScript support with generic types:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Typed response
const response = await http.get<ApiResponse<User[]>>('/api/users');
const users = response.data.data; // Typed as User[]
```

## Examples

See `http-examples.ts` for comprehensive usage examples including:

- Basic HTTP methods
- Custom API clients
- Error handling patterns
- Request configuration
- TypeScript with typed responses
- Batch requests

## Demo Page

Visit `/api-demo` in the consumer app to see the HTTP client in action with a live demo interface.

## Best Practices

1. **Use the shared client**: Import from `@config/http` to ensure consistent logging
2. **Handle errors**: Always wrap API calls in try-catch blocks
3. **Type your responses**: Use TypeScript generics for better type safety
4. **Check console**: Monitor the curl logs for debugging and API testing
5. **Custom clients**: Use `createApiClient()` for different API endpoints

## Troubleshooting

### Curl command not appearing

- Ensure you're importing from `@config/http` and not using axios directly
- Check that the request is actually being made (network tab)
- Verify console logging is enabled in your browser

### TypeScript errors

- Make sure you're using the correct import path: `@config/http`
- Check that your response types match the expected interface
- Use generic types for better type safety

### Network errors

- Check the browser's network tab for actual HTTP requests
- Verify the API endpoint is accessible
- Check CORS configuration if calling external APIs
