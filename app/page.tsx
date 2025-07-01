"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Trophy, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth";

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        router.push("/dashboard");
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, [router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, don't show auth page
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-purple-300 animate-pulse" />
              <div className="absolute inset-0 bg-purple-300 blur-xl opacity-30"></div>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Ocera
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            The ultimate platform for sharing and discovering original characters. 
            Create, showcase, and connect with a community of passionate creators.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-purple-300/20">
              <ImageIcon className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Share Your OCs</h3>
              <p className="text-purple-200 text-sm">Upload and showcase your original characters with detailed profiles and artwork.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-purple-300/20">
              <Users className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Connect & Follow</h3>
              <p className="text-purple-200 text-sm">Follow your favorite creators and build a community around your shared interests.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-purple-300/20">
              <Trophy className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Discover & Explore</h3>
              <p className="text-purple-200 text-sm">Find amazing characters, get inspired, and engage with the creative community.</p>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="flex justify-center">
          <AuthForm />
        </div>

        {/* Browse Link */}
        <div className="text-center mt-8">
          <Link href="/discover">
            <Button variant="ghost" className="text-purple-200 hover:text-white hover:bg-white/10">
              Browse Characters Without Signing In →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}