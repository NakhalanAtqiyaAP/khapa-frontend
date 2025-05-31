import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await handleLogin(credentials);
      if (success) {
        navigate('/home'); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-win-gray">
      <div className="window" style={{ width: '320px' }}>
        <div className="win-title-bar">
          <div className="flex items-center">
            <div className="win-icon mr-2">🔒</div>
            <span>Login to RetroSite</span>
          </div>
        </div>
        <div className="win-content p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="win-input w-full"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block mb-1">Password:</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="win-input w-full"
                required
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              className="win-button w-full flex justify-center"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;