export function CountdownSkeleton() {
  return (
    <div className="max-w-md mx-auto relative animate-pulse">
      {/* Card Container */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl">
        {/* Header Skeleton */}
        <div className="bg-white/5 px-6 py-4 text-center">
          <div className="h-5 bg-white/20 rounded-full w-32 mx-auto"></div>
        </div>
        
        {/* Main Display Skeleton */}
        <div className="px-6 py-12 text-center">
          {/* Big Number Skeleton */}
          <div className="h-32 bg-white/20 rounded-2xl w-48 mx-auto mb-4"></div>
          
          {/* Subtitle Skeleton */}
          <div className="h-6 bg-white/20 rounded-full w-24 mx-auto mb-6"></div>
          
          {/* Time Units Skeleton */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="bg-white/10 rounded-2xl px-4 py-3 w-20 h-16"></div>
            <div className="bg-white/10 rounded-2xl px-4 py-3 w-20 h-16"></div>
            <div className="bg-white/10 rounded-2xl px-4 py-3 w-20 h-16"></div>
          </div>
          
          {/* Message Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-white/20 rounded-full w-3/4 mx-auto"></div>
            <div className="h-4 bg-white/20 rounded-full w-2/3 mx-auto"></div>
          </div>
          
          {/* Status Indicator Skeleton */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="h-3 bg-white/20 rounded-full w-16"></div>
          </div>
          
          {/* Last Updated Skeleton */}
          <div className="h-3 bg-white/20 rounded-full w-32 mx-auto mt-2"></div>
        </div>
        
        {/* Action Buttons Skeleton */}
        <div className="px-6 pb-6 flex gap-3">
          <div className="flex-1 bg-white/20 h-12 rounded-xl"></div>
          <div className="flex-1 bg-white/20 h-12 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}