import { useLocation, Navigate } from "react-router-dom";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { getPolicy } from "@/data/policies";

export default function PolicyPage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/|\/$/g, "");
  const policy = getPolicy(slug);

  if (!policy) return <Navigate to="/404" replace />;

  return (
    <>
      <PageHero
        eyebrow="Policies"
        title={policy.title}
        description={`Last updated ${new Date(policy.updated).toLocaleDateString()}`}
        crumbs={[{ label: policy.title }]}
      />
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-16 md:px-8">
        {policy.sections.map((section) => (
          <Reveal key={section.heading}>
            <h2 className="mb-3 font-serif text-xl text-maroon">{section.heading}</h2>
            <p className="text-base leading-relaxed text-muted">{section.body}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}
