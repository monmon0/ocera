"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
  Trophy,
  Menu,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
<<<<<<< HEAD
import { supabase } from "@/lib/supabase";

// Define the props interface
interface NavigationProps {
  userInfo?: {
    name?: string;
    email?: string;
    id?: string;
    // Add other user properties as needed
=======
import { useSupabaseAuth } from "@/contexts/supabase-auth-context";
import { set } from "date-fns";

const navigation = [
  // { name: "Dashboard", href: "/dashboard", icon: Home },
  // { name: "Discover", href: "/discover", icon: Search },
  // { name: "Create", href: "/create", icon: PlusCircle },
  // { name: "Favourites", href: "/favourites", icon: Heart },
  // { name: "Following", href: "/following", icon: Users },
  // { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export default function Navigation(userInfo) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, loading } = useSupabaseAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear any additional app-specific storage
      localStorage.removeItem("user");
      sessionStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9
  };
}

export default function Navigation({ userInfo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const handleSignOut = async () => {
      try {
        await supabase.auth.signOut(); // 👈 kill Supabase session
        localStorage.removeItem("user"); // 👈 clear custom session
        router.push("/"); // 👈 redirect to home/login
      } catch (err) {
        console.error("Error signing out:", err);
      }
    };

  const getUserInitials = (name: string | null | undefined, email: string | null | undefined) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
<<<<<<< HEAD
    return '';
  };

=======
    return 'A';
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">O</span>
                </div>
                <span className="text-white font-bold text-xl">Ocera</span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="text-white text-sm">Loading...</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Show minimal navigation for non-authenticated users
  if (!user) {
    return (
      <nav className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">O</span>
                </div>
                <span className="text-white font-bold text-xl">Ocera</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                className="text-white border-white hover:bg-white hover:text-purple-600"
                variant="outline" 
                size="sm"
                asChild
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100"
                size="sm"
                asChild
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9
  return (
    <nav className="bg-white/30 backdrop-blur shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">O</span>
              </div>
              <span className="text-black font-bold text-xl">Ocera</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-4 text-white">
<<<<<<< HEAD
              <Button variant="ghost" className="text-purple-700 bg-white/0" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" className="text-purple-700" size="sm" asChild>
=======
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9
                <Link href="/discover">Discover</Link>
              </Button>
              <Button size="sm" asChild className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href="/create">Create</Link>
              </Button>
              
              {/* User Profile Dropdown */}
<<<<<<< HEAD
              {/* {userInfo && !loading ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-white text-purple-600">
                          {getUserInitials(userInfo.name, userInfo.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userInfo.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userInfo.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile/edit" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  className="text-purple hover:bg-white/20"
                  variant="outline" 
                  size="sm"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign In"}
                </Button>
              )} */}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile User Profile */}
            {userInfo && !loading && (
=======
>>>>>>> 591900ab444871bf5deda08f8ebf5e675905dcc9
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-white/20">
                    <Avatar className="h-8 w-8">
                      {user.image ? (
                        <AvatarImage src={user.image} alt={user.name || "User"} />
                      ) : null}
                      <AvatarFallback className="bg-white text-purple-600">
                        {getUserInitials(userInfo.name, userInfo.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userInfo.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userInfo.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile/edit" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-white/20">
                  <Avatar className="h-8 w-8">
                    {user.image ? (
                      <AvatarImage src={user.image} alt={user.name || "User"} />
                    ) : null}
                    <AvatarFallback className="bg-white text-purple-600">
                      {getUserInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile/edit" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gradient-to-b from-purple-600 to-pink-600 border-l-purple-200">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button variant="ghost" asChild className="text-black hover:bg-white/20 justify-start">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  </Button>
                  <Button variant="ghost" asChild className="text-black hover:bg-white/20 justify-start">
                    <Link href="/discover" onClick={() => setIsOpen(false)}>Discover</Link>
                  </Button>
                  <Button asChild className="justify-start bg-white text-purple-600 hover:bg-gray-100">
                    <Link href="/create" onClick={() => setIsOpen(false)}>Create</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}