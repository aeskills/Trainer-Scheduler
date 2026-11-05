import { format, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

const IST_OFFSET_MINUTES = 330; // UTC +5:30

/** Get the current Date in IST */
export function getNowInIST(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + IST_OFFSET_MINUTES * 60000);
}

/** Formats a date into "yyyy-MM-dd" (IST) */
export function formatISTDate(d: Date = getNowInIST()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Converts "yyyy-MM-dd" to number yyyymmdd */
export function dateKeyFromStr(str: string): number {
  return Number(str.replace(/-/g, ""));
}

/** Display format: "2 Nov 2026" */
export function displayDate(str: string): string {
  try {
    const [y, m, d] = str.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return format(date, "d MMM yyyy");
  } catch {
    return str;
  }
}

/** Display format with weekday: "Monday, 2 Nov 2026" */
export function displayDateWithDay(str: string): string {
  try {
    const [y, m, d] = str.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return format(date, "EEEE, d MMMM yyyy");
  } catch {
    return str;
  }
}

/** Display format for Google Sheet: "1 September", "6 November" (matching Image 3) */
export function displaySheetDate(str: string): string {
  try {
    const [y, m, d] = str.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return format(date, "d MMMM");
  } catch {
    return str;
  }
}

/** Check if dateStr is today in IST */
export function isTodayIST(dateStr: string): boolean {
  return dateStr === formatISTDate(getNowInIST());
}

/** Check if dateStr is in the past compared to IST today */
export function isPastIST(dateStr: string): boolean {
  return dateKeyFromStr(dateStr) < dateKeyFromStr(formatISTDate(getNowInIST()));
}

/** Check if dateStr is in the future compared to IST today */
export function isFutureIST(dateStr: string): boolean {
  return dateKeyFromStr(dateStr) > dateKeyFromStr(formatISTDate(getNowInIST()));
}

/** Returns the grid days for a given month (including padding days from prev/next months) */
export function getCalendarGrid(currentMonthDate: Date) {
  const monthStart = startOfMonth(currentMonthDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return {
      date: day,
      dateStr,
      dateKey: dateKeyFromStr(dateStr),
      isCurrentMonth: isSameMonth(day, monthStart),
      isToday: isTodayIST(dateStr),
      isPast: isPastIST(dateStr),
      dayNumber: format(day, "d"),
    };
  });
}
