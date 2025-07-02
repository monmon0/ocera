
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import toast from 'react-hot-toast';

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
import CharacterCollectionCard from "@/components/dashboard-characters";


const mockActivity = [
  { type: "like", user: "ArtistAlice", character: "Luna Starweaver", time: "2 hours ago" },
  { type: "follow", user: "CreatorBob", time: "4 hours ago" },
  { type: "comment", user: "FanCharlie", character: "Kai Shadowblade", time: "6 hours ago" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
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

  const [totalCharacters, setTotalCharacters] = useState(0);

  const handleDeleteCharacter = async (characterId: string) => {
  // Your delete logic here
    try {
      // Delete the character from the 'characters' table
      const { error } = await supabase
        .from('characters')
        .delete()
        .eq('id', characterId)

      
    if (error) {
      console.error("Error Deleting", error);
      toast.error("Failed to create character. Please try again.", {
        duration: 5000,
        style: {
          background: '#EF4444',
          color: 'white',
          borderRadius: '12px',
          padding: '16px',
        },
        icon: '❌',
      });
    } else {      
      // Success toast with link to view character
      toast.success(
        <div className="flex flex-col gap-2">
          <div className="font-medium">Character deleted successfully!</div>
        </div>,
        {
          duration: 6000,
          style: {
            background: '#10B981',
            color: 'white',
            borderRadius: '12px',
            padding: '16px',
            minWidth: '300px',
          },
          icon: '✨',
        }
      );
    }
      // Remove the character from the local state
      setCharacters(prev => prev.filter(c => c.id !== characterId)); 
      // Update the total characters count
      setTotalCharacters(prev => prev - 1);

      return true
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('An unexpected error occurred')
      return false
    }
  }, [authUser, fetchUserCharacters]);

<<<<<<< HEAD
  }

useEffect(() => {
  const fetchUser = async () => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) {
        router.push("/");
        return;
      }

      const parsed = JSON.parse(stored);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", parsed.email)
        .single();
      
      const characters = await supabase
        .from("characters")
        .select("*")
        .eq("user_id", parsed.id);

      if (error || !data) {
        console.error("DB fetch failed:", error);
        // router.push("/");
        return;
      }

      setUser(data);
      setTotalCharacters(data.total_characters || 0);
      setCharacters(characters.data || []);
  
      
    } catch (err) {
      console.error("Auth error:", err);
      // router.push("/");
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [router]);


  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut(); // 👈 kill Supabase session
      localStorage.removeItem("user"); // 👈 clear custom session
      router.push("/"); // 👈 redirect to home/login
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };


  if (loading) {
=======
  if (authLoading) {
>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9
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

<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="relative rounded-2xl p-8 mb-8 text-white overflow-hidden ">
            <img 
              src={user?.banner_img || "/api/placeholder/1200/300"}
              alt="Creative background"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                <p className="text-gray-100">Ready to share your creativity with the world?</p>
              </div>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Character
                </Link>
              </Button>
              <Button className="text-black" variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Total Characters</p>
                      <p className="text-3xl font-bold text-purple-900">{totalCharacters}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Total Likes</p>
                      <p className="text-3xl font-bold text-purple-900">
                        {user.total_likes}
                      </p>
                    </div>
                    <Heart className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Total Views</p>
                      <p className="text-3xl font-bold text-purple-900">
                         {user.total_views}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Your Characters */}
            <CharacterCollectionCard onDelete={handleDeleteCharacter} characters={characters} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-purple-900">{user.name}</h3>
                    <p className="text-sm text-purple-600">{user.email}</p>
                  </div>
                </div>

                <p className="text-sm text-purple-700 mb-4">{user.bio}</p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-purple-900">{user.followers_count}</p>
                    <p className="text-xs text-purple-600">Followers</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-900">{user.following_count}</p>
                    <p className="text-xs text-purple-600">Following</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-900">{totalCharacters}</p>
                    <p className="text-xs text-purple-600">Characters</p>
                  </div>
                </div>

                <Link href="/profile/edit">
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Edit Profile
                  </Button>
                </Link>
                <Link href={`/profile/${user.id}`}>
                  <Button  variant = "ghost" className="w-full mt-4 bg-white/0 text-purple-300 hover:bg-purple-700">
                    View My Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-purple-900 text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-purple-900">
                          <span className="font-medium">{activity.user}</span>
                          {activity.type === 'like' && ` liked your character "${activity.character}"`}
                          {activity.type === 'follow' && ` started following you`}
                          {activity.type === 'comment' && ` commented on "${activity.character}"`}
                        </p>
                        <p className="text-xs text-purple-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
=======
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
>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9
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
