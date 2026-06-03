"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <div className="cta-content text-center">
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)]">
              <span className="w-10 h-px bg-[var(--accent)]" />
              Download
              <span className="w-10 h-px bg-[var(--accent)]" />
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--fg-primary)] leading-[1.1] mb-6">
            Get BusTrack on your<br />
            <span className="text-[var(--fg-tertiary)] font-normal">phone or desktop.</span>
          </h2>
          <p className="text-lg text-[var(--fg-secondary)] max-w-lg mx-auto mb-12 leading-relaxed">
            Available on iOS, Android, and as a web dashboard. Start tracking your fleet in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-[var(--fg-primary)] text-[var(--bg)] font-semibold text-base rounded-full hover:bg-[var(--fg-secondary)] transition-colors duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download for iOS
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2.5 px-10 py-4 border border-[var(--border)] text-[var(--fg-primary)] font-medium text-base rounded-full hover:border-[var(--fg-tertiary)] transition-colors duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download for Android
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--fg-tertiary)]">
            <span>macOS</span><span className="w-1 h-1 rounded-full bg-[var(--border)]" /><span>Windows</span><span className="w-1 h-1 rounded-full bg-[var(--border)]" /><span>Web</span>
          </div>
        </div>
      </div>
    </section>
  );
}
