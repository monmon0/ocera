import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, Heart, Eye, Star, TrendingUp, Users, Zap } from 'lucide-react';

const ImprovedOCHeader = ({ocs}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  
  // Sample data for demonstration
  const filteredOCs = [
    {
      id: 1,
      name: "Aria Moonweaver",
      description: "A mystical sorceress who weaves moonlight into powerful spells, guardian of the celestial realm.",
      likes_count: 2847,
      views_count: 15420,
      char_img: ["/placeholder.svg?height=400&width=400"],
      creator: "MysticArtist",
      tags: ["Fantasy", "Magic", "Celestial"]
    },
    {
      id: 2,
      name: "Zara Steelheart",
      description: "A cyberpunk hacker with a heart of gold, fighting corruption in Neo-Tokyo's neon-lit streets.",
      likes_count: 3142,
      views_count: 18750,
      char_img: ["/placeholder.svg?height=400&width=400"],
      creator: "CyberDreamer",
      tags: ["Cyberpunk", "Hacker", "Hero"]
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % filteredOCs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentOC = filteredOCs[featuredIndex];

  return (
    <div className="relative overflow-hidden bg-white">{/* Removed animated background and particles */}

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-4 mb-6 p-4 bg-purple-50 rounded-full border border-purple-200">
            <Sparkles className="h-8 w-8 text-purple-600 animate-spin" />
            <span className="text-purple-700 font-medium">Now Trending</span>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-purple-900 mb-6 leading-tight">
            Discover Amazing
            <span className="block text-5xl md:text-6xl mt-2 text-purple-800">
              OCs
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Dive into a universe of creativity where imagination knows no bounds. 
            <span className="block mt-2 text-lg text-purple-600">
              Explore trending characters, connect with creators, and join epic challenges
            </span>
          </p>

          {/* Stats bar */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-purple-700">
              <Users className="h-5 w-5" />
              <span className="font-semibold">10K+ Creators</span>
            </div>
            <div className="w-px h-6 bg-purple-300"></div>
            <div className="flex items-center gap-2 text-purple-700">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">50K+ Characters</span>
            </div>
            <div className="w-px h-6 bg-purple-300"></div>
            <div className="flex items-center gap-2 text-purple-700">
              <Heart className="h-5 w-5" />
              <span className="font-semibold">1M+ Likes</span>
            </div>
          </div>
        </div>

        {/* Enhanced Featured Section */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-purple-50 rounded-3xl border border-purple-200 shadow-lg overflow-hidden">
            <div className="relative p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-bold shadow-lg">
                      <Crown className="h-5 w-5" />
                      Featured Character
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-purple-500 text-purple-500" />
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-purple-900 mb-4 leading-tight">
                    {currentOC?.name}
                  </h2>
                  
                  <p className="text-xl text-purple-700 leading-relaxed">
                    {currentOC?.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-purple-600">by</span>
                    <span className="text-purple-800 font-semibold">{currentOC?.creator}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentOC?.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm font-medium border border-purple-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-8 mb-8">
                    <div className="flex items-center gap-3 text-purple-600">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <Heart className="h-5 w-5" />
                      </div>
                      <span className="text-xl font-semibold">{currentOC?.likes_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-purple-600">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <Eye className="h-5 w-5" />
                      </div>
                      <span className="text-xl font-semibold">{currentOC?.views_count.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-purple-800">
                      View Character
                    </button>
                    <button className="px-8 py-4 bg-purple-100 text-purple-700 font-bold rounded-2xl border border-purple-200 hover:bg-purple-200 transition-all duration-300">
                      Follow Creator
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Character image container with enhanced styling */}
                    <div className="absolute inset-0 bg-purple-200 rounded-3xl blur-xl transform rotate-3"></div>
                    <div className="relative bg-purple-50 rounded-3xl border border-purple-200 overflow-hidden">
                      <img
                        src={currentOC?.char_img[0] || "/placeholder.svg?height=400&width=400"}
                        alt={currentOC?.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent"></div>
                    </div>
                    
                    {/* Floating achievement badge */}
                    <div className="absolute -top-6 -right-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-full shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                      <Star className="h-8 w-8 fill-current" />
                    </div>
                    
                    {/* Floating stats */}
                    <div className="absolute -bottom-4 -left-4 bg-purple-100 rounded-2xl p-4 border border-purple-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-900">#1</div>
                        <div className="text-sm text-purple-600">Trending</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {filteredOCs.map((_, index) => (
            <button
              key={index}
              onClick={() => setFeaturedIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === featuredIndex 
                  ? 'bg-purple-400 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImprovedOCHeader;