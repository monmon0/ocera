import Link from "next/link"
import { Sparkles, Heart, Twitter, Instagram, Github, Mail, Users, Trophy, Search, Plus } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-300" />
              <span className="text-2xl font-bold">Ocera</span>
            </div>
            <p className="text-purple-200 leading-relaxed">
              The ultimate social platform for Original Character creators. Share, discover, and connect with fellow
              artists in a vibrant creative community.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://twitter.com"
                className="text-purple-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-purple-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com"
                className="text-purple-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@Ocera.com"
                className="text-purple-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-100">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/discover"
                  className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create OC
                </Link>
              </li>
              <li>
                <Link href="/following" className="text-purple-300 hover:text-white transition-colors">
                  Following
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-100">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/challenges" className="text-purple-300 hover:text-white transition-colors">
                  Weekly Challenges
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-purple-300 hover:text-white transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-purple-300 hover:text-white transition-colors">
                  Art Tutorials
                </Link>
              </li>
              <li>
                <Link href="/forums" className="text-purple-300 hover:text-white transition-colors">
                  Discussion Forums
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-purple-300 hover:text-white transition-colors">
                  Community Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-100">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-purple-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-purple-300 hover:text-white transition-colors">
                  Send Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-purple-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-purple-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-purple-300">
              <span>&copy; 2025 Ocera. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-2 text-purple-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for the creative community</span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link href="/status" className="text-purple-300 hover:text-white transition-colors">
                System Status
              </Link>
              <Link href="/api" className="text-purple-300 hover:text-white transition-colors">
                API Docs
              </Link>
              <Link href="/blog" className="text-purple-300 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div> */}
    </footer>
  )
}
