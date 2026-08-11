import { apiClient } from './client';
import { ApiResponse, User } from '@vyom/types';
import { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from '@vyom/validations';

export const authApi = {
  register: (data: RegisterInput) =>
    apiClient.post<ApiResponse<{ user: User }>>('/auth/register', data),

  login: (data: LoginInput) =>
    apiClient.post<ApiResponse<{ accessToken: string; user: User }>>('/auth/login', data),

  logout: () => apiClient.post<ApiResponse>('/auth/logout'),

  refresh: () =>
    apiClient.post<ApiResponse<{ accessToken: string }>>('/auth/refresh'),

  verifyEmail: (token: string) =>
    apiClient.get<ApiResponse>(`/auth/verify-email?token=${token}`),

  forgotPassword: (data: ForgotPasswordInput) =>
    apiClient.post<ApiResponse>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordInput) =>
    apiClient.post<ApiResponse>('/auth/reset-password', data),

  getMe: () =>
    apiClient.get<ApiResponse<{ user: User }>>('/auth/me'),

  resendVerification: (email: string) =>
    apiClient.post<ApiResponse>('/auth/resend-verification', { email }),
};
