"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { 
  TrendingUp, 
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

// Mock data
const mockUser = {
  name: "Demo User",
  username: "demouser",
  avatar: "/placeholder-user.jpg",
  bio: "Character creator and artist",
  followers: 1234,
  following: 567,
  characters: 89,
};

const mockCharacters = [
  {
    id: 1,
    name: "Luna Starweaver",
    image: "/placeholder.jpg",
    likes: 245,
    views: 1203,
    tags: ["fantasy", "magic", "elf"],
  },
  {
    id: 2,
    name: "Kai Shadowblade",
    image: "/placeholder.jpg",
    likes: 189,
    views: 892,
    tags: ["warrior", "dark", "human"],
  },
];

const mockActivity = [
  { type: "like", user: "ArtistAlice", character: "Luna Starweaver", time: "2 hours ago" },
  { type: "follow", user: "CreatorBob", time: "4 hours ago" },
  { type: "comment", user: "FanCharlie", character: "Kai Shadowblade", time: "6 hours ago" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is signed in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      localStorage.removeItem("user");
      router.push("/");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}!</h1>
              <p className="text-purple-100">Ready to share your creativity with the world?</p>
            </div>
            <Button asChild>
              <Link href="/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Character
              </Link>
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
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
                      <p className="text-3xl font-bold text-purple-900">{mockUser.characters}</p>
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
                        {mockCharacters.reduce((acc, char) => acc + char.likes, 0)}
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
                        {mockCharacters.reduce((acc, char) => acc + char.views, 0)}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Your Characters */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-purple-900">Your Characters</CardTitle>
                <CardDescription>Manage and view your character collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockCharacters.map((character) => (
                    <Link key={character.id} href={`/character/${character.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-100">
                        <CardContent className="p-4">
                          <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                            <div className="absolute inset-0 flex items-center justify-center text-purple-400">
                              <Star className="w-12 h-12" />
                            </div>
                          </div>
                          <h3 className="font-semibold text-purple-900 mb-2">{character.name}</h3>
                          <div className="flex items-center justify-between text-sm text-purple-600 mb-2">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {character.likes}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {character.views}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {character.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-purple-900">{mockUser.name}</h3>
                    <p className="text-sm text-purple-600">@{mockUser.username}</p>
                  </div>
                </div>

                <p className="text-sm text-purple-700 mb-4">{mockUser.bio}</p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-purple-900">{mockUser.followers}</p>
                    <p className="text-xs text-purple-600">Followers</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-900">{mockUser.following}</p>
                    <p className="text-xs text-purple-600">Following</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-900">{mockUser.characters}</p>
                    <p className="text-xs text-purple-600">Characters</p>
                  </div>
                </div>

                <Link href="/profile/edit">
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Edit Profile
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
        </div>
      </main>
    </div>
  );
}