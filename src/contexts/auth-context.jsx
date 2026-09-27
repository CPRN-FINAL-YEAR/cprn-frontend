'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      refreshUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const refreshUser = async (currentToken) => {
    try {
      const userData = await fetchApi('/api/auth/me');
      setUser(userData);
    } catch (error) {
      // Token expired or invalid — silently clear session
      logout(false);
    } finally {
      setLoading(false);
    }
  };

  // Used by verify-email page to auto-login after verification
  const loginWithToken = async (accessToken) => {
    localStorage.setItem('token', accessToken);
    setToken(accessToken);
    await refreshUser(accessToken);
    router.push('/');
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetchApi('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const accessToken = response.access_token;
      localStorage.setItem('token', accessToken);
      setToken(accessToken);
      await refreshUser(accessToken);
      router.push('/');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (email, password, name, posterType = 'individual', orgName = null) => {
    setLoading(true);
    try {
      const response = await fetchApi('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, poster_type: posterType, org_name: orgName }),
      });
      // Backend now returns a JWT directly — auto-login the user
      const accessToken = response.access_token;
      localStorage.setItem('token', accessToken);
      setToken(accessToken);
      await refreshUser(accessToken);
      router.push('/');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (credential) => {
    setLoading(true);
    try {
      const response = await fetchApi('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ token: credential }),
      });

      const accessToken = response.access_token;
      localStorage.setItem('token', accessToken);
      setToken(accessToken);
      await refreshUser(accessToken);
      router.push('/');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = (redirect = true) => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    if (redirect) {
      router.push('/auth/login');
    }
  };

  // Protected routes check
  useEffect(() => {
    if (!loading && !user) {
      const protectedPaths = ['/create', '/messages'];
      if (protectedPaths.some(p => pathname.startsWith(p))) {
        router.push('/auth/login');
      }
    }
  }, [loading, user, pathname, router]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      loading,
      login,
      loginWithToken,
      register,
      googleLogin,
      logout,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
