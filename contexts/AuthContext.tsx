'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.akafco.com';
      
      console.log('🔵 [LOGIN] Sending request to:', `${apiUrl}/api/auth/login`);
      console.log('🔵 [LOGIN] Email:', email);
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('🔵 [LOGIN] Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [LOGIN] Failed:', errorData);
        console.error('❌ [LOGIN] Error message:', errorData.message);
        return false;
      }

      const data = await response.json();
      console.log('✅ [LOGIN] Success! Response data:', data);
      console.log('✅ [LOGIN] User ID:', data.user?.id);
      console.log('✅ [LOGIN] User from database:', data.user);
      
      const userData = {
        email: data.user.email,
        name: data.user.name,
        plan: data.user.plan
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      
      console.log('✅ [LOGIN] User saved to localStorage');
      return true;
    } catch (error) {
      console.error('❌ [LOGIN] Network/Error:', error);
      return false;
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.akafco.com';
      
      console.log('🔵 [SIGNUP] Sending request to:', `${apiUrl}/api/auth/signup`);
      console.log('🔵 [SIGNUP] User data:', {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        restaurantName: userData.restaurantName,
        plan: userData.plan
      });
      
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          restaurantName: userData.restaurantName,
          plan: userData.plan,
          billingCycle: userData.billingCycle || 'monthly'
        }),
      });

      console.log('🔵 [SIGNUP] Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [SIGNUP] Failed:', errorData);
        console.error('❌ [SIGNUP] Error message:', errorData.message);
        
        // Throw error with message so it can be caught in the component
        const errorMessage = errorData.message || 'خطایی در ثبت نام رخ داد';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ [SIGNUP] Success! Response data:', data);
      console.log('✅ [SIGNUP] User ID:', data.user?.id);
      console.log('✅ [SIGNUP] User saved to database:', data.user);
      
      const newUser = {
        email: data.user.email,
        name: data.user.name,
        plan: data.user.plan
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', data.token);
      
      console.log('✅ [SIGNUP] User saved to localStorage');
      return true;
    } catch (error: any) {
      console.error('❌ [SIGNUP] Network/Error:', error);
      // Re-throw the error so component can catch it
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}




