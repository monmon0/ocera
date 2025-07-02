"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Upload, Palette, FileText, User, Camera, Sparkles, Save, Eye, Quote, Loader2 } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
<<<<<<< HEAD
import { supabase } from "@/lib/supabase"
import { uploadToCloudflare } from "@/lib/cloudflare/upload"; // adjust path
import toast from 'react-hot-toast';
import { profile } from "console"
=======
import { useAppStore } from "@/stores"
>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9

interface ColorPalette {
  name: string
  hex: string
  description: string
}



export default function CreateOCPage() {
  // Basic Info State
  const [characterName, setCharacterName] = useState("")
  const [quote, setQuote] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [fullDescription, setFullDescription] = useState("")
  const [currentUserId, setCurrentUserId] = useState<string | null>(null) // This should be set based on your auth logic


  // Character Details State
  const [age, setAge] = useState("")
  const [species, setSpecies] = useState("")
  const [occupation, setOccupation] = useState("")
  const [location, setLocation] = useState("")
  const [height, setHeight] = useState("")

  // Personality & Traits State
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([])
  const [abilities, setAbilities] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [dislikes, setDislikes] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  // Color Palette State
  const [colorPalette, setColorPalette] = useState<ColorPalette[]>([{ name: "", hex: "#000000", description: "" }])

  // Input states for adding new items
  const [newTrait, setNewTrait] = useState("")
  const [newAbility, setNewAbility] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newDislike, setNewDislike] = useState("")
  const [newTag, setNewTag] = useState("")

  const [showPreview, setShowPreview] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [profileColor, setProfileColor] = useState("");

  // Trigger file selection
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPreviews = [...previewUrls];
      updatedPreviews[index] = reader.result as string;
      setPreviewUrls(updatedPreviews);
    };
    reader.readAsDataURL(file);
  };

  const [referenceSheet, setReferenceSheet] = useState<File | null>(null);
  const [referencePreviewUrl, setReferencePreviewUrl] = useState<string | null>(null);

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReferenceSheet(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setReferencePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };


  // Helper functions for managing arrays
  const addToArray = (value: string, array: string[], setter: (arr: string[]) => void) => {
    if (value.trim() && !array.includes(value.trim())) {
      setter([...array, value.trim()])
    }
  }

  const removeFromArray = (index: number, array: string[], setter: (arr: string[]) => void) => {
    setter(array.filter((_, i) => i !== index))
  }

  const addColorTopalette = () => {
    setColorPalette([...colorPalette, { name: "", hex: "#000000", description: "" }])
  }

  const updateColor = (index: number, field: keyof ColorPalette, value: string) => {
    const updated = colorPalette.map((color, i) => (i === index ? { ...color, [field]: value } : color))
    setColorPalette(updated)
  }

  const removeColor = (index: number) => {
    if (colorPalette.length > 1) {
      setColorPalette(colorPalette.filter((_, i) => i !== index))
    }
  }

  const [moodboardImage, setMoodboardImage] = useState<File | null>(null);
  const [moodboardPreviewUrl, setMoodboardPreviewUrl] = useState<string | null>(null);

  const handleMoodboardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMoodboardImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setMoodboardPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };


 const handleSubmit = async () => {
  if (isLoading) return; // Prevent multiple clicks
  setIsLoading(true);

  try {
    const uploadedImageUrls = await Promise.all(
      selectedFiles.map(file => uploadToCloudflare(file)) // selectedFiles is File[]
    );
    const filteredUrls = uploadedImageUrls.filter(Boolean);

    const referenceSheetUrl = referenceSheet
      ? await uploadToCloudflare(referenceSheet)
      : null;

    const moodboardImageUrl = moodboardImage
      ? await uploadToCloudflare(moodboardImage)
      : null;

    const { data, error } = await supabase
      .from("characters")
      .insert([
        {
          user_id: currentUserId, // must be defined somewhere
          name: characterName,
          quote,
          description: fullDescription,
          short_description: shortDescription,
          age,
          species,
          occupation,
          location,
          height,
          personality_traits: personalityTraits, // must be array of string
          abilities,
          interests,
          dislikes,
          tags, // must be array of string
          color_palette: colorPalette, // must be array of string
          char_img: filteredUrls,
          moodboard: moodboardImageUrl,
          is_public: true,
          likes_count: 0,
          views_count: 0,
          ref_sheet: referenceSheetUrl,
          profile_color: profileColor, // New field for profile color
        },
      ])
      .select(); // Add select() to get the inserted data back

    if (error) {
      console.error("Error inserting character:", error);
      toast.error("Failed to create character. Please try again.", {
        duration: 5000,
        style: {
          background: '#EF4444',
          color: 'white',
          borderRadius: '12px',
          padding: '16px',
        },
        icon: '❌',
      });
    } else {
      const createdCharacter = data[0];
      console.log("Character created:", createdCharacter);
      
      // Success toast with link to view character
      toast.success(
        <div className="flex flex-col gap-2">
          <div className="font-medium">Character created successfully!</div>
          <button
            onClick={() => {
              // Navigate to character page - adjust route as needed
              window.location.href = `/character/${createdCharacter.id}`;
              // Or if using React Router: navigate(`/character/${createdCharacter.id}`);
            }}
            className="text-white hover:text-blue-800 underline text-sm font-medium transition-colors"
          >
            View {characterName} →
          </button>
        </div>,
        {
          duration: 6000,
          style: {
            background: '#10B981',
            color: 'white',
            borderRadius: '12px',
            padding: '16px',
            minWidth: '300px',
          },
          icon: '✨',
        }
      );
      
      // Reset form after successful submission
      setCharacterName("");
      setQuote("");
      setShortDescription("");
      setFullDescription("");
      setAge("");
      setSpecies("");
      setOccupation("");
      setLocation("");
      setHeight("");
      setPersonalityTraits([]); 
      setAbilities([]);
      setInterests([]);
      setDislikes([]);
      setTags([]);
      setColorPalette([{ name: "", hex: "#000000", description: "" }]);
      setSelectedFiles([]);
      setPreviewUrls([]);
      setReferenceSheet(null);
      setReferencePreviewUrl(null);
      setMoodboardImage(null);
      setMoodboardPreviewUrl(null);
      setShowPreview(false); // Close preview dialog
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error("An unexpected error occurred. Please try again.", {
      duration: 5000,
      style: {
        background: '#EF4444',
        color: 'white',
        borderRadius: '12px',
        padding: '16px',
      },
      icon: '❌',
    });
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
   const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCurrentUserId(parsed.id); // Assuming the user object has an 'id' field
    } else {
      console.warn("No user found in localStorage");
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-900 mb-2">Create Your Original Character</h1>
            <p className="text-purple-600">
              Bring your character to life with detailed information and stunning visuals
            </p>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-purple-100 mb-8">
              <TabsTrigger value="basic" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <User className="h-4 w-4 mr-1" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-1" />
                Details
              </TabsTrigger>
              <TabsTrigger
                value="personality"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Personality
              </TabsTrigger>
              <TabsTrigger value="visuals" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Camera className="h-4 w-4 mr-1" />
                Visuals
              </TabsTrigger>
              <TabsTrigger value="palette" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Palette className="h-4 w-4 mr-1" />
                Colors
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Basic Character Information</CardTitle>
                  <CardDescription>Start with the fundamental details about your character</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="character-name" className="text-purple-900">
                        Character Name *
                      </Label>
                      <Input
                        id="character-name"
                        placeholder="Enter your character's name"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="species" className="text-purple-900">
                        Species
                      </Label>
                      <Select value={species} onValueChange={setSpecies}>
                        <SelectTrigger className="border-purple-200 focus:border-purple-500">
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="human">Human</SelectItem>
                          <SelectItem value="elf">Elf</SelectItem>
                          <SelectItem value="vampire">Vampire</SelectItem>
                          <SelectItem value="werewolf">Werewolf</SelectItem>
                          <SelectItem value="dragon">Dragon</SelectItem>
                          <SelectItem value="fairy">Fairy</SelectItem>
                          <SelectItem value="demon">Demon</SelectItem>
                          <SelectItem value="angel">Angel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote" className="text-purple-900">
                      Character Quote
                    </Label>
                    <Input
                      id="quote"
                      placeholder="A memorable quote that defines your character"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="short-description" className="text-purple-900">
                      Short Description *
                    </Label>
                    <Textarea
                      id="short-description"
                      placeholder="A brief, compelling description of your character (1-2 sentences)"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="border-purple-200 focus:border-purple-500 min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full-description" className="text-purple-900">
                      Full Biography
                    </Label>
                    <Textarea
                      id="full-description"
                      placeholder="Tell your character's full story - their background, history, motivations, and what makes them unique..."
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                      className="border-purple-200 focus:border-purple-500 min-h-[200px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Character Details Tab */}
            <TabsContent value="details">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Character Details</CardTitle>
                  <CardDescription>Physical characteristics and background information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-purple-900">
                        Age
                      </Label>
                      <Input
                        id="age"
                        placeholder="e.g., 25, 200+ years, Unknown"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-purple-900">
                        Height
                      </Label>
                      <Input
                        id="height"
                        placeholder="e.g., 5'7&quot;, 170cm, Tall"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="occupation" className="text-purple-900">
                        Occupation
                      </Label>
                      <Input
                        id="occupation"
                        placeholder="What does your character do?"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-purple-900">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Where does your character live?"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <Separator className="bg-purple-200" />

                  <div className="space-y-4">
                    <Label className="text-purple-900 text-lg font-semibold">Tags</Label>
                    <p className="text-sm text-purple-600">Add tags to help others discover your character</p>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addToArray(newTag, tags, setTags)
                            setNewTag("")
                          }
                        }}
                        className="border-purple-200 focus:border-purple-500"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addToArray(newTag, tags, setTags)
                          setNewTag("")
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 pr-1">
                          #{tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 hover:bg-purple-200"
                            onClick={() => removeFromArray(index, tags, setTags)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Personality Tab */}
            <TabsContent value="personality">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Personality & Traits</CardTitle>
                  <CardDescription>Define what makes your character unique</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Personality Traits */}
                  <div className="space-y-4">
                    <Label className="text-purple-900 text-lg font-semibold">Personality Traits</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a personality trait"
                        value={newTrait}
                        onChange={(e) => setNewTrait(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addToArray(newTrait, personalityTraits, setPersonalityTraits)
                            setNewTrait("")
                          }
                        }}
                        className="border-purple-200 focus:border-purple-500"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addToArray(newTrait, personalityTraits, setPersonalityTraits)
                          setNewTrait("")
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {personalityTraits.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 pr-1">
                          {trait}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 hover:bg-purple-200"
                            onClick={() => removeFromArray(index, personalityTraits, setPersonalityTraits)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Abilities */}
                  <div className="space-y-4">
                    <Label className="text-purple-900 text-lg font-semibold">Abilities & Powers</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an ability or power"
                        value={newAbility}
                        onChange={(e) => setNewAbility(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addToArray(newAbility, abilities, setAbilities)
                            setNewAbility("")
                          }
                        }}
                        className="border-purple-200 focus:border-purple-500"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addToArray(newAbility, abilities, setAbilities)
                          setNewAbility("")
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {abilities.map((ability, index) => (
                        <Badge key={index} variant="outline" className="border-purple-300 text-purple-700 pr-1">
                          {ability}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 hover:bg-purple-200"
                            onClick={() => removeFromArray(index, abilities, setAbilities)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Interests */}
                    <div className="space-y-4">
                      <Label className="text-purple-900 text-lg font-semibold">Interests & Likes</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add an interest"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              addToArray(newInterest, interests, setInterests)
                              setNewInterest("")
                            }
                          }}
                          className="border-purple-200 focus:border-purple-500"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            addToArray(newInterest, interests, setInterests)
                            setNewInterest("")
                          }}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest, index) => (
                          <Badge key={index} className="bg-green-100 text-green-700 pr-1 hover:bg-green-200">
                            {interest}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1 hover:bg-green-200"
                              onClick={() => removeFromArray(index, interests, setInterests)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Dislikes */}
                    <div className="space-y-4">
                      <Label className="text-purple-900 text-lg font-semibold">Dislikes</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a dislike"
                          value={newDislike}
                          onChange={(e) => setNewDislike(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              addToArray(newDislike, dislikes, setDislikes)
                              setNewDislike("")
                            }
                          }}
                          className="border-purple-200 focus:border-purple-500"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            addToArray(newDislike, dislikes, setDislikes)
                            setNewDislike("")
                          }}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {dislikes.map((dislike, index) => (
                          <Badge key={index} className="bg-red-100 text-red-700 pr-1 hover:bg-red-200">
                            {dislike}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1 hover:bg-red-200"
                              onClick={() => removeFromArray(index, dislikes, setDislikes)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visuals Tab */}
            <TabsContent value="visuals">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Visual Assets</CardTitle>
                  <CardDescription>Upload images, reference sheets, and moodboards for your character</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Character Images */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <label
                        key={i}
                        htmlFor={`image-upload-${i}`}
                        className="aspect-square border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 transition-colors cursor-pointer overflow-hidden"
                      >
                        {previewUrls[i] ? (
                          <img src={previewUrls[i]} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-purple-400 mb-2" />
                            <span className="text-sm text-purple-600">Upload Image {i + 1}</span>
                          </>
                        )}
                        <input
                          id={`image-upload-${i}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileInput(e, i)}
                        />
                      </label>
                    ))}
                  </div>


                  {/* Reference Sheet */}
                  <label
                    htmlFor="reference-upload"
                    className="border-2 border-dashed border-purple-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-purple-500 transition-colors cursor-pointer overflow-hidden"
                  >
                    {referencePreviewUrl ? (
                      <img src={referencePreviewUrl} alt="Reference Sheet" className="max-h-64 object-contain" />
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-purple-400 mb-4" />
                        <span className="text-lg text-purple-600 mb-2">Upload Reference Sheet</span>
                        <span className="text-sm text-purple-500">
                          Image must be under 10MB and in JPG/PNG format
                        </span>
                      </>
                    )}
                    <input
                      id="reference-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleReferenceUpload}
                    />
                  </label>


                  {/* Moodboard */}
                  <label
                    htmlFor="moodboard-upload"
                    className="border-2 border-dashed border-purple-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-purple-500 transition-colors cursor-pointer overflow-hidden"
                  >
                    {moodboardPreviewUrl ? (
                      <img src={moodboardPreviewUrl} alt="Moodboard" className="max-h-64 object-contain" />
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-purple-400 mb-4" />
                        <span className="text-lg text-purple-600 mb-2">Upload Moodboard</span>
                        <span className="text-sm text-purple-500">
                          Image must be under 10MB and in JPG/PNG format
                        </span>
                      </>
                    )}
                    <input
                      id="moodboard-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMoodboardUpload}
                    />
                  </label>

                </CardContent>
              </Card>
            </TabsContent>

            {/* Color Palette Tab */}
            <TabsContent value="palette">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-900">Profile Color</CardTitle>
                  <CardDescription>Set the background color for your character profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">

                      <div className="grid md:grid-cols-4 gap-4 p-4 border border-purple-200 rounded-lg">
                        <div className="space-y-2">
                          <Label className="text-purple-900">Hex Code</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={profileColor}
                              onChange={(e) => setProfileColor(e.target.value)}
                              className="w-16 h-10 border-purple-200 focus:border-purple-500 cursor-pointer"
                            />
                            <Input
                              placeholder="#000000"
                              value={profileColor}
                              onChange={(e) => setProfileColor(e.target.value)}
                              className="border-purple-200 focus:border-purple-500 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                  </div>

                  {/* <Button
                    type="button"
                    onClick={addColorTopalette}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Color
                  </Button> */}

                  {/* Color Preview */}
                 
                </CardContent>

                <CardHeader>
                  <CardTitle className="text-purple-900">Color Palette</CardTitle>
                  <CardDescription>Define the colors that represent your character</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {colorPalette.map((color, index) => (
                      <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border border-purple-200 rounded-lg">
                        <div className="space-y-2">
                          <Label className="text-purple-900">Color Name</Label>
                          <Input
                            placeholder="e.g., Midnight Purple"
                            value={color.name}
                            onChange={(e) => updateColor(index, "name", e.target.value)}
                            className="border-purple-200 focus:border-purple-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-purple-900">Hex Code</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={color.hex}
                              onChange={(e) => updateColor(index, "hex", e.target.value)}
                              className="w-16 h-10 border-purple-200 focus:border-purple-500 cursor-pointer"
                            />
                            <Input
                              placeholder="#000000"
                              value={color.hex}
                              onChange={(e) => updateColor(index, "hex", e.target.value)}
                              className="border-purple-200 focus:border-purple-500 font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-purple-900">Description</Label>
                          <Input
                            placeholder="What this color represents"
                            value={color.description}
                            onChange={(e) => updateColor(index, "description", e.target.value)}
                            className="border-purple-200 focus:border-purple-500"
                          />
                        </div>

                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeColor(index)}
                            disabled={colorPalette.length === 1}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    onClick={addColorTopalette}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Color
                  </Button>

                  {/* Color Preview */}
                  {colorPalette.some((c) => c.name && c.hex) && (
                    <div className="space-y-4">
                      <Label className="text-purple-900 text-lg font-semibold">Palette Preview</Label>
                      <div className="flex flex-wrap gap-4">
                        {colorPalette
                          .filter((c) => c.name && c.hex)
                          .map((color, index) => (
                            <div key={index} className="text-center">
                              <div
                                className="w-20 h-20 rounded-lg shadow-md mb-2"
                                style={{ backgroundColor: color.hex }}
                              />
                              <p className="text-sm font-medium text-purple-900">{color.name}</p>
                              <p className="text-xs text-purple-600 font-mono">{color.hex}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-purple-200">
            <Link href="/dashboard">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                Cancel
              </Button>
            </Link>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Character
                </>
              )}
            </Button>
            </div>
          </div>
          {/* Preview Modal */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Character Preview</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Character Header */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-purple-900 mb-2">{characterName || "Untitled Character"}</h1>
                  {quote && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Quote className="h-5 w-5 text-purple-500" />
                      <p className="text-lg text-purple-700 italic">"{quote}"</p>
                    </div>
                  )}
                  {/* {shortDescription && <p className="text-purple-600 text-lg">{shortDescription}</p>} */}
                </div>

                {/* Quick Stats */}
                {(age || species || height || location) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {age && (
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-900">{age}</div>
                        <div className="text-sm text-purple-600">Age</div>
                      </div>
                    )}
                    {species && (
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-900">{species}</div>
                        <div className="text-sm text-purple-600">Species</div>
                      </div>
                    )}
                    {height && (
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-900">{height}</div>
                        <div className="text-sm text-purple-600">Height</div>
                      </div>
                    )}
                    {location && (
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-900">{location}</div>
                        <div className="text-sm text-purple-600">Location</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Biography */}
                {fullDescription && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-purple-900">Biography</h3>
                    <div className="prose prose-purple max-w-none">
                      {fullDescription.split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="text-purple-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personality & Traits */}
                {(personalityTraits.length > 0 || abilities.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {personalityTraits.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">Personality Traits</h3>
                        <div className="flex flex-wrap gap-2">
                          {personalityTraits.map((trait, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {abilities.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">Abilities</h3>
                        <div className="flex flex-wrap gap-2">
                          {abilities.map((ability, idx) => (
                            <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                              {ability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Interests & Dislikes */}
                {(interests.length > 0 || dislikes.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {interests.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">Interests</h3>
                        <ul className="space-y-1">
                          {interests.map((interest, idx) => (
                            <li key={idx} className="text-purple-600 flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full" />
                              {interest}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {dislikes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">Dislikes</h3>
                        <ul className="space-y-1">
                          {dislikes.map((dislike, idx) => (
                            <li key={idx} className="text-purple-600 flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full" />
                              {dislike}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Color Palette */}
                {colorPalette.some((c) => c.name && c.hex) && (
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Color Palette</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {colorPalette
                        .filter((c) => c.name && c.hex)
                        .map((color, index) => (
                          <div key={index} className="text-center p-4 bg-white rounded-lg border border-purple-200">
                            <div
                              className="w-full h-16 rounded-lg shadow-md mb-3"
                              style={{ backgroundColor: color.hex }}
                            />
                            <h4 className="font-semibold text-purple-900 text-sm mb-1">{color.name}</h4>
                            <p className="text-xs font-mono text-purple-600 mb-1">{color.hex}</p>
                            {color.description && <p className="text-xs text-purple-500">{color.description}</p>}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
