"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Trophy, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth";
import { useLoading } from "@/contexts/loading-context";

export default function AuthPage() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const handleGoogleLogin = () => {
    setLoading(true, "Signing you in...");
    console.log("Google login clicked");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  const handleFacebookLogin = () => {
    setLoading(true, "Signing you in...");
    console.log("Facebook login clicked");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  const handleGoogleSignUp = () => {
    setLoading(true, "Signing you in...");
    // Add your Google OAuth logic here
  };

  const handleFacebookSignUp = () => {
    setLoading(true, "Signing you in...");
    // Add your Facebook OAuth logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-purple-300" />
              <h1 className="text-4xl font-bold text-white">Ocera</h1>
            </div>
            <p className="text-purple-200 text-lg">
              The all-in-one social platform for OC Creators
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center text-white">
              <Users className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect & Follow</h3>
              <p className="text-purple-200">
                Follow your favourite OC Creator and stay up to date with their
                content
              </p>
            </div>
            <div className="text-center text-white">
              <ImageIcon className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Showcase your OC</h3>
              <p className="text-purple-200">
                Share your character reference, inspiration and their lore with
                everyone
              </p>
            </div>
            <div className="text-center text-white">
              <Trophy className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Climb the leaderboard
              </h3>
              <p className="text-purple-200">
                Show your passion through creating and engaging with the content
                on the site
              </p>
            </div>
          </div>

          {/* Auth Forms */}
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
