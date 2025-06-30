"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthForm() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white/10 backdrop-blur-md border-purple-300/20">
        <CardHeader>
          <CardTitle className="text-white text-center">
            Welcome to Ocera
          </CardTitle>
          <CardDescription className="text-purple-200 text-center">
            Share your original characters and connect with other creators!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Link href="/dashboard">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Enter Dashboard
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="outline" className="w-full bg-white/10 border-purple-300/30 text-white hover:bg-white/20">
                Browse Characters
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}