"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, referralCode, password, username }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Sign up failed");
        return;
      }

      setSuccess(data.message || "Sign up successful! Please check your email to verify your account.");
      localStorage.setItem("user", JSON.stringify(data.user));
      // setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        if (data.needsSignup) {
          setError("No account found. Please sign up.");
          setIsSignUp(true);
        } else {
          setError(data.error || "Sign in failed");
        }
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white/10 backdrop-blur-md border-purple-300/20">
        <CardHeader>
          <CardTitle className="text-white text-center">
            {isSignUp ? "Join Ocera" : "Welcome to Ocera"}
          </CardTitle>
          <CardDescription className="text-purple-200 text-center">
            {isSignUp ? "Sign up with a referral code" : "Sign in to your account"}
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
                  placeholder="Your full name"
                  className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
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
                placeholder="you@example.com"
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
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
                placeholder="Your password"
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
              />
            </div>

            {isSignUp && (
              <div className="">
                 <div className="space-y-2 mb-4">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="@cool_username"
                    className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referralCode" className="text-white">Referral Code</Label>
                  <Input
                    id="referralCode"
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    required
                    placeholder="Enter your referral code"
                    className="bg-purple-500 border-purple-300/30 text-white placeholder:text-purple-300"
                  />
                </div>
              </div>
            )}

            {error && <div className="text-sm text-red-300">{error}</div>}
            {success && <div className="text-sm text-green-300">{success}</div>}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
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
