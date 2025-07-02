import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation"

const mockLeaderboard = [
  {
    rank: 1,
    user: { name: "FantasyMaster", avatar: "/placeholder.svg", displayName: "Elena Rodriguez" },
    score: 15420,
    followers: 5200,
    posts: 156,
    badge: "Legendary Creator",
  },
  {
    rank: 2,
    user: { name: "DragonArtist", avatar: "/placeholder.svg", displayName: "Marcus Chen" },
    score: 12890,
    followers: 4100,
    posts: 134,
    badge: "Master Artist",
  },
  {
    rank: 3,
    user: { name: "MysticCreator", avatar: "/placeholder.svg", displayName: "Sarah Kim" },
    score: 11750,
    followers: 3800,
    posts: 128,
    badge: "Rising Star",
  },
  {
    rank: 4,
    user: { name: "ArtistAlice", avatar: "/placeholder.svg", displayName: "Alice Chen" },
    score: 9340,
    followers: 1250,
    posts: 89,
    badge: "Talented Creator",
  },
  {
    rank: 5,
    user: { name: "ColorMaster", avatar: "/placeholder.svg", displayName: "David Park" },
    score: 8920,
    followers: 2100,
    posts: 95,
    badge: "Color Wizard",
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-purple-600">#{rank}</span>
  }
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-600"
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-500"
    case 3:
      return "bg-gradient-to-r from-amber-400 to-amber-600"
    default:
      return "bg-gradient-to-r from-purple-500 to-purple-700"
  }
}

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-900 mb-2">Creator Leaderboard</h1>
            <p className="text-purple-600">Top OC creators ranked by community engagement and creativity</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {mockLeaderboard.slice(0, 3).map((creator, idx) => {
              const positions = [1, 0, 2] // Center the #1, left #2, right #3
              const actualPosition = positions[creator.rank - 1]

              return (
                <div key={creator.rank} className={`order-${actualPosition}`}>
                  <Card
                    className={`border-2 ${creator.rank === 1 ? "border-yellow-400 shadow-xl" : creator.rank === 2 ? "border-gray-400" : "border-amber-400"} ${creator.rank === 1 ? "scale-105" : ""}`}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="flex justify-center mb-2">{getRankIcon(creator.rank)}</div>
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={creator.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xl">
                          {creator.user.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-purple-900">{creator.user.displayName}</CardTitle>
                      <CardDescription>@{creator.user.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div
                        className={`text-white font-bold text-2xl py-2 px-4 rounded-lg mb-4 ${getRankColor(creator.rank)}`}
                      >
                        {creator.score.toLocaleString()} pts
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 mb-2">
                        {creator.badge}
                      </Badge>
                      <div className="grid grid-cols-2 gap-4 text-sm text-purple-600">
                        <div>
                          <div className="font-bold text-purple-900">{creator.followers.toLocaleString()}</div>
                          <div>Followers</div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-900">{creator.posts}</div>
                          <div>Posts</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Rest of Leaderboard */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Full Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaderboard.slice(3).map((creator) => (
                  <div
                    key={creator.rank}
                    className="flex items-center justify-between p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10">{getRankIcon(creator.rank)}</div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={creator.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-200 text-purple-800">
                          {creator.user.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-purple-900">{creator.user.displayName}</h3>
                        <p className="text-sm text-purple-600">@{creator.user.name}</p>
                      </div>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">
                        {creator.badge}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-purple-600">
                      <div className="text-center">
                        <div className="font-bold text-purple-900">{creator.score.toLocaleString()}</div>
                        <div>Points</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-900">{creator.followers.toLocaleString()}</div>
                        <div>Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-900">{creator.posts}</div>
                        <div>Posts</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
