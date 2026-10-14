import { MessageSquareQuote, Star } from "lucide-react";
import { highlightStyles, highlightTone } from "../../styles/style";
import { Badge } from "../ui/badge";

type Review = { text: string; rating: number; sentiment: string };

export function HighlightReviewCard({ review }: { review: Review }) {
  const tone = highlightTone(review.sentiment);
  const h = highlightStyles[tone];

  return (
    <section className={h.card} aria-label="Highlighted customer review">
      <div className={h.glow} aria-hidden="true" />

      <div className={h.header}>
        <span className={h.icon} aria-hidden="true">
          <MessageSquareQuote className="size-4" />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className={h.title}>Highlighted review</h2>
          <p className={h.subtitle}>{h.label}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 sm:py-7">
        <blockquote className={h.quote}>&ldquo;{review.text}&rdquo;</blockquote>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label={`Rated ${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={
                  index < review.rating ? h.starFilled : h.starEmpty
                }
                aria-hidden="true"
              />
            ))}
            <span className={h.rating}>{review.rating}/5</span>
          </div>

          <Badge className={h.badge}>{review.sentiment}</Badge>
        </div>
      </div>
    </section>
  );
}
