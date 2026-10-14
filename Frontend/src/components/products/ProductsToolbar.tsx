import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "cn";
import type { HealthStatus } from "../../lib/api";
import {
  HEALTH_FILTERS,
  SORT_OPTIONS,
  type HealthFilter,
  type SortOption,
} from "../../lib/productFilters";
import { healthTone, s } from "../../styles/style";

export function ProductsToolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
  counts,
  resultCount,
  totalCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  filter: HealthFilter;
  onFilterChange: (value: HealthFilter) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  counts: Record<HealthStatus, number>;
  resultCount: number;
  totalCount: number;
}) {
  return (
    <div className={s.toolbar.root}>
      <div className={s.toolbar.row}>
        {/* Health filter */}
        <div
          className={s.toolbar.filters}
          role="group"
          aria-label="Filter by product health"
        >
          {HEALTH_FILTERS.map((option) => {
            const isActive = filter === option.value;
            const badgeCount =
              option.value === "all"
                ? totalCount
                : counts[option.value as HealthStatus];

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onFilterChange(option.value)}
                aria-pressed={isActive}
                className={cn(
                  s.toolbar.filterChip,
                  isActive && s.toolbar.filterChipActive,
                )}
              >
                {option.value !== "all" && (
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      healthTone(option.value as HealthStatus).dot,
                    )}
                    aria-hidden="true"
                  />
                )}
                {option.label}
                <span className="tabular-nums opacity-60">{badgeCount}</span>
              </button>
            );
          })}
        </div>

        {/* Search + sort */}
        <div className={s.toolbar.end}>
          <div className={s.toolbar.searchWrap}>
            <Search className={s.toolbar.searchIcon} aria-hidden="true" />
            <label htmlFor="product-search" className="sr-only">
              Search products by name or category
            </label>
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search products or categories…"
              className={s.toolbar.searchInput}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className={s.toolbar.searchClear}
                aria-label="Clear search"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className={s.toolbar.sortWrap}>
            <label htmlFor="product-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="product-sort"
              value={sort}
              onChange={(event) =>
                onSortChange(event.target.value as SortOption)
              }
              className={s.toolbar.sortSelect}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className={s.toolbar.sortIcon} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Live result count, announced politely to screen readers */}
      <p className={s.toolbar.resultCount} aria-live="polite" role="status">
        {resultCount === totalCount
          ? `${totalCount} product${totalCount === 1 ? "" : "s"} tracked`
          : `${resultCount} of ${totalCount} products`}
      </p>
    </div>
  );
}
