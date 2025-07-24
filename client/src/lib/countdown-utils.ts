import { addDays, format } from "date-fns";

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  lastUpdated: Date;
}

export function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date();
  const target = new Date(targetDate);
  
  // Set time to end of target day to be more generous
  target.setHours(23, 59, 59, 999);
  
  const difference = target.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, lastUpdated: now };
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, totalMs: difference, lastUpdated: now };
}

export function calculateDaysRemaining(targetDate: Date): number {
  const timeRemaining = calculateTimeRemaining(targetDate);
  return timeRemaining.days;
}

export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function getDefaultTargetDate(): Date {
  // Default to December 25, 2025 in user's timezone
  const targetDate = new Date('2025-12-25T23:59:59');
  return targetDate;
}
