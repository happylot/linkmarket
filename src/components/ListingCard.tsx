import Link from "next/link";
import { Listing } from "@/lib/types";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-400/40 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{listing.domain}</p>
          <p className="mt-1 text-xs text-slate-400">{listing.publisherName}</p>
        </div>
        {listing.verified && (
          <span className="shrink-0 rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
            Verified
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {listing.niche.map((n) => (
          <span key={n} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
            {n}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-white/5 py-2">
          <p className="text-sm font-bold text-white">{listing.domainAuthority}</p>
          <p className="text-[10px] text-slate-400">DA</p>
        </div>
        <div className="rounded-lg bg-white/5 py-2">
          <p className="text-sm font-bold text-white">{(listing.organicTraffic / 1000).toFixed(0)}k</p>
          <p className="text-[10px] text-slate-400">Traffic</p>
        </div>
        <div className="rounded-lg bg-white/5 py-2">
          <p className="text-sm font-bold text-white">{listing.turnaroundDays}d</p>
          <p className="text-[10px] text-slate-400">Turnaround</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-1 text-sm text-amber-300">
          ★ <span className="text-slate-300">{listing.rating}</span>
          <span className="text-slate-500">({listing.reviewCount})</span>
        </div>
        <p className="text-lg font-bold text-white">${listing.price}</p>
      </div>
    </Link>
  );
}
