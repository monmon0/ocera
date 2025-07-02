'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Navigation from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<any | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // Wait for hydration
  //     setHydrated(true)

  //     try {
  //       const stored = localStorage.getItem("user")
  //       if (!stored) {
  //         console.warn("No user found in localStorage")
  //         router.push("/")
  //         return
  //       }

  //       const parsed = JSON.parse(stored)
  //       const { data, error } = await supabase
  //         .from("users")
  //         .select("*")
  //         .eq("email", parsed.email)
  //         .single()

  //       if (error || !data) {
  //         console.error("Supabase error:", error)
  //         router.push("/")
  //         return
  //       }

  //       setUser(data)
  //     } catch (err) {
  //       console.error("Unexpected error:", err)
  //       router.push("/")
  //     }
  //   }

  //   fetchUser()
  // }, [router])

  // if (!user) {
  //   return <div className="p-4 text-center text-sm text-muted-foreground">Loading user...</div>
  // }

  return (
    <>
      <Navigation userInfo={user} />
      {children}
      <Toaster />
    </>
  )
}
