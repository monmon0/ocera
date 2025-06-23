"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Save, ArrowLeft, Plus, X, MapPin, Instagram, Twitter, Globe } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"

export default function EditProfilePage() {
  const [displayName, setDisplayName] = useState("Alice Chen")
  const [username, setUsername] = useState("ArtistAlice")
  const [bio, setBio] = useState(
    "Digital artist specializing in fantasy OCs. Creating magical worlds one character at a time! ✨",
  )
  const [location, setLocation] = useState("San Francisco, CA")
  const [website, setWebsite] = useState("https://aliceart.com")
  const [instagram, setInstagram] = useState("@artistalice")
  const [twitter, setTwitter] = useState("@artistalice")
  const [isProfilePublic, setIsProfilePublic] = useState(true)
  const [allowMessages, setAllowMessages] = useState(true)
  const [showEmail, setShowEmail] = useState(false)
  const [interests, setInterests] = useState(["Fantasy Art", "Character Design", "Digital Painting", "Concept Art"])
  const [newInterest, setNewInterest] = useState("")
  const [profileTheme, setProfileTheme] = useState("purple")

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest("")
    }
  }

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Profile Data:", {
      displayName,
      username,
      bio,
      location,
      website,
      instagram,
      twitter,
      isProfilePublic,
      allowMessages,
      showEmail,
      interests,
      profileTheme,
    })
    alert("Profile updated successfully! (This is a demo)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/profile/ArtistAlice">
              <Button variant="ghost" className="text-purple-700 hover:text-purple-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-purple-900">Edit Profile</h1>
              <p className="text-purple-600">Customize how others see your creator profile</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Profile Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Basic Information</CardTitle>
                  <CardDescription>Your public profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-purple-200 text-purple-800 text-2xl">AC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" className="border-purple-300 text-purple-700">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-purple-600">JPG, PNG or GIF. Max size 5MB.</p>
                    </div>
                  </div>

                  <Separator className="bg-purple-200" />

                  {/* Name and Username */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="display-name" className="text-purple-900">
                        Display Name
                      </Label>
                      <Input
                        id="display-name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-purple-900">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-purple-900">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="border-purple-200 focus:border-purple-500 min-h-[100px]"
                      placeholder="Tell others about yourself and your art..."
                    />
                    <p className="text-sm text-purple-600">{bio.length}/500 characters</p>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-purple-900">
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border-purple-200 focus:border-purple-500 pl-10"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Social Links</CardTitle>
                  <CardDescription>Connect your social media and portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-purple-900">
                      Website/Portfolio
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                      <Input
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="border-purple-200 focus:border-purple-500 pl-10"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-purple-900">
                        Instagram
                      </Label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                        <Input
                          id="instagram"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="border-purple-200 focus:border-purple-500 pl-10"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="text-purple-900">
                        Twitter/X
                      </Label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                        <Input
                          id="twitter"
                          value={twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                          className="border-purple-200 focus:border-purple-500 pl-10"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Interests & Specialties</CardTitle>
                  <CardDescription>Help others discover your artistic focus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an interest or specialty"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addInterest()
                        }
                      }}
                      className="border-purple-200 focus:border-purple-500"
                    />
                    <Button type="button" onClick={addInterest} className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 pr-1">
                        {interest}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-purple-200"
                          onClick={() => removeInterest(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings Sidebar */}
            <div className="space-y-6">
              {/* Privacy Settings */}
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-purple-900">Public Profile</Label>
                      <p className="text-sm text-purple-600">Allow others to find and view your profile</p>
                    </div>
                    <Switch checked={isProfilePublic} onCheckedChange={setIsProfilePublic} />
                  </div>

                  <Separator className="bg-purple-200" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-purple-900">Allow Messages</Label>
                      <p className="text-sm text-purple-600">Let other users send you direct messages</p>
                    </div>
                    <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
                  </div>

                  <Separator className="bg-purple-200" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-purple-900">Show Email</Label>
                      <p className="text-sm text-purple-600">Display your email on your public profile</p>
                    </div>
                    <Switch checked={showEmail} onCheckedChange={setShowEmail} />
                  </div>
                </CardContent>
              </Card>

              {/* Profile Theme */}
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Profile Theme</CardTitle>
                  <CardDescription>Customize your profile appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-900">Color Theme</Label>
                    <Select value={profileTheme} onValueChange={setProfileTheme}>
                      <SelectTrigger className="border-purple-200 focus:border-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purple">Purple (Default)</SelectItem>
                        <SelectItem value="blue">Ocean Blue</SelectItem>
                        <SelectItem value="green">Forest Green</SelectItem>
                        <SelectItem value="pink">Rose Pink</SelectItem>
                        <SelectItem value="orange">Sunset Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { name: "purple", color: "bg-purple-500" },
                      { name: "blue", color: "bg-blue-500" },
                      { name: "green", color: "bg-green-500" },
                      { name: "pink", color: "bg-pink-500" },
                      { name: "orange", color: "bg-orange-500" },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setProfileTheme(theme.name)}
                        className={`w-full h-8 rounded-md ${theme.color} ${
                          profileTheme === theme.name ? "ring-2 ring-purple-600 ring-offset-2" : ""
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Stats */}
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Profile Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-bold text-purple-900">1,250</div>
                      <div className="text-sm text-purple-600">Followers</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-bold text-purple-900">89</div>
                      <div className="text-sm text-purple-600">OCs Created</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-bold text-purple-900">2,340</div>
                      <div className="text-sm text-purple-600">Total Likes</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-bold text-purple-900">156</div>
                      <div className="text-sm text-purple-600">Comments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-purple-200">
            <Link href="/profile/ArtistAlice">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                Cancel
              </Button>
            </Link>

            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
