'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Heart, Eye, Trash2, MoreVertical, AlertTriangle, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import CharacterCard from './character-card'

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
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
              <div className="relative mb-8">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                
                {/* Icon container */}
                <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-full p-6 border border-purple-200 shadow-lg">
                  <Sparkles className="w-12 h-12 text-purple-600 animate-bounce" />
                </div>
              </div>
              
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  Ready to Create Magic?
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Your character collection is waiting to come to life. Start building your first character and watch your story unfold.
                </p>
                
                <div className="space-y-4">
                  {/* Primary CTA */}
                  <a href="/create" className="">
                  <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                      Create Your First Character
                    </div>
                  </button>
                  </a>
                  {/* Secondary info */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
                    <span>Quick setup • Unlimited creativity</span>
                    <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <CharacterCard characters={characters} onDelete={onDelete} isEdit={true}/>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {/* <DeleteConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, character: null })}
        onConfirm={handleDeleteConfirm}
        characterName={deleteConfirm.character?.name || ''}
      /> */}
    </>
  )
}