
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // First validate the referral code
      const validateResponse = await fetch("/api/validate-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralCode }),
      });

      const validateData = await validateResponse.json();

      if (!validateData.valid) {
        setError(validateData.error || "Invalid referral code");
        setLoading(false);
        return;
      }

      // Create user account
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, referralCode, password }),
      });

      const signupData = await signupResponse.json();

      if (signupData.success) {
        setSuccess("Account created successfully! You can now sign in.");
        // Store user session
        localStorage.setItem("user", JSON.stringify(signupData.user));
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setError(signupData.error || "Failed to create account");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Signing in with email:", email);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.success) {
        // Store user session
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else if (data.needsSignup) {
        setError("No account found. Please sign up first.");
        setIsSignUp(true);
      } else {
        setError(data.error || "Failed to sign in");
      }
    } catch (error) {
      setError("An error occurred. Please try again in a moment" );
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white/10 backdrop-blur-md border-purple-300/20">
        <CardHeader>
          <CardTitle className="text-white text-center">
            {isSignUp ? "Join Ocera" : "Welcome to Ocera"}
          </CardTitle>
          <CardDescription className="text-purple-200 text-center">
            {isSignUp 
              ? "Create your account with a referral code"
              : "Sign in to your account"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                  placeholder="Your full name"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                placeholder="your@email.com"
              />
            </div>

              <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                placeholder="Set a strong password"
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="referralCode" className="text-white">Referral Code</Label>
                <Input
                  id="referralCode"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  required
                  className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                  placeholder="WELCOME2024"
                />
              </div>
            )}

            {error && (
              <div className="text-red-300 text-sm">{error}</div>
            )}

            {success && (
              <div className="text-green-300 text-sm">{success}</div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-purple-200 hover:text-white hover:bg-white/10"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setSuccess("");
              }}
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
