import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="font-serif text-4xl text-maroon">Page Not Found</h1>
      <p className="text-muted">
        The page you're looking for may have moved. Try searching, or head back to one of our main sections below.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search?q=${encodeURIComponent(q)}`);
        }}
        className="flex w-full gap-2"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Premier Salt…"
          className="flex-1 rounded-sm border border-border px-4 py-2.5 text-sm focus-visible:outline-terracotta"
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/"><Button variant="outline">Homepage</Button></Link>
        <Link to="/products"><Button variant="outline">Products</Button></Link>
        <Link to="/shop"><Button variant="outline">Shop</Button></Link>
      </div>
    </div>
  );
}
