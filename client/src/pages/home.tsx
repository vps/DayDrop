import CountdownWidget from "@/components/countdown-widget";
import CompletionDisplay from "@/components/completion-display";
import PWAPrompt from "@/components/pwa-prompt";
import { useCountdown } from "@/hooks/use-countdown";

export default function Home() {
  
  const {
    targetDate,
    timeRemaining,
    isComplete
  } = useCountdown();

  const handleStartNewCountdown = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-ios-bg">
      <div className="w-full max-w-sm space-y-8">
        <CountdownWidget
          targetDate={targetDate}
          timeRemaining={timeRemaining}
        />
        
        <PWAPrompt />
      </div>

      <CompletionDisplay
        isVisible={isComplete}
        onStartNew={handleStartNewCountdown}
      />
    </div>
  );
}
