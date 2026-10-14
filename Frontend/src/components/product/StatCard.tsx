import type { ReactNode } from "react";
import { cn } from "cn";
import { s } from "../../styles/style";

export function StatCard({
  icon,
  label,
  value,
  hint,
  iconClassName,
  valueClassName,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  iconClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div className={s.detail.statCard}>
      <div className={s.detail.statHead}>
        <span className={cn(s.detail.statIcon, iconClassName)}>{icon}</span>
        <p className={s.detail.statLabel}>{label}</p>
      </div>
      <p className={cn(s.detail.statValue, valueClassName)}>{value}</p>
      {hint && <p className={s.detail.statHint}>{hint}</p>}
    </div>
  );
}
