import { cn } from "cn";
import type { HealthStatus } from "../../lib/api";
import { healthTone, s } from "../../styles/style";

export function HealthBadge({
  status,
  label,
  className,
}: {
  status: HealthStatus;
  label: string;
  className?: string;
}) {
  const tone = healthTone(status);

  return (
    <span
      className={cn(s.healthBadge.base, tone.badge, tone.ring, className)}
    >
      <span className={cn(s.healthBadge.dot, tone.dot)} aria-hidden="true" />
      {label}
    </span>
  );
}
