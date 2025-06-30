"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, UserPlus, UserMinus, Search, Grid, List, Users, Eye, MessageCircle, Sparkles } from "lucide-react";
import Navigation from "@/components/navigation";
import { useAppStore } from "@/stores";

export default function FollowingPage() {
  const {
    following,
    searchTerm,
    sortBy,
    filterBy,
    viewMode,
    socialLoading,
    setSearchTerm,
    setSortBy,
    setFilterBy,
    setViewMode,
    toggleFollow,
    fetchFollowing
  } = useAppStore();

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  const filteredAndSortedCreators = following
    .filter((creator) => {
      const matchesSearch =
        creator.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "active" && creator.lastActive.includes("hour")) ||
        (filterBy === "new-posts" && creator.newPosts > 0) ||
        (filterBy === "high-engagement" && creator.totalLikes > 10000);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "alphabetical":
          return a.displayName.localeCompare(b.displayName);
        case "followers":
          return b.followers - a.followers;
        case "recent":
        default:
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
      }
    });

  if (socialLoading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Following</h1>
            <p className="text-gray-600">Stay updated with your favorite creators</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="followers">Most Followers</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Recently Active</SelectItem>
              <SelectItem value="new-posts">New Posts</SelectItem>
              <SelectItem value="high-engagement">High Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedCreators.length} of {following.length} creators
          </p>
        </div>

        {filteredAndSortedCreators.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No creators found</h3>
              <p className="text-gray-600 mb-4">
                {following.length === 0
                  ? "You're not following anyone yet. Discover amazing creators!"
                  : "Try adjusting your search or filters"}
              </p>
              {following.length === 0 && (
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Discover Creators
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredAndSortedCreators.map((creator) => (
              <Card key={creator.id} className="hover:shadow-lg transition-shadow">
                <CardContent className={viewMode === "grid" ? "p-6" : "p-4"}>
                  <div className={viewMode === "grid" ? "text-center" : "flex items-center gap-4"}>
                    <Avatar className={viewMode === "grid" ? "w-16 h-16 mx-auto mb-4" : "w-12 h-12"}>
                      <AvatarImage src={creator.avatar} alt={creator.displayName} />
                      <AvatarFallback className="bg-purple-200 text-purple-800">
                        {creator.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className={viewMode === "grid" ? "" : "flex-1 min-w-0"}>
                      <h3 className={`font-semibold ${viewMode === "grid" ? "mb-1" : "truncate"}`}>
                        {creator.displayName}
                      </h3>
                      <p className={`text-gray-600 text-sm ${viewMode === "grid" ? "mb-3" : "truncate"}`}>
                        @{creator.username}
                      </p>

                      {viewMode === "grid" && creator.bio && (
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{creator.bio}</p>
                      )}

                      <div className={`flex ${viewMode === "grid" ? "justify-center" : ""} gap-4 text-sm text-gray-600 mb-3`}>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {creator.followers}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {creator.totalLikes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          {creator.totalCharacters}
                        </span>
                      </div>

                      <div className={`flex flex-wrap gap-1 mb-3 ${viewMode === "grid" ? "justify-center" : ""}`}>
                        {creator.specialties.slice(0, 3).map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className={viewMode === "grid" ? "" : "flex flex-col gap-2"}>
                      <Button
                        variant={creator.isFollowing ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleFollow(creator.id)}
                        className={creator.isFollowing ? "text-gray-600" : "bg-purple-600 hover:bg-purple-700"}
                      >
                        {creator.isFollowing ? (
                          <>
                            <UserMinus className="h-4 w-4 mr-1" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-1" />
                            Follow
                          </>
                        )}
                      </Button>

                      {viewMode === "list" && (
                        <div className="text-xs text-gray-500">
                          {creator.newPosts > 0 && (
                            <div className="text-purple-600 font-medium">
                              {creator.newPosts} new post{creator.newPosts === 1 ? '' : 's'}
                            </div>
                          )}
                          <div>Active {creator.lastActive}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}