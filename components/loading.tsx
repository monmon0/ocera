import React from 'react';

const CuteLoadingComponent = ({ isCreatingChar = true }) => {
  return (
    <>
      {isCreatingChar && 
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg border border-pink-100">
          {/* Cute animated character */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <div className="text-3xl animate-pulse">✨</div>
            </div>
            {/* Floating sparkles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-pink-300 rounded-full animate-ping delay-300"></div>
            <div className="absolute top-1 -left-3 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-700"></div>
          </div>
          
          {/* Loading text */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Creating your character
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Cooking something amazing... ✨
            </p>
            
            {/* Animated dots */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full max-w-xs mt-6">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CuteLoadingComponent;