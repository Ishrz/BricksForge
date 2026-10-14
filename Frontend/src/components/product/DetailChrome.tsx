import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Flag } from "lucide-react";
import type { ProductDetail } from "../../lib/api";
import { s } from "../../styles/style";
import { Button } from "../ui/button";
import { cn } from "cn";
import { HealthBadge } from "../products/HealthBadge";

type Props = {
  title: string;
  category?: string;
  health?: ProductDetail["health"];
  flagged?: boolean;
  savingFlag?: boolean;
  meta?: string;
  onBack: () => void;
  onToggleFlag?: () => void;
};

export function DetailChrome({
  title,
  category,
  health,
  flagged,
  savingFlag,
  meta,
  onBack,
  onToggleFlag,
}: Props) {
  return (
    <div className={s.detail.chromeWrap}>
      {/* Compact sticky bar: back nav + breadcrumb + flag action */}
      <div className={s.detail.chromeBar}>
        <div className={s.detail.chromeTop}>
          <div className={s.detail.chromeLeft}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className={s.detail.backBtn}
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Products
            </Button>

            <span className={s.detail.divider} aria-hidden="true" />

            <nav className={s.detail.breadcrumb} aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-foreground">
                Products
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className={s.detail.breadcrumbCurrent} aria-current="page">
                {title}
              </span>
            </nav>
          </div>

          {health && onToggleFlag && (
            <div className={s.detail.chromeActions}>
              <Button
                variant={flagged ? "default" : "outline"}
                size="sm"
                className={s.detail.flagBtn}
                disabled={savingFlag}
                onClick={onToggleFlag}
                aria-pressed={Boolean(flagged)}
              >
                <Flag
                  className={cn("size-3.5", flagged && "fill-current")}
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">
                  {flagged ? "Flagged" : "Flag"}
                </span>
                <span className="sm:hidden">
                  {flagged ? "On" : "Off"}
                </span>
              </Button>
              <HealthBadge status={health.status} label={health.label} />
            </div>
          )}
        </div>
      </div>

      {/* Title block scrolls away with the page */}
      <div className={s.detail.chromeBody}>
        <div className={s.detail.titleBlock}>
          <div className={s.detail.titleRow}>
            {category && (
              <span className={s.detail.category}>{category}</span>
            )}
            <h1 className={s.detail.productTitle}>{title}</h1>
          </div>
          {meta && <p className={s.detail.productMeta}>{meta}</p>}
        </div>
      </div>
    </div>
  );
}
