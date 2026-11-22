// How a date is written, from the day a site dates something, given as YYYY-MM-DD. The site
// decides the time zone; these only read the figures out of the string.

// 2025-02-13 as 2025.02.13.
export const fullDate = (date: string) => date.replaceAll("-", ".");

// 2025-02-13 as 02.13, for where the year stands beside it.
export const monthDay = (date: string) => fullDate(date).slice(5);

// A period, from the month or the year it began to the one it ended, each given as YYYY-MM or
// YYYY: 2022.12 – 2023.06. One that has not ended is its start and a dash (2025.05 –), and one
// that began and ended in the same month or year is that one alone (2021).
export function period(start: string, end?: string | undefined): string {
  if (end === undefined) return `${fullDate(start)} –`;
  return end === start ? fullDate(start) : `${fullDate(start)} – ${fullDate(end)}`;
}
