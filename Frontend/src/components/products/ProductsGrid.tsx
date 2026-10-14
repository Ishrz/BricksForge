import { PackageSearch } from "lucide-react";
import type { ProductSummary } from "../../lib/api";
import { s } from "../../styles/style";
import { EmptyState } from "../ui/EmptyState";
import { Skeleton } from "../ui/skeleton";
import { ProductCard } from "./ProductCard";

function GridSkeleton() {
  return (
    <div className={s.grid.root} aria-hidden="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className={s.grid.skeleton} />
      ))}
    </div>
  );
}

export function ProductsGrid({
  products,
  loading,
  onSelect,
}: {
  products: ProductSummary[];
  loading: boolean;
  onSelect: (id: string) => void;
}) {
  if (loading) {
    return (
      <>
        <span className="sr-only" role="status">
          Loading products…
        </span>
        <GridSkeleton />
      </>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch className="size-5" aria-hidden="true" />}
        title="No products match these filters"
        description="Try a different search term, or clear the health filter to see the full catalogue."
      />
    );
  }

  return (
    <ul className={s.grid.root} role="list">
      {products.map((product) => (
        <li key={product.productId} className="h-full">
          <ProductCard product={product} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
