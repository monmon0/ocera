"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImprovedOCHeader from "@/components/HeroHeader"
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
import { supabase } from "@/lib/supabase"
import CharacterCard from "@/components/character-card"

const CharactersCache = {
  data: null,
  expiry: null,
  duration: 5 * 60 * 1000, // 5 minutes
  
  isValid() {
    return this.data && this.expiry && Date.now() < this.expiry;
  },
  
  set(data) {
    this.data = data;
    this.expiry = Date.now() + this.duration;
  },
  
  clear() {
    this.data = null;
    this.expiry = null;
  }
};

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
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("trending")
  const [filterBy, setFilterBy] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [likedOCs, setLikedOCs] = useState<Set<number>>(new Set())
  const [savedOCs, setSavedOCs] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [followedCreators, setFollowedCreators] = useState<Set<string>>(
    new Set(mockTrendingCreators.filter((c) => c.isFollowing).map((c) => c.username)),
  )

  const [characters, setCharacters] = useState([]);


  useEffect(() => {
  const fetchCharacters = async () => {
    try {
      // Check in-memory cache first
      if (CharactersCache.isValid()) {
        console.log('✅ Using in-memory cached characters data');
        setCharacters(CharactersCache.data);
        setLoading(false);
        return;
      }

      // Fetch fresh data from Supabase
      console.log('🔄 Fetching fresh characters data from database');
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching characters:", error);
        return;
      }

      const characters = data || [];
      setCharacters(characters);

      // Cache in memory
      CharactersCache.set(characters);
      console.log('💾 Characters cached in memory for 5 minutes');

    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCreators = async () => {
    
  }

  fetchCharacters();
}, []);

// Optional: Force refresh function
const refreshCharacters = async () => {
  CharactersCache.clear();
  setLoading(true);
  
  try {
    console.log('🔄 Force refreshing characters data');
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching characters:", error);
      return;
    }

    const characters = data || [];
    setCharacters(characters);
    
    // Update cache
    CharactersCache.set(characters);
    console.log('💾 Fresh characters data cached');

  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    setLoading(false);
  }
};

// Clear cache when characters are modified (call this after create/update/delete operations)
const clearCharactersCache = () => {
  CharactersCache.clear();
  console.log('🗑️ Characters cache cleared');
};


// Optional: Add a function to force refresh the cache
// const refreshCharacters = async () => {
//   const CACHE_KEY = 'characters_cache';
//   const CACHE_EXPIRY_KEY = 'characters_cache_expiry';
  
//   // Clear cache
//   localStorage.removeItem(CACHE_KEY);
//   localStorage.removeItem(CACHE_EXPIRY_KEY);
  
//   setLoading(true);
  
//   try {
//     const { data, error } = await supabase
//       .from('characters')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) {
//       console.error("Error fetching characters:", error);
//       return;
//     }

//     const characters = data || [];
//     setCharacters(characters);

//     // Cache the fresh data
//     const now = Date.now();
//     const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
//     localStorage.setItem(CACHE_KEY, JSON.stringify(characters));
//     localStorage.setItem(CACHE_EXPIRY_KEY, (now + CACHE_DURATION).toString());

