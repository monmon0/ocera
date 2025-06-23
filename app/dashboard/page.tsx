"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
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
} from "lucide-react"
import PostList from "@/components/post-list"

// const mockPosts = [
//   {
//     id: 1,
//     user: { name: "ArtistAlice", avatar: "/placeholder.svg", followers: 1250, isFollowing: false },
//     character: "Luna Nightshade",
//     description: "My vampire OC Luna! She's a 200-year-old artist who runs a midnight gallery.",
//     images: ["/placeholder.svg?height=400&width=400"],
//     likes: 89,
//     comments: 23,
//     type: "ref-sheet",
//     status: "public",
//   },
//   {
//     id: 2,
//     user: { name: "FantasyFan", avatar: "/placeholder.svg", followers: 890, isFollowing: true },
//     character: "Zephyr Stormwind",
//     description: "Wind elemental warrior from the Sky Kingdoms. His moodboard captures his free spirit!",
//     images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
//     likes: 156,
//     comments: 34,
//     type: "moodboard",
//     status: "public",
//   },
//   {
//     id: 3,
//     user: { name: "ColorMaster", avatar: "/placeholder.svg", followers: 2100, isFollowing: false },
//     character: "Ember Rose",
//     description: "Fire fairy with a passion for gardening. Here's her color palette - warm reds and soft greens!",
//     images: ["/placeholder.svg?height=200&width=600"],
//     likes: 203,
//     comments: 45,
//     type: "palette",
//     status: "public",
//   },
// ]

const mockPosts = [];

