/**
 * Example usage patterns for the HTTP client with curl logging
 *
 * This file demonstrates different ways to use the axios setup with curl logging.
 * Each example will automatically log the equivalent curl command to the console.
 */

import { http, createApiClient, httpClient } from './http';

// Example 1: Basic HTTP methods
export async function basicHttpExamples() {
  try {
    // GET request
    const getResponse = await http.get('/api/users');
    console.log('GET response:', getResponse.data);

    // POST request with data
    const postResponse = await http.post('/api/users', {
      name: 'John Doe',
      email: 'john@example.com',
    });
    console.log('POST response:', postResponse.data);

    // PUT request with data
    const putResponse = await http.put('/api/users/1', {
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
    console.log('PUT response:', putResponse.data);

    // DELETE request
    const deleteResponse = await http.delete('/api/users/1');
    console.log('DELETE response:', deleteResponse.data);
  } catch (error) {
    console.error('HTTP request failed:', error);
  }
}

// Example 2: Custom API client with base URL
export async function customApiClientExample() {
  // Create a client for a specific API
  const apiClient = createApiClient('https://api.example.com');

  try {
    const response = await apiClient.get('/v1/users');
    console.log('Custom client response:', response.data);
  } catch (error) {
    console.error('Custom client request failed:', error);
  }
}

// Example 3: Using the default httpClient directly
export async function directHttpClientExample() {
  try {
    const response = await httpClient.get('/api/data', {
      headers: {
        Authorization: 'Bearer your-token-here',
        'Custom-Header': 'custom-value',
      },
    });
    console.log('Direct client response:', response.data);
  } catch (error) {
    console.error('Direct client request failed:', error);
  }
}

// Example 4: Error handling with try-catch
export async function errorHandlingExample() {
  try {
    const response = await http.get('/api/nonexistent-endpoint');
    console.log('Response:', response.data);
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
}

// Example 5: Request with custom configuration
export async function customConfigExample() {
  try {
    const response = await http.post(
      '/api/upload',
      {
        file: 'data.csv',
        type: 'csv',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'your-api-key',
        },
        timeout: 30000, // 30 seconds
        params: {
          version: 'v2',
          format: 'json',
        },
      }
    );
    console.log('Custom config response:', response.data);
  } catch (error) {
    console.error('Custom config request failed:', error);
  }
}

// Example 6: TypeScript with typed responses
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

export async function typedResponseExample() {
  try {
    const response = await http.get<ApiResponse<User[]>>('/api/users');
    const users = response.data.data; // Typed as User[]
    console.log('Typed response:', users);
  } catch (error) {
    console.error('Typed request failed:', error);
  }
}

// Example 7: Batch requests
export async function batchRequestsExample() {
  try {
    const promises = [
      http.get('/api/users'),
      http.get('/api/posts'),
      http.get('/api/comments'),
    ];

    const [usersResponse, postsResponse, commentsResponse] = await Promise.all(
      promises
    );

    console.log('Batch responses:', {
      users: usersResponse.data,
      posts: postsResponse.data,
      comments: commentsResponse.data,
    });
  } catch (error) {
    console.error('Batch requests failed:', error);
  }
}
