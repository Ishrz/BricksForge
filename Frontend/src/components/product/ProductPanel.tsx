import { AlertTriangle } from "lucide-react";
import { s } from "../../styles/style";
import { Button } from "../ui/button";
import { useProductDetail } from "../../hooks/useProductDetail";
import { DetailChrome } from "./DetailChrome";
import { ProductDetailView } from "./ProductDetailsView";
import { ProductPageLoader } from "./ProductPageLoader";

export function ProductPanel({ productId }: { productId: string }) {
  const { product, loading, savingFlag, error, goBack, toggleFlag } =
    useProductDetail(productId);

  if (loading) {
    return (
      <div className={s.detail.root}>
        <DetailChrome title="Loading product…" onBack={goBack} />
        <ProductPageLoader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={s.detail.rootCompact}>
        <DetailChrome title="Product not found" onBack={goBack} />
        <div className={s.detail.errorBox} role="alert">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div className="flex flex-col items-start gap-3">
            <span>{error ?? "This product could not be found."}</span>
            <Button variant="outline" size="sm" onClick={goBack}>
              Back to all products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductDetailView
      product={product}
      savingFlag={savingFlag}
      onBack={goBack}
      onToggleFlag={toggleFlag}
    />
  );
}
