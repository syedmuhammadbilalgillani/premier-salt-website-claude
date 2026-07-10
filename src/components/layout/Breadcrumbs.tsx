import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <li>
          <Link to="/" className="hover:text-terracotta">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            {item.to && i !== items.length - 1 ? (
              <Link to={item.to} className="hover:text-terracotta">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-charcoal">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
