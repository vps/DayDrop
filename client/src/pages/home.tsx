import { useState, useEffect } from "react";
import CountdownWidget from "@/components/countdown-widget";
import CompletionDisplay from "@/components/completion-display";
import PWAPrompt from "@/components/pwa-prompt";
import { CountdownSkeleton } from "@/components/countdown-skeleton";
import { useCountdown } from "@/hooks/use-countdown";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    targetDate,
    timeRemaining,
    isComplete
  } = useCountdown();

  // Show skeleton for a brief moment then transition to real content
  useEffect(() => {
    // Check if we have the initial data
    if (targetDate !== null) {
      // Add very small delay for smooth transition from inline skeleton
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [targetDate]);

  const handleStartNewCountdown = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-ios-bg">
      <div className="w-full max-w-sm space-y-8">
        {isLoading ? (
          <CountdownSkeleton />
        ) : (
          <div className="animate-in fade-in-0 duration-500">
            <CountdownWidget
              targetDate={targetDate}
              timeRemaining={timeRemaining}
            />
          </div>
        )}
        
        {!isLoading && <PWAPrompt />}
      </div>

      <CompletionDisplay
        isVisible={isComplete}
        onStartNew={handleStartNewCountdown}
      />
    </div>
  );
}
