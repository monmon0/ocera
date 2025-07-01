'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Eye } from "lucide-react"
import Link from "next/link"

type Character = {
  id: string
  name: string
  likes: number
  views: number
  tags: string[]
}

type Props = {
  characters: Character[]
}

export default function CharacterCollectionCard({ characters }: Props) {
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
            <Link key={character.id} href={`/character/${character.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-100">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    <div className="absolute inset-0 flex items-center justify-center text-purple-400">
                      <Star className="w-12 h-12" />
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
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  )
}
