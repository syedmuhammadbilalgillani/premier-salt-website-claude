import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { ShopProductCard } from "@/components/ui/ShopProductCard";
import { shopProducts } from "@/data/shopProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { readStorage, writeStorage } from "@/lib/storage";

export default function ProductDetail() {
  const { productSlug } = useParams();
  const product = shopProducts.find((p) => p.slug === productSlug);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);

  if (!product) return <Navigate to="/404" replace />;

  const related = shopProducts.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const inStock = product.stock > 0;

  function handleNotify() {
    if (!notifyEmail || !product) return;
    const list = readStorage<Record<string, string[]>>("premierSalt.recentlyViewed", {});
    writeStorage("premierSalt.recentlyViewed", { ...list, [product.slug]: [...(list[product.slug] ?? []), notifyEmail] });
    setNotifySent(true);
  }

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.shortDescription}
        crumbs={[{ label: "Shop", to: "/shop" }, { label: product.name }]}
      />

      <div className="mx-auto grid max-w-(--container-page) grid-cols-1 gap-14 px-6 py-16 md:grid-cols-2 md:px-8">
        <Reveal>
          <ImagePlaceholder label={`${product.name} — Gallery`} width={800} height={800} />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-5">
          <span className="text-xs uppercase tracking-wide text-muted">SKU {product.sku}</span>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl text-maroon">PKR {product.price.toLocaleString()}</span>
            {product.previousPrice && (
              <span className="text-sm text-muted line-through">PKR {product.previousPrice.toLocaleString()}</span>
            )}
          </div>
          <span className={`w-fit rounded-sm px-2.5 py-1 text-xs font-semibold uppercase ${inStock ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
            {inStock ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </span>
          <p className="text-sm leading-relaxed text-muted">{product.description}</p>

          {inStock ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-border">
                <button className="px-3 py-2 text-lg" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <button className="px-3 py-2 text-lg" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
              </div>
              <Button onClick={() => addItem(product.slug, quantity)} className="flex-1">Add to Cart</Button>
              <button
                aria-label={has(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggle(product.slug)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border"
              >
                <Heart className={`h-4.5 w-4.5 ${has(product.slug) ? "fill-terracotta text-terracotta" : "text-charcoal"}`} />
              </button>
            </div>
          ) : notifySent ? (
            <p className="text-sm text-success">We'll email you at {notifyEmail} when this is back in stock.</p>
          ) : (
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="flex-1 rounded-sm border border-border px-3 py-2 text-sm"
              />
              <Button onClick={handleNotify}>Notify Me</Button>
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5 text-sm">
            <div><span className="font-semibold text-charcoal">Weight/Size: </span><span className="text-muted">{product.weight}</span></div>
            <div><span className="font-semibold text-charcoal">Care instructions: </span><span className="text-muted">{product.careInstructions}</span></div>
            <div><span className="font-semibold text-charcoal">Shipping: </span><span className="text-muted">Flat PKR 250, free on orders over PKR 5,000.</span></div>
            <div><span className="font-semibold text-charcoal">Returns: </span><span className="text-muted">See our <Link to="/returns-refunds" className="text-terracotta hover:underline">Returns &amp; Refunds policy</Link>.</span></div>
          </div>
          <p className="text-sm text-muted">No reviews yet.</p>
          <Link to="/request-a-quote" className="text-sm font-semibold text-terracotta hover:text-maroon">
            Looking for bulk quantity? Request a B2B quote →
          </Link>
        </Reveal>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-(--container-page) px-6 pb-20 md:px-8">
          <h2 className="mb-6 font-serif text-2xl text-maroon">Related Products</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {related.map((p) => (
              <ShopProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
