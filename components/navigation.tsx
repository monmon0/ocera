"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
  Trophy,
  Menu,
  Users,
} from "lucide-react";

const navigation = [
  // { name: "Dashboard", href: "/dashboard", icon: Home },
  // { name: "Discover", href: "/discover", icon: Search },
  // { name: "Create", href: "/create", icon: PlusCircle },
  // { name: "Favourites", href: "/favourites", icon: Heart },
  // { name: "Following", href: "/following", icon: Users },
  // { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`text-white hover:bg-white/20 ${
                      isActive ? "bg-white/20" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
            <div className="flex items-center space-x-4 text-white">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/discover">Discover</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/create">Create</Link>
              </Button>
              <Button 
                className="text-purple hover:bg-white/20"
                variant="outline" 
                size="sm"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gradient-to-b from-purple-600 to-pink-600 border-l-purple-400">
                {/* <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={`w-full justify-start text-white hover:bg-white/20 ${
                            isActive ? "bg-white/20" : ""
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Button>
                      </Link>
                    );
                  })}
                </div> */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}