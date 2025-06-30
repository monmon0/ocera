"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import { useLoading } from "@/contexts/loading-context";

interface AuthFormProps {
  callbackUrl?: string;
  className?: string;
}

export default function AuthForm({
  callbackUrl = "/dashboard",
  className = "",
}: AuthFormProps) {
  const [referralCode, setReferralCode] = useState("");
  const { toast } = useToast();
  const { signInWithGoogle, loading } = useSupabaseAuth();
  const { showLoading, hideLoading } = useLoading();

  

  const handleGoogleLogin = async (isSignUp: boolean = false) => {
  if (isSignUp && !referralCode.trim()) {
    toast({
      title: "Referral Code Required",
      description: "Please enter a referral code to sign up.",
      variant: "destructive",
    });
    return;
  }

  try {
    showLoading(isSignUp ? "Creating your account..." : "Signing you in...");

    await signInWithGoogle(isSignUp, referralCode.trim());
    // Success message will be handled by the auth context after redirect
    
  } catch (error: any) {
    console.error("Google login error:", error);
    hideLoading();
    toast({
      title: "Authentication Error", 
      description: error.message || "An error occurred during authentication. Please try again.",
      variant: "destructive",
    });
  }
};
  


  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <Card className="bg-white/10 backdrop-blur-md border-purple-300/20">
        <CardHeader>
          <CardTitle className="text-white text-center">
            Join Ocera Today
          </CardTitle>
          <CardDescription className="text-purple-200 text-center">
            Create your account or log in to start sharing your OCs and
            connecting with others!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-800/50">
              <TabsTrigger
                value="signin"
                className="text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <div className="space-y-5"></div>

            <TabsContent value="signin" className="space-y-4">
              <Button
                onClick={() => handleGoogleLogin(false)}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 py-5 px-6 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? "Signing in..." : "Continue with Google"}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="referral" className="text-white">
                  Referral Code *
                </Label>
                <Input
                  id="referral"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter your referral code (required)"
                  className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-200"
                  required
                />
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleGoogleLogin(true)}
                  disabled={loading}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3 px-6 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {loading ? "Signing up..." : "Sign up with Google"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

