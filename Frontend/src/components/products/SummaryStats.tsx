import {
  Activity,
  Gauge,
  ShieldCheck,
  Siren,
  Star,
} from "lucide-react";
import type { ProductSummary } from "../../lib/api";
import { formatCompactNumber, s } from "../../styles/style";

function averageRating(products: ProductSummary[]): number | null {
  const rated = products.filter(
    (product) => product.metrics.avgRating != null,
  );

  if (rated.length === 0) return null;

  const total = rated.reduce(
    (sum, product) => sum + (product.metrics.avgRating ?? 0),
    0,
  );

  return total / rated.length;
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className={s.stats.card}>
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface text-muted-foreground ring-1 ring-inset ring-border/70">
          {icon}
        </span>
        <p className={s.stats.label}>{label}</p>
      </div>
      <p className={s.stats.value}>{value}</p>
      <p className={s.stats.hint}>{hint}</p>
    </div>
  );
}

export function SummaryStats({ products }: { products: ProductSummary[] }) {
  const totalReviews = products.reduce(
    (sum, product) => sum + product.metrics.reviewCount,
    0,
  );

  const needsAttention = products.filter(
    (product) =>
      product.health.status === "critical" ||
      product.health.status === "needs_attention",
  ).length;

  const healthy = products.filter(
    (product) => product.health.status === "healthy",
  ).length;

  const avgRating = averageRating(products);

  return (
    <section aria-label="Portfolio summary">
      <div className={s.stats.grid}>
        <StatCard
          icon={<Gauge className="size-3.5" aria-hidden="true" />}
          label="Products tracked"
          value={formatCompactNumber(products.length)}
          hint="Across the full catalogue"
        />
        <StatCard
          icon={<Activity className="size-3.5" aria-hidden="true" />}
          label="Reviews analysed"
          value={formatCompactNumber(totalReviews)}
          hint="Enriched by the Databricks pipeline"
        />
        <StatCard
          icon={<Star className="size-3.5" aria-hidden="true" />}
          label="Average rating"
          value={avgRating == null ? "—" : avgRating.toFixed(2)}
          hint="Mean across rated products"
        />
        <StatCard
          icon={
            needsAttention > 0 ? (
              <Siren className="size-3.5" aria-hidden="true" />
            ) : (
              <ShieldCheck className="size-3.5" aria-hidden="true" />
            )
          }
          label="Needs attention"
          value={formatCompactNumber(needsAttention)}
          hint={
            healthy > 0
              ? `${healthy} product${healthy === 1 ? "" : "s"} healthy`
              : "No healthy products yet"
          }
        />
      </div>
    </section>
  );
}
