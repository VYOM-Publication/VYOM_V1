import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,       // send HttpOnly refresh token cookie
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

function processQueue(token: string) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

// Attach access token from in-memory store on every request
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = window.__VYOM_ACCESS_TOKEN__;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 — silent refresh flow
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await apiClient.post('/auth/refresh');
        const newToken = data.data?.accessToken as string;
        if (typeof window !== 'undefined') {
          window.__VYOM_ACCESS_TOKEN__ = newToken;
        }
        processQueue(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch {
        // Refresh failed — clear token and redirect to login
        if (typeof window !== 'undefined') {
          window.__VYOM_ACCESS_TOKEN__ = undefined;
          window.location.href = '/login';
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// Extend Window type for in-memory token storage
declare global {
  interface Window {
    __VYOM_ACCESS_TOKEN__?: string;
  }
}
