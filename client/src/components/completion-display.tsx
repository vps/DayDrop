import { Button } from "@/components/ui/button";

interface CompletionDisplayProps {
  isVisible: boolean;
  onStartNew: () => void;
}

export default function CompletionDisplay({
  isVisible,
  onStartNew
}: CompletionDisplayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-ios-green flex items-center justify-center p-4 z-50">
      <div className="text-center text-white">
        <div className="text-8xl font-bold mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2">Time's Up!</h2>
        <p className="text-lg opacity-90 mb-6">Your countdown has reached zero</p>
        <Button
          onClick={onStartNew}
          className="bg-white text-ios-green hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
        >
          Start New Countdown
        </Button>
      </div>
    </div>
  );
}
