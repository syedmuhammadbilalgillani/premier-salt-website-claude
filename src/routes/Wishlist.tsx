import { Link } from "react-router-dom";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { ShopProductCard } from "@/components/ui/ShopProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { shopProducts } from "@/data/shopProducts";

export default function Wishlist() {
  const { slugs } = useWishlist();
  const items = shopProducts.filter((p) => slugs.includes(p.slug));

  return (
    <>
      <PageHero eyebrow="Shop" title="Your Wishlist" crumbs={[{ label: "Wishlist" }]} />
      <div className="mx-auto max-w-(--container-page) px-6 py-16 md:px-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-muted">Your wishlist is empty. Save products you're interested in for later.</p>
            <Link to="/shop"><Button>Shop Now</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => <ShopProductCard key={p.slug} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
