"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  UserMinus,
  Search,
  Filter,
  Users,
  Calendar,
  MapPin,
  Heart,
  ArrowLeft,
  SortAsc,
  Grid3X3,
  List,
} from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"

const mockFollowing = [
  {
    id: 1,
    username: "FantasyMaster",
    displayName: "Elena Rodriguez",
    avatar: "/placeholder.svg",
    bio: "Fantasy artist creating epic worlds and legendary characters. 15+ years of digital art experience.",
    location: "Barcelona, Spain",
    followers: 5200,
    following: 340,
    ocs: 23,
    totalLikes: 15420,
    joinDate: "2021-03-15",
    isFollowing: true,
    lastActive: "2 hours ago",
    newPosts: 3,
    specialties: ["Fantasy", "Digital Art", "Character Design"],
    recentOCs: [
      { name: "Draven Shadowbane", image: "/placeholder.svg?height=100&width=100", likes: 234 },
      { name: "Lyra Moonwhisper", image: "/placeholder.svg?height=100&width=100", likes: 189 },
      { name: "Thorne Ironforge", image: "/placeholder.svg?height=100&width=100", likes: 156 },
    ],
  },
  {
    id: 2,
    username: "DragonArtist",
    displayName: "Marcus Chen",
    avatar: "/placeholder.svg",
    bio: "Specializing in dragon OCs and mythical creatures. Commission work available!",
    location: "Tokyo, Japan",
    followers: 4100,
    following: 280,
    ocs: 18,
    totalLikes: 12890,
    joinDate: "2020-11-22",
    isFollowing: true,
    lastActive: "1 day ago",
    newPosts: 1,
    specialties: ["Dragons", "Mythology", "Concept Art"],
    recentOCs: [
      { name: "Crimson Wyrm", image: "/placeholder.svg?height=100&width=100", likes: 312 },
      { name: "Azure Serpent", image: "/placeholder.svg?height=100&width=100", likes: 278 },
    ],
  },
  {
    id: 3,
    username: "MysticCreator",
    displayName: "Sarah Kim",
    avatar: "/placeholder.svg",
    bio: "Creating magical characters and enchanted worlds. Love collaborating with other artists!",
    location: "Seoul, South Korea",
    followers: 3800,
    following: 420,
    ocs: 31,
    totalLikes: 11750,
    joinDate: "2021-07-08",
    isFollowing: true,
    lastActive: "5 hours ago",
    newPosts: 5,
    specialties: ["Magic", "Fantasy", "Storytelling"],
    recentOCs: [
      { name: "Celestial Mage", image: "/placeholder.svg?height=100&width=100", likes: 198 },
      { name: "Forest Guardian", image: "/placeholder.svg?height=100&width=100", likes: 167 },
      { name: "Star Weaver", image: "/placeholder.svg?height=100&width=100", likes: 145 },
    ],
  },
  {
    id: 4,
    username: "ColorMaster",
    displayName: "David Park",
    avatar: "/placeholder.svg",
    bio: "Color theory enthusiast and palette creator. Teaching digital art fundamentals.",
    location: "Los Angeles, CA",
    followers: 2100,
    following: 150,
    ocs: 12,
    totalLikes: 8920,
    joinDate: "2022-01-12",
    isFollowing: true,
    lastActive: "3 hours ago",
    newPosts: 2,
    specialties: ["Color Theory", "Digital Art", "Teaching"],
    recentOCs: [
      { name: "Prism Knight", image: "/placeholder.svg?height=100&width=100", likes: 223 },
      { name: "Rainbow Sprite", image: "/placeholder.svg?height=100&width=100", likes: 189 },
    ],
  },
  {
    id: 5,
    username: "NightArtist",
    displayName: "Luna Martinez",
    avatar: "/placeholder.svg",
    bio: "Gothic and dark fantasy artist. Creating characters that live in the shadows.",
    location: "Mexico City, Mexico",
    followers: 1890,
    following: 95,
    ocs: 16,
    totalLikes: 7650,
    joinDate: "2021-09-30",
    isFollowing: true,
    lastActive: "1 hour ago",
    newPosts: 4,
    specialties: ["Gothic", "Dark Fantasy", "Horror"],
    recentOCs: [
      { name: "Shadow Reaper", image: "/placeholder.svg?height=100&width=100", likes: 267 },
      { name: "Midnight Witch", image: "/placeholder.svg?height=100&width=100", likes: 234 },
    ],
  },
  {
    id: 6,
    username: "SciFiCreator",
    displayName: "Alex Thompson",
    avatar: "/placeholder.svg",
    bio: "Futuristic character designer and world builder. Cyberpunk is my passion!",
    location: "London, UK",
    followers: 1650,
    following: 200,
    ocs: 14,
    totalLikes: 6890,
    joinDate: "2022-03-18",
    isFollowing: true,
    lastActive: "6 hours ago",
    newPosts: 1,
    specialties: ["Sci-Fi", "Cyberpunk", "World Building"],
    recentOCs: [
      { name: "Cyber Samurai", image: "/placeholder.svg?height=100&width=100", likes: 198 },
      { name: "Neon Hacker", image: "/placeholder.svg?height=100&width=100", likes: 176 },
    ],
  },
]

