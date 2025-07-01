import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Quote,
  MapPin,
  Palette,
  Camera,
  FileText,
  Sparkles,
  ArrowLeft,
} from "lucide-react"
import Navigation from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"

// Mock character data - in real app this would come from database
const mockCharacter = {
  id: "1",
  name: "Luna Nightshade",
  creator: {
    username: "ArtistAlice",
    displayName: "Alice Chen",
    avatar: "/placeholder.svg",
    followers: 1250,
    isFollowing: false,
  },
  quote: "Art is the window to the soul, even for the undead.",
  shortDescription: "A 200-year-old vampire who runs an underground art gallery.",
  fullDescription: `Luna Nightshade is a captivating vampire who has walked the earth for over two centuries. Born in 1823 in Victorian London, she was turned during the height of the Romantic era, which deeply influenced her artistic sensibilities.

After decades of wandering, Luna settled in modern-day San Francisco where she established "Crimson Canvas," an exclusive underground art gallery that operates only during the midnight hours. Her gallery has become a sanctuary for supernatural beings and mortal artists alike, bridging two worlds through the universal language of art.

Luna possesses an otherworldly elegance, with porcelain skin that seems to glow in moonlight and eyes that shift between deep violet and silver depending on her mood. Her long, raven-black hair often cascades over her shoulders like liquid shadow, and she favors Victorian-inspired fashion with modern gothic touches.

Despite her vampiric nature, Luna has retained much of her humanity through her passion for art. She's known for her incredible patience when mentoring young artists, though she can be fiercely protective of those she cares about. Her supernatural abilities include enhanced senses, superhuman strength, and the ability to move with ghost-like silence.`,

  // Character Details
  age: "200+ years (appears 25)",
  species: "Vampire",
  occupation: "Art Gallery Owner & Curator",
  location: "San Francisco, CA",
  height: "5'7\"",
  personality: ["Elegant", "Mysterious", "Passionate", "Protective", "Patient", "Artistic"],
  abilities: ["Enhanced Senses", "Superhuman Strength", "Silent Movement", "Art Appraisal", "Night Vision"],
  interests: ["Renaissance Art", "Classical Music", "Moonlit Walks", "Red Wine", "Antique Books"],
  dislikes: ["Sunlight", "Garlic", "Crude Behavior", "Modern Pop Music", "Rushed Decisions"],

  // Media
  images: [
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=500&width=400",
    "/placeholder.svg?height=400&width=600",
  ],
  refSheet: "/placeholder.svg?height=800&width=1200",
  moodboard: [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ],
  palette: [
    { name: "Midnight Purple", hex: "#2D1B69", description: "Her signature dress color" },
    { name: "Ethereal Violet", hex: "#8B5CF6", description: "Eye color when calm" },
    { name: "Mystic Lavender", hex: "#C084FC", description: "Magical aura" },
    { name: "Pale Moonlight", hex: "#E9D5FF", description: "Skin tone" },
    { name: "Crimson Blood", hex: "#DC2626", description: "Accent color" },
    { name: "Shadow Black", hex: "#1F2937", description: "Hair color" },
  ],

  // Engagement
  likesCount: 342,
  comments: 89,
  bookmarks: 156,
  shares: 23,

  // Meta
  createdAt: "2024-01-15",
  lastUpdated: "2024-01-20",
  tags: ["vampire", "gothic", "art", "supernatural", "elegant", "victorian"],
}

