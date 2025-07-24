import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, type TimeRemaining } from "@/lib/countdown-utils";

interface CountdownWidgetProps {
  targetDate: Date | null;
  timeRemaining: TimeRemaining;
}

export default function CountdownWidget({
  targetDate,
  timeRemaining
}: CountdownWidgetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const countdownText = `Hey, the amount of days until the event is ${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, ${timeRemaining.seconds} seconds`;
    
    try {
      await navigator.clipboard.writeText(countdownText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return (
    <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="bg-ios-blue px-6 py-4 text-center">
        <h1 className="text-white text-lg font-semibold tracking-wide">COUNTDOWN</h1>
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
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-ios-green rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">ACTIVE</span>
        </div>
        
        {/* Last Updated Indicator */}
        <div className="text-xs text-gray-400 text-center">
          Last updated: {new Date(timeRemaining.lastUpdated).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      </div>

      {/* Copy Button */}
      <div className="px-6 pb-6">
        <Button
          onClick={copyToClipboard}
          className="w-full bg-ios-green hover:bg-ios-green/90 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Countdown
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
