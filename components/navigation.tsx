"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { supabase } from "@/lib/supabase";

// Define the props interface
interface NavigationProps {
  userInfo?: {
    name?: string;
    email?: string;
    id?: string;
    // Add other user properties as needed
  };
}

export default function Navigation({ userInfo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
  }, [router]);

  return (
    <nav className="bg-white/30 backdrop-blur shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
           
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">O</span>
              </div>
              <span className="text-black font-bold text-xl">Ocera</span>
            </Link>
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-4 text-white">
               {user && <Button variant="ghost" className="text-purple-700 bg-white/0" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>}
              <Button variant="ghost" className="text-purple-700" size="sm" asChild>
                <Link href="/discover">Discover</Link>
              </Button>
              {user &&<Button size="sm" asChild className="bg-purple-500 text-white hover:bg-purple-300">
                <Link href="/create">Create</Link>
              </Button>}
              
              {/* User Profile Dropdown */}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-white/20">
                    {/* <Avatar className="h-8 w-8">
                      {user.image ? (
                        <AvatarImage src={user.image} alt={user.name || "User"} />
                      ) : null}
                      <AvatarFallback className="bg-white text-purple-600">
                        {getUserInitials(userInfo.name, userInfo.email)}
                      </AvatarFallback>
                    </Avatar> */}
                  </Button>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent className="w-56" align="end" forceMount>
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
                </DropdownMenuContent> */}
              </DropdownMenu>
            )}
            </div>
          {/* </div> */}

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile User Profile */}
            <DropdownMenu>
              {/* <DropdownMenuTrigger asChild>
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
              </DropdownMenuTrigger> */}
              {/* <DropdownMenuContent className="w-56" align="end" forceMount>
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
              </DropdownMenuContent> */}
            </DropdownMenu>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className=" hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-purple-200">
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