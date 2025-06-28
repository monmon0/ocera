"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  Plus,
  Trophy,
  Sparkles,
  Lock,
  Eye,
  FileText,
  Medal,
  Award,
  TrendingUp,
  Crown,
  Zap,
} from "lucide-react";
import PostList from "@/components/post-list";
import { useLoading } from "@/contexts/loading-context";

const mockPosts: any[] = [];

export default function Dashboard() {
  const { setLoading } = useLoading();

  const [followStates, setFollowStates] = useState<Record<string, boolean>>({});
  const [likeStates, setLikeStates] = useState<
    Record<number, { isLiked: boolean; count: number }>
  >({});
  const [commentStates, setCommentStates] = useState<
    Record<number, { showComments: boolean; comments: string[] }>
  >({});
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>(
    {},
  );
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [shareStates, setShareStates] = useState<Record<number, boolean>>({});

  // Remove automatic loading - only trigger manually when needed

  const toggleLike = (postId: number) => {
    setLikeStates((prev) => ({
      ...prev,
      [postId]: {
        isLiked: !prev[postId]?.isLiked,
        count: prev[postId]?.isLiked
          ? (prev[postId]?.count || 0) - 1
          : (prev[postId]?.count || 0) + 1,
      },
    }));
  };

  const toggleFollow = (username: string) => {
    setFollowStates((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "public":
        return <Eye className="h-4 w-4 text-green-600" />;
      case "private":
        return <Lock className="h-4 w-4 text-red-600" />;
      case "draft":
        return <FileText className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return (
          <span className="text-sm font-bold text-purple-600">#{rank}</span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to OC universe!
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Discover amazing Original Characters, connect with talented
              creators, and share your own imaginative worlds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create your first OC
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-purple text-white hover:bg-white hover:text-purple-700 font-semibold px-8"
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Sparkles className="h-16 w-16 text-purple-300" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Star className="h-12 w-12 text-purple-300" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <Heart className="h-8 w-8 text-purple-300" />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Saved OCs */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900">
                  Saved OCs
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "Luna Nightshade",
                    creator: "ArtistAlice",
                    image: "/placeholder.svg?height=60&width=60",
                    likes: 342,
                  },
                  {
                    name: "Ember Rose",
                    creator: "ColorMaster",
                    image: "/placeholder.svg?height=60&width=60",
                    likes: 203,
                  },
                ].map((oc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Image
                        src={oc.image || "/placeholder.svg"}
                        alt={oc.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-purple-900 text-sm truncate">
                          {oc.name}
                        </p>
                        <p className="text-xs text-purple-600">
                          by {oc.creator}
                        </p>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-purple-600">
                      <span>{oc.likes} likes</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs text-purple-700 hover:bg-purple-200"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Following Creators */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900">
                  Following
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "FantasyFan",
                    displayName: "Maya Rodriguez",
                    avatar: "/placeholder.svg",
                    ocs: 12,
                    newPosts: 3,
                  },
                  {
                    name: "DragonArtist",
                    displayName: "Marcus Chen",
                    avatar: "/placeholder.svg",
                    ocs: 8,
                    newPosts: 1,
                  },
                ].map((creator, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={creator.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                          {creator.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-purple-900 text-sm truncate">
                          {creator.displayName}
                        </p>
                        <p className="text-xs text-purple-600">
                          @{creator.name}
                        </p>
                      </div>
                      {creator.newPosts > 0 && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-600 text-white text-xs"
                        >
                          {creator.newPosts}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Discover New OCs */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900">
                  Discover New OCs
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "Aria Moonweaver",
                    creator: "MysticArt",
                    image: "/placeholder.svg?height=60&width=60",
                    trending: true,
                  },
                ].map((oc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Image
                        src={oc.image || "/placeholder.svg"}
                        alt={oc.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-purple-900 text-sm truncate">
                            {oc.name}
                          </p>
                          {oc.trending && (
                            <TrendingUp className="h-3 w-3 text-orange-500" />
                          )}
                        </div>
                        <p className="text-xs text-purple-600">
                          by {oc.creator}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-2">
                Latest from Your Feed
              </h2>
              <p className="text-purple-600">
                See what amazing characters your favorite creators have been
                working on
              </p>
            </div>

            <PostList mockPosts={mockPosts} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Your OCs */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900">
                  Your OCs
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Violet Shadowmere",
                    likes: 45,
                    image: "/placeholder.svg?height=60&width=60",
                    status: "public",
                  },
                ].map((oc, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Image
                      src={oc.image || "/placeholder.svg"}
                      alt={oc.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-purple-900 text-sm truncate">
                          {oc.name}
                        </p>
                        {getStatusIcon(oc.status)}
                      </div>
                      <p className="text-xs text-purple-600">
                        {oc.likes} likes
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-purple-300 text-purple-700"
                    >
                      Edit
                    </Button>
                  </div>
                ))}
                <Link href="/create">
                  <Button
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create New OC
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Top Creators */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Top Creators
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-purple-300 text-purple-700"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    rank: 1,
                    name: "FantasyMaster",
                    displayName: "Elena Rodriguez",
                    score: 15420,
                    avatar: "/placeholder.svg",
                    change: "+120",
                    badge: "Legendary Creator",
                  },
                ].map((creator) => (
                  <div
                    key={creator.rank}
                    className="p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(creator.rank)}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={creator.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                          {creator.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-purple-900 text-sm truncate">
                          {creator.displayName}
                        </p>
                        <p className="text-xs text-purple-600">
                          @{creator.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-purple-900">
                          {creator.score.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600">
                          {creator.change}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-purple-100 text-purple-700"
                    >
                      {creator.badge}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
