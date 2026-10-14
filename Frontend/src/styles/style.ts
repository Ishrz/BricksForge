import type { HealthStatus } from "../lib/api";

/* ==========================================================================
   STYLE TOKEN MAP
   Single source of truth for layout + component classes.
   Every string here is a static Tailwind class literal so the JIT compiler
   can extract them.
   ========================================================================== */

export const s = {
  /* ---- Icon sizing ---------------------------------------------------- */
  icon: {
    xs: "size-3",
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
    chevron: "size-3.5",
  },

  /* ---- App shell ------------------------------------------------------ */
  shell: {
    page: "relative flex min-h-dvh flex-col bg-background",
    skipLink: "sr-focusable",
    headerWrap:
      "sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-background",
    headerInner:
      "mx-auto flex h-16 w-full max-w-[110rem] items-center px-5 sm:h-[4.5rem] sm:px-8 lg:px-10",
    main:
      "mx-auto w-full max-w-[110rem] flex-1 px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24 lg:pt-12",
    footer:
      "border-t border-border/60 bg-surface/40",
    footerInner:
      "mx-auto flex w-full max-w-[110rem] flex-col gap-2 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10",
  },

  /* ---- Header --------------------------------------------------------- */
  appHeader: {
    brandLink:
      "group -ml-1 flex min-w-0 items-center gap-3 rounded-lg p-1 outline-none transition-opacity hover:opacity-85 focus-visible:opacity-100",
    logo:
      "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105 dark:ring-white/10 sm:size-10",
    brandTitle:
      "font-heading text-[0.9375rem] font-semibold leading-tight tracking-[-0.01em] text-foreground",
    brandSubtitle:
      "hidden text-2xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:block",
    nav: "flex items-center gap-1.5 sm:gap-2",
    statusPill:
      "hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground md:inline-flex",
    statusDot:
      "relative flex size-2 items-center justify-center rounded-full bg-success",
    statusDotAfter:
      "absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60",
  },

  /* ---- Page hero / section header ------------------------------------- */
  panel: {
    root: "flex flex-col gap-10 sm:gap-12",
    header: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
    headerText: "flex max-w-2xl flex-col gap-3",
    eyebrow:
      "inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-primary",
    title:
      "font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
    subtitle:
      "max-w-xl text-base leading-relaxed text-pretty text-muted-foreground",
    error:
      "flex items-start gap-3 rounded-lg border border-danger/25 bg-danger-surface px-4 py-3.5 text-sm leading-relaxed text-danger",
  },

  /* ---- Summary stat strip -------------------------------------------- */
  stats: {
    grid: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
    card:
      "group flex flex-col gap-1.5 rounded-xl border border-border/80 bg-card px-4 py-4 shadow-xs transition-shadow duration-200 hover:shadow-sm sm:px-5 sm:py-5",
    label:
      "text-2xs font-semibold uppercase tracking-[0.12em] text-muted-foreground",
    value:
      "font-heading text-2xl font-semibold tabular-nums tracking-[-0.02em] text-foreground sm:text-3xl",
    hint: "text-xs leading-snug text-muted-foreground",
  },

  /* ---- Toolbar (search / filter / sort) ------------------------------- */
  toolbar: {
    root:
      "flex flex-col gap-3.5 rounded-xl border border-border/80 bg-card/70 p-3 shadow-xs backdrop-blur-sm sm:p-4",
    row:
      "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
    end: "flex flex-col gap-3 sm:flex-row sm:items-center",
    searchWrap: "relative min-w-0 sm:flex-1",
    searchIcon:
      "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
    searchInput:
      "h-10 w-full rounded-lg border border-input bg-background pl-10 pr-9 text-sm text-foreground shadow-xs transition-[color,box-shadow,border-color] outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/15 focus-visible:outline-none",
    searchClear:
      "absolute right-2.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
    filters:
      "flex flex-wrap items-center gap-1.5 rounded-lg bg-surface p-1",
    filterChip:
      "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-xs font-semibold text-muted-foreground transition-all duration-150 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
    filterChipActive:
      "bg-card text-foreground shadow-xs ring-1 ring-border",
    sortWrap: "relative flex items-center",
    sortSelect:
      "h-10 w-full appearance-none rounded-lg border border-input bg-background pl-3.5 pr-9 text-sm font-medium text-foreground shadow-xs outline-none transition-[color,box-shadow,border-color] focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/15 focus-visible:outline-none sm:w-auto",
    sortIcon:
      "pointer-events-none absolute right-3 size-4 text-muted-foreground",
    resultCount:
      "text-xs font-medium tabular-nums text-muted-foreground",
  },

  /* ---- Product grid --------------------------------------------------- */
  grid: {
    root: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4",
    skeleton: "h-[19rem] rounded-xl",
  },

  /* ---- Product card --------------------------------------------------- */
  card: {
    root:
      "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card text-left shadow-xs transition-[transform,box-shadow,border-color] duration-200 ease-out outline-none hover:-translate-y-0.5 hover:border-border hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 hover-safe-lift",
    rail: "absolute inset-y-0 left-0 w-[3px] transition-[width] duration-200 group-hover:w-[4px]",
    body: "flex h-full flex-col gap-5 p-5 pl-6",
    header: "flex items-start justify-between gap-3",
    titleBlock: "flex min-w-0 flex-col gap-2",
    category:
      "inline-flex w-fit items-center rounded-sm bg-surface px-2 py-1 text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground ring-1 ring-inset ring-border/70",
    name:
      "text-lg font-semibold leading-snug tracking-[-0.015em] text-foreground transition-colors duration-200 group-hover:text-primary",
    flaggedRow: "flex items-center gap-1.5 text-2xs font-semibold text-primary",
    ratingRow: "flex items-center gap-1.5",
    star: "size-4 fill-warning text-warning",
    starEmpty: "size-4 fill-border text-border",
    ratingValue:
      "text-base font-semibold tabular-nums tracking-[-0.01em] text-foreground",
    ratingOutOf: "text-xs font-medium text-muted-foreground",
    metrics:
      "grid grid-cols-2 gap-4 rounded-lg border border-border/70 bg-surface/60 px-4 py-3.5",
    metricLabel:
      "text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground",
    metricValue:
      "mt-1 text-xl font-semibold tabular-nums tracking-[-0.02em] text-foreground",
    meterWrap: "flex flex-col gap-2",
    meterHead: "flex items-center justify-between gap-2",
    meterLabel: "text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground",
    meterValue: "text-xs font-semibold tabular-nums text-foreground",
    meterTrack:
      "block h-1.5 w-full overflow-hidden rounded-full bg-border/80",
    meterFill:
      "block h-full rounded-full transition-[width] duration-500 ease-out",
    footer:
      "mt-auto flex items-center justify-between gap-2 border-t border-border/70 pt-3.5",
    topIssue:
      "flex min-w-0 items-center gap-1.5 text-xs font-medium text-muted-foreground",
    topIssueValue:
      "truncate font-semibold text-foreground",
    openHint:
      "size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:text-primary group-focus-visible:opacity-100",
  },

  /* ---- Health badge --------------------------------------------------- */
  healthBadge: {
    base: "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-2xs font-semibold ring-1 ring-inset",
    dot: "size-1.5 shrink-0 rounded-full",
  },

  /* ---- Empty / error states ------------------------------------------ */
  state: {
    root:
      "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center",
    icon:
      "flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground ring-1 ring-inset ring-border",
    title: "text-lg font-semibold tracking-[-0.015em] text-foreground",
    body: "max-w-sm text-sm leading-relaxed text-muted-foreground",
  },

  /* ---- Detail page chrome --------------------------------------------- */
  detail: {
    root: "flex flex-col gap-8 sm:gap-10",
    rootCompact: "flex flex-col gap-6",
    /* Full-bleed wrapper. `-mt-*` cancels the shell's top padding so the
       chrome starts flush with the viewport; `-mx-*` makes it edge-to-edge.
       NOTE: this page renders no site header, so the sticky bar pins to
       top-0 (do not reserve header height here). */
    chromeWrap:
      "-mx-5 -mt-8 sm:-mx-8 sm:-mt-10 lg:-mx-10 lg:-mt-12",
    /* Only this compact row is sticky, so the product title scrolls away
       instead of permanently occupying the top of the screen. */
    chromeBar:
      "sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-5 py-3 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-background sm:px-8 lg:px-10",
    /* Title block scrolls normally beneath the pinned bar. */
    chromeBody: "flex flex-col gap-2.5 px-5 pb-7 pt-6 sm:px-8 lg:px-10",
    chromeTop: "flex flex-wrap items-center justify-between gap-3",
    chromeLeft: "flex min-w-0 items-center gap-2",
    backBtn:
      "h-8 shrink-0 gap-1.5 px-2 text-xs font-semibold text-muted-foreground",
    divider: "hidden h-4 w-px shrink-0 bg-border md:block",
    breadcrumb:
      "hidden min-w-0 items-center gap-1.5 text-xs text-muted-foreground md:flex",
    breadcrumbCurrent: "truncate font-semibold text-foreground",
    chromeActions: "flex shrink-0 items-center gap-2",
    flagBtn: "h-8 gap-1.5 px-3 text-xs font-semibold shadow-xs",
    titleBlock: "flex min-w-0 flex-col gap-2.5",
    titleRow: "flex flex-wrap items-center gap-3",
    category:
      "inline-flex w-fit items-center rounded-sm bg-primary/10 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-primary ring-1 ring-inset ring-primary/20",
    productTitle:
      "font-display text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl",
    productMeta:
      "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
    errorBox:
      "flex items-start gap-3 rounded-lg border border-danger/25 bg-danger-surface px-4 py-3.5 text-sm leading-relaxed text-danger",

    /* layout blocks */
    statsGrid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
    twoColGrid: "grid gap-4 sm:gap-5 lg:grid-cols-2",

    /* stat card */
    statCard:
      "group flex flex-col gap-3 rounded-xl border border-border/80 bg-card px-5 py-4 shadow-xs transition-shadow duration-200 hover:shadow-sm",
    statHead: "flex items-center gap-2.5",
    statIcon:
      "flex size-8 shrink-0 items-center justify-center rounded-md bg-surface text-muted-foreground ring-1 ring-inset ring-border/70",
    statLabel:
      "text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground",
    statValue:
      "font-heading text-2xl font-semibold tabular-nums tracking-[-0.02em] text-foreground",
    statHint: "text-xs leading-snug text-muted-foreground",

    /* generic section card */
    sectionCard:
      "rounded-xl border border-border/80 bg-card shadow-xs",
    sectionHeader:
      "flex flex-row items-start justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-6 sm:py-5",
    sectionTitleWrap: "flex flex-col gap-1",
    sectionTitle:
      "text-base font-semibold tracking-[-0.015em] text-foreground sm:text-lg",
    sectionDesc: "text-sm leading-snug text-muted-foreground",
    sectionBody: "px-5 py-5 sm:px-6 sm:py-6",
    emptyText: "text-sm leading-relaxed text-muted-foreground",

    /* complaint bars */
    barList: "flex flex-col gap-4",
    barRow: "flex flex-col gap-2",
    barHead: "flex items-baseline justify-between gap-3",
    barLabel:
      "min-w-0 truncate text-sm font-medium text-foreground",
    barCount:
      "shrink-0 text-xs font-semibold tabular-nums text-muted-foreground",
    barTrack: "h-2 w-full overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-border/60",
    barFill: "h-full rounded-full transition-[width] duration-700 ease-out",

    /* sentiment tiles */
    sentimentGrid: "grid grid-cols-3 gap-3",
    sentimentTile:
      "flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-5 text-center",

    /* AI blocks */
    aiCard:
      "relative overflow-hidden rounded-xl border border-primary/20 bg-card shadow-xs",
    aiGlow:
      "pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl",
    actionCard:
      "relative overflow-hidden rounded-xl border border-warning/25 bg-card shadow-xs",
    actionGlow:
      "pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-warning/12 blur-3xl",
    aiIcon:
      "flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-inset ring-primary/15",
    actionIcon:
      "flex size-9 shrink-0 items-center justify-center rounded-md bg-warning/15 text-warning ring-1 ring-inset ring-warning/20",
    aiText:
      "text-base leading-[1.7] text-pretty text-foreground",
    actionBox:
      "flex items-start gap-3 rounded-lg bg-warning-surface/60 px-4 py-4 ring-1 ring-inset ring-warning/20",
    actionText:
      "text-base leading-[1.7] text-pretty text-foreground",
  },

  /* ---- Loading -------------------------------------------------------- */
  loader: {
    root: "flex flex-col gap-4",
    grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4",
    card: "flex h-[19rem] flex-col gap-5 rounded-xl border border-border/80 bg-card p-5 pl-6",
    line: "rounded-sm",
    lineLg: "h-6 w-3/4",
    lineMd: "h-4 w-1/2",
    lineSm: "h-3 w-2/3",
    block: "h-[4.5rem] w-full rounded-lg",
    footerLine: "h-8 w-full",
  },
} as const;

