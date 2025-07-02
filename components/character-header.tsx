import React from 'react';
import { Heart, MessageCircle, Bookmark, Share2, Quote } from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Avatar = ({ children }) => (
  <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
    {children}
  </div>
);

const AvatarImage = ({ src, alt = "" }) => (
  <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} />
);

const AvatarFallback = ({ children, className = "" }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full ${className}`}>
    {children}
  </div>
);

export default function CreatorHeaderWithBanner( { creator }) {
    if (!creator) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <p className="text-center text-gray-500">Loading character and creator data...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Creator Banner Section */}
      <div className="relative mb-8">
        {/* Banner Image */}
        <div 
          className="h-64 md:h-80 w-full rounded-t-lg bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: `url('${creator.banner_img || "/api/placeholder/1200/300"}')`
          }}
        >
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Creator Profile Section - Positioned over banner */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end gap-6">
              {/* Creator Avatar - Larger */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  <AvatarImage 
                    src={creator.image || "https://placehold.co/200x200?text=Avatar+Not+Available"}       
                    alt={creator.name || "Creator Avatar"}
                  />
                  <AvatarFallback className="bg-purple-200 text-purple-800 text-2xl">
                    {creator.name ? creator.name.split(' ').map(n => n[0]).join('') : "NA"}
                  </AvatarFallback>
                </div>
              </div>
              
              {/* Creator Info */}
              <div className="flex-1 pb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                  {creator?.name}
                </h2>
                <p className="text-white/90 text-lg drop-shadow-md">
                  @{creator?.name.replace(/\s+/g, "").toLowerCase()} • {creator?.followers_count?.toLocaleString()} followers
                </p>
              </div>
              
              {/* Follow Button */}
              <div className="pb-2">
                <a href={`/profile/${creator.id}`}>
                <Button className="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-6 py-2 shadow-lg">
                  View Profile
                </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Card */}
    </div>
  );
}