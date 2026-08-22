import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('hireshield_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Verify current session on mount or token change
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('hireshield_token');
      if (!storedToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setToken(storedToken);
        } else {
          // Token expired or invalid
          localStorage.removeItem('hireshield_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.warn('Could not verify auth session with server:', err);
        // Don't discard token immediately on temporary network error, but mark loaded
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  // Sign in with Email & Password
  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Sign in failed. Please check your credentials.');
      }

      localStorage.setItem('hireshield_token', data.access_token);
      setToken(data.access_token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with Name, Email & Password
  const signup = async (name, email, password) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Account registration failed.');
      }

      localStorage.setItem('hireshield_token', data.access_token);
      setToken(data.access_token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Login
  const loginWithGoogle = async (credential) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Google sign-in failed.');
      }

      localStorage.setItem('hireshield_token', data.access_token);
      setToken(data.access_token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' });
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('hireshield_token');
      setToken(null);
      setUser(null);
      setAuthError(null);
    }
  };

  // Update user state directly
  const updateUser = useCallback((updatedUserData) => {
    setUser(prev => {
      if (!prev) return updatedUserData;
      return { ...prev, ...updatedUserData };
    });
  }, []);

  // Re-fetch user profile from backend
  const refreshUser = useCallback(async () => {
    const currentToken = token || localStorage.getItem('hireshield_token');
    if (!currentToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (err) {
      console.warn('Could not refresh user:', err);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{
      user,
      token: token || localStorage.getItem('hireshield_token'),
      isLoading,
      authError,
      login,
      signup,
      loginWithGoogle,
      logout,
      updateUser,
      refreshUser,
      clearError,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
