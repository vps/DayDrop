import { Copy, Check, Share2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, type TimeRemaining } from "@/lib/countdown-utils";
import SocialShare from "./social-share";

interface CountdownWidgetProps {
  targetDate: Date | null;
  timeRemaining: TimeRemaining;
}

export default function CountdownWidget({
  targetDate,
  timeRemaining
}: CountdownWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const copyToClipboard = async () => {
    const countdownText = `Hey jaani, the amount of days until forever with you is ${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, ${timeRemaining.seconds} seconds :)`;
    
    try {
      await navigator.clipboard.writeText(countdownText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return (
    <>
      <div className="bg-ios-card-bg rounded-3xl shadow-lg max-w-sm w-full mx-auto overflow-hidden border border-ios-gray-200">
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
        <div className="text-lg text-ios-gray-600 font-medium mb-4">
          {timeRemaining.days === 1 ? 'day' : 'days'}
        </div>
        
        {/* Time Breakdown Display */}
        <div className="flex justify-center space-x-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-text tabular-nums">
              {String(timeRemaining.hours).padStart(2, '0')}
            </div>
            <div className="text-xs text-ios-gray-500 font-medium">hours</div>
          </div>
          <div className="text-2xl font-bold text-ios-gray-400 self-start">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-text tabular-nums">
              {String(timeRemaining.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs text-ios-gray-500 font-medium">minutes</div>
          </div>
          <div className="text-2xl font-bold text-ios-gray-400 self-start">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-text tabular-nums">
              {String(timeRemaining.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-ios-gray-500 font-medium">seconds</div>
          </div>
        </div>
        
        {/* Target Date Display */}
        {targetDate && (
          <div className="text-sm text-ios-gray-500 mb-6">
            Until <span className="font-medium text-ios-text">{formatDate(targetDate)}</span>
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-ios-green rounded-full animate-pulse"></div>
          <span className="text-xs text-ios-gray-600 font-medium">ACTIVE</span>
        </div>
        
        {/* Last Updated Indicator with Refresh */}
        <div className="text-xs text-ios-gray-400 text-center">
          <div>
            Last updated: {new Date(timeRemaining.lastUpdated).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-1 text-ios-blue hover:text-ios-blue/80 font-medium underline"
          >
            Refresh app
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex gap-3">
        <Button
          onClick={copyToClipboard}
          className="flex-1 bg-ios-green hover:bg-ios-green/90 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
        
        <Button
          onClick={() => setShowShareModal(true)}
          className="flex-1 bg-ios-blue hover:bg-ios-blue/90 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
    
    {/* Share Modal */}
    {showShareModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-ios-gray-100 rounded-3xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Modal Header */}
          <div className="bg-ios-blue px-6 py-4 text-center relative">
            <h2 className="text-white text-lg font-semibold">Share Countdown</h2>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6">
            <SocialShare timeRemaining={timeRemaining} />
          </div>
        </div>
      </div>
    )}
    </>
  );
}
