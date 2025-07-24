import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, type TimeRemaining } from "@/lib/countdown-utils";

interface CountdownWidgetProps {
  targetDate: Date | null;
  timeRemaining: TimeRemaining;
  onSetNewDate: () => void;
  onOpenSettings: () => void;
  onReset: () => void;
}

export default function CountdownWidget({
  targetDate,
  timeRemaining,
  onSetNewDate,
  onOpenSettings,
  onReset
}: CountdownWidgetProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="bg-ios-blue px-6 py-4 text-center relative">
        <h1 className="text-white text-lg font-semibold tracking-wide">COUNTDOWN</h1>
        <button
          onClick={onOpenSettings}
          className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100 transition-opacity"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Main Countdown Display */}
      <div className="px-6 py-8 text-center">
        {/* Days Display */}
        <div className="text-5xl font-bold text-ios-text mb-2 tabular-nums">
          {timeRemaining.days}
        </div>
        <div className="text-lg text-gray-600 font-medium mb-4">
          {timeRemaining.days === 1 ? 'day' : 'days'}
        </div>
        
        {/* Time Breakdown Display */}
        <div className="flex justify-center space-x-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-text tabular-nums">
              {String(timeRemaining.hours).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-500 font-medium">hours</div>
          </div>
          <div className="text-2xl font-bold text-gray-400 self-start">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-text tabular-nums">
              {String(timeRemaining.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-500 font-medium">minutes</div>
          </div>
          <div className="text-2xl font-bold text-gray-400 self-start">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-text tabular-nums">
              {String(timeRemaining.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-500 font-medium">seconds</div>
          </div>
        </div>
        
        {/* Target Date Display */}
        {targetDate && (
          <div className="text-sm text-gray-500 mb-6">
            Until <span className="font-medium text-ios-text">{formatDate(targetDate)}</span>
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-ios-green rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">ACTIVE</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 space-y-3">
        <Button
          onClick={onSetNewDate}
          className="w-full bg-ios-blue hover:bg-ios-blue/90 text-white py-3 rounded-xl font-semibold transition-colors"
        >
          Set New Date
        </Button>
        <Button
          onClick={onReset}
          variant="secondary"
          className="w-full bg-gray-100 hover:bg-gray-200 text-ios-text py-3 rounded-xl font-medium transition-colors"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
