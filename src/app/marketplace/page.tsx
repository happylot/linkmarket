"use client";

import { useMemo, useState } from "react";
import { listings, niches } from "@/lib/data";
import ListingCard from "@/components/ListingCard";

type SortKey = "relevance" | "price-asc" | "price-desc" | "da-desc";

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(400);
  const [minDA, setMinDA] = useState(0);
  const [sort, setSort] = useState<SortKey>("relevance");

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      const matchesQuery =
        query.trim().length === 0 ||
        l.domain.toLowerCase().includes(query.toLowerCase()) ||
        l.publisherName.toLowerCase().includes(query.toLowerCase());
      const matchesNiche = niche === "All" || l.niche.includes(niche as never);
      const matchesPrice = l.price <= maxPrice;
      const matchesDA = l.domainAuthority >= minDA;
      return matchesQuery && matchesNiche && matchesPrice && matchesDA;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "da-desc") result = [...result].sort((a, b) => b.domainAuthority - a.domainAuthority);

    return result;
  }, [query, niche, maxPrice, minDA, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Marketplace</h1>
        <p className="mt-2 text-slate-400">{filtered.length} publisher sites match your filters</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:h-fit">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Domain or publisher..."
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white focus:border-violet-400 focus:outline-none"
            >
              <option>All</option>
              {niches.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Max price: ${maxPrice}
            </label>
            <input
              type="range"
              min={50}
              max={400}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Min DA: {minDA}
            </label>
            <input
              type="range"
              min={0}
              max={70}
              step={5}
              value={minDA}
              onChange={(e) => setMinDA(Number(e.target.value))}
              className="mt-2 w-full accent-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sort by</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white focus:border-violet-400 focus:outline-none"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="da-desc">Domain authority: high to low</option>
            </select>
          </div>
        </aside>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center text-slate-400">
              No listings match your filters. Try widening your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
