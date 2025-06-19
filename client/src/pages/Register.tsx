import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RegisterCandidateForm from '../components/auth/RegisterCandidateForm';

const Register = () => {
  const { registerCandidate } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (data: { email: string; password: string; name: string }) => {
    setLoading(true);
    setError('');
    try {
      await registerCandidate(data);
      navigate('/dashboard');
    } catch (err : any) {
      const message = err?.response?.data?.errors?.[0]?.msg || err.response.data.error;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <RegisterCandidateForm 
        onSubmit={handleRegister} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default Register;