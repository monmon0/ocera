"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type User = {
  id: string;
  email: string;
  name: string;
  email_verified?: string; // timestamptz
  image?: string;
  created_at?: string;
  updated_at?: string;
  password?: string; // Note: you probably don't want to select this in queries
};

type SupabaseAuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; needsSignup?: boolean }>;
  signUp: (email: string, name: string, password: string, referralCode?: string) => Promise<{ success: boolean; error?: string }>;
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

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, email_verified, image, created_at, updated_at')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      console.log('Fetched user profile:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Check for existing session and fetch user data
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);

        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          setUser(null);
          return;
        } else {
          console.log('Current session:', session);
        }

        // Check for demo mode or set a default user for development
        if (!session && process.env.NODE_ENV === 'development') {
          const mockUser = {
            id: 'demo-user-123',
            email: 'demo@example.com',
            name: 'Demo User',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(mockUser);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('Found existing session, fetching user profile...');

          // Fetch complete user profile from database
          let userProfile = await fetchUserProfile(session.user.id);

          // If no profile exists but we have an active session, create the profile
          if (!userProfile) {
            console.log('Active session but no profile found, creating profile...');

            const newProfile = {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
              email_verified: session.user.email_confirmed_at || null,
              image: session.user.user_metadata?.avatar_url || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            const { error: insertError } = await supabase
              .from('users')
              .insert([newProfile]);

            if (insertError) {
              console.error('Error creating profile for existing session:', insertError);
              // Use fallback data
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
              });
            } else {
              // Fetch the newly created profile
              userProfile = await fetchUserProfile(session.user.id);
              if (userProfile) {
                setUser(userProfile);
              }
            }
          } else {
            // Profile exists, use it
            setUser(userProfile);
          }
        } else {
          console.log('No active session found');
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);

        if (event === 'SIGNED_IN' && session?.user) {
          setLoading(true);

          // Check if profile exists, create if it doesn't
          let userProfile = await fetchUserProfile(session.user.id);

          if (!userProfile) {
            console.log('Creating profile for newly signed in user...');

            const newProfile = {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
              email_verified: session.user.email_confirmed_at || null,
              image: session.user.user_metadata?.avatar_url || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            const { error: insertError } = await supabase
              .from('users')
              .insert([newProfile]);

            if (!insertError) {
              userProfile = await fetchUserProfile(session.user.id);
            }
          }

          if (userProfile) {
            setUser(userProfile);
          } else {
            // Fallback if all else fails
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            });
          }

          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Optionally refresh user data when token is refreshed
          const userProfile = await fetchUserProfile(session.user.id);
          if (userProfile) {
            setUser(userProfile);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);

        // Check if user doesn't exist
        if (error.message.includes('Invalid login credentials') || 
            error.message.includes('Email not confirmed') ||
            error.message.includes('Invalid email or password')) {
          return { 
            success: false, 
            error: 'Invalid email or password',
            needsSignup: true 
          };
        }

        return { 
          success: false, 
          error: error.message 
        };
      }

      if (data.user && data.session) {
        console.log('Sign in successful, fetching user from database...');

        // Fetch user profile from database
        const userProfile = await fetchUserProfile(data.user.id);

        if (userProfile) {
          setUser(userProfile);
          return { success: true };
        } else {
          // If no database record exists, create one
          const newProfile = {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
            email_verified: data.user.email_confirmed_at || null,
            image: data.user.user_metadata?.avatar_url || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          const { error: insertError } = await supabase
            .from('users')
            .insert([newProfile]);

          if (!insertError) {
            const createdProfile = await fetchUserProfile(data.user.id);
            if (createdProfile) {
              setUser(createdProfile);
              return { success: true };
            }
          }

          // Fallback
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
          });
          return { success: true };
        }
      }

      return { 
        success: false, 
        error: 'Sign in failed' 
      };
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

  const signUp = async (email: string, name: string, password: string, referralCode: string = '') => {
    try {
      setLoading(true);

      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            referral_code: referralCode,
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { 
          success: false, 
          error: error.message 
        };
      }

      if (data.user) {
        console.log('User signed up successfully:', data.user.id);

        // Create user profile in database
        const newProfile = {
          id: data.user.id,
          email: data.user.email || email,
          name: name,
          email_verified: data.user.email_confirmed_at || null,
          image: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { error: profileError } = await supabase
          .from('users')
          .insert([newProfile]);

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          return { 
            success: false, 
            error: 'Failed to create user profile' 
          };
        }

        // If email confirmation is required, don't set user state yet
        if (!data.session) {
          return { 
            success: true,
            error: 'Please check your email to confirm your account'
          };
        }

        // Fetch the newly created profile to set user state
        const userProfile = await fetchUserProfile(data.user.id);
        if (userProfile) {
          setUser(userProfile);
        } else {
          // Use fallback data
          setUser(newProfile);
        }

        return { success: true };
      }

      return { 
        success: false, 
        error: 'Sign up failed' 
      };
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
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      if (!user) return;

      setLoading(true);
      const userProfile = await fetchUserProfile(user.id);
      if (userProfile) {
        setUser(userProfile);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    } finally {
      setLoading(false);
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