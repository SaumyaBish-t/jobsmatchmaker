
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage token)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          // Verify token on backend in a real app
          // For now, we'll just decode and use the stored user info
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          if (userInfo) {
            setUser(userInfo);
          }
        } catch (error) {
          console.error('Error validating authentication token:', error);
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userInfo');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // This would be a real API call in a production app
      // For now, we'll simulate a successful response
      
      // Mock API call response
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simple validation (in a real app, this would be handled by the server)
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock response data (in a real app, this would come from the backend)
      const userData = {
        id: 'user-123',
        name: email.split('@')[0], // Just use part of email as name for demo
        email
      };
      
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      
      // Save to localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userInfo', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to log in');
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // This would be a real API call in a production app
      // For now, we'll simulate a successful registration
      
      // Mock validation
      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock successful registration
      const userData = {
        id: 'user-' + Math.random().toString(36).substring(2),
        name,
        email
      };
      
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      
      // Save to localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userInfo', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Remove token and user info from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