//   } catch (err) {
//     console.error("Unexpected error:", err);
//   } finally {
//     setLoading(false);
//   }
// };


  const toggleLike = (ocId: number) => {
    setLikedOCs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(ocId)) {
        newSet.delete(ocId)
      } else {
        newSet.add(ocId)
      }
      return newSet
    })
  }

  const toggleSave = (ocId: number) => {
    setSavedOCs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(ocId)) {
        newSet.delete(ocId)
      } else {
        newSet.add(ocId)
      }
      return newSet
    })
  }

  const toggleFollow = (username: string) => {
    setFollowedCreators((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(username)) {
        newSet.delete(username)
      } else {
        newSet.add(username)
      }
      return newSet
    })
  }

  const filteredOCs = characters
    .filter((oc) => {
      const matchesSearch =
        oc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // oc.id.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesTag = !selectedTag || oc.tags.includes(selectedTag)

      const matchesFilter =
        filterBy === "all" ||
        // (filterBy === "trending" && oc.trending) ||
        // (filterBy === "featured" && oc.featured) ||
        (filterBy === "recent" && new Date(oc.createdAt) > new Date("2024-01-14"))

      return matchesSearch && matchesTag && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.likes - a.likes
        case "likes":
          return b.likes - a.likes
        case "views":
          return b.views - a.views
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

     if (loading) {
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {/* <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10" />
              Discover Amazing OCs
            </h1>
            <p className="text-xl text-purple-600 mb-6">
              Explore trending characters, find new creators, and join exciting challenges
            </p>
          </div> */}
          <ImprovedOCHeader/>

          {/* Featured Section */}
          {/* <Card className="border-purple-200 shadow-lg mb-8 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-yellow-500 text-yellow-900 mb-4">
                    <Crown className="h-4 w-4 mr-1" />
                    Featured OC
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">{filteredOCs[0]?.name}</h2>
                  <p className="text-purple-100 mb-6">
                    {filteredOCs[0]?.description}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      <span>{filteredOCs[0]?.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      <span>{filteredOCs[0]?.views_count} views</span>
                    </div>
                  </div>
                  <Link href={`/character/${filteredOCs[0]?.id}`}>
                    <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                      View Character
                    </Button>
                  </Link>
                </div>
               <div className="relative aspect-square">
                  <Image
                    src={filteredOCs[0]?.char_img.length > 0 ? filteredOCs[0]?.char_img[0] : "/placeholder.svg?height=400&width=400"}
                    alt="Aria Moonweaver"
                    fill
                    className="rounded-lg shadow-2xl object-cover"
                  />
                  <div className="absolute -top-4 -right-4 bg-yellow-500 text-yellow-900 p-2 rounded-full">
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}

          <Tabs defaultValue="characters" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-purple-100 mb-8">
              <TabsTrigger
                value="characters"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Characters
              </TabsTrigger>
              <TabsTrigger
                value="creators"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                Creators
              </TabsTrigger>
              <TabsTrigger value="tags" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                Tags
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Challenges
              </TabsTrigger>
            </TabsList>

            {/* Characters Tab */}
            <TabsContent value="characters">
              {/* Search and Filters */}
               <div className="border border-purple-200 rounded-lg shadow-lg mb-8 bg-white">
          <div className="p-6">
            {/* Search and Controls */}
            <div className="flex flex-col gap-4 mb-4">
              {/* Search Input - Full width on mobile */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                <input
                  type="text"
                  placeholder="Search characters, creators, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Filters Row - Responsive layout */}
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Sort Dropdown */}
                <div className="flex-1 min-w-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="trending">Trending</option>
                    <option value="likes">Most Liked</option>
                    <option value="views">Most Viewed</option>
                    <option value="recent">Most Recent</option>
                  </select>
                </div>

                {/* Filter Dropdown */}
                <div className="flex-1 min-w-0">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Characters</option>
                    <option value="trending">Trending</option>
                    <option value="featured">Featured</option>
                    <option value="recent">Recent</option>
                  </select>
                </div>

                {/* View Mode Toggle - Compact on mobile */}
                <div className="flex rounded-md border border-purple-200 overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 flex items-center justify-center transition-colors ${
                      viewMode === "grid" 
                        ? "bg-purple-600 text-white" 
                        : "bg-white text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 flex items-center justify-center transition-colors border-l border-purple-200 ${
                      viewMode === "list" 
                        ? "bg-purple-600 text-white" 
                        : "bg-white text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">List</span>
                  </button>
                </div>
              </div>
            </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTag === null 
                ? "bg-purple-600 text-white" 
                : "border border-purple-300 text-purple-700 hover:bg-purple-50"
            }`}
          >
            All Tags
          </button>
          {mockTags.slice(0, 8).map((tag) => (
            <button
              key={tag.name}
              onClick={() => setSelectedTag(tag.name)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                selectedTag === tag.name 
                  ? "bg-purple-600 text-white" 
                  : "border border-purple-300 text-purple-700 hover:bg-purple-50"
              }`}
            >
              #{tag.name}
              {tag.trending && <TrendingUp className="h-3 w-3 text-orange-500" />}
            </button>
          ))}
        </div>
      </div>
    </div>

              {/* Results */}
              <div className="mb-4">
                <p className="text-purple-600">
                  Showing {filteredOCs.length} characters
                  {selectedTag && ` tagged with #${selectedTag}`}
                </p>
              </div>

              {/* Characters Grid/List */}
              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <CharacterCard characters={filteredOCs} isEdit={false}/>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOCs.map((oc) => (
                    <Card key={oc.id} className="border-purple-200 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="relative aspect-square">
                            <Image
                              src={oc.char_img.length > 0 ? oc.char_img[0] : "/placeholder.svg"}
                              alt={oc.name}
                              width={120}
                              height={120}
                              className="rounded-lg object-cover h-full"
                            />
                            <div className="absolute top-1 left-1 flex flex-col gap-1">
                              {/* badges */}
                            </div>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <Link href={`/character/${oc.id}`}>
                                  <h3 className="text-xl font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer">
                                    {oc.name}
                                  </h3>
                                </Link>
                                <Link href={`/profile/${oc.id}`}>
                                  <p className="text-purple-600 hover:text-purple-800 cursor-pointer">
                                    by {oc.id}
                                  </p>
                                </Link>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleSave(oc.id)}
                                  className={`${savedOCs.has(oc.id) ? "text-yellow-600" : "text-purple-600"}`}
                                >
                                  <Bookmark className={`h-4 w-4 ${savedOCs.has(oc.id) ? "fill-current" : ""}`} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleLike(oc.id)}
                                  className={`${likedOCs.has(oc.id) ? "text-red-600" : "text-purple-600"}`}
                                >
                                  <Heart className={`h-4 w-4 ${likedOCs.has(oc.id) ? "fill-current" : ""}`} />
                                </Button>
                              </div>
                            </div>

                            <p className="text-purple-700">{oc.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {oc.tags.map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-purple-600">
                                <div className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  {oc.likes}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {oc.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(oc.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Creators Tab */}
            <TabsContent value="creators">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrendingCreators.map((creator) => (
                  <Card key={creator.username} className="border-purple-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-purple-200 text-purple-800 text-xl">
                            {creator.displayName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/profile/${creator.username}`}>
                              <h3 className="font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer">
                                {creator.displayName}
                              </h3>
                            </Link>
                            {creator.featured && (
                              <Badge className="bg-yellow-500 text-yellow-900">
                                <Crown className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-purple-600">@{creator.username}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <div className="font-bold text-purple-900">{creator.followers.toLocaleString()}</div>
                          <div className="text-xs text-purple-600">Followers</div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-900">{creator.ocs}</div>
                          <div className="text-xs text-purple-600">OCs</div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-900">{creator.totalLikes.toLocaleString()}</div>
                          <div className="text-xs text-purple-600">Likes</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {creator.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        className={`w-full ${
                          followedCreators.has(creator.username)
                            ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                        onClick={() => toggleFollow(creator.username)}
                      >
                        {followedCreators.has(creator.username) ? (
                          "Following"
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Follow
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tags Tab */}
            <TabsContent value="tags">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockTags.map((tag) => (
                  <Card
                    key={tag.name}
                    className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-purple-900">#{tag.name}</h3>
                        {tag.trending && <TrendingUp className="h-5 w-5 text-orange-500" />}
                      </div>
                      <p className="text-purple-600 mb-4">{tag.count.toLocaleString()} characters</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      onClick={() => setSelectedTag(tag.name)}
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Challenges Tab */}

            {/* <TabsContent value="challenges">
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockChallenges.map((challenge) => (
                  <Card key={challenge.id} className="border-purple-200 shadow-lg">
                    <div className="relative">
                      <Image
                        src={challenge.image || "/placeholder.svg"}
                        alt={challenge.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-purple-600 text-white">{challenge.daysLeft} days left</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-purple-900 mb-2">{challenge.title}</h3>
                      <p className="text-purple-700 mb-4">{challenge.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="font-bold text-purple-900">{challenge.participants}</div>
                          <div className="text-purple-600">Participants</div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-900">{challenge.submissions}</div>
                          <div className="text-purple-600">Submissions</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                          <Trophy className="h-3 w-3 mr-1" />
                          {challenge.prize}
                        </Badge>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Zap className="h-4 w-4 mr-2" />
                        Join Challenge
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
// {filteredOCs.map((oc) => (
//                     <Card key={oc.id} className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow group">
//                       <div className="relative">
//                         <Image
//                           src={oc.char_img.length > 0 ? oc.char_img[0] : "/placeholder.svg"}
//                           alt={oc.name}
//                           width={300}
//                           height={300}
//                           className="w-full aspect-square object-cover rounded-t-lg"
//                         />
//                         <div className="absolute top-2 left-2 flex gap-1">
//                           {oc.trending && (
//                             <Badge className="bg-orange-500 text-white">
//                               <Fire className="h-3 w-3 mr-1" />
//                               Trending
//                             </Badge>
//                           )}
//                           {oc.featured && (
//                             <Badge className="bg-yellow-500 text-yellow-900">
//                               <Star className="h-3 w-3 mr-1" />
//                               Featured
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="absolute top-2 right-2 flex gap-1">
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => toggleSave(oc.id)}
//                             className={`h-8 w-8 p-0 bg-white/80 hover:bg-white ${
//                               savedOCs.has(oc.id) ? "text-yellow-600" : "text-purple-600"
//                             }`}
//                           >
//                             <Bookmark className={`h-4 w-4 ${savedOCs.has(oc.id) ? "fill-current" : ""}`} />
//                           </Button>
//                         </div>
//                       </div>
//                       <CardContent className="p-4">
//                         <div className="mb-3">
//                           <Link href={`/character/${oc.id}`}>
//                             <h3 className="font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer mb-1">
//                               {oc.name}
//                             </h3>
//                           </Link>
//                           {/* <Link href={`/profile/${oc.username}`}>
//                             <p className="text-sm text-purple-600 hover:text-purple-800 cursor-pointer">
//                               by {oc.creator.displayName}
//                             </p>
//                           </Link> */}
//                         </div>

//                         <p className="text-sm text-purple-700 mb-3 line-clamp-2">{oc.description}</p>

//                         <div className="flex flex-wrap gap-1 mb-3">
//                           {oc.tags.slice(0, 3).map((tag, idx) => (
//                             <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
//                               #{tag}
//                             </Badge>
//                           ))}
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3 text-sm text-purple-600">
//                             <div className="flex items-center gap-1">
//                               <Heart className="h-4 w-4" />
//                               {oc.likes_count}
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Eye className="h-4 w-4" />
//                               {oc.views_count}
//                             </div>
//                           </div>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => toggleLike(oc.id)}
//                             className={`${
//                               likedOCs.has(oc.id)
//                                 ? "text-red-600 hover:text-red-700"
//                                 : "text-purple-600 hover:text-purple-800"
//                             }`}
//                           >
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}