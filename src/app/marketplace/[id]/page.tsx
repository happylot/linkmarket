import { notFound } from "next/navigation";
import { listings } from "@/lib/data";
import OrderForm from "@/components/OrderForm";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = listings.find((l) => l.id === id);
  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{listing.domain}</h1>
            {listing.verified && (
              <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-medium text-cyan-300">
                Verified
              </span>
            )}
          </div>
          <p className="mt-1 text-slate-400">
            Published by {listing.publisherName} · {listing.country} · {listing.language}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {listing.niche.map((n) => (
              <span key={n} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                {n}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Metric label="Domain Authority" value={listing.domainAuthority} />
            <Metric label="Organic Traffic" value={`${(listing.organicTraffic / 1000).toFixed(0)}k/mo`} />
            <Metric label="Spam Score" value={listing.spamScore} />
            <Metric label="Turnaround" value={`${listing.turnaroundDays} days`} />
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-semibold text-white">Listing details</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <Row label="Link type" value={listing.linkType} />
              <Row label="Rating" value={`★ ${listing.rating} (${listing.reviewCount} reviews)`} />
              <Row label="Content options" value={listing.contentOptions.join(", ")} />
              <Row
                label="Sample placement"
                value={
                  <a href={listing.sampleUrl} target="_blank" rel="noreferrer" className="text-violet-300 hover:underline">
                    View sample
                  </a>
                }
              />
            </dl>
          </div>
        </div>

        <OrderForm listing={listing} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-slate-200">{value}</dd>
    </div>
  );
}
