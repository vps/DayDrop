import { useState, useEffect } from "react";
import { calculateDaysRemaining, getDefaultTargetDate } from "@/lib/countdown-utils";

const STORAGE_KEY = "countdown-data";

interface CountdownData {
  targetDate: string | null;
}

export function useCountdown() {
  const [targetDate, setTargetDateState] = useState<Date | null>(null);
  const [daysRemaining, setDaysRemaining] = useState(0);
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

  // Update countdown daily
  useEffect(() => {
    const updateCountdown = () => {
      if (targetDate) {
        const days = calculateDaysRemaining(targetDate);
        setDaysRemaining(Math.max(0, days));
        setIsComplete(days <= 0);
      }
    };

    updateCountdown();

    // Update every minute to ensure accuracy
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
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
    daysRemaining,
    isComplete,
    setTargetDate,
    resetCountdown
  };
}
