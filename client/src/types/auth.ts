export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer' | 'manager';
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterCandidateFormData {
  email: string;
  password: string;
  name: string;
}

export interface RegisterEmployerFormData {
  email: string;
  password: string;
  name: string;
  companyName: string;
}