/**
 * Helper functions for repeat notification/alarm scheduling
 * Ensures repeats begin exactly on the selected start date
 */

/**
 * Map JavaScript weekday (0-6, Sunday=0) to Expo weekday (1-7, Sunday=1)
 */
export function mapJsWeekdayToExpoWeekday(jsDay: number): number {
  // JS: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  // Expo: 1=Sun, 2=Mon, 3=Tue, 4=Wed, 5=Thu, 6=Fri, 7=Sat
  return jsDay === 0 ? 7 : jsDay;
}

/**
 * Map JavaScript month (0-11) to Expo month (1-12)
 */
export function mapJsMonthToExpoMonth(jsMonth: number): number {
  return jsMonth + 1;
}

/**
 * Check if two dates are within the same minute (ignoring seconds/milliseconds)
 */
export function sameMinute(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate() &&
    a.getHours() === b.getHours() &&
    a.getMinutes() === b.getMinutes()
  );
}

/**
 * Calculate the next daily occurrence from now at the given hour/minute
 * Returns the next time that matches hour:minute, which could be today or tomorrow
 */
export function nextDailyOccurrence(now: Date, hour: number, minute: number): Date {
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);
  
  // If the time has already passed today, move to tomorrow
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  
  return next;
}

/**
 * Calculate the next weekly occurrence from now at the given weekday (Expo format: 1-7), hour, minute
 * Returns the next time that matches weekday hour:minute
 */
export function nextWeeklyOccurrence(now: Date, expoWeekday: number, hour: number, minute: number): Date {
  // Convert Expo weekday (1-7) back to JS weekday (0-6) for calculations
  const jsWeekday = expoWeekday === 7 ? 0 : expoWeekday;
  
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);
  
  const currentWeekday = next.getDay();
  let daysUntilTarget = jsWeekday - currentWeekday;
  
  // If target weekday has passed this week, or it's today but time has passed, move to next week
  if (daysUntilTarget < 0 || (daysUntilTarget === 0 && next <= now)) {
    daysUntilTarget += 7;
  }
  
  next.setDate(next.getDate() + daysUntilTarget);
  return next;
}

/**
 * Check if the selected begin date matches the next occurrence for a daily repeat
 */
export function isNextDailyOccurrence(selectedDate: Date, hour: number, minute: number): boolean {
  const now = new Date();
  const nextOccurrence = nextDailyOccurrence(now, hour, minute);
  return sameMinute(selectedDate, nextOccurrence);
}

/**
 * Check if the selected begin date matches the next occurrence for a weekly repeat
 */
export function isNextWeeklyOccurrence(selectedDate: Date, expoWeekday: number, hour: number, minute: number): boolean {
  const now = new Date();
  const nextOccurrence = nextWeeklyOccurrence(now, expoWeekday, hour, minute);
  return sameMinute(selectedDate, nextOccurrence);
}