export default function FollowingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [followStates, setFollowStates] = useState<Record<number, boolean>>(
    mockFollowing.reduce(
      (acc, creator) => {
        acc[creator.id] = creator.isFollowing
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  const toggleFollow = (creatorId: number) => {
    setFollowStates((prev) => ({
      ...prev,
      [creatorId]: !prev[creatorId],
    }))
  }

  const filteredAndSortedCreators = mockFollowing
    .filter((creator) => {
      const matchesSearch =
        creator.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "active" && creator.lastActive.includes("hour")) ||
        (filterBy === "new-posts" && creator.newPosts > 0) ||
        (filterBy === "high-engagement" && creator.totalLikes > 10000)

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        case "followers":
          return b.followers - a.followers
        case "ocs":
          return b.ocs - a.ocs
        case "likes":
          return b.totalLikes - a.totalLikes
        case "alphabetical":
          return a.displayName.localeCompare(b.displayName)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-purple-700 hover:text-purple-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Feed
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-purple-900 flex items-center gap-2">
                <Users className="h-8 w-8" />
                Following
              </h1>
              <p className="text-purple-600">Manage and discover the creators you follow</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-purple-600 text-white" : "border-purple-300 text-purple-700"}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-purple-600 text-white" : "border-purple-300 text-purple-700"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-900">{mockFollowing.length}</div>
                <div className="text-sm text-purple-600">Following</div>
              </CardContent>
            </Card>
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-900">
                  {mockFollowing.reduce((sum, creator) => sum + creator.newPosts, 0)}
                </div>
                <div className="text-sm text-purple-600">New Posts</div>
              </CardContent>
            </Card>
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-900">
                  {mockFollowing.reduce((sum, creator) => sum + creator.ocs, 0)}
                </div>
                <div className="text-sm text-purple-600">Total OCs</div>
              </CardContent>
            </Card>
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-900">
                  {mockFollowing.filter((creator) => creator.lastActive.includes("hour")).length}
                </div>
                <div className="text-sm text-purple-600">Active Today</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="border-purple-200 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                  <Input
                    placeholder="Search creators by name, username, or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-purple-200 focus:border-purple-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-purple-200 focus:border-purple-500">
                      <SortAsc className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Followed</SelectItem>
                      <SelectItem value="followers">Most Followers</SelectItem>
                      <SelectItem value="ocs">Most OCs</SelectItem>
                      <SelectItem value="likes">Most Liked</SelectItem>
                      <SelectItem value="alphabetical">A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-40 border-purple-200 focus:border-purple-500">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Creators</SelectItem>
                      <SelectItem value="active">Active Today</SelectItem>
                      <SelectItem value="new-posts">New Posts</SelectItem>
                      <SelectItem value="high-engagement">High Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mb-4">
            <p className="text-purple-600">
              Showing {filteredAndSortedCreators.length} of {mockFollowing.length} creators
            </p>
          </div>

          {/* Creators Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCreators.map((creator) => (
                <Card key={creator.id} className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-purple-200 text-purple-800 text-lg">
                            {creator.displayName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Link href={`/profile/${creator.username}`}>
                            <h3 className="font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer">
                              {creator.displayName}
                            </h3>
                          </Link>
                          <p className="text-sm text-purple-600">@{creator.username}</p>
                          {creator.newPosts > 0 && (
                            <Badge variant="secondary" className="bg-purple-600 text-white text-xs mt-1">
                              {creator.newPosts} new posts
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFollow(creator.id)}
                        className={
                          followStates[creator.id]
                            ? "border-red-300 text-red-700 hover:bg-red-50"
                            : "border-purple-300 text-purple-700 hover:bg-purple-50"
                        }
                      >
                        {followStates[creator.id] ? (
                          <>
                            <UserMinus className="h-4 w-4 mr-1" />
                            Unfollow
                          </>
                        ) : (
                          "Follow"
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-purple-700 line-clamp-2">{creator.bio}</p>

                    <div className="flex items-center gap-4 text-xs text-purple-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {creator.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {creator.lastActive}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {creator.specialties.slice(0, 3).map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="font-bold text-purple-900">{creator.followers.toLocaleString()}</div>
                        <div className="text-purple-600">Followers</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-900">{creator.ocs}</div>
                        <div className="text-purple-600">OCs</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-900">{creator.totalLikes.toLocaleString()}</div>
                        <div className="text-purple-600">Likes</div>
                      </div>
                    </div>

                    {/* Recent OCs Preview */}
                    <div>
                      <h4 className="text-sm font-semibold text-purple-900 mb-2">Recent OCs</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {creator.recentOCs.slice(0, 3).map((oc, idx) => (
                          <div key={idx} className="group relative">
                            <Image
                              src={oc.image || "/placeholder.svg"}
                              alt={oc.name}
                              width={100}
                              height={100}
                              className="w-full aspect-square rounded-lg object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <div className="text-white text-center">
                                <p className="text-xs font-medium">{oc.name}</p>
                                <p className="text-xs flex items-center justify-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {oc.likes}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedCreators.map((creator) => (
                <Card key={creator.id} className="border-purple-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xl">
                          {creator.displayName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/profile/${creator.username}`}>
                              <h3 className="text-xl font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer">
                                {creator.displayName}
                              </h3>
                            </Link>
                            <p className="text-purple-600">@{creator.username}</p>
                            {creator.newPosts > 0 && (
                              <Badge variant="secondary" className="bg-purple-600 text-white text-sm mt-1">
                                {creator.newPosts} new posts
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFollow(creator.id)}
                            className={
                              followStates[creator.id]
                                ? "border-red-300 text-red-700 hover:bg-red-50"
                                : "border-purple-300 text-purple-700 hover:bg-purple-50"
                            }
                          >
                            {followStates[creator.id] ? (
                              <>
                                <UserMinus className="h-4 w-4 mr-1" />
                                Unfollow
                              </>
                            ) : (
                              "Follow"
                            )}
                          </Button>
                        </div>

                        <p className="text-purple-700">{creator.bio}</p>

                        <div className="flex items-center gap-6 text-sm text-purple-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {creator.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Last active {creator.lastActive}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {creator.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <div className="font-bold text-purple-900">{creator.followers.toLocaleString()}</div>
                              <div className="text-purple-600">Followers</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-purple-900">{creator.ocs}</div>
                              <div className="text-purple-600">OCs</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-purple-900">{creator.totalLikes.toLocaleString()}</div>
                              <div className="text-purple-600">Likes</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent OCs in List View */}
                      <div className="hidden lg:block">
                        <h4 className="text-sm font-semibold text-purple-900 mb-2">Recent OCs</h4>
                        <div className="flex gap-2">
                          {creator.recentOCs.slice(0, 3).map((oc, idx) => (
                            <div key={idx} className="group relative">
                              <Image
                                src={oc.image || "/placeholder.svg"}
                                alt={oc.name}
                                width={60}
                                height={60}
                                className="w-15 h-15 rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <div className="text-white text-center">
                                  <p className="text-xs font-medium">{oc.name}</p>
                                  <p className="text-xs flex items-center justify-center gap-1">
                                    <Heart className="h-3 w-3" />
                                    {oc.likes}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredAndSortedCreators.length === 0 && (
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-purple-900 mb-2">No creators found</h3>
                <p className="text-purple-600 mb-4">Try adjusting your search terms or filters</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterBy("all")
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
