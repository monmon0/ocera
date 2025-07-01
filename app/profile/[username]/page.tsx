import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, MapPin, Calendar, Quote } from "lucide-react"
import Navigation from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"

const mockProfile = {
  username: "ArtistAlice",
  displayName: "Alice Chen",
  avatar: "/placeholder.svg",
  bio: "Digital artist specializing in fantasy OCs. Creating magical worlds one character at a time! ✨",
  location: "San Francisco, CA",
  joinDate: "March 2023",
  followers: 1250,
  following: 340,
  posts: 89,
  isFollowing: false,
}

const mockOCs = [
  {
    id: 1,
    name: "Luna Nightshade",
    quote: "Art is the window to the soul, even for the undead.",
    description:
      "A 200-year-old vampire who runs an underground art gallery. She's elegant, mysterious, and has a passion for Renaissance paintings.",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    palette: ["#2D1B69", "#8B5CF6", "#C084FC", "#E9D5FF"],
    moodboard: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 2,
    name: "Sage Moonwhisper",
    quote: "Nature speaks to those who listen with their hearts.",
    description:
      "A forest guardian with the ability to communicate with plants and animals. She's wise beyond her years and fiercely protective of her woodland home.",
    images: ["/placeholder.svg?height=300&width=300"],
    palette: ["#065F46", "#10B981", "#6EE7B7", "#ECFDF5"],
    moodboard: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="border-purple-200 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={mockProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-purple-200 text-purple-800 text-2xl">
                  {mockProfile.displayName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-purple-900">{mockProfile.displayName}</h1>
                    <p className="text-purple-600">@{mockProfile.username}</p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white mt-4 sm:mt-0">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                </div>

                <p className="text-purple-700 mb-4">{mockProfile.bio}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-purple-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {mockProfile.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {mockProfile.joinDate}
                  </div>
                </div>

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-bold text-purple-900">{mockProfile.posts}</span>
                    <span className="text-purple-600 ml-1">Posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-purple-900">{mockProfile.followers}</span>
                    <span className="text-purple-600 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-purple-900">{mockProfile.following}</span>
                    <span className="text-purple-600 ml-1">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OC Showcase */}
        <div className="space-y-8">
          {mockOCs.map((oc) => (
            <Card key={oc.id} className="border-purple-200 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Link href={`/character/${oc.id}`}>
                    <h2 className="text-2xl font-bold text-purple-900 mb-2 hover:text-purple-700 transition-colors cursor-pointer">
                      {oc.name}
                    </h2>
                  </Link>
                  <div className="flex items-start gap-2 mb-4">
                    <Quote className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <p className="text-purple-700 italic">"{oc.quote}"</p>
                  </div>
                  <p className="text-purple-600">{oc.description}</p>
                </div>

                <Tabs defaultValue="images" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-purple-100">
                    <TabsTrigger
                      value="images"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Images
                    </TabsTrigger>
                    <TabsTrigger
                      value="refsheet"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Ref Sheet
                    </TabsTrigger>
                    <TabsTrigger
                      value="palette"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Palette
                    </TabsTrigger>
                    <TabsTrigger
                      value="moodboard"
                      className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                    >
                      Moodboard
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="images" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {oc.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`${oc.name} ${idx + 1}`}
                          width={300}
                          height={300}
                          className="w-full rounded-lg object-cover shadow-md"
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="refsheet" className="mt-6">
                    <div className="text-center py-12 text-purple-600">
                      <p>Reference sheet coming soon...</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="palette" className="mt-6">
                    <div className="flex flex-wrap gap-4">
                      {oc.palette.map((color, idx) => (
                        <div key={idx} className="text-center">
                          <div className="w-20 h-20 rounded-lg shadow-md mb-2" style={{ backgroundColor: color }} />
                          <p className="text-sm text-purple-600 font-mono">{color}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="moodboard" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {oc.moodboard.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`${oc.name} moodboard ${idx + 1}`}
                          width={200}
                          height={200}
                          className="w-full rounded-lg object-cover shadow-md"
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
