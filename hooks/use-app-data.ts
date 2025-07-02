
import { useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/supabase-auth-context';
import { useAppStore } from '@/stores';

export function useAppData() {
  const { user: authUser, loading: authLoading } = useSupabaseAuth();
  const {
    user,
    setUser,
    setAuthLoading,
    fetchUserCharacters,
    fetchFeedPosts,
    fetchFollowing,
    fetchFavorites
  } = useAppStore();

  // Sync auth state with store
  useEffect(() => {
    setAuthLoading(authLoading);
  }, [authLoading, setAuthLoading]);

  useEffect(() => {
    if (authUser) {
      setUser({
        id: authUser.id,
        email: authUser.email,
        name: authUser.name,
        email_verified: authUser.email_verified,
        image: authUser.image,
        created_at: authUser.created_at,
        updated_at: authUser.updated_at
      });
    } else {
      setUser(null);
    }
  }, [authUser, setUser]);

  // Fetch user data when authenticated
  useEffect(() => {
    if (authUser && !authLoading) {
      fetchUserCharacters();
      fetchFeedPosts();
      fetchFollowing();
      fetchFavorites();
    }
  }, [authUser, authLoading, fetchUserCharacters, fetchFeedPosts, fetchFollowing, fetchFavorites]);

  return {
    user,
    authLoading
  };
}
