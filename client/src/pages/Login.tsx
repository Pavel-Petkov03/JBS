import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login({email, password});
      navigate('/dashboard');
    } catch (err : any) {
      const message = err?.response?.data?.errors?.[0]?.msg || err.response.data.error;
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}
        
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <LoginForm onSubmit={handleLogin} />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
