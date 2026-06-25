export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
        <p>© {new Date().getFullYear()} LinkMarket. All rights reserved.</p>
        <p>Built for publishers and brands to connect, transparently.</p>
      </div>
    </footer>
  );
}
