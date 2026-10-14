import { Activity, Lightbulb, MessageSquareWarning, Sparkles, Star, ThumbsDown } from "lucide-react";
import type { ProductDetail } from "../../lib/api";
import {
  formatCompactNumber,
  formatPercent,
  formatRating,
  s,
  sentimentFill,
  sentimentTone,
} from "../../styles/style";
import { DetailChrome } from "./DetailChrome";
import { HighlightReviewCard } from "./HighlightReview";
import { StatCard } from "./StatCard";

type Props = {
  product: ProductDetail;
  savingFlag: boolean;
  onBack: () => void;
  onToggleFlag: () => void;
};

function ComplaintBars({
  categories,
}: {
  categories: ProductDetail["topCategories"];
}) {
  const max = Math.max(...categories.map((item) => item.count), 1);

  return (
    <ul className={s.detail.barList} role="list">
      {categories.map((item) => (
        <li key={item.category} className={s.detail.barRow}>
          <div className={s.detail.barHead}>
            <span className={s.detail.barLabel}>{item.category}</span>
            <span className={s.detail.barCount}>
              {formatCompactNumber(item.count)}
            </span>
          </div>
          <div
            className={s.detail.barTrack}
            role="meter"
            aria-valuenow={item.count}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`${item.category}: ${item.count} mentions`}
          >
            <div
              className={`${s.detail.barFill} bg-warning`}
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SentimentTiles({
  breakdown,
}: {
  breakdown: ProductDetail["sentimentBreakdown"];
}) {
  const total = breakdown.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <>
      <ul className={s.detail.sentimentGrid} role="list">
        {breakdown.map((item) => {
          const tone = sentimentTone(item.sentiment);

          return (
            <li
              key={item.sentiment}
              className={`${s.detail.sentimentTile} ${tone.tile}`}
            >
              <p className={`text-2xl font-semibold tabular-nums ${tone.text}`}>
                {formatCompactNumber(item.count)}
              </p>
              <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {item.sentiment}
              </p>
            </li>
          );
        })}
      </ul>

      {/* Stacked proportion bar */}
      <div className="mt-5 flex flex-col gap-2">
        <div
          className="flex h-2 w-full overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-border/60"
          role="img"
          aria-label={breakdown
            .map(
              (item) =>
                `${item.sentiment} ${Math.round((item.count / total) * 100)}%`,
            )
            .join(", ")}
        >
          {breakdown.map((item) => (
            <div
              key={item.sentiment}
              className={sentimentFill(item.sentiment)}
              style={{ width: `${(item.count / total) * 100}%` }}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {formatCompactNumber(total)} reviews analysed
        </p>
      </div>
    </>
  );
}

export function ProductDetailView({
  product,
  savingFlag,
  onToggleFlag,
  onBack,
}: Props) {
  const negativePct = product.metrics.negativePct;

  return (
    <div className={s.detail.root}>
      <DetailChrome
        title={product.name}
        category={product.category}
        health={product.health}
        flagged={product.flagged}
        savingFlag={savingFlag}
        meta={`${formatCompactNumber(product.metrics.reviewCount)} reviews analysed · Updated continuously from Databricks`}
        onBack={onBack}
        onToggleFlag={onToggleFlag}
      />

      {product.highlightReview && (
        <HighlightReviewCard review={product.highlightReview} />
      )}

      {/* ---- Headline metrics ---- */}
      <section aria-label="Key metrics" className={s.detail.statsGrid}>
        <StatCard
          icon={
            <Star
              className="size-4 fill-warning text-warning"
              aria-hidden="true"
            />
          }
          label="Average rating"
          value={formatRating(product.metrics.avgRating)}
          hint="Mean across all reviews"
        />
        <StatCard
          icon={<Activity className="size-4" aria-hidden="true" />}
          label="Total reviews"
          value={formatCompactNumber(product.metrics.reviewCount)}
          hint="Enriched review records"
        />
        <StatCard
          icon={<ThumbsDown className="size-4" aria-hidden="true" />}
          label="Negative sentiment"
          value={formatPercent(negativePct)}
          valueClassName={
            negativePct != null && negativePct > 25
              ? "text-danger"
              : undefined
          }
          hint={
            negativePct != null && negativePct > 40
              ? "Above the critical threshold"
              : "Share of negative reviews"
          }
        />
        <StatCard
          icon={
            <MessageSquareWarning
              className="size-4"
              aria-hidden="true"
            />
          }
          label="Top complaint"
          value={product.topComplaint ?? "—"}
          hint={
            product.topCategories.length > 1
              ? `${product.topCategories.length} themes detected`
              : "Most frequent theme"
          }
        />
      </section>

      {/* ---- Complaints + sentiment ---- */}
      <div className={s.detail.twoColGrid}>
        <section className={s.detail.sectionCard} aria-labelledby="issues-title">
          <div className={s.detail.sectionHeader}>
            <div className={s.detail.sectionTitleWrap}>
              <h2 id="issues-title" className={s.detail.sectionTitle}>
                Top issues
              </h2>
              <p className={s.detail.sectionDesc}>
                Most frequent complaint themes
              </p>
            </div>
          </div>
          <div className={s.detail.sectionBody}>
            {product.topCategories.length === 0 ? (
              <p className={s.detail.emptyText}>
                No complaint themes have been classified for this product yet.
              </p>
            ) : (
              <ComplaintBars categories={product.topCategories} />
            )}
          </div>
        </section>

        <section
          className={s.detail.sectionCard}
          aria-labelledby="sentiment-title"
        >
          <div className={s.detail.sectionHeader}>
            <div className={s.detail.sectionTitleWrap}>
              <h2 id="sentiment-title" className={s.detail.sectionTitle}>
                Sentiment
              </h2>
              <p className={s.detail.sectionDesc}>
                Breakdown across all reviews
              </p>
            </div>
          </div>
          <div className={s.detail.sectionBody}>
            {product.sentimentBreakdown.length === 0 ? (
              <p className={s.detail.emptyText}>
                No sentiment data has been computed yet.
              </p>
            ) : (
              <SentimentTiles breakdown={product.sentimentBreakdown} />
            )}
          </div>
        </section>
      </div>

      {/* ---- AI summary ---- */}
      <section className={s.detail.aiCard} aria-labelledby="ai-summary-title">
        <div className={s.detail.aiGlow} aria-hidden="true" />
        <div className={s.detail.sectionHeader}>
          <div className={s.detail.sectionTitleWrap}>
            <h2 id="ai-summary-title" className={s.detail.sectionTitle}>
              AI summary
            </h2>
            <p className={s.detail.sectionDesc}>
              Generated from recent reviews and complaint themes
            </p>
          </div>
          <span className={s.detail.aiIcon} aria-hidden="true">
            <Sparkles className="size-4" />
          </span>
        </div>
        <div className={s.detail.sectionBody}>
          <p className={s.detail.aiText}>{product.summary}</p>
        </div>
      </section>

      {/* ---- Recommended action ---- */}
      <section
        className={s.detail.actionCard}
        aria-labelledby="next-step-title"
      >
        <div className={s.detail.actionGlow} aria-hidden="true" />
        <div className={s.detail.sectionHeader}>
          <div className={s.detail.sectionTitleWrap}>
            <h2 id="next-step-title" className={s.detail.sectionTitle}>
              Recommended action
            </h2>
            <p className={s.detail.sectionDesc}>
              Suggested next step for the product team
            </p>
          </div>
          <span className={s.detail.actionIcon} aria-hidden="true">
            <Lightbulb className="size-4" />
          </span>
        </div>
        <div className={s.detail.sectionBody}>
          <div className={s.detail.actionBox}>
            <p className={s.detail.actionText}>{product.nextStep}</p>
          </div>
        </div>
      </section>

      {/* Health status announced for screen readers only */}
      <span className="sr-only">
        Current health status: {product.health.label}.
      </span>
    </div>
  );
}