export default function CharacterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href={`/profile/${mockCharacter.creator.username}`}>
            <Button variant="ghost" className="mb-6 text-purple-700 hover:text-purple-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {mockCharacter.creator.displayName}'s Profile
            </Button>
          </Link>

          {/* Character Header */}
          <Card className="border-purple-200 shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Character Image */}
                <div className="lg:col-span-1">
                  <Image
                    src={mockCharacter.images[0] || "/placeholder.svg"}
                    alt={mockCharacter.name}
                    width={400}
                    height={600}
                    className="w-full rounded-lg shadow-lg object-cover"
                  />
                </div>

                {/* Character Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-purple-900 mb-2">{mockCharacter.name}</h1>
                    <div className="flex items-center gap-2 mb-4">
                      <Quote className="h-5 w-5 text-purple-500" />
                      <p className="text-lg text-purple-700 italic">"{mockCharacter.quote}"</p>
                    </div>
                    <p className="text-purple-600 text-lg">{mockCharacter.shortDescription}</p>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={mockCharacter.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-200 text-purple-800">
                          {mockCharacter.creator.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-purple-900">Created by {mockCharacter.creator.displayName}</p>
                        <p className="text-sm text-purple-600">
                          @{mockCharacter.creator.username} • {mockCharacter.creator.followers} followers
                        </p>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Follow Creator</Button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{mockCharacter.age}</div>
                      <div className="text-sm text-purple-600">Age</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{mockCharacter.species}</div>
                      <div className="text-sm text-purple-600">Species</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{mockCharacter.height}</div>
                      <div className="text-sm text-purple-600">Height</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{mockCharacter.location}</div>
                      <div className="text-sm text-purple-600">Location</div>
                    </div>
                  </div>

                  {/* Engagement Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {mockCharacter.likesCount}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {mockCharacter.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                      >
                        <Bookmark className="h-4 w-4 mr-1" />
                        {mockCharacter.bookmarks}
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Character Details Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-purple-100 mb-8">
              <TabsTrigger value="about" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-1" />
                About
              </TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Camera className="h-4 w-4 mr-1" />
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="refsheet"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4 mr-1" />
                Ref Sheet
              </TabsTrigger>
              <TabsTrigger value="palette" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Palette className="h-4 w-4 mr-1" />
                Palette
              </TabsTrigger>
              <TabsTrigger
                value="moodboard"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Moodboard
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <MapPin className="h-4 w-4 mr-1" />
                Details
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Character Biography</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-purple max-w-none">
                    {mockCharacter.fullDescription.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="text-purple-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <Separator className="bg-purple-200" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Personality Traits</h3>
                      <div className="flex flex-wrap gap-2">
                        {mockCharacter.personality.map((trait, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Abilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {mockCharacter.abilities.map((ability, idx) => (
                          <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                            {ability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Interests</h3>
                      <ul className="space-y-1">
                        {mockCharacter.interests.map((interest, idx) => (
                          <li key={idx} className="text-purple-600 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full" />
                            {interest}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Dislikes</h3>
                      <ul className="space-y-1">
                        {mockCharacter.dislikes.map((dislike, idx) => (
                          <li key={idx} className="text-purple-600 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                            {dislike}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Character Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCharacter.images.map((img, idx) => (
                      <div key={idx} className="group relative">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`${mockCharacter.name} ${idx + 1}`}
                          width={400}
                          height={400}
                          className="w-full rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reference Sheet Tab */}
            <TabsContent value="refsheet">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Reference Sheet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Image
                      src={mockCharacter.refSheet || "/placeholder.svg"}
                      alt={`${mockCharacter.name} Reference Sheet`}
                      width={1200}
                      height={800}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Color Palette Tab */}
            <TabsContent value="palette">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Color Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCharacter.palette.map((color, idx) => (
                      <div key={idx} className="text-center p-4 bg-white rounded-lg border border-purple-200">
                        <div className="w-full h-24 rounded-lg shadow-md mb-4" style={{ backgroundColor: color.hex }} />
                        <h4 className="font-semibold text-purple-900 mb-1">{color.name}</h4>
                        <p className="text-sm font-mono text-purple-600 mb-2">{color.hex}</p>
                        <p className="text-xs text-purple-500">{color.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Moodboard Tab */}
            <TabsContent value="moodboard">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Character Moodboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockCharacter.moodboard.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img || "/placeholder.svg"}
                        alt={`${mockCharacter.name} mood ${idx + 1}`}
                        width={300}
                        height={300}
                        className="w-full rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Character Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Full Name</span>
                        <span className="text-purple-700">{mockCharacter.name}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Age</span>
                        <span className="text-purple-700">{mockCharacter.age}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Species</span>
                        <span className="text-purple-700">{mockCharacter.species}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Height</span>
                        <span className="text-purple-700">{mockCharacter.height}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Occupation</span>
                        <span className="text-purple-700">{mockCharacter.occupation}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Location</span>
                        <span className="text-purple-700">{mockCharacter.location}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Created</span>
                        <span className="text-purple-700">
                          {new Date(mockCharacter.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Last Updated</span>
                        <span className="text-purple-700">
                          {new Date(mockCharacter.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-purple-200" />

                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockCharacter.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
