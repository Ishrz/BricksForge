import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground ring-1 ring-inset ring-border">
        {icon}
      </span>
      <div className="flex max-w-sm flex-col gap-1.5">
        <h3 className="text-lg font-semibold tracking-[-0.015em] text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
