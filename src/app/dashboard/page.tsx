"use client";

import Link from "next/link";
import { useOrders } from "@/lib/orders-context";

const statusStyles: Record<string, string> = {
  "Pending Review": "bg-amber-500/15 text-amber-300",
  "In Progress": "bg-cyan-500/15 text-cyan-300",
  Published: "bg-emerald-500/15 text-emerald-300",
  "Revision Requested": "bg-rose-500/15 text-rose-300",
};

export default function DashboardPage() {
  const { orders } = useOrders();

  const totalSpend = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Your orders</h1>
          <p className="mt-2 text-slate-400">{orders.length} orders · ${totalSpend} spent</p>
        </div>
        <Link
          href="/marketplace"
          className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950"
        >
          Place a new order
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <p className="text-slate-300">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/marketplace"
            className="mt-4 inline-block rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Browse the marketplace
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">Domain</th>
                <th className="px-5 py-3">Brief</th>
                <th className="px-5 py-3">Content option</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Placed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {orders.map((o) => (
                <tr key={o.id} className="bg-white/[0.01] hover:bg-white/[0.04]">
                  <td className="px-5 py-4 font-medium text-white">{o.domain}</td>
                  <td className="px-5 py-4 text-slate-300">{o.briefTitle}</td>
                  <td className="px-5 py-4 text-slate-400">{o.contentOption}</td>
                  <td className="px-5 py-4 text-slate-200">${o.price}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
