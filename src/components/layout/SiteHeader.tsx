import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, Mail, Search, Heart, User, ShoppingBag, X, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/ui/nav-link";
import { mainNavigation, headerCtas, retailNavigation } from "@/data/navigation";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-maroon text-cream/90 md:block">
        <div className="mx-auto flex max-w-(--container-page) items-center justify-between px-8 py-2 text-xs">
          <div className="flex items-center gap-5">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-cream">
              <Phone className="h-3.5 w-3.5" /> {company.phone}
            </a>
            <a href={`mailto:${company.emails.sales}`} className="flex items-center gap-1.5 hover:text-cream">
              <Mail className="h-3.5 w-3.5" /> {company.emails.sales}
            </a>
            <span className="text-cream/70">Export &amp; Wholesale Enquiries</span>
          </div>
          <div className="flex items-center gap-4 text-cream/70">
            <span>Currency: PKR</span>
            <span>Delivering across Pakistan</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled ? "border-border bg-cream/95 backdrop-blur-sm" : "border-transparent bg-cream",
        )}
      >
        <div className="mx-auto flex max-w-(--container-page) items-center justify-between px-6 py-4 md:px-8">
          <Link to="/" className="font-serif text-2xl font-semibold tracking-wide text-maroon">
            Premier Salt
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {mainNavigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => (item.dropdown || item.megaMenu) && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.to && !item.dropdown && !item.megaMenu ? (
                  <NavLink
                    to={item.to}
                    className="text-sm font-medium text-charcoal transition-colors hover:text-terracotta"
                    activeClassName="text-terracotta"
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-terracotta"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                )}

                {item.dropdown && openDropdown === item.label && (
                  <div className="absolute left-0 top-full min-w-56 rounded-sm border border-border bg-white py-2 shadow-lg">
                    {item.dropdown.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block px-4 py-2 text-sm text-charcoal hover:bg-cream hover:text-terracotta"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}

                {item.megaMenu && openDropdown === item.label && (
                  <div className="absolute left-1/2 top-full grid w-[720px] -translate-x-1/2 grid-cols-3 gap-6 rounded-sm border border-border bg-white p-6 shadow-xl">
                    {item.megaMenu.map((group) => (
                      <div key={group.label}>
                        <Link
                          to={group.to ?? "#"}
                          className="mb-2 block text-sm font-semibold text-maroon hover:text-terracotta"
                        >
                          {group.label}
                        </Link>
                        <ul className="flex flex-col gap-1.5">
                          {group.links.map((link) => (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                className="text-sm text-muted hover:text-terracotta"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to={headerCtas[0].to}
              className="hidden rounded-sm border border-terracotta px-4 py-2 text-xs font-semibold uppercase tracking-wide text-terracotta hover:bg-terracotta hover:text-cream md:inline-block"
            >
              {headerCtas[0].label}
            </Link>
            <Link
              to={headerCtas[1].to}
              className="hidden rounded-sm bg-terracotta px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream hover:bg-maroon md:inline-block"
            >
              {headerCtas[1].label}
            </Link>

            <div className="hidden items-center gap-4 border-l border-border pl-4 lg:flex">
              <Link to={retailNavigation[0].to} aria-label="Search"><Search className="h-4.5 w-4.5 text-charcoal hover:text-terracotta" /></Link>
              <Link to={retailNavigation[1].to} aria-label="Wishlist"><Heart className="h-4.5 w-4.5 text-charcoal hover:text-terracotta" /></Link>
              <Link to={retailNavigation[2].to} aria-label="Account"><User className="h-4.5 w-4.5 text-charcoal hover:text-terracotta" /></Link>
              <Link to={retailNavigation[3].to} aria-label="Cart" className="relative">
                <ShoppingBag className="h-4.5 w-4.5 text-charcoal hover:text-terracotta" />
              </Link>
            </div>

            <button
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6 text-charcoal" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-cream p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif text-xl text-maroon">Premier Salt</span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6 text-charcoal" />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {mainNavigation.map((item) => {
                const hasChildren = Boolean(item.dropdown || item.megaMenu);
                const flatLinks =
                  item.dropdown ??
                  item.megaMenu?.flatMap((g) => [{ label: g.label, to: g.to ?? "#" }, ...g.links]) ??
                  [];
                return (
                  <div key={item.label} className="border-b border-border py-2">
                    <button
                      className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-charcoal"
                      onClick={() =>
                        hasChildren
                          ? setMobileGroup(mobileGroup === item.label ? null : item.label)
                          : setMobileOpen(false)
                      }
                    >
                      {item.to && !hasChildren ? (
                        <Link to={item.to} onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                      ) : (
                        item.label
                      )}
                      {hasChildren && (
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", mobileGroup === item.label && "rotate-180")}
                        />
                      )}
                    </button>
                    {hasChildren && mobileGroup === item.label && (
                      <div className="flex flex-col gap-1 pb-2 pl-3">
                        {flatLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="py-1.5 text-sm text-muted hover:text-terracotta"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to={headerCtas[0].to}
                onClick={() => setMobileOpen(false)}
                className="rounded-sm border border-terracotta px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-terracotta"
              >
                {headerCtas[0].label}
              </Link>
              <Link
                to={headerCtas[1].to}
                onClick={() => setMobileOpen(false)}
                className="rounded-sm bg-terracotta px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-cream"
              >
                {headerCtas[1].label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
