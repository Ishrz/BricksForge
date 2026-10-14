# BricksForge

A full-stack **product review health dashboard**. BricksForge reads enriched customer
review data from Databricks (Lakehouse), computes product "health" signals
(rating, negative-sentiment %, top complaints), generates AI summaries via the
Databricks `ai_gen()` function, and stores user flag states in a Postgres-based
Lakebase database. A React SPA surfaces all of this to product managers.

```
BricksForge/
├── Backend/     Express + TypeScript REST API (port 4000)
├── Frontend/    React 19 + Vite + Tailwind CSS 4 SPA (port 5173)
├── projectDetails.txt
└── README.md
```

## Tech stack

**Backend**
- Node.js (ESM) · TypeScript · Express 5
- Databricks SQL Warehouse (`@databricks/sql`)
- Lakebase / Postgres (`pg`, SSL `verify-full`)
- Zod for env validation, `cors`, `morgan`, `dotenv`

**Frontend**
- React 19 · React Router 7 · Vite 8 · Tailwind CSS 4
- shadcn-style UI primitives (CVA, Base UI), lucide-react, `@remixicon/react`
- oxlint for linting, `@/*` → `src/*` path alias

## Getting started

### Prerequisites
- Node.js 18+
- A Databricks workspace with a SQL warehouse and the `Bricksforge` catalog
- A Lakebase (Postgres) instance for flag state

### Backend

```bash
cd Backend
npm install
npm run dev          # tsx watch ./src/index.ts  →  http://localhost:4000
```

Create `Backend/.env`:

```bash
PORT=4000
DATABRICKS_TOKEN=<your-token>
DATABRICKS_HOST=https://<workspace>.cloud.databricks.com
DATABRICKS_SERVER_HOSTNAME=<workspace-hostname>
DATABRICKS_HTTP_PATH=BricksForge
DATABRICKS_CATALOG=Bricksforge
DATABASE_URL=postgres://user:pass@host/db?sslmode=verify-full
```

### Frontend

```bash
cd Frontend
npm install
npm run dev          # vite → http://localhost:5173
npm run build        # tsc -b && vite build
npm run lint         # oxlint
npm run preview      # vite preview
```

The Vite dev server proxies `/api` to `http://localhost:4000`.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Liveness + service status (`databricks`, `lakebase`) |
| GET | `/api/products` | Product list with metrics, health, top complaint, flag state |
| GET | `/api/products/:productId` | Full detail: metrics, sentiment, categories, AI brief |
| PUT | `/api/products/:productId/flag` | Body `{ "flagged": boolean }` — upsert flag in Lakebase |

### Product detail response

```json
{
  "productId": "...",
  "name": "...",
  "category": "...",
  "metrics": { "reviewCount": 0, "avgRating": 0, "negativePct": 0 },
  "health": { "status": "healthy", "label": "Healthy" },
  "flagged": false,
  "summary": "...",
  "nextStep": "...",
  "highlightReview": { "...": "..." },
  "topComplaint": "...",
  "topCategories": [],
  "sentimentBreakdown": []
}
```

## Health rules

Defined in `Backend/src/health/rule.ts`, evaluated in order:

| Status | Condition | Label |
| --- | --- | --- |
| `insufficient_data` | `reviewCount < 5` | Insufficient Data |
| `critical` | `avgRating < 2.5` **or** `negativePct > 40` | Critical |
| `needs_attention` | `avgRating < 3.5` **or** `negativePct > 25` | Needs Attention |
| `healthy` | otherwise | Healthy |

## Data sources

**Databricks catalog** (`DATABRICKS_CATALOG`, default `Bricksforge`)

| Table | Columns |
| --- | --- |
| `<catalog>.core.products` | `product_id`, `name`, `category` |
| `<catalog>.core.reviews` | `review_id`, `product_id`, `text`, `rating` |
| `<catalog>.core.enriched_reviews` | `review_id`, `product_id`, `sentiment`, `complaint_category` |

**Lakebase (Postgres)**

| Table | Columns |
| --- | --- |
| `product_flags` | `product_id` (PK), `flagged`, `updated_at` |

## Frontend routes

| Route | Page |
| --- | --- |
| `/` | `ProductsPage` — product grid with health badges |
| `/products/:productId` | `ProductDetailsPage` — detail view + AI brief |
| `*` | redirects to `/` |

## Project structure

```
Backend/src/
├── index.ts                  Express bootstrap, router mounting
├── config.ts                 .env loading + Zod validation
├── databricks/sql.ts         DBSQLClient singleton, queryDatabricks<T>()
├── db/lakebase.ts            pg Pool + pingLakebase()
├── routes/
│   ├── health.route.ts
│   └── product.route.ts
├── health/rule.ts            computeHealthStatus() / healthLabel()
├── services/
│   ├── flags.ts              Lakebase product_flags CRUD
│   └── brief.ts              AI summary + next step via ai_gen()
└── utils/complaintCategory.ts

Frontend/src/
├── main.tsx, App.tsx         Router setup
├── pages/                    ProductsPage, ProductDetailsPage
├── components/
│   ├── layout/               AppShell, AppHeader
│   ├── products/             ProductsPanel, ProductsGrid, ProductCard, HealthBadge
│   ├── product/              ProductPanel, ProductDetailsView, DetailChrome,
│   │                         HighlightReview, ProductPageLoader
│   └── ui/                   badge, button, card, section, skeleton
├── hooks/                    useProductsList, useProductDetail
├── lib/api.ts                Typed API client
└── styles/style.ts           Shared style-class map
```

## Notes

- SQL in `product.route.ts` interpolates `productId` into query strings; consider
  parameterizing before production use.
- `getFlaggedProductIds()` in `services/flags.ts` is currently unused — the products
  list endpoint hardcodes `flagged: false`.
- `Backend`'s `npm start` script is broken (`./src/index.tx` typo); use `npm run dev`.
- Neither package currently has a test suite.