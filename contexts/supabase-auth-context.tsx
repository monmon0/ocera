
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type User = {
  id: string;
  email: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

type SupabaseAuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; needsSignup?: boolean }>;
  signUp: (email: string, name: string, password: string, referralCode: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(
  undefined,
);

export function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user session on mount
  useEffect(() => {
    const checkStoredSession = () => {
      try {
        const storedUser = localStorage.getItem('ocera_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('ocera_user');
      } finally {
        setLoading(false);
      }
    };

    checkStoredSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
        };
        
        setUser(userData);
        localStorage.setItem('ocera_user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error,
          needsSignup: data.needsSignup 
        };
      }
    } catch (error) {
      console.error('Error signing in:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, name: string, password: string, referralCode: string) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password, referralCode }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
        };
        
        setUser(userData);
        localStorage.setItem('ocera_user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error 
        };
      }
    } catch (error) {
      console.error('Error signing up:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      localStorage.removeItem('ocera_user');
      
      // Clear any session cookies if needed
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const refreshUser = async () => {
    try {
      if (!user) return;
      
      // Optionally refresh user data from the server
      // This could be useful if user data changes elsewhere
      const storedUser = localStorage.getItem('ocera_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useSupabaseAuth must be used within a SupabaseAuthProvider",
    );
  }
  return context;
}
