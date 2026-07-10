import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ShopProductCard } from "@/components/ui/ShopProductCard";
import { shopProducts, shopCategories } from "@/data/shopProducts";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "name", label: "Name" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "featured";
  const q = params.get("q") ?? "";

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  const filtered = useMemo(() => {
    let list = shopProducts.filter((p) => {
      const matchesCategory = !category || p.category === category;
      const matchesQuery = !q || p.name.toLowerCase().includes(q.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    switch (sort) {
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [category, q, sort]);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Shop Himalayan Salt Products"
        description="Retail-quantity Himalayan salt, salt lamps, kitchen products, spa items and gifts, delivered across Pakistan."
        crumbs={[{ label: "Shop" }]}
      />

      <div className="mx-auto grid max-w-(--container-page) grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[240px_1fr] md:px-8">
        <aside className="flex flex-col gap-8">
          <div>
            <label htmlFor="shop-search" className="mb-2 block text-sm font-semibold text-maroon">Search</label>
            <input
              id="shop-search"
              value={q}
              onChange={(e) => updateParam("q", e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-sm border border-border bg-white px-3 py-2 text-sm focus-visible:outline-terracotta"
            />
          </div>
          <div>
            <span className="mb-2 block text-sm font-semibold text-maroon">Category</span>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => updateParam("category", "")}
                className={`text-left text-sm ${!category ? "font-semibold text-terracotta" : "text-charcoal hover:text-terracotta"}`}
              >
                All Products
              </button>
              {shopCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => updateParam("category", c)}
                  className={`text-left text-sm ${category === c ? "font-semibold text-terracotta" : "text-charcoal hover:text-terracotta"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-muted">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted">Sort</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="rounded-sm border border-border bg-white px-3 py-1.5 text-sm"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <p className="font-serif text-xl text-maroon">No products match your filters</p>
              <button
                onClick={() => setParams(new URLSearchParams(), { replace: true })}
                className="text-sm font-semibold text-terracotta hover:text-maroon"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <Reveal stagger className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
              {filtered.map((product) => (
                <ShopProductCard key={product.slug} product={product} />
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </>
  );
}
