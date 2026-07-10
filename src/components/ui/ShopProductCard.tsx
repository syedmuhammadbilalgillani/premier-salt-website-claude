import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { ShopProduct } from "@/data/shopProducts";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export function ShopProductCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const inStock = product.stock > 0;

  return (
    <div className="group flex flex-col">
      <div className="relative">
        <Link to={`/shop/product/${product.slug}`}>
          <ImagePlaceholder label={product.name} width={600} height={600} />
        </Link>
        <button
          aria-label={has(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.slug)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
        >
          <Heart className={`h-4 w-4 ${has(product.slug) ? "fill-terracotta text-terracotta" : "text-charcoal"}`} />
        </button>
        <span
          className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            inStock ? "bg-success/90 text-white" : "bg-error/90 text-white"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <Link to={`/shop/product/${product.slug}`} className="mt-3 text-sm font-medium text-charcoal hover:text-terracotta">
        {product.name}
      </Link>
      <span className="text-xs text-muted">{product.category}</span>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-serif text-lg text-maroon">PKR {product.price.toLocaleString()}</span>
        {product.previousPrice && (
          <span className="text-xs text-muted line-through">PKR {product.previousPrice.toLocaleString()}</span>
        )}
      </div>
      <button
        disabled={!inStock}
        onClick={() => addItem(product.slug, 1)}
        className="mt-3 rounded-sm border border-terracotta py-2 text-xs font-semibold uppercase tracking-wide text-terracotta transition-colors hover:bg-terracotta hover:text-cream disabled:cursor-not-allowed disabled:border-border disabled:text-muted disabled:hover:bg-transparent"
      >
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
