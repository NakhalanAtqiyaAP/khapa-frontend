import React, { createContext, useState, useEffect, useContext } from 'react';
import { login } from '../services/api';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromStorage = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    console.log('Token:', storedToken);
    console.log('User:', storedUser);
    
    if (storedToken && storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Gagal parsing user:', error);
        clearAuthData();
      }
    } else {
      clearAuthData(); 
    }
  
    setLoading(false);
  };
  
  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      
      if (response && response.token) {
        // localStorage.setItem('token', response.token);
        // localStorage.setItem('user', JSON.stringify(response.user));
  
        setUser(response.user); 
        
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil!',
          showConfirmButton: false,
          timer: 1500
        });
        
        return true;
      }
  
      return false;
    } catch (error) {
      return false;
    }
  };
  

  const handleLogout = () => {
    clearAuthData();
    Swal.fire({
      icon: 'success',
      title: 'Logout Berhasil!',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      handleLogin, 
      handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan dalam AuthProvider');
  }
  return context;
};

export default AuthContext;