import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 font-bold text-slate-950">
            L
          </span>
          <span className="text-lg font-semibold text-white">LinkMarket</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <Link href="/marketplace" className="transition hover:text-white">
            Marketplace
          </Link>
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/marketplace"
            className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-violet-500/20 transition hover:opacity-90"
          >
            Browse listings
          </Link>
        </div>
      </nav>
    </header>
  );
}
