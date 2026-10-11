import type { Milestone } from "./types";

export const CALCULATOR_REMEMBER_ME_KEY = "remember-me";
export const CALCULATOR_METHOD_KEY = "method";
export const CALCULATOR_DATE_KEY = "date";
export const CALCULATOR_CYCLE_KEY = "cycle";

export const DAY = 86_400_000;
export const FACTS_INTERVAL = 15000;

export const LONG: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};
export const SHORT: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
};

export const MILESTONES: Milestone[] = [
  { week: 14, description: "Second trimester begins" },
  {
    week: 20,
    description: "Mid-pregnancy scan, usually offered between weeks 18 and 21",
  },
  { week: 28, description: "Third trimester begins" },
  { week: 37, description: "Full term begins" },
  { week: 40, description: "Estimated due date" },
];

export const LEGENDS: { color: string; description: string }[] = [
  { color: "bg-tri-1", description: "First trimester, 0 to 13 weeks" },
  { color: "bg-tri-2", description: "Second trimester, 14 to 27 weeks" },
  { color: "bg-tri-3", description: "Third trimester, 28 weeks on" },
  { color: "bg-sun", description: "Due date" },
  { color: "bg-danger", description: "Past Due date" },
];
