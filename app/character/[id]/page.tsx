'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import CharacterHeader from "@/components/character-header"
import { use } from 'react';
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
import { useState, useEffect } from "react"
import { notFound } from 'next/navigation';
import { supabase } from "@/lib/supabase";
import { set } from "date-fns";



export default function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = use(params);
  const [character, setCharacter] = useState([]); // Replace with real data fetching
  const [creator, setCreator] = useState(null);
  const [bgColor, setBgColor] = useState(""); // Default background color
  useEffect(() => {
    // This is where you would fetch the character data from your API
    // For now, we're using mock data

    const fetchCharacter = async () => {
      const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error('Character not found:', error);
        return notFound();
      }
      // console.log("Character data fetched:", data);
      // console.log("Character ID:", charID);
       const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, image, name, username, followers_count, banner_img")
        .eq("id", data.user_id)
        .single();

      if (userError || !userData) {
        console.error('User not found:', userError);      
        return notFound();
      }
      setCharacter(data);
      setCreator(userData);
      console.log("color:", data.profile_color);

      let className = data.profile_color
        ? `bg-[${data.profile_color}]`
        : "bg-gradient-to-br from-purple-50 to-indigo-100";

      setBgColor(data.profile_color);
      console.log("Character data:", data);
    }
    fetchCharacter();
  }, []);


  return (
    <div className={`min-h-screen `}
      style={{ backgroundColor: bgColor || "#f4f2f5" }} // Fallback color
      >
      {/* <p>{user.profile_color }</p> */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href={`/dashboard`}>
            <Button variant="ghost" className="mb-6 text-purple-700 hover:text-purple-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          {/* Character Header */}
          <CharacterHeader creator={creator} />
          <Card className="border-purple-200 shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Character Image */}
                <div className="lg:col-span-1">
                <Image
                  src={character.char_img && character.char_img.length > 0 ? character.char_img[0] : "/placeholder.svg"}
                  alt={character.name}
                  width={400}
                  height={400}
                  className="w-full aspect-square rounded-lg shadow-lg object-cover"
                />
              </div>


                {/* Character Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-purple-900 mb-2">{character?.name}</h1>
                    <div className="flex items-center gap-2 mb-4">
                      <Quote className="h-5 w-5 text-purple-500" />
                      <p className="text-lg text-purple-700 italic">"{character?.quote}"</p>
                    </div>
                    <p className="text-purple-600 text-lg">{character?.short_description}</p>
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={ creator?.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-200 text-purple-800">
                          {creator?.name} 
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-purple-900">Created by {creator?.name || ""}</p>
                        <p className="text-sm text-purple-600">
                          @
                          {creator?.username} • {creator?.followers_count || 0} followers
                        </p>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Follow</Button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{character.age}</div>
                      <div className="text-sm text-purple-600">Age</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{character.species}</div>
                      <div className="text-sm text-purple-600">Species</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{character.height}</div>
                      <div className="text-sm text-purple-600">Height</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-bold text-purple-900">{character.location}</div>
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
                        {character.likes_count}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {/* {character.comments} */}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                      >
                        <Bookmark className="h-4 w-4 mr-1" />
                        {/* {character.bookmarks} */}
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
                    {character.description && character.description.split("\n\n").map((paragraph, idx) => (
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
                        {character.personality_traits && character.personality_traits.map((trait, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Abilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {character.abilities && character.abilities.map((ability, idx) => (
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
                        {character.interests && character.interests.map((interest, idx) => (
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
                        {character.dislikes && character.dislikes.map((dislike, idx) => (
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
                    {character.char_img && character.char_img.length > 0 && character.char_img.map((img, idx) => (
                      <div key={idx} className="group relative">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`${character.name} ${idx + 1}`}
                          width={400}
                          height={400}
                          loading="lazy"
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
                      src={character.ref_sheet || "/placeholder.svg"}
                      alt={`${character.name} Reference Sheet`}
                      width={500}
                      height={500}
                      className="max-w-md mx-auto rounded-lg shadow-lg"
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
                    {character.color_palette && character.color_palette.map((color, idx) => (
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
                  <div className="text-center">
                    <Image
                      src={character?.moodboard || "/placeholder.svg"}
                      alt={character?.moodboard || "moodboard"}
                      width={300}
                      height={300}
                      className="max-w-md mx-auto rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow"
                    />
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
                        <span className="text-purple-700">{character.name}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Age</span>
                        <span className="text-purple-700">{character.age}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Species</span>
                        <span className="text-purple-700">{character.species}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Height</span>
                        <span className="text-purple-700">{character.height}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Occupation</span>
                        {/* <span className="text-purple-700">{character.occupation}</span> */}
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Location</span>
                        <span className="text-purple-700">{character.location}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Created</span>
                        <span className="text-purple-700">
                          {new Date(character.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">Last Updated</span>
                        <span className="text-purple-700">
                          {new Date(character.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-purple-200" />

                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {character.tags && character.tags.map((tag, idx) => (
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