/* ==========================================================================
   HEALTH STATUS MAPPING
   ========================================================================== */

export type HealthTone = {
  /** 3px rail on the left edge of a card */
  rail: string;
  /** 1.5px dot inside the badge */
  dot: string;
  /** Tinted pill background + text for the badge */
  badge: string;
  /** Inset ring around the badge */
  ring: string;
  /** Solid fill for meters/bars */
  fill: string;
  /** Low-intensity wash for empty states etc. */
  surface: string;
};

const HEALTH_TONE: Record<HealthStatus, HealthTone> = {
  critical: {
    rail: "bg-danger",
    dot: "bg-danger",
    badge: "bg-danger-surface text-danger",
    ring: "ring-danger/25",
    fill: "bg-danger",
    surface: "bg-danger-surface",
  },
  needs_attention: {
    rail: "bg-warning",
    dot: "bg-warning",
    badge: "bg-warning-surface text-warning",
    ring: "ring-warning/30",
    fill: "bg-warning",
    surface: "bg-warning-surface",
  },
  healthy: {
    rail: "bg-success",
    dot: "bg-success",
    badge: "bg-success-surface text-success",
    ring: "ring-success/25",
    fill: "bg-success",
    surface: "bg-success-surface",
  },
  insufficient_data: {
    rail: "bg-border",
    dot: "bg-muted-foreground/50",
    badge: "bg-surface text-muted-foreground",
    ring: "ring-border",
    fill: "bg-muted-foreground/40",
    surface: "bg-surface",
  },
};

