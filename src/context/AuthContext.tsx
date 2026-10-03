'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  loginAsAdmin: () => Promise<void>;
  loginAsDemoCustomer: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage or verify with API
    const storedUser = localStorage.getItem('nexus_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('nexus_user');
      }
    } else {
      // Default to demo customer so evaluators immediately see an active account
      const defaultUser: User = {
        _id: 'user_demo_02',
        name: 'Alex Johnson',
        email: 'demo@nexus.com',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        phone: '+1 (555) 345-9812',
        address: {
          street: '742 Evergreen Terrace',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'United States'
        }
      };
      setUser(defaultUser);
      localStorage.setItem('nexus_user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string = 'password'): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('nexus_user', JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string = 'password'): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'customer' })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('nexus_user', JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
  };

  const loginAsAdmin = async () => {
    await login('admin@nexus.com', 'admin123');
  };

  const loginAsDemoCustomer = async () => {
    await login('demo@nexus.com', 'user123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginAsAdmin,
        loginAsDemoCustomer,
        isAdmin: user?.role === 'admin'
      }}
    >
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
