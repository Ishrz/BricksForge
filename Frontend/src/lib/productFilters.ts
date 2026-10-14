import type { HealthStatus } from "../lib/api";

export const HEALTH_FILTERS = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "needs_attention", label: "Needs attention" },
  { value: "healthy", label: "Healthy" },
  { value: "insufficient_data", label: "No data" },
] as const;

export const SORT_OPTIONS = [
  { value: "health", label: "Health (worst first)" },
  { value: "rating-asc", label: "Rating (low to high)" },
  { value: "rating-desc", label: "Rating (high to low)" },
  { value: "reviews", label: "Most reviews" },
  { value: "name", label: "Name (A–Z)" },
] as const;

export type HealthFilter = (typeof HEALTH_FILTERS)[number]["value"];
export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

/** Sort severity order so "worst first" surfaces the products that need help. */
export const HEALTH_ORDER: Record<HealthStatus, number> = {
  critical: 0,
  needs_attention: 1,
  healthy: 2,
  insufficient_data: 3,
};
