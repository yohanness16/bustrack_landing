"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm text-[var(--fg-primary)]">BT</span>
            <span className="text-[var(--fg-tertiary)]">—</span>
            <span className="text-sm text-[var(--fg-secondary)]">BusTrack Transit Intelligence</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-[var(--fg-tertiary)]">
            <a href="#how-it-works" className="hover:text-[var(--fg-primary)] transition-colors">How It Works</a>
            <a href="#dashboard" className="hover:text-[var(--fg-primary)] transition-colors">Demo</a>
            <a href="#" className="hover:text-[var(--fg-primary)] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[var(--fg-primary)] transition-colors">Contact</a>
          </nav>
          <p className="text-xs text-[var(--fg-tertiary)]">© 2026 BusTrack</p>
        </div>
      </div>
    </footer>
  );
}
