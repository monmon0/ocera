"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Users, Trophy, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth";
import { useTranslations } from "next-intl";
import { useLoading } from "@/contexts/loading-context";

export default function AuthPage() {
  const router = useRouter();
  const t = useTranslations("Auth");
  const tLoading = useTranslations("Loading");
  const { setLoading } = useLoading();

  const handleGoogleLogin = () => {
    setLoading(true, tLoading("signingIn"));
    console.log("Google login clicked");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  const handleFacebookLogin = () => {
    setLoading(true, tLoading("signingIn"));
    console.log("Facebook login clicked");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  const handleGoogleSignUp = () => {
    setLoading(true, tLoading("signingIn"));
    // Add your Google OAuth logic here
  };

  const handleFacebookSignUp = () => {
    setLoading(true, tLoading("signingIn"));
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
            <p className="text-purple-200 text-lg">{t("title")}</p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center text-white">
              <Users className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("features.connect")}
              </h3>
              <p className="text-purple-200">{t("features.connectDesc")}</p>
            </div>
            <div className="text-center text-white">
              <ImageIcon className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("features.showcase")}
              </h3>
              <p className="text-purple-200">{t("features.showcaseDesc")}</p>
            </div>
            <div className="text-center text-white">
              <Trophy className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("features.leaderboard")}
              </h3>
              <p className="text-purple-200">{t("features.leaderboardDesc")}</p>
            </div>
          </div>

          {/* Auth Forms */}
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
