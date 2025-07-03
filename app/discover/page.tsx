"use client"

import { useState, useEffect } from "react"
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
import Navigation from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

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
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (characterId: string) => {
    setFavorites((prev) =>
      prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
    );
  };

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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10" />
              Discover Amazing OCs
            </h1>
            <p className="text-xl text-purple-600 mb-6">
              Explore trending characters, find new creators, and join exciting challenges
            </p>
          </div>

          {/* Featured Section */}
          <Card className="border-purple-200 shadow-lg mb-8 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-yellow-500 text-yellow-900 mb-4">
                    <Crown className="h-4 w-4 mr-1" />
                    Featured OC
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">Aria Moonweaver</h2>
                  <p className="text-purple-100 mb-6">
                    A celestial mage who weaves moonlight into powerful spells and protects the night realm. This
                    stunning character has captured the community's imagination with its intricate design and compelling
                    backstory.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      <span>1,247 likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      <span>5,632 views</span>
                    </div>
                  </div>
                  <Link href="/character/1">
                    <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                      View Character
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Aria Moonweaver"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-yellow-500 text-yellow-900 p-2 rounded-full">
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
              <Card className="border-purple-200 shadow-lg mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                      <Input
                        placeholder="Search characters, creators, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-40 border-purple-200 focus:border-purple-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trending">Trending</SelectItem>
                          <SelectItem value="likes">Most Liked</SelectItem>
                          <SelectItem value="views">Most Viewed</SelectItem>
                          <SelectItem value="recent">Most Recent</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterBy} onValueChange={setFilterBy}>
                        <SelectTrigger className="w-40 border-purple-200 focus:border-purple-500">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Characters</SelectItem>
                          <SelectItem value="trending">Trending</SelectItem>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="recent">Recent</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={
                          viewMode === "grid" ? "bg-purple-600 text-white" : "border-purple-300 text-purple-700"
                        }
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={
                          viewMode === "list" ? "bg-purple-600 text-white" : "border-purple-300 text-purple-700"
                        }
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Tag Filter */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedTag === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                      className={
                        selectedTag === null ? "bg-purple-600 text-white" : "border-purple-300 text-purple-700"
                      }
                    >
                      All Tags
                    </Button>
                    {mockTags.slice(0, 8).map((tag) => (
                      <Button
                        key={tag.name}
                        variant={selectedTag === tag.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(tag.name)}
                        className={
                          selectedTag === tag.name ? "bg-purple-600 text-white" : "border-purple-300 text-purple-700"
                        }
                      >
                        #{tag.name}
                        {tag.trending && <TrendingUp className="h-3 w-3 ml-1 text-orange-500" />}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
                  {filteredOCs.map((oc) => (
                    <Card key={oc.id} className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow group">
                      <div className="relative">
                        <Image
                          src={oc.image || "/placeholder.svg"}
                          alt={oc.name}
                          width={300}
                          height={300}
                          className="w-full aspect-square object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 left-2 flex gap-1">
                          {oc.trending && (
                            <Badge className="bg-orange-500 text-white">
                              <Fire className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {oc.featured && (
                            <Badge className="bg-yellow-500 text-yellow-900">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleSave(oc.id)}
                            className={`h-8 w-8 p-0 bg-white/80 hover:bg-white ${
                              savedOCs.has(oc.id) ? "text-yellow-600" : "text-purple-600"
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${savedOCs.has(oc.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <Link href={`/character/${oc.id}`}>
                            <h3 className="font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer mb-1">
                              {oc.name}
                            </h3>
                          </Link>
                          {/* <Link href={`/profile/${oc.username}`}>
                            <p className="text-sm text-purple-600 hover:text-purple-800 cursor-pointer">
                              by {oc.creator.displayName}
                            </p>
                          </Link> */}
                        </div>

                        <p className="text-sm text-purple-700 mb-3 line-clamp-2">{oc.description}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {oc.tags.slice(0, 3).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-purple-600">
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {oc.likes_count}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {oc.views_count}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleLike(oc.id)}
                            className={`${
                              likedOCs.has(oc.id)
                                ? "text-red-600 hover:text-red-700"
                                : "text-purple-600 hover:text-purple-800"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${likedOCs.has(oc.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOCs.map((oc) => (
                    <Card key={oc.id} className="border-purple-200 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="relative">
                            <Image
                              src={oc.image || "/placeholder.svg"}
                              alt={oc.name}
                              width={120}
                              height={120}
                              className="rounded-lg object-cover"
                            />
                            <div className="absolute top-1 left-1 flex flex-col gap-1">
                              {oc.trending && (
                                <Badge className="bg-orange-500 text-white text-xs">
                                  <Fire className="h-2 w-2 mr-1" />
                                  Hot
                                </Badge>
                              )}
                              {oc.featured && (
                                <Badge className="bg-yellow-500 text-yellow-900 text-xs">
                                  <Star className="h-2 w-2 mr-1" />
                                  Featured
                                </Badge>
                              )}
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
            <TabsContent value="challenges">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


// "use client";

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Search,
//   Filter,
//   Grid,
//   TrendingUp,
//   Heart,
//   Star,
//   Users,
//   Calendar,
//   Eye,
//   Grid3X3,
//   List,
//   Sparkles,
//   Trophy,
//   FlameIcon as Fire,
//   Zap,
//   Crown,
//   UserPlus,
//   Bookmark,
// } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { supabase } from "@/lib/supabase";

// const mockTrendingOCs = [
//   {
//     id: 1,
//     name: "Aria Moonweaver",
//     creator: { username: "MysticArt", displayName: "Luna Martinez", avatar: "/placeholder.svg" },
//     description: "A celestial mage who weaves moonlight into powerful spells and protects the night realm.",
//     image: "/placeholder.svg?height=300&width=300",
//     likes: 1247,
//     views: 5632,
//     tags: ["fantasy", "magic", "celestial", "mage"],
//     trending: true,
//     featured: true,
//     createdAt: "2024-01-15",
//   },
//   {
//     id: 2,
//     name: "Kai Stormborn",
//     creator: { username: "ElementalMage", displayName: "Alex Chen", avatar: "/placeholder.svg" },
//     description: "Lightning elemental warrior from the Storm Peaks, master of thunder and wind.",
//     image: "/placeholder.svg?height=300&width=300",
//     likes: 892,
//     views: 3421,
//     tags: ["elemental", "warrior", "lightning", "storm"],
//     trending: true,
//     featured: false,
//     createdAt: "2024-01-14",
//   },
//   {
//     id: 3,
//     name: "Nova Starlight",
//     creator: { username: "CosmicCreator", displayName: "Sarah Kim", avatar: "/placeholder.svg" },
//     description: "Cosmic entity who travels between galaxies, spreading stardust and wonder.",
//     image: "/placeholder.svg?height=300&width=300",
//     likes: 1156,
//     views: 4789,
//     tags: ["cosmic", "space", "entity", "stars"],
//     trending: true,
//     featured: true,
//     createdAt: "2024-01-13",
//   },
//   {
//     id: 4,
//     name: "Ember Roseheart",
//     creator: { username: "FloralFire", displayName: "Maya Rodriguez", avatar: "/placeholder.svg" },
//     description: "Fire fairy who tends to magical gardens, balancing destruction and growth.",
//     image: "/placeholder.svg?height=300&width=300",
//     likes: 734,
//     views: 2156,
//     tags: ["fairy", "fire", "nature", "garden"],
//     trending: false,
//     featured: false,
//     createdAt: "2024-01-12",
//   },
//   {
//     id: 5,
//     name: "Zephyr Nightwind",
//     creator: { username: "ShadowArtist", displayName: "Marcus Chen", avatar: "/placeholder.svg" },
//     description: "Shadow assassin who moves like the wind, protector of the innocent.",
//     image: "/placeholder.svg?height=300&width=300",
//     likes: 623,
//     views: 1987,
//     tags: ["assassin", "shadow", "wind", "protector"],
//     trending: false,
//     featured: false,
//     createdAt: "2024-01-11",
//   },
//   {
//     id: 6,
//     name: "Crystal Dreamweaver",
//     creator: { username: "DreamArtist", displayName: "Elena Rodriguez", avatar: "/placeholder.svg" },
//     description: "Dream guardian who protects sleeping minds from nightmares using crystal magic.",
//     image: "/placeholder.svg?height=300&width=300",
//     likes: 945,
//     views: 3654,
//     tags: ["dream", "crystal", "guardian", "magic"],
//     trending: false,
//     featured: true,
//     createdAt: "2024-01-10",
//   },
// ]

// const mockTrendingCreators = [
//   {
//     username: "FantasyMaster",
//     displayName: "Elena Rodriguez",
//     avatar: "/placeholder.svg",
//     followers: 5200,
//     ocs: 23,
//     totalLikes: 15420,
//     specialties: ["Fantasy", "Digital Art", "Character Design"],
//     isFollowing: false,
//     featured: true,
//   },
//   {
//     username: "DragonArtist",
//     displayName: "Marcus Chen",
//     avatar: "/placeholder.svg",
//     followers: 4100,
//     ocs: 18,
//     totalLikes: 12890,
//     specialties: ["Dragons", "Mythology", "Concept Art"],
//     isFollowing: false,
//     featured: false,
//   },
//   {
//     username: "MysticCreator",
//     displayName: "Sarah Kim",
//     avatar: "/placeholder.svg",
//     followers: 3800,
//     ocs: 31,
//     totalLikes: 11750,
//     specialties: ["Magic", "Fantasy", "Storytelling"],
//     isFollowing: true,
//     featured: true,
//   },
//   {
//     username: "ColorMaster",
//     displayName: "David Park",
//     avatar: "/placeholder.svg",
//     followers: 2100,
//     ocs: 12,
//     totalLikes: 8920,
//     specialties: ["Color Theory", "Digital Art", "Teaching"],
//     isFollowing: false,
//     featured: false,
//   },
// ]

// const mockTags = [
//   { name: "fantasy", count: 1247, trending: true },
//   { name: "magic", count: 892, trending: true },
//   { name: "dragon", count: 756, trending: false },
//   { name: "elemental", count: 634, trending: true },
//   { name: "warrior", count: 523, trending: false },
//   { name: "celestial", count: 445, trending: true },
//   { name: "gothic", count: 398, trending: false },
//   { name: "cyberpunk", count: 367, trending: false },
//   { name: "fairy", count: 334, trending: false },
//   { name: "demon", count: 298, trending: false },
// ]

// const mockChallenges = [
//   {
//     id: 1,
//     title: "Elemental Warriors",
//     description: "Create an OC based on one of the four elements: Fire, Water, Earth, or Air",
//     participants: 156,
//     submissions: 89,
//     daysLeft: 3,
//     prize: "Featured on homepage",
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 2,
//     title: "Mythical Creatures",
//     description: "Design a character inspired by mythical creatures from any culture",
//     participants: 234,
//     submissions: 167,
//     daysLeft: 8,
//     prize: "Custom badge + 1000 points",
//     image: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 3,
//     title: "Steampunk Adventures",
//     description: "Create a steampunk-inspired character with unique gadgets and style",
//     participants: 98,
//     submissions: 45,
//     daysLeft: 12,
//     prize: "Art supplies package",
//     image: "/placeholder.svg?height=200&width=300",
//   },
// ]

// export default function DiscoverPage() {
 
//   const [charactersLoading, setCharactersLoading] = useState(true);
//   const [characters, setCharacters] = useState([]);
//   const [viewMode, setViewMode] = useState("grid");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("recent");
//   const [filterBy, setFilterBy] = useState("all");  
//   const [favorites, setFavorites] = useState<string[]>([]);

//   const toggleFavorite = (characterId: string) => {
//     setFavorites((prev) =>
//       prev.includes(characterId)
//         ? prev.filter((id) => id !== characterId)
//         : [...prev, characterId]
//     );
//   };

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('characters')
//           .select('*')
//           .order('created_at', { ascending: false });

//         if (error) {
//           console.error("Error fetching characters:", error);
//           return;
//         }

//         setCharacters(data || []);
//       } catch (err) {
//         console.error("Unexpected error:", err);
//       } finally {
//         setCharactersLoading(false);
//       }
//     };
//     fetchCharacters();
//   }, []);


    

//   if (charactersLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Characters</h1>
//             <p className="text-gray-600">Explore amazing original characters from the community</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button
//               variant={viewMode === "grid" ? "default" : "outline"}
//               size="sm"
//               onClick={() => setViewMode("grid")}
//             >
//               <Grid className="h-4 w-4" />
//             </Button>
//             <Button
//               variant={viewMode === "list" ? "default" : "outline"}
//               size="sm"
//               onClick={() => setViewMode("list")}
//             >
//               <List className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search characters..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Select value={sortBy} onValueChange={setSortBy}>
//             <SelectTrigger className="w-full sm:w-48">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="recent">Most Recent</SelectItem>
//               <SelectItem value="alphabetical">Alphabetical</SelectItem>
//               <SelectItem value="likes">Most Liked</SelectItem>
//               <SelectItem value="views">Most Viewed</SelectItem>
//             </SelectContent>
//           </Select>
//           <Select value={filterBy} onValueChange={setFilterBy}>
//             <SelectTrigger className="w-full sm:w-48">
//               <SelectValue placeholder="Filter by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="trending">Trending</SelectItem>
//               <SelectItem value="popular">Popular</SelectItem>
//               <SelectItem value="recent">Recent</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Results */}
//         <div className="mb-4">
//           <p className="text-sm text-gray-600">
//             Showing {characters.length} of {characters.length} characters
//           </p>
//         </div>

//         {characters.length === 0 ? (
//           <Card>
//             <CardContent className="text-center py-12">
//               <Sparkles className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No characters found</h3>
//               <p className="text-gray-600 mb-4">
//                 {characters.length === 0
//                   ? "No characters available yet. Be the first to create one!"
//                   : "Try adjusting your search or filters"}
//               </p>
//               {characters.length === 0 && (
//                 <Link href="/create">
//                   <Button className="bg-purple-600 hover:bg-purple-700">
//                     <Sparkles className="h-4 w-4 mr-2" />
//                     Create First Character
//                   </Button>
//                 </Link>
//               )}
//             </CardContent>
//           </Card>
//         ) : (
//           <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
//             {characters.map((character) => (
//               <Card key={character.id} className="hover:shadow-lg transition-shadow">
//                 <CardContent className={viewMode === "grid" ? "p-6" : "p-4"}>
//                   <div className={viewMode === "grid" ? "text-center" : "flex items-center gap-4"}>
//                     <div className={viewMode === "grid" ? "relative mb-4" : "relative"}>
//                       <div className={`${viewMode === "grid" ? "w-16 h-16 mx-auto" : "w-12 h-12"} bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
//                         {character.name.charAt(0)}
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-white shadow-sm hover:bg-red-50"
//                         onClick={() => toggleFavorite(character.id)}
//                       >
//                         <Heart className={`h-3 w-3 ${favorites.includes(character.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
//                       </Button>
//                     </div>

//                     <div className={viewMode === "grid" ? "" : "flex-1 min-w-0"}>
//                       <Link href={`/character/${character.id}`}>
//                         <h3 className={`font-semibold hover:text-purple-600 transition-colors ${viewMode === "grid" ? "mb-1" : "truncate"}`}>
//                           {character.name}
//                         </h3>
//                       </Link>

//                       {character.shortDescription && (
//                         <p className={`text-gray-600 text-sm ${viewMode === "grid" ? "mb-3 line-clamp-2" : "truncate"}`}>
//                           {character.shortDescription}
//                         </p>
//                       )}

//                       <div className={`flex ${viewMode === "grid" ? "justify-center" : ""} gap-4 text-sm text-gray-600 mb-3`}>
//                         <span className="flex items-center gap-1">
//                           <Heart className="h-3 w-3" />
//                           {character.likes}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Eye className="h-3 w-3" />
//                           {character.views}
//                         </span>
//                       </div>

//                       <div className={`flex flex-wrap gap-1 ${viewMode === "grid" ? "justify-center" : ""}`}>
//                         {character.tags.slice(0, 3).map((tag, idx) => (
//                           <Badge key={idx} variant="secondary" className="text-xs">
//                             #{tag}
//                           </Badge>
//                         ))}
//                         {character.tags.length > 3 && (
//                           <Badge variant="outline" className="text-xs">
//                             +{character.tags.length - 3}
//                           </Badge>
//                         )}
//                       </div>
//                     </div>

//                     {viewMode === "list" && (
//                       <div className="flex flex-col gap-2">
//                         <Link href={`/character/${character.id}`}>
//                           <Button variant="outline" size="sm">
//                             View Details
//                           </Button>
//                         </Link>
//                         <div className="text-xs text-gray-500 text-center">
//                           By {character.createdBy}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }