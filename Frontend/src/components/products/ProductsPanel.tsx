import { useMemo, useState } from "react";
import { AlertCircle, Sparkles } from "lucide-react";
import type { HealthStatus, ProductSummary } from "../../lib/api";
import {
  HEALTH_ORDER,
  type HealthFilter,
  type SortOption,
} from "../../lib/productFilters";
import { s } from "../../styles/style";
import { ProductsGrid } from "./ProductsGrid";
import { ProductsToolbar } from "./ProductsToolbar";
import { SummaryStats } from "./SummaryStats";

function sortProducts(
  products: ProductSummary[],
  sort: SortOption,
): ProductSummary[] {
  const sorted = [...products];

  switch (sort) {
    case "health":
      return sorted.sort(
        (a, b) =>
          HEALTH_ORDER[a.health.status] - HEALTH_ORDER[b.health.status] ||
          (a.metrics.avgRating ?? 99) - (b.metrics.avgRating ?? 99),
      );
    case "rating-asc":
      return sorted.sort(
        (a, b) => (a.metrics.avgRating ?? 99) - (b.metrics.avgRating ?? 99),
      );
    case "rating-desc":
      return sorted.sort(
        (a, b) => (b.metrics.avgRating ?? -1) - (a.metrics.avgRating ?? -1),
      );
    case "reviews":
      return sorted.sort(
        (a, b) => b.metrics.reviewCount - a.metrics.reviewCount,
      );
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function ProductsPanel({
  products,
  loading,
  error,
  onSelectProduct,
}: {
  products: ProductSummary[];
  loading: boolean;
  error: string | null;
  onSelectProduct: (productId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<HealthFilter>("all");
  const [sort, setSort] = useState<SortOption>("health");

  const counts = useMemo(() => {
    const base: Record<HealthStatus, number> = {
      critical: 0,
      needs_attention: 0,
      healthy: 0,
      insufficient_data: 0,
    };

    for (const product of products) {
      base[product.health.status] += 1;
    }

    return base;
  }, [products]);

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesFilter =
        filter === "all" || product.health.status === filter;

      const matchesQuery =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        (product.topComplaint?.toLowerCase().includes(term) ?? false);

      return matchesFilter && matchesQuery;
    });

    return sortProducts(filtered, sort);
  }, [products, query, filter, sort]);

  return (
    <div className={s.panel.root}>
      <div className="surface-wash relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className={s.panel.header}>
          <div className={s.panel.headerText}>
            <p className={s.panel.eyebrow}>
              <Sparkles className="size-3" aria-hidden="true" />
              Live from Databricks
            </p>
            <h1 className={s.panel.title}>Review health signals</h1>
            <p className={s.panel.subtitle}>
              Every signal below is computed from enriched customer reviews —
              health scores, sentiment mix, and the top complaint themes. Open
              any SKU for the full breakdown and AI brief.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className={s.panel.error} role="alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && <SummaryStats products={products} />}

      {!loading && (
        <ProductsToolbar
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
          counts={counts}
          resultCount={visibleProducts.length}
          totalCount={products.length}
        />
      )}

      <ProductsGrid
        products={visibleProducts}
        loading={loading}
        onSelect={onSelectProduct}
      />
    </div>
  );
}
