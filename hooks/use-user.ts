import { useUser as useUserContext } from "@/contexts/user-context";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";

export function useUser() {
  const auth = useSupabaseAuth();
  const userContext = useUserContext();

  return {
    // Auth data (basic user info from auth context)
    user: auth.user,
    isAuthenticated: !!auth.user,
    authLoading: auth.loading,

    // Extended profile data from user context
    userProfile: userContext.userProfile,
    userStats: userContext.userStats,
    profileLoading: userContext.loading,
    profileError: userContext.error,

    // Combined loading state
    loading: auth.loading || userContext.loading,

    // Auth methods
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    refreshUser: auth.refreshUser,

    // Profile methods
    refreshUserProfile: userContext.refreshUserProfile,
    updateUserProfile: userContext.updateUserProfile,
    getUserStats: userContext.getUserStats,
    clearError: userContext.clearError,
  };
}

export type User = ReturnType<typeof useUser>;
