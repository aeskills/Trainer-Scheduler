/**
 * IST (UTC+05:30, no DST) date helpers. All visit dates are stored as
 * `yyyy-MM-dd` strings in IST plus an integer `dateKey` (yyyymmdd).
 */
const IST_OFFSET_MS = 330 * 60 * 1000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** A Date whose UTC getters return IST wall-clock values. */
function shifted(d: Date = new Date()): Date {
  return new Date(d.getTime() + IST_OFFSET_MS);
}

const pad = (n: number) => String(n).padStart(2, "0");

export function istDateStr(d: Date = new Date()): string {
  const s = shifted(d);
  return `${s.getUTCFullYear()}-${pad(s.getUTCMonth() + 1)}-${pad(s.getUTCDate())}`;
}

export function istDateKey(d: Date = new Date()): number {
  return dateStrToKey(istDateStr(d));
}

export function dateStrToKey(dateStr: string): number {
  return Number(dateStr.replace(/-/g, ""));
}

/** Minutes since IST midnight. */
export function istMinutesNow(d: Date = new Date()): number {
  const s = shifted(d);
  return s.getUTCHours() * 60 + s.getUTCMinutes();
}

/** "18:30" → 1110 */
export function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** "2026-11-02" → "2 Nov 2026" (used for Drive folders and emails) */
export function displayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "18:00" → "6:00 PM" */
export function displayTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad(m)} ${suffix}`;
}

export function isValidDateStr(s: unknown): s is string {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}
