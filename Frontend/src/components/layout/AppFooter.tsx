import { Radar } from "lucide-react";

export function AppFooter() {
  return (
    <>
      <p className="flex items-center gap-1.5 font-medium text-foreground">
        <Radar className="size-3.5 text-primary" aria-hidden="true" />
        BricksForge
      </p>
      <p>
        Review intelligence built on Databricks &amp; Lakebase · Health scores
        refresh with every enrich run
      </p>
    </>
  );
}
