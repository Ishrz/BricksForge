import { ArrowUpRight, Flag, MessageSquareWarning, Star } from "lucide-react";
import type { ProductSummary } from "../../lib/api";
import {
  formatCompactNumber,
  formatPercent,
  formatRating,
  healthTone,
  s,
} from "../../styles/style";
import { HealthBadge } from "./HealthBadge";

function StarRating({ rating }: { rating: number | null }) {
  if (rating == null) {
    return <span className="text-base font-medium text-muted-foreground">—</span>;
  }

  const rounded = Math.round(rating);

  return (
    <span className={s.card.ratingRow}>
      <Star className={s.card.star} aria-hidden="true" />
      <span className={s.card.ratingValue}>{formatRating(rating)}</span>
      <span className={s.card.ratingOutOf}>/5</span>
      <span className="sr-only">
        {rounded} out of 5 stars. Average rating {formatRating(rating)}.
      </span>
    </span>
  );
}

export function ProductCard({
  product,
  onSelect,
}: {
  product: ProductSummary;
  onSelect: (id: string) => void;
}) {
  const tone = healthTone(product.health.status);
  const negativePct = product.metrics.negativePct;

  return (
    <button
      type="button"
      onClick={() => onSelect(product.productId)}
      className={s.card.root}
    >
      <span className={s.card.rail + " " + tone.rail} aria-hidden="true" />

      <span className={s.card.body}>
        <span className={s.card.header}>
          <span className={s.card.titleBlock}>
            <span className={s.card.category}>{product.category}</span>
            <span className={s.card.name}>{product.name}</span>
            {product.flagged && (
              <span className={s.card.flaggedRow}>
                <Flag className="size-3" aria-hidden="true" />
                Flagged for investigation
              </span>
            )}
          </span>

          <span className="flex shrink-0 flex-col items-end gap-2">
            <HealthBadge
              status={product.health.status}
              label={product.health.label}
            />
            <ArrowUpRight className={s.card.openHint} aria-hidden="true" />
          </span>
        </span>

        <span className={s.card.metrics}>
          <span className="flex flex-col">
            <span className={s.card.metricLabel}>Rating</span>
            <span className={s.card.metricValue}>
              <StarRating rating={product.metrics.avgRating} />
            </span>
          </span>
          <span className="flex flex-col border-l border-border/70 pl-4">
            <span className={s.card.metricLabel}>Reviews</span>
            <span className={s.card.metricValue}>
              {formatCompactNumber(product.metrics.reviewCount)}
            </span>
          </span>
        </span>

        <span className={s.card.meterWrap}>
          <span className={s.card.meterHead}>
            <span className={s.card.meterLabel}>Negative sentiment</span>
            <span className={s.card.meterValue}>
              {formatPercent(negativePct)}
            </span>
          </span>
          <span
            className={s.card.meterTrack}
            role="meter"
            aria-valuenow={negativePct ?? 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Negative sentiment for ${product.name}`}
          >
            <span
              className={`${s.card.meterFill} ${tone.fill}`}
              style={{ width: `${Math.min(Math.max(negativePct ?? 0, 0), 100)}%` }}
            />
          </span>
        </span>

        <span className={s.card.footer}>
          <span className={s.card.topIssue}>
            <MessageSquareWarning className="size-3.5" aria-hidden="true" />
            {product.topComplaint ? (
              <>
                <span className="shrink-0">Top issue:</span>
                <span className={s.card.topIssueValue}>
                  {product.topComplaint}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">No issues reported</span>
            )}
          </span>
        </span>
      </span>
    </button>
  );
}
