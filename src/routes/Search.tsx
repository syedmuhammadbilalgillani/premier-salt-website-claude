import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PageHero } from "@/components/layout/PageHero";
import { b2bPages } from "@/data/b2bPages";
import { shopProducts } from "@/data/shopProducts";
import { blogPosts } from "@/data/blogPosts";

type ResultType = "B2B Category" | "Shop Product" | "Blog Article";

interface Result {
  type: ResultType;
  title: string;
  to: string;
  snippet: string;
}

const typeFilters: ResultType[] = ["B2B Category", "Shop Product", "Blog Article"];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [activeType, setActiveType] = useState<ResultType | "All">("All");

  const results: Result[] = useMemo(() => {
    if (!q) return [];
    const query = q.toLowerCase();
    const categoryResults: Result[] = b2bPages
      .filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
      .map((p) => ({ type: "B2B Category", title: p.name, to: `/${p.slug}`, snippet: p.description }));

    const productResults: Result[] = shopProducts
      .filter((p) => p.name.toLowerCase().includes(query) || p.shortDescription.toLowerCase().includes(query))
      .map((p) => ({ type: "Shop Product", title: p.name, to: `/shop/product/${p.slug}`, snippet: p.shortDescription }));

    const blogResults: Result[] = blogPosts
      .filter((p) => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query))
      .map((p) => ({ type: "Blog Article", title: p.title, to: `/blog/${p.slug}`, snippet: p.excerpt }));

    return [...categoryResults, ...productResults, ...blogResults];
  }, [q]);

  const visible = activeType === "All" ? results : results.filter((r) => r.type === activeType);

  function highlight(text: string) {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-salt-pink-light text-charcoal">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Search" title="Search Premier Salt" crumbs={[{ label: "Search" }]} />
      <div className="mx-auto max-w-(--container-page) px-6 py-16 md:px-8">
        <input
          value={q}
          onChange={(e) => setParams({ q: e.target.value }, { replace: true })}
          placeholder="Search products, categories, articles…"
          className="w-full rounded-sm border border-border bg-white px-4 py-3 text-sm focus-visible:outline-terracotta"
        />

        {q && (
          <>
            <div className="my-6 flex flex-wrap gap-2">
              {(["All", ...typeFilters] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${activeType === t ? "border-terracotta bg-terracotta text-cream" : "border-border text-charcoal"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="mb-6 text-sm text-muted">{visible.length} result{visible.length !== 1 ? "s" : ""} for "{q}"</p>
          </>
        )}

        {q && visible.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-muted">No results found. Try "salt lamp", "pink salt", or "private label".</p>
          </div>
        )}

        <div className="flex flex-col divide-y divide-border">
          {visible.map((r) => (
            <Link key={r.to} to={r.to} className="flex flex-col gap-1 py-5 hover:text-terracotta">
              <span className="text-xs uppercase tracking-wide text-terracotta">{r.type}</span>
              <span className="font-serif text-lg text-charcoal">{highlight(r.title)}</span>
              <span className="text-sm text-muted">{r.snippet}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
