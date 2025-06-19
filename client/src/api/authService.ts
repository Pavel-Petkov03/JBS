import { apiClient } from './apiClient';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterCandidateData {
  email: string;
  password: string;
  name: string;
}

interface ResetPasswordData {
  email: string;
}

interface NewPasswordData {
  password: string;
}

interface RegisterEmployerData {
  password: string;
  name: string;
}

export const authService = {
  login: (data: LoginData) => apiClient.post('/auth/login', data),
  registerCandidate: (data: RegisterCandidateData) => apiClient.post('/auth/register-candidate', data),
  refreshToken: () => apiClient.post('/auth/refreshToken'),
  logout: () => apiClient.post('/auth/logout'),
  resetPassword: (data: ResetPasswordData) => apiClient.post('/auth/reset-password', data),
  getForgotPasswordPage: (token: string) => apiClient.get(`/auth/forgot-password?token=${token}`),
  submitNewPassword: (token: string, data: NewPasswordData) => 
    apiClient.post(`/auth/forgot-password?token=${token}`, data),
  registerManager: (data: { email: string; companyName: string }) => 
    apiClient.post('/auth/register-manager', data),
  getRegisterEmployerPage: (token: string) => 
    apiClient.get(`/auth/register-employer?token=${token}`),
  registerEmployer: (token: string, data: RegisterEmployerData) => 
    apiClient.post(`/auth/register-employer?token=${token}`, data),
};