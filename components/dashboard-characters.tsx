'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Heart, Eye, Trash2, MoreVertical, AlertTriangle, Router } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'

type Character = {
  id: string
  name: string
  likes: number
  views: number
  tags: string[]
  char_img?: string[]
  likes_count?: number
  views_count?: number
}

type Props = {
  characters: Character[]
  onDelete?: (characterId: string) => void
  onEdit?: (characterId: string) => void
}

// Confirmation Modal Component
function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  characterName 
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  characterName: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Delete Character
        </h3>
        
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-900">"{characterName}"</span>? 
          This action cannot be undone.
        </p>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CharacterCollectionCard({ characters, onDelete }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; character: Character | null }>({
    isOpen: false,
    character: null
  })

  const handleDeleteClick = (e: React.MouseEvent, character: Character) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteConfirm({ isOpen: true, character })
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm.character && onDelete) {
      onDelete(deleteConfirm.character.id)
    }
    setDeleteConfirm({ isOpen: false, character: null })
  }

  const router = useRouter()

  const handleEditClick = (e: React.MouseEvent, characterId: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`edit/${characterId}`)
  }

  return (
    <>
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
                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-purple-100 relative overflow-hidden">
                      <CardContent className="p-4">
                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">

                            <button 
                              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 text-blue-600 hover:text-blue-700 hover:scale-105"
                              onClick={(e) => handleEditClick(e, character.id)}
                              title="Edit character"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          
                          {onDelete && (
                            <button 
                              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 text-red-600 hover:text-red-700 hover:scale-105"
                              onClick={(e) => handleDeleteClick(e, character)}
                              title="Delete character"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Character Image */}
                        <div className="aspect-square relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 group-hover:scale-[1.02] transition-transform duration-300">
                          <div className="absolute inset-0 flex items-center justify-center text-purple-400">
                            <Image 
                              src={character.char_img?.length > 0 ? character.char_img[0] : "https://i.pinimg.com/736x/88/c5/59/88c559851ecef28256a9ae4a038d78fd.jpg"}
                              alt={character.name}
                              width={200}
                              height={200}
                              className="object-cover w-full h-full"
                              loading="lazy"
                            />
                          </div>
                          
                          {/* Gradient Overlay on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        {/* Character Info */}
                        <h3 className="font-semibold text-purple-900 mb-3 text-lg group-hover:text-purple-700 transition-colors">
                          {character.name}
                        </h3>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-purple-600 mb-3">
                          <span className="flex items-center bg-purple-50 px-2 py-1 rounded-full">
                            <Heart className="w-4 h-4 mr-1" />
                            {character.likes_count || character.likes || 0}
                          </span>
                          <span className="flex items-center bg-purple-50 px-2 py-1 rounded-full">
                            <Eye className="w-4 h-4 mr-1" />
                            {character.views_count || character.views || 0}
                          </span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {character.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {character.tags.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-gray-100 text-gray-600"
                            >
                              +{character.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, character: null })}
        onConfirm={handleDeleteConfirm}
        characterName={deleteConfirm.character?.name || ''}
      />
    </>
  )
}