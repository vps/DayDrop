import { useState, useEffect } from "react";
import { calculateTimeRemaining, getDefaultTargetDate, type TimeRemaining } from "@/lib/countdown-utils";

const STORAGE_KEY = "countdown-data";

interface CountdownData {
  targetDate: string | null;
}

export function useCountdown() {
  const [targetDate, setTargetDateState] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    lastUpdated: new Date()
  });
  const [isComplete, setIsComplete] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: CountdownData = JSON.parse(saved);
        if (data.targetDate) {
          const date = new Date(data.targetDate);
          setTargetDateState(date);
        }
      } catch (error) {
        console.error("Failed to load countdown data:", error);
      }
    }
    
    // Set default target date if none exists
    if (!targetDate) {
      const defaultDate = getDefaultTargetDate();
      setTargetDateState(defaultDate);
    }
  }, []);

  // Save to localStorage whenever targetDate changes
  useEffect(() => {
    if (targetDate) {
      const data: CountdownData = {
        targetDate: targetDate.toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [targetDate]);

  // Update countdown with proper iOS PWA handling
  useEffect(() => {
    const updateCountdown = () => {
      if (targetDate) {
        const remaining = calculateTimeRemaining(targetDate);
        setTimeRemaining(remaining);
        setIsComplete(remaining.totalMs <= 0);
      }
    };

    // Initial update
    updateCountdown();

    // Update every second for real-time display
    const interval = setInterval(updateCountdown, 1000);
    
    // Handle page visibility changes (iOS PWA focus)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, force update
        updateCountdown();
      }
    };

    // Handle app focus (iOS PWA)
    const handleFocus = () => {
      updateCountdown();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [targetDate]);

  const setTargetDate = (date: Date) => {
    setTargetDateState(date);
    setIsComplete(false);
  };

  const resetCountdown = () => {
    const defaultDate = getDefaultTargetDate();
    setTargetDateState(defaultDate);
    setIsComplete(false);
  };

  return {
    targetDate,
    timeRemaining,
    daysRemaining: timeRemaining.days,
    isComplete,
    setTargetDate,
    resetCountdown
  };
}
