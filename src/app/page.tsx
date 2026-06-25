import Link from "next/link";
import { listings } from "@/lib/data";

const stats = [
  { label: "Vetted publishers", value: "3,200+" },
  { label: "Niches covered", value: "40+" },
  { label: "Orders delivered", value: "58,000+" },
  { label: "Avg. turnaround", value: "4.2 days" },
];

const steps = [
  {
    title: "Search & filter",
    body: "Browse thousands of publisher sites filtered by niche, authority, traffic, and price.",
  },
  {
    title: "Place your order",
    body: "Submit your brief, target URL, and anchor text — or let the publisher write it for you.",
  },
  {
    title: "Track & approve",
    body: "Follow progress in your dashboard and approve the final placement before it goes live.",
  },
];

export default function Home() {
  const featured = listings.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),_transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="inline-block rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1 text-xs font-medium text-violet-300">
            The marketplace for backlinks & content sourcing
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Source backlinks & content from
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              real, vetted publishers
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            One marketplace to discover sites, place orders, manage briefs, and track every
            placement — without the back-and-forth emails.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/marketplace"
              className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-violet-500/30 transition hover:opacity-90"
            >
              Browse the marketplace
            </Link>
            <a
              href="#how-it-works"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Featured listings</h2>
            <p className="mt-2 text-slate-400">A snapshot of publishers ready to take your order.</p>
          </div>
          <Link href="/marketplace" className="hidden text-sm font-semibold text-violet-300 hover:text-violet-200 sm:block">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((l) => (
            <Link
              key={l.id}
              href={`/marketplace/${l.id}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-white">{l.domain}</p>
                {l.verified && (
                  <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400">{l.niche.join(" · ")}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-400">DA {l.domainAuthority}</span>
                <span className="font-bold text-white">${l.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-t border-white/10 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">How it works</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/50 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-slate-950">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to scale your link building?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Join thousands of marketers sourcing content placements from real, vetted sites.
        </p>
        <Link
          href="/marketplace"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-violet-500/30 transition hover:opacity-90"
        >
          Get started for free
        </Link>
      </section>
    </div>
  );
}
