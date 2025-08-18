import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Convert axios request config to curl command string
 */
function requestToCurl(config: AxiosRequestConfig): string {
  const { method = 'GET', url, headers = {}, data } = config;

  let curl = `curl -X ${method.toUpperCase()}`;

  // Add headers
  Object.entries(headers).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      curl += ` -H "${key}: ${value}"`;
    }
  });

  // Add data/body
  if (data) {
    if (typeof data === 'string') {
      curl += ` -d '${data}'`;
    } else {
      curl += ` -d '${JSON.stringify(data)}'`;
    }
  }

  // Add URL
  curl += ` "${url}"`;

  return curl;
}

/**
 * Create axios instance with curl logging
 */
export function createHttpClient(baseURL?: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to log curl command
  instance.interceptors.request.use(
    config => {
      const curl = requestToCurl(config);
      console.log('🌐 API Request (curl):', curl);
      return config;
    },
    error => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor to log response
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`✅ API Response [${response.status}]:`, {
        url: response.config.url,
        method: response.config.method?.toUpperCase(),
        status: response.status,
        data: response.data,
      });
      return response;
    },
    error => {
      console.error('❌ Response Error:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      return Promise.reject(error);
    }
  );

  return instance;
}

/**
 * Default HTTP client instance
 */
export const httpClient = createHttpClient();

/**
 * HTTP client with custom base URL
 */
export function createApiClient(baseURL: string): AxiosInstance {
  return createHttpClient(baseURL);
}

/**
 * Common HTTP methods with curl logging
 */
export const http = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    httpClient.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.put<T>(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.patch<T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    httpClient.delete<T>(url, config),
};

export default httpClient;