export function healthTone(status: HealthStatus): HealthTone {
  return HEALTH_TONE[status];
}

/* ==========================================================================
   SENTIMENT MAPPING
   ========================================================================== */

const SENTIMENT_TONE: Record<string, { tile: string; fill: string; text: string }> = {
  positive: {
    tile: "border-success/25 bg-success-surface",
    fill: "bg-success",
    text: "text-success",
  },
  negative: {
    tile: "border-danger/25 bg-danger-surface",
    fill: "bg-danger",
    text: "text-danger",
  },
  neutral: {
    tile: "border-border bg-surface",
    fill: "bg-muted-foreground/50",
    text: "text-muted-foreground",
  },
};

export function sentimentTone(sentiment: string) {
  return SENTIMENT_TONE[sentiment.toLowerCase()] ?? SENTIMENT_TONE.neutral;
}

export function sentimentClass(sentiment: string): string {
  return sentimentTone(sentiment).tile;
}

export function sentimentFill(sentiment: string): string {
  return sentimentTone(sentiment).fill;
}

export function sentimentText(sentiment: string): string {
  return sentimentTone(sentiment).text;
}

/* ==========================================================================
   HIGHLIGHTED REVIEW TONES
   ========================================================================== */

export type HighlightTone = keyof typeof HIGHLIGHT;

