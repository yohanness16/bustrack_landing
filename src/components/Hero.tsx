"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          titleLine1Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.3"
        )
        .fromTo(
          titleLine2Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.7"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );

      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.85, rotateY: 8 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.4, ease: "power2.out" },
        "-=1.2"
      );

      gsap.to(imageWrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: 100,
        scale: 0.95,
        opacity: 0.4,
      });

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
        rotateY: -4,
        rotateX: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — text content */}
        <div>
          <div ref={tagRef} className="mb-10">
            <span className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)]">
              <span className="w-8 h-px bg-[var(--accent)]" />
              Transit Intelligence Platform
            </span>
          </div>

          <h1 className="[font-size:clamp(3rem,6.5vw,6rem)] leading-[0.92] tracking-tight font-bold mb-8">
            <span ref={titleLine1Ref} className="block text-[var(--fg-primary)]">
              Know where
            </span>
            <span ref={titleLine2Ref} className="block text-[var(--fg-tertiary)] font-normal italic">
              every bus is.
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-[var(--fg-secondary)] max-w-md leading-relaxed mb-10"
          >
            Real-time GPS tracking, crowd density analysis, and route
            optimization for transit operators who refuse to guess.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--fg-primary)] text-[var(--bg)] font-semibold text-base rounded-full hover:bg-[var(--fg-secondary)] transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download App
            </a>
            <a
              href="#dashboard"
              className="inline-flex items-center px-8 py-4 border border-[var(--border)] text-[var(--fg-primary)] font-medium text-base rounded-full hover:border-[var(--fg-tertiary)] transition-colors duration-300"
            >
              View live demo
            </a>
          </div>

          <div ref={metaRef} className="mt-16 flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono font-semibold">2,847</span>
              <span className="text-[var(--fg-tertiary)]">buses</span>
            </div>
            <div className="w-px h-4 bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono font-semibold">156</span>
              <span className="text-[var(--fg-tertiary)]">cities</span>
            </div>
            <div className="w-px h-4 bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono font-semibold">99.7%</span>
              <span className="text-[var(--fg-tertiary)]">uptime</span>
            </div>
          </div>
        </div>

        {/* Right — cinematic image */}
        <div ref={imageWrapRef} className="relative" style={{ perspective: "1200px" }}>
          <div className="absolute -z-10 -top-4 -right-4 sm:-top-6 sm:-right-6 w-full h-full rounded-2xl bg-[var(--accent-muted)]/40 border border-[var(--accent)]/10" />
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden border border-[var(--border)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=80&auto=format&fit=crop"
              alt="City bus on a modern transit route"
              width={1200}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/40 via-transparent to-[var(--accent-muted)]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-auto">
              <div className="inline-flex items-center gap-4 px-4 py-3 rounded-xl bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse" />
                  <span className="text-xs font-medium text-[var(--fg-primary)]">24 buses active</span>
                </div>
                <div className="w-px h-4 bg-[var(--border)]" />
                <span className="text-xs font-mono text-[var(--fg-secondary)]">98% on time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 z-10 flex items-center gap-3">
        <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[var(--fg-tertiary)]">Scroll</span>
        <div className="w-px h-8 bg-[var(--border)] overflow-hidden">
          <div className="w-full h-3 bg-[var(--accent)] animate-[scrollDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
