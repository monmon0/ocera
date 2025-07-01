
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { 
  TrendingUp, 
  Eye,
  Star,
  Users, 
  Heart, 
  MessageCircle, 
  Plus,
  Crown,
  Sparkles,
  Calendar,
  Activity
} from "lucide-react";
import Navigation from "@/components/navigation";
import { useAppStore } from "@/stores";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";

export default function DashboardPage() {
  const router = useRouter();
  const { user: authUser, loading: authLoading } = useSupabaseAuth();
  const {
    user: storeUser,
    userCharacters,
    userPosts,
    charactersLoading,
    postsLoading,
    fetchUserCharacters,
    setUser
  } = useAppStore();

  // Sync auth context user with store
  useEffect(() => {
    if (authUser && authUser !== storeUser) {
      setUser(authUser);
    }
  }, [authUser, storeUser, setUser]);

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/');
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (authUser) {
      fetchUserCharacters();
    }
  }, [authUser, fetchUserCharacters]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  const stats = {
    characters: userCharacters.length,
    followers: authUser.followers || 0,
    following: authUser.following || 0,
    totalLikes: userCharacters.reduce((acc, char) => acc + char.likes, 0),
    totalViews: userCharacters.reduce((acc, char) => acc + char.views, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={authUser.image} alt={authUser.name} />
              <AvatarFallback className="bg-purple-200 text-purple-800 text-xl">
                {authUser.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {authUser.name}!</h1>
              <p className="text-gray-600">Ready to create something amazing today?</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Characters</CardTitle>
              <Sparkles className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.characters}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.followers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Following</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.following}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLikes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/create">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Character
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Explore Community
                </Button>
              </Link>
              <Link href="/profile/edit">
                <Button variant="outline" className="w-full">
                  <Activity className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Characters */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Your Characters
              </CardTitle>
              <CardDescription>
                {userCharacters.length === 0 
                  ? "You haven't created any characters yet." 
                  : `You have ${userCharacters.length} character${userCharacters.length === 1 ? '' : 's'}`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {charactersLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : userCharacters.length === 0 ? (
                <div className="text-center py-8">
                  <Sparkles className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">No characters yet</p>
                  <Link href="/create">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Create Your First Character
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userCharacters.slice(0, 4).map((character) => (
                    <Link key={character.id} href={`/character/${character.id}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold">
                              {character.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">{character.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {character.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {character.views}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {character.tags.slice(0, 3).map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
              {userCharacters.length > 4 && (
                <div className="text-center mt-4">
                  <Link href="/profile/edit">
                    <Button variant="outline">View All Characters</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed or Recent Updates could go here */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Your recent activity will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
