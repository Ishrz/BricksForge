import { Skeleton } from "../ui/skeleton";
import { s } from "../../styles/style";

function CardSkeleton() {
  return (
    <div className={s.loader.card} aria-hidden="true">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2.5">
          <Skeleton className={`${s.loader.line} h-4 w-20`} />
          <Skeleton className={s.loader.lineLg} />
        </div>
        <Skeleton className={`${s.loader.line} h-6 w-24 rounded-full`} />
      </div>

      <Skeleton className={s.loader.block} />

      <div className="flex flex-col gap-2">
        <Skeleton className={`${s.loader.line} h-2.5 w-full`} />
        <Skeleton className={`${s.loader.line} h-2.5 w-2/3`} />
      </div>

      <Skeleton className={`${s.loader.line} mt-auto h-8 w-full`} />
    </div>
  );
}

export function ProductPageLoader() {
  return (
    <div className={s.loader.root}>
      <span className="sr-only" role="status">
        Loading product…
      </span>

      <div className={s.loader.grid} aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
