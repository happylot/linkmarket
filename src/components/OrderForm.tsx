"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Listing, ContentOption, Order } from "@/lib/types";
import { useOrders } from "@/lib/orders-context";

export default function OrderForm({ listing }: { listing: Listing }) {
  const router = useRouter();
  const { addOrder } = useOrders();
  const [contentOption, setContentOption] = useState<ContentOption>(listing.contentOptions[0]);
  const [briefTitle, setBriefTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [anchorText, setAnchorText] = useState("");
  const [briefNotes, setBriefNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const extraFee = contentOption === "Written by us (+fee)" ? 45 : 0;
  const total = listing.price + extraFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      id: `${Date.now()}`,
      listingId: listing.id,
      domain: listing.domain,
      price: total,
      contentOption,
      briefTitle,
      briefNotes,
      targetUrl,
      anchorText,
      status: "Pending Review",
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-300">Order placed!</p>
        <p className="mt-2 text-sm text-slate-300">
          Your order for {listing.domain} has been sent to the dashboard for tracking.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-2 text-sm font-semibold text-slate-950"
        >
          Go to dashboard
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <p className="text-sm text-slate-400">Place an order</p>
      <p className="mt-1 text-3xl font-bold text-white">${total}</p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Content option
          </label>
          <select
            value={contentOption}
            onChange={(e) => setContentOption(e.target.value as ContentOption)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white focus:border-violet-400 focus:outline-none"
          >
            {listing.contentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Brief title
          </label>
          <input
            required
            value={briefTitle}
            onChange={(e) => setBriefTitle(e.target.value)}
            placeholder="e.g. Best project management tools 2026"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Target URL
          </label>
          <input
            required
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://yoursite.com/page"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Anchor text
          </label>
          <input
            required
            value={anchorText}
            onChange={(e) => setAnchorText(e.target.value)}
            placeholder="e.g. project management software"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Notes for publisher
          </label>
          <textarea
            value={briefNotes}
            onChange={(e) => setBriefNotes(e.target.value)}
            rows={3}
            placeholder="Any specific requirements..."
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
      >
        Place order — ${total}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        Turnaround: {listing.turnaroundDays} business days
      </p>
    </form>
  );
}
