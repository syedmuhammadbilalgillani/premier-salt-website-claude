import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqGroups } from "@/data/faqs";

export default function FAQ() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return faqGroups;
    const q = query.toLowerCase();
    return faqGroups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <>
      <PageHero eyebrow="Resources" title="Frequently Asked Questions" description="Answers to common questions about our company, products, wholesale, export, and retail orders." crumbs={[{ label: "FAQ" }]} />
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          className="mb-10 w-full rounded-sm border border-border bg-white px-4 py-3 text-sm focus-visible:outline-terracotta"
        />
        {filtered.length === 0 ? (
          <p className="text-muted">No questions match your search.</p>
        ) : (
          <div className="flex flex-col gap-12">
            {filtered.map((group) => (
              <div key={group.group}>
                <h2 className="mb-5 font-serif text-2xl text-maroon">{group.group}</h2>
                <FAQAccordion items={group.items} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
