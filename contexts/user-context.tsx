"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { useSupabaseAuth } from "./supabase-auth-context";

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  username?: string;
  followers_count?: number;
  following_count?: number;
  bio?: string;
  total_characters?: number;
  total_likes?: number;
  total_views?: number;
  image?: string;
  referred_by?: string;
  created_at: string;
  updated_at: string;
};

export type ReferralData = {
  code: string;
  used_count: number;
  max_uses: number;
  expires_at?: string;
  is_active: boolean;
};

export type UserStats = {
  totalReferrals: number;
  approvedReferrals: number;
  referralCodes: ReferralData[];
};

type UserContextType = {
  userProfile: UserProfile | null;
  userStats: UserStats | null;
  loading: boolean;
  error: string | null;
  refreshUserProfile: () => Promise<void>;
  updateUserProfile: (
    updates: Partial<UserProfile>,
  ) => Promise<{ success: boolean; error?: string }>;
  getUserStats: () => Promise<void>;
  clearError: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user } = useSupabaseAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      setError("fuckin heell");

      const { data, error } = await supabase
        .from("users")
        .select(`
          id, email, name, username, bio,
          followers_count, following_count,
          total_characters, total_likes, total_views,
          image, referred_by, created_at, updated_at
        `)
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
        return;
      }
      setUserProfile(data);

    } catch (err) {
      console.error("Error in fetchUserProfile:", err);
      setError("An unexpected error occurred");

        console.warn("No user profile found for userId:", userId);
        setUserProfile( {
          id: userId,
          email: "fuckin hell",
          name: "",
          username: "",
          followers_count: 0,
          following_count: 0,
          bio: "",
          total_characters: 0,
          total_likes: 0,
          total_views: 0,
          image: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
      })
    } finally {
      
      setLoading(false);
    }
  }, []);

  const fetchUserStats = useCallback(async (userId: string) => {
    try {
      // Uncomment and implement this when needed
      // Example implementation is available if desired
    } catch (err) {
      console.error("Error in fetchUserStats:", err);
    }
  }, []);

  const refreshUserProfile = useCallback(async () => {
    if (!user?.id) return;
    await fetchUserProfile(user.id);
  }, [user?.id, fetchUserProfile]);

  const getUserStats = useCallback(async () => {
    if (!user?.id) return;
    await fetchUserStats(user.id);
  }, [user?.id, fetchUserStats]);

  const updateUserProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!user?.id) {
        return { success: false, error: "No user logged in" };
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("users")
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating user profile:", error);
          const errorMessage = error.message.includes("username")
            ? "Username is already taken"
            : "Failed to update profile";
          setError(errorMessage);
          return { success: false, error: errorMessage };
        }

        if (data) {
          setUserProfile(data);
          return { success: true };
        }

        return { success: false, error: "No data returned" };
      } catch (err) {
        console.error("Error in updateUserProfile:", err);
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [user?.id],
  );

  useEffect(() => {
  console.log("Running user profile effect. Current user:", user);

  if (!user || !user.id) {
    setUserProfile(null);
    setUserStats(null);
    return;
  }

  const loadUser = async () => {
    console.log("Calling fetchUserProfile and fetchUserStats...");
    await fetchUserProfile(user.id);
    await fetchUserStats(user.id);
  };

  loadUser();
}, [user, fetchUserProfile, fetchUserStats]);


  const value = {
    userProfile,
    userStats,
    loading,
    error,
    refreshUserProfile,
    updateUserProfile,
    getUserStats,
    clearError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
