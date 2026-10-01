export type HealthStatus =
  | "healthy"
  | "needs_attention"
  | "critical"
  | "insufficient_data";

export type ProductSummary = {
  productId: string;
  name: string;
  category: string;
  metrics: {
    reviewCount: number;
    avgRating: number | null;
    negativePct: number | null;
  };
  health: { status: HealthStatus; label: string };
  topComplaint: string | null;
  flagged: boolean;
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error("Request fetch failed");
  }

  return response.json() as Promise<T>;
}


export const api = {
  products: () => fetchJson<{ products: ProductSummary[] }>("/api/products")
};