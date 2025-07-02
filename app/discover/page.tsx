"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  TrendingUp,
  Heart,
  Star,
  Users,
  Calendar,
  Eye,
  Grid3X3,
  List,
  Sparkles,
  Trophy,
  FlameIcon as Fire,
  Zap,
  Crown,
  UserPlus,
  Bookmark,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase";

const mockTrendingOCs = [
  {
    id: 1,
    name: "Aria Moonweaver",
    creator: { username: "MysticArt", displayName: "Luna Martinez", avatar: "/placeholder.svg" },
    description: "A celestial mage who weaves moonlight into powerful spells and protects the night realm.",
    image: "/placeholder.svg?height=300&width=300",
    likes: 1247,
    views: 5632,
    tags: ["fantasy", "magic", "celestial", "mage"],
    trending: true,
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Kai Stormborn",
    creator: { username: "ElementalMage", displayName: "Alex Chen", avatar: "/placeholder.svg" },
    description: "Lightning elemental warrior from the Storm Peaks, master of thunder and wind.",
    image: "/placeholder.svg?height=300&width=300",
    likes: 892,
    views: 3421,
    tags: ["elemental", "warrior", "lightning", "storm"],
    trending: true,
    featured: false,
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Nova Starlight",
    creator: { username: "CosmicCreator", displayName: "Sarah Kim", avatar: "/placeholder.svg" },
    description: "Cosmic entity who travels between galaxies, spreading stardust and wonder.",
    image: "/placeholder.svg?height=300&width=300",
    likes: 1156,
    views: 4789,
    tags: ["cosmic", "space", "entity", "stars"],
    trending: true,
    featured: true,
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    name: "Ember Roseheart",
    creator: { username: "FloralFire", displayName: "Maya Rodriguez", avatar: "/placeholder.svg" },
    description: "Fire fairy who tends to magical gardens, balancing destruction and growth.",
    image: "/placeholder.svg?height=300&width=300",
    likes: 734,
    views: 2156,
    tags: ["fairy", "fire", "nature", "garden"],
    trending: false,
    featured: false,
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    name: "Zephyr Nightwind",
    creator: { username: "ShadowArtist", displayName: "Marcus Chen", avatar: "/placeholder.svg" },
    description: "Shadow assassin who moves like the wind, protector of the innocent.",
    image: "/placeholder.svg?height=300&width=300",
    likes: 623,
    views: 1987,
    tags: ["assassin", "shadow", "wind", "protector"],
    trending: false,
    featured: false,
    createdAt: "2024-01-11",
  },
  {
    id: 6,
    name: "Crystal Dreamweaver",
    creator: { username: "DreamArtist", displayName: "Elena Rodriguez", avatar: "/placeholder.svg" },
    description: "Dream guardian who protects sleeping minds from nightmares using crystal magic.",
    image: "/placeholder.svg?height=300&width=300",
    likes: 945,
    views: 3654,
    tags: ["dream", "crystal", "guardian", "magic"],
    trending: false,
    featured: true,
    createdAt: "2024-01-10",
  },
]

const mockTrendingCreators = [
  {
    username: "FantasyMaster",
    displayName: "Elena Rodriguez",
    avatar: "/placeholder.svg",
    followers: 5200,
    ocs: 23,
    totalLikes: 15420,
    specialties: ["Fantasy", "Digital Art", "Character Design"],
    isFollowing: false,
    featured: true,
  },
  {
    username: "DragonArtist",
    displayName: "Marcus Chen",
    avatar: "/placeholder.svg",
    followers: 4100,
    ocs: 18,
    totalLikes: 12890,
    specialties: ["Dragons", "Mythology", "Concept Art"],
    isFollowing: false,
    featured: false,
  },
  {
    username: "MysticCreator",
    displayName: "Sarah Kim",
    avatar: "/placeholder.svg",
    followers: 3800,
    ocs: 31,
    totalLikes: 11750,
    specialties: ["Magic", "Fantasy", "Storytelling"],
    isFollowing: true,
    featured: true,
  },
  {
    username: "ColorMaster",
    displayName: "David Park",
    avatar: "/placeholder.svg",
    followers: 2100,
    ocs: 12,
    totalLikes: 8920,
    specialties: ["Color Theory", "Digital Art", "Teaching"],
    isFollowing: false,
    featured: false,
  },
]

const mockTags = [
  { name: "fantasy", count: 1247, trending: true },
  { name: "magic", count: 892, trending: true },
  { name: "dragon", count: 756, trending: false },
  { name: "elemental", count: 634, trending: true },
  { name: "warrior", count: 523, trending: false },
  { name: "celestial", count: 445, trending: true },
  { name: "gothic", count: 398, trending: false },
  { name: "cyberpunk", count: 367, trending: false },
  { name: "fairy", count: 334, trending: false },
  { name: "demon", count: 298, trending: false },
]

const mockChallenges = [
  {
    id: 1,
    title: "Elemental Warriors",
    description: "Create an OC based on one of the four elements: Fire, Water, Earth, or Air",
    participants: 156,
    submissions: 89,
    daysLeft: 3,
    prize: "Featured on homepage",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Mythical Creatures",
    description: "Design a character inspired by mythical creatures from any culture",
    participants: 234,
    submissions: 167,
    daysLeft: 8,
    prize: "Custom badge + 1000 points",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Steampunk Adventures",
    description: "Create a steampunk-inspired character with unique gadgets and style",
    participants: 98,
    submissions: 45,
    daysLeft: 12,
    prize: "Art supplies package",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function DiscoverPage() {
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
    addToFavorites,
    removeFromFavorites,
    fetchUserCharacters
  } = useAppStore();

  useEffect(() => {
    fetchUserCharacters();
  }, [fetchUserCharacters]);

  const filteredAndSortedCharacters = characters
    .filter((character) => {
      const matchesSearch =
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "trending" && character.views > 500) ||
        (filterBy === "popular" && character.likes > 100) ||
        (filterBy === "recent" && new Date(character.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

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

  const toggleFavorite = (characterId: string) => {
    if (favorites.includes(characterId)) {
      removeFromFavorites(characterId);
    } else {
      addToFavorites(characterId);
    }
  };

  if (charactersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Characters</h1>
            <p className="text-gray-600">Explore amazing original characters from the community</p>
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
              placeholder="Search characters..."
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
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedCharacters.length} of {characters.length} characters
          </p>
        </div>

        {filteredAndSortedCharacters.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Sparkles className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No characters found</h3>
              <p className="text-gray-600 mb-4">
                {characters.length === 0
                  ? "No characters available yet. Be the first to create one!"
                  : "Try adjusting your search or filters"}
              </p>
              {characters.length === 0 && (
                <Link href="/create">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create First Character
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
                        onClick={() => toggleFavorite(character.id)}
                      >
                        <Heart className={`h-3 w-3 ${favorites.includes(character.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
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
                          By {character.createdBy}
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