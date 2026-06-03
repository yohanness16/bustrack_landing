"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-sm border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="font-mono font-bold text-sm text-[var(--fg-primary)]">BT</span>
          <span className="text-[var(--fg-tertiary)] hidden sm:inline">—</span>
          <span className="text-sm font-medium text-[var(--fg-secondary)] hidden sm:inline">BusTrack</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--fg-tertiary)]">
          <a href="#how-it-works" className="hover:text-[var(--fg-primary)] transition-colors duration-300">How it works</a>
          <a href="#dashboard" className="hover:text-[var(--fg-primary)] transition-colors duration-300">Demo</a>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--fg-primary)] text-[var(--bg)] font-semibold text-sm rounded-full hover:bg-[var(--fg-secondary)] transition-colors duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
      </div>
    </nav>
  );
}
