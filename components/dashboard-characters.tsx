'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Character = {
  id: string
  name: string
  likes: number
  views: number
  tags: string[]
}

type Props = {
  characters: Character[]
  onDelete?: (characterId: string) => void
}

export default function CharacterCollectionCard({ characters, onDelete }: Props) {
  const handleDelete = (e: React.MouseEvent, characterId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete) {
      onDelete(characterId)
    }
  }

  return (
    <Card className="border-purple-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-purple-900">Your Characters</CardTitle>
        <CardDescription>Manage and view your character collection</CardDescription>
      </CardHeader>
      <CardContent>
        {characters.length === 0 ? (
          <div className="text-center text-purple-600">
            <p className="mb-4">You have no characters yet.</p>
            <Link href="/create">
              <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                Create Your First Character
              </button>
            </Link>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {characters.map((character) => (
            <div key={character.id} className="relative group">
              <Link href={`/character/${character.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-100">
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      <div className="absolute inset-0 flex items-center justify-center text-purple-400">
                        <Image 
                          src={character.char_img.length > 0 ? character.char_img[0] : "https://i.pinimg.com/736x/88/c5/59/88c559851ecef28256a9ae4a038d78fd.jpg"}
                          alt={character.name}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-purple-900 mb-2">{character.name}</h3>
                    <div className="flex items-center justify-between text-sm text-purple-600 mb-2">
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {character.likes_count}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {character.views_count}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {character.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-purple-100 text-purple-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
              {onDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
                  onClick={(e) => handleDelete(e, character.id)}
                  aria-label={`Delete ${character.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  )
}