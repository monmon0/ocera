
"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

  // Check for existing session and validate user
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check localStorage first
        const storedUser = localStorage.getItem('ocera_user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            
            // Validate user still exists in database
            const { data: dbUser, error } = await supabase
              .from('users')
              .select('id, email, name, created_at, updated_at')
              .eq('id', parsedUser.id)
              .single();

            if (!error && dbUser) {
              const userData: User = {
                id: dbUser.id,
                email: dbUser.email,
                name: dbUser.name,
                created_at: dbUser.created_at,
                updated_at: dbUser.updated_at,
              };
              setUser(userData);
              localStorage.setItem('ocera_user', JSON.stringify(userData));
            } else {
              // User doesn't exist in DB anymore, clear localStorage
              localStorage.removeItem('ocera_user');
              setUser(null);
            }
          } catch (parseError) {
            console.error('Error parsing stored user:', parseError);
            localStorage.removeItem('ocera_user');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
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
        // Fetch full user data from Supabase
        const { data: dbUser, error } = await supabase
          .from('users')
          .select('id, email, name, created_at, updated_at')
          .eq('id', data.user.id)
          .single();

        if (!error && dbUser) {
          const userData: User = {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            created_at: dbUser.created_at,
            updated_at: dbUser.updated_at,
          };
          
          setUser(userData);
          localStorage.setItem('ocera_user', JSON.stringify(userData));
          
          return { success: true };
        } else {
          return { 
            success: false, 
            error: 'Failed to fetch user data' 
          };
        }
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
        // Fetch full user data from Supabase
        const { data: dbUser, error } = await supabase
          .from('users')
          .select('id, email, name, created_at, updated_at')
          .eq('id', data.user.id)
          .single();

        if (!error && dbUser) {
          const userData: User = {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            created_at: dbUser.created_at,
            updated_at: dbUser.updated_at,
          };
          
          setUser(userData);
          localStorage.setItem('ocera_user', JSON.stringify(userData));
          
          return { success: true };
        } else {
          return { 
            success: false, 
            error: 'Failed to fetch user data after signup' 
          };
        }
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
      
      // Clear any session cookies
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
      
      // Refresh user data from Supabase
      const { data: dbUser, error } = await supabase
        .from('users')
        .select('id, email, name, created_at, updated_at')
        .eq('id', user.id)
        .single();

      if (!error && dbUser) {
        const userData: User = {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          created_at: dbUser.created_at,
          updated_at: dbUser.updated_at,
        };
        
        setUser(userData);
        localStorage.setItem('ocera_user', JSON.stringify(userData));
      } else {
        // User no longer exists, sign out
        await signOut();
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
