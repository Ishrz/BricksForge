import { Link } from "react-router-dom";
import { Radar } from "lucide-react";
import { s } from "../../styles/style";

export function AppHeader() {
  return (
    <>
      <Link to="/" className={s.appHeader.brandLink} aria-label="BricksForge home">
        <span className={s.appHeader.logo}>
          <Radar className={s.icon.md} strokeWidth={2.25} aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className={s.appHeader.brandTitle}>BricksForge</span>
          <span className={s.appHeader.brandSubtitle}>
            Review intelligence
          </span>
        </span>
      </Link>

      {/* <div className={s.appHeader.nav}>
        <span className={s.appHeader.statusPill}>
          <span className={s.appHeader.statusDot}>
            <span className={s.appHeader.statusDotAfter} aria-hidden="true" />
          </span>
          Live from Databricks
        </span>
      </div> */}
    </>
  );
}