export default function Dashboard() {
  const [followStates, setFollowStates] = useState<Record<string, boolean>>(
    mockPosts.reduce(
      (acc, post) => {
        acc[post.user.name] = post.user.isFollowing
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const [likeStates, setLikeStates] = useState<Record<number, { isLiked: boolean; count: number }>>(
    mockPosts.reduce(
      (acc, post) => {
        acc[post.id] = { isLiked: false, count: post.likes }
        return acc
      },
      {} as Record<number, { isLiked: boolean; count: number }>,
    ),
  )

  const [commentStates, setCommentStates] = useState<Record<number, { showComments: boolean; comments: string[] }>>(
    mockPosts.reduce(
      (acc, post) => {
        acc[post.id] = {
          showComments: false,
          comments: [
            `Great character design! Love the details.`,
            `This is amazing work, keep it up!`,
            `The color palette is perfect for this character.`,
          ].slice(0, Math.floor(Math.random() * 3) + 1),
        }
        return acc
      },
      {} as Record<number, { showComments: boolean; comments: string[] }>,
    ),
  )

  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>(
    mockPosts.reduce(
      (acc, post) => {
        acc[post.id] = false
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  const [newComments, setNewComments] = useState<Record<number, string>>({})
  const [shareStates, setShareStates] = useState<Record<number, boolean>>({})

  const toggleLike = (postId: number) => {
    setLikeStates((prev) => ({
      ...prev,
      [postId]: {
        isLiked: !prev[postId].isLiked,
        count: prev[postId].isLiked ? prev[postId].count - 1 : prev[postId].count + 1,
      },
    }))
  }

  const toggleFollow = (username: string) => {
    setFollowStates((prev) => ({
      ...prev,
      [username]: !prev[username],
    }))
  }

  const toggleComments = (postId: number) => {
    setCommentStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        showComments: !prev[postId].showComments,
      },
    }))
  }

  const toggleFavorite = (postId: number) => {
    setFavoriteStates((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const addComment = (postId: number) => {
    const comment = newComments[postId]?.trim()
    if (comment) {
      setCommentStates((prev) => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          comments: [...prev[postId].comments, comment],
        },
      }))
      setNewComments((prev) => ({
        ...prev,
        [postId]: "",
      }))
    }
  }

  const toggleShareModal = (postId: number) => {
    setShareStates((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const copyToClipboard = (postId: number) => {
    const url = `${window.location.origin}/character/${postId}`
    navigator.clipboard.writeText(url)
    alert("Link copied to clipboard!")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "public":
        return <Eye className="h-4 w-4 text-green-600" />
      case "private":
        return <Lock className="h-4 w-4 text-red-600" />
      case "draft":
        return <FileText className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "public":
        return "bg-green-100 text-green-700 border-green-300"
      case "private":
        return "bg-red-100 text-red-700 border-red-300"
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-purple-600">#{rank}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to OC universe! </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Discover amazing Original Characters, connect with talented creators, and share your own imaginative
              worlds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8">
                  <Plus className="h-5 w-5 mr-2" />
                 Create your first OC
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-whit bg-purple text-white hover:bg-white hover:text-purple-700 font-semibold px-8"
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
            {/* Saved & Following OCs - Stacked Vertically */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900">Saved OCs</h3>
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
                  {
                    name: "Zephyr Stormwind",
                    creator: "FantasyFan",
                    image: "/placeholder.svg?height=60&width=60",
                    likes: 156,
                  },
                ].map((oc, idx) => (
                  <div key={idx} className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Image
                        src={oc.image || "/placeholder.svg"}
                        alt={oc.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-purple-900 text-sm truncate">{oc.name}</p>
                        <p className="text-xs text-purple-600">by {oc.creator}</p>
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
                <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-800">
                  View All Saved
                </Button>
              </CardContent>
            </Card>

            {/* Following Creators */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900">Following</h3>
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
                  { name: "DragonArtist", displayName: "Marcus Chen", avatar: "/placeholder.svg", ocs: 8, newPosts: 1 },
                  { name: "MysticCreator", displayName: "Sarah Kim", avatar: "/placeholder.svg", ocs: 15, newPosts: 5 },
                ].map((creator, idx) => (
                  <div key={idx} className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                          {creator.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-purple-900 text-sm truncate">{creator.displayName}</p>
                        <p className="text-xs text-purple-600">@{creator.name}</p>
                      </div>
                      {creator.newPosts > 0 && (
                        <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
                          {creator.newPosts}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-purple-600">
                      <span>{creator.ocs} OCs</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs text-purple-700 hover:bg-purple-200"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
                <Link href="/following">
                  <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-800">
                    View All Following
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Suggested OCs */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900">Discover New OCs</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "Aria Moonweaver",
                    creator: "MysticArt",
                    image: "/placeholder.svg?height=60&width=60",
                    trending: true,
                  },
                  {
                    name: "Kai Stormborn",
                    creator: "ElementalMage",
                    image: "/placeholder.svg?height=60&width=60",
                    trending: false,
                  },
                  {
                    name: "Nova Starlight",
                    creator: "CosmicCreator",
                    image: "/placeholder.svg?height=60&width=60",
                    trending: true,
                  },
                ].map((oc, idx) => (
                  <div key={idx} className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
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
                          <p className="font-medium text-purple-900 text-sm truncate">{oc.name}</p>
                          {oc.trending && <TrendingUp className="h-3 w-3 text-orange-500" />}
                        </div>
                        <p className="text-xs text-purple-600">by {oc.creator}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full h-6 text-xs border-purple-300 text-purple-700 hover:bg-purple-200"
                    >
                      Discover
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-2">Latest from Your Feed</h2>
              <p className="text-purple-600">See what amazing characters your favorite creators have been working on</p>
            </div>

           <PostList mockPosts={mockPosts}/>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Your OCs */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900"> Your OC</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Violet Shadowmere",
                    likes: 45,
                    image: "/placeholder.svg?height=60&width=60",
                    status: "public",
                  },
                  {
                    name: "Phoenix Brightflame",
                    likes: 32,
                    image: "/placeholder.svg?height=60&width=60",
                    status: "private",
                  },
                  {
                    name: "Sage Moonwhisper",
                    likes: 67,
                    image: "/placeholder.svg?height=60&width=60",
                    status: "draft",
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
                        <p className="font-medium text-purple-900 text-sm truncate">{oc.name}</p>
                        {getStatusIcon(oc.status)}
                      </div>
                      <p className="text-xs text-purple-600">{oc.likes} likes</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs border-purple-300 text-purple-700">
                      Edit
                    </Button>
                  </div>
                ))}
                <div className="space-y-4"></div>
                <Link href="/create">
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white ">
                    <Plus className="h-4 w-4 mr-1" />
                    Create New OC
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enhanced Creator Leaderboard */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Top Creators
                  </h3>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    <Zap className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Top 3 with special styling */}
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
                  {
                    rank: 2,
                    name: "DragonArtist",
                    displayName: "Marcus Chen",
                    score: 12890,
                    avatar: "/placeholder.svg",
                    change: "+85",
                    badge: "Master Artist",
                  },
                  {
                    rank: 3,
                    name: "MysticCreator",
                    displayName: "Sarah Kim",
                    score: 11750,
                    avatar: "/placeholder.svg",
                    change: "+67",
                    badge: "Rising Star",
                  },
                ].map((creator) => (
                  <div
                    key={creator.rank}
                    className={`p-3 rounded-lg ${creator.rank === 1 ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200" : creator.rank === 2 ? "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200" : "bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8">{getRankIcon(creator.rank)}</div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                          {creator.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-purple-900 text-sm truncate">{creator.displayName}</p>
                        <p className="text-xs text-purple-600">@{creator.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-purple-900">{creator.score.toLocaleString()}</p>
                        <p className="text-xs text-green-600">{creator.change}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      {creator.badge}
                    </Badge>
                  </div>
                ))}

                {/* Remaining creators */}
                {[
                  {
                    rank: 4,
                    name: "ArtistAlice",
                    displayName: "Alice Chen",
                    score: 9340,
                    avatar: "/placeholder.svg",
                    change: "+45",
                  },
                  {
                    rank: 5,
                    name: "ColorMaster",
                    displayName: "David Park",
                    score: 8920,
                    avatar: "/placeholder.svg",
                    change: "+32",
                  },
                ].map((creator) => (
                  <div
                    key={creator.rank}
                    className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8">
                      <span className="text-sm font-bold text-purple-600">#{creator.rank}</span>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                        {creator.displayName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-purple-900 text-sm truncate">{creator.displayName}</p>
                      <p className="text-xs text-purple-600">{creator.score.toLocaleString()} pts</p>
                    </div>
                    <div className="text-xs text-green-600">{creator.change}</div>
                  </div>
                ))}

                <div className="pt-2 border-t border-purple-200">
                  <Link href="/leaderboard">
                    <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-800">
                      <Trophy className="h-4 w-4 mr-2" />
                      View Full Leaderboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenges */}
            {/* <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Weekly Challenge
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Elemental Warriors</h4>
                  <p className="text-sm text-purple-700 mb-3">
                    Create an OC based on one of the four elements: Fire, Water, Earth, or Air
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      3 days left
                    </Badge>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Join Challenge
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
}
