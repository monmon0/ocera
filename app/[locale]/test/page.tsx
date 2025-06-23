"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-purple-900 mb-4">Test Page</h1>
        <p className="text-purple-600 mb-6">
          This is a test page without translations
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Test Button
        </Button>
      </div>
    </div>
  );
}
