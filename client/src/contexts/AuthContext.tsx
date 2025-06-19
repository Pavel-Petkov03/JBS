// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/auth';
import { authService } from '../api/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  registerCandidate: (data: { email: string; password: string; name: string }) => Promise<void>;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  registerCandidate: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authService.refreshToken();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    console.log('AuthContext.login called with:');
    const response = await authService.login(data);
    setUser(response.data.user);
    localStorage.setItem('accessToken', response.data.accessToken);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  const registerCandidate = async (data: { email: string; password: string; name: string }) => {
    const response = await authService.registerCandidate(data);
    setUser(response.data.user);
    localStorage.setItem('accessToken', response.data.accessToken);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    registerCandidate,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};