"use client";

import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingScreen({
  isLoading,
  message = "Loading...",
}: LoadingScreenProps) {
  const [dots, setDots] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev === "...") return "";
          return prev + ".";
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      // Add a small delay before hiding to prevent flashing
      const timeout = setTimeout(() => {
        setShow(false);
        setDots("");
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-12 w-12 text-purple-300 animate-pulse" />
            <h1 className="text-4xl font-bold text-white">Ocera</h1>
          </div>

          {/* Animated circles */}
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="mb-6">
          <Loader2 className="h-8 w-8 text-purple-300 animate-spin mx-auto" />
        </div>

        {/* Loading Text */}
        <div className="text-purple-200 text-lg">
          {message}
          <span className="inline-block w-8 text-left">{dots}</span>
        </div>

        {/* Subtitle */}
        <p className="text-purple-400 text-sm mt-4">
          The ultimate social platform for OC creators
        </p>
      </div>

      {/* Background decoration */}
      <div className="absolute top-10 left-10 opacity-10">
        <Sparkles className="h-32 w-32 text-purple-300 animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Sparkles className="h-24 w-24 text-purple-300 animate-pulse [animation-delay:-0.5s]" />
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-5">
        <Sparkles className="h-16 w-16 text-purple-300 animate-pulse [animation-delay:-1s]" />
      </div>
    </div>
  );
}
