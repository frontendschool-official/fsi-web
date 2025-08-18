'use client';

import { useState } from 'react';
import { Button, Card, Typography, H1, H2, H3, Textarea } from '@fsi/ui';
import { http, createApiClient } from '@config/http';
import { SimpleApiResponse } from '@config/typings/types';

export default function ApiDemoPage() {
  const [responses, setResponses] = useState<SimpleApiResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(
    '{"name": "John Doe", "email": "john@example.com"}'
  );
  const [putData, setPutData] = useState(
    '{"id": 1, "name": "Jane Doe", "email": "jane@example.com"}'
  );

  const addResponse = (response: SimpleApiResponse) => {
    setResponses(prev => [response, ...prev.slice(0, 4)]); // Keep last 5 responses
  };

  const handleGet = async () => {
    setLoading(true);
    try {
      const response = await http.get<SimpleApiResponse>('/api/test');
      addResponse(response.data);
    } catch (error) {
      console.error('GET request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    setLoading(true);
    try {
      const data = JSON.parse(postData);
      const response = await http.post<SimpleApiResponse>('/api/test', data);
      addResponse(response.data);
    } catch (error) {
      console.error('POST request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePut = async () => {
    setLoading(true);
    try {
      const data = JSON.parse(putData);
      const response = await http.put<SimpleApiResponse>('/api/test', data);
      addResponse(response.data);
    } catch (error) {
      console.error('PUT request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await http.delete<SimpleApiResponse>('/api/test');
      addResponse(response.data);
    } catch (error) {
      console.error('DELETE request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExternalApi = async () => {
    setLoading(true);
    try {
      // Example with external API
      const response = await http.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
      addResponse({
        message: 'External API call successful',
        timestamp: new Date().toISOString(),
        method: 'GET',
        receivedData: response.data,
      });
    } catch (error) {
      console.error('External API request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomClient = async () => {
    setLoading(true);
    try {
      // Example with custom API client
      const customClient = createApiClient(
        'https://jsonplaceholder.typicode.com'
      );
      const response = await customClient.get('/users/1');
      addResponse({
        message: 'Custom client API call successful',
        timestamp: new Date().toISOString(),
        method: 'GET',
        receivedData: response.data,
      });
    } catch (error) {
      console.error('Custom client request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <H1>Axios with Curl Logging Demo</H1>

      <Card className='mb-8'>
        <H2>How it works</H2>
        <Typography>
          This demo showcases the axios setup with automatic curl logging. Every
          API call will:
        </Typography>
        <ul className='list-disc list-inside mt-2 space-y-1'>
          <li>Log the equivalent curl command to the console</li>
          <li>Log the response details</li>
          <li>Handle errors gracefully</li>
        </ul>
        <Typography className='mt-4 text-sm text-gray-600'>
          Open your browser&apos;s developer console to see the curl commands
          and API responses.
        </Typography>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {/* Local API Tests */}
        <Card>
          <H3>Local API Tests</H3>
          <div className='space-y-4'>
            <Button onClick={handleGet} disabled={loading} className='w-full'>
              Test GET /api/test
            </Button>

            <div>
              <Typography className='mb-2'>POST Data (JSON):</Typography>
              <Textarea
                value={postData}
                onChange={e => setPostData(e.target.value)}
                placeholder='Enter JSON data for POST request'
                rows={3}
              />
              <Button
                onClick={handlePost}
                disabled={loading}
                className='w-full mt-2'
              >
                Test POST /api/test
              </Button>
            </div>

            <div>
              <Typography className='mb-2'>PUT Data (JSON):</Typography>
              <Textarea
                value={putData}
                onChange={e => setPutData(e.target.value)}
                placeholder='Enter JSON data for PUT request'
                rows={3}
              />
              <Button
                onClick={handlePut}
                disabled={loading}
                className='w-full mt-2'
              >
                Test PUT /api/test
              </Button>
            </div>

            <Button
              onClick={handleDelete}
              disabled={loading}
              className='w-full'
            >
              Test DELETE /api/test
            </Button>
          </div>
        </Card>

        {/* External API Tests */}
        <Card>
          <H3>External API Tests</H3>
          <div className='space-y-4'>
            <Button
              onClick={handleExternalApi}
              disabled={loading}
              className='w-full'
            >
              Test External API (JSONPlaceholder)
            </Button>

            <Button
              onClick={handleCustomClient}
              disabled={loading}
              className='w-full'
            >
              Test Custom API Client
            </Button>
          </div>
        </Card>
      </div>

      {/* Response History */}
      <Card>
        <H3>Response History</H3>
        {responses.length === 0 ? (
          <Typography className='text-gray-500'>
            No responses yet. Make an API call to see results here.
          </Typography>
        ) : (
          <div className='space-y-4'>
            {responses.map((response, index) => (
              <div key={index} className='border rounded p-4 bg-gray-50'>
                <div className='flex justify-between items-start mb-2'>
                  <Typography className='font-semibold'>
                    {response.message}
                  </Typography>
                  <Typography className='text-sm text-gray-500'>
                    {response.method}
                  </Typography>
                </div>
                <Typography className='text-sm text-gray-600 mb-2'>
                  {new Date(response.timestamp).toLocaleString()}
                </Typography>
                {response.receivedData && (
                  <pre className='text-xs bg-white p-2 rounded border overflow-auto'>
                    {JSON.stringify(response.receivedData, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
