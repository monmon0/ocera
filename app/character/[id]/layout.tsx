import type React from "react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, you'd fetch the character data here
  const characterName = "Luna Nightshade" // This would come from your database

  return {
    title: `${params.id} - Character Profile | Ocera`,
    description: `Explore ${characterName}, an original character created by the Ocera community. View detailed character information, gallery, reference sheets, and more.`,
  }
}

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
