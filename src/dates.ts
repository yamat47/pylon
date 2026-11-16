// How a date is written, from the day a site dates something, given as YYYY-MM-DD. The site
// decides the time zone; these only read the figures out of the string.

// 2025-02-13 as 2025.02.13.
export const fullDate = (date: string) => date.replaceAll("-", ".");

// 2025-02-13 as 02.13, for where the year stands beside it.
export const monthDay = (date: string) => fullDate(date).slice(5);