const HIGHLIGHT = {
  positive: {
    card: "relative overflow-hidden rounded-xl border border-success/25 bg-card shadow-xs",
    glow: "pointer-events-none absolute -left-16 -top-20 size-56 rounded-full bg-success/10 blur-3xl",
    header: "flex items-center gap-3 border-b border-success/20 bg-success-surface/50 px-5 py-4 sm:px-6",
    icon: "flex size-9 shrink-0 items-center justify-center rounded-md bg-success text-success-foreground shadow-sm",
    title: "text-base font-semibold tracking-[-0.015em] text-foreground",
    subtitle: "text-xs leading-snug text-success",
    quote:
      "font-display text-lg leading-[1.6] tracking-[-0.015em] text-pretty text-foreground sm:text-xl",
    starEmpty: "size-4 fill-border text-border",
    starFilled: "size-4 fill-warning text-warning",
    rating: "ml-2 text-sm font-semibold tabular-nums text-foreground",
    badge: "border-success/30 bg-success-surface text-success ring-1 ring-inset",
    label: "Strongest positive signal from customer feedback",
  },
  negative: {
    card: "relative overflow-hidden rounded-xl border border-danger/25 bg-card shadow-xs",
    glow: "pointer-events-none absolute -left-16 -top-20 size-56 rounded-full bg-danger/10 blur-3xl",
    header: "flex items-center gap-3 border-b border-danger/20 bg-danger-surface/50 px-5 py-4 sm:px-6",
    icon: "flex size-9 shrink-0 items-center justify-center rounded-md bg-danger text-danger-foreground shadow-sm",
    title: "text-base font-semibold tracking-[-0.015em] text-foreground",
    subtitle: "text-xs leading-snug text-danger",
    quote:
      "font-display text-lg leading-[1.6] tracking-[-0.015em] text-pretty text-foreground sm:text-xl",
    starEmpty: "size-4 fill-border text-border",
    starFilled: "size-4 fill-warning text-warning",
    rating: "ml-2 text-sm font-semibold tabular-nums text-foreground",
    badge: "border-danger/30 bg-danger-surface text-danger ring-1 ring-inset",
    label: "Strongest negative signal from customer feedback",
  },
} as const;

export function highlightTone(sentiment: string): HighlightTone {
  return sentiment === "positive" ? "positive" : "negative";
}

export const highlightStyles = HIGHLIGHT;

/* ==========================================================================
   FORMATTING HELPERS
   ========================================================================== */

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number | null): string {
  return value == null ? "—" : `${value.toFixed(0)}%`;
}

export function formatRating(value: number | null): string {
  return value == null ? "—" : value.toFixed(1);
}
