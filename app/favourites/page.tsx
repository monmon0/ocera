"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Search, Grid, List, Star, Eye, MessageCircle, Sparkles, Bookmark } from "lucide-react";
import Navigation from "@/components/navigation";
import { useAppStore } from "@/stores";
import Link from "next/link";

export default function FavoritesPage() {
  const {
    characters,
    favorites,
    searchTerm,
    sortBy,
    filterBy,
    viewMode,
    charactersLoading,
    setSearchTerm,
    setSortBy,
    setFilterBy,
    setViewMode,
    removeFromFavorites,
    fetchFavorites
  } = useAppStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Get favorite characters
  const favoriteCharacters = characters.filter(character => 
    favorites.includes(character.id)
  );

  const filteredAndSortedCharacters = favoriteCharacters
    .filter((character) => {
      const matchesSearch =
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "recent" && new Date(character.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (filterBy === "popular" && character.likes > 100) ||
        (filterBy === "trending" && character.views > 500);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "likes":
          return b.likes - a.likes;
        case "views":
          return b.views - a.views;
        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  if (charactersLoading) {
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

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorites</h1>
            <p className="text-gray-600">Your saved characters collection</p>
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
              placeholder="Search favorites..."
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
              <SelectItem value="likes">Most Liked</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedCharacters.length} of {favoriteCharacters.length} favorite characters
          </p>
        </div>

        {filteredAndSortedCharacters.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites found</h3>
              <p className="text-gray-600 mb-4">
                {favoriteCharacters.length === 0
                  ? "You haven't favorited any characters yet. Start exploring!"
                  : "Try adjusting your search or filters"}
              </p>
              {favoriteCharacters.length === 0 && (
                <Link href="/discover">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Discover Characters
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredAndSortedCharacters.map((character) => (
              <Card key={character.id} className="hover:shadow-lg transition-shadow">
                <CardContent className={viewMode === "grid" ? "p-6" : "p-4"}>
                  <div className={viewMode === "grid" ? "text-center" : "flex items-center gap-4"}>
                    <div className={viewMode === "grid" ? "relative mb-4" : "relative"}>
                      <div className={`${viewMode === "grid" ? "w-16 h-16 mx-auto" : "w-12 h-12"} bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                        {character.name.charAt(0)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-white shadow-sm hover:bg-red-50"
                        onClick={() => removeFromFavorites(character.id)}
                      >
                        <Heart className="h-3 w-3 text-red-500 fill-current" />
                      </Button>
                    </div>

                    <div className={viewMode === "grid" ? "" : "flex-1 min-w-0"}>
                      <Link href={`/character/${character.id}`}>
                        <h3 className={`font-semibold hover:text-purple-600 transition-colors ${viewMode === "grid" ? "mb-1" : "truncate"}`}>
                          {character.name}
                        </h3>
                      </Link>

                      {character.shortDescription && (
                        <p className={`text-gray-600 text-sm ${viewMode === "grid" ? "mb-3 line-clamp-2" : "truncate"}`}>
                          {character.shortDescription}
                        </p>
                      )}

                      <div className={`flex ${viewMode === "grid" ? "justify-center" : ""} gap-4 text-sm text-gray-600 mb-3`}>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {character.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {character.views}
                        </span>
                      </div>

                      <div className={`flex flex-wrap gap-1 ${viewMode === "grid" ? "justify-center" : ""}`}>
                        {character.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {character.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{character.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {viewMode === "list" && (
                      <div className="flex flex-col gap-2">
                        <Link href={`/character/${character.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        <div className="text-xs text-gray-500 text-center">
                          Added {new Date(character.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
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