"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Sparkles,
  Plus,
  Heart,
  Users,
  Trophy,
  Home,
} from "lucide-react";
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Navigation() {
  const { user, signOut } = useSupabaseAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-purple-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-900">Ocera</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
            >
              <Home className="h-4 w-4" />
              Feed
            </Link>
            <Link
              href="/discover"
              className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
            >
              <Search className="h-4 w-4" />
              Discover
            </Link>
            <Link
              href="/following"
              className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
            >
              <Users className="h-4 w-4" />
              Following
            </Link>
            <Link
              href="/favourites"
              className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
            >
              <Heart className="h-4 w-4" />
              Favourites
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Create Button */}
            <Link href="/create">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </Link>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-purple-700" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-purple-200 text-purple-800">
                      {user.user_metadata?.full_name?.[0] ||
                        user.email?.[0] ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">
                      {user.user_metadata?.full_name || "User"}
                    </p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile/edit" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
