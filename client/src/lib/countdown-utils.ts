import { addDays, format } from "date-fns";

export function calculateDaysRemaining(targetDate: Date): number {
  const now = new Date();
  const target = new Date(targetDate);
  
  // Set time to end of target day to be more generous
  target.setHours(23, 59, 59, 999);
  
  const difference = target.getTime() - now.getTime();
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function getDefaultTargetDate(): Date {
  // Default to 30 days from now
  return addDays(new Date(), 30);
}
