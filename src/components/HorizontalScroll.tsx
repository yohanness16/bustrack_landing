"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { number: "01", title: "Real-Time GPS Tracking", description: "Every bus transmits location data every second. See your entire fleet on a live map that updates faster than you can blink.", stat: "< 1s", statLabel: "update interval", color: "var(--accent)", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=75&auto=format&fit=crop", imageAlt: "Bus GPS tracking" },
  { number: "02", title: "Crowd Density Prediction", description: "AI models analyze boarding patterns and historical data to predict crowd density 15 minutes ahead. Deploy extra units before passengers pile up.", stat: "15 min", statLabel: "prediction window", color: "var(--ok)", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=75&auto=format&fit=crop", imageAlt: "Passengers boarding bus" },
  { number: "03", title: "Dynamic Route Optimization", description: "Machine learning processes real-time and historical data to suggest optimal routes. Reduce average wait times by up to 35 percent.", stat: "35%", statLabel: "wait time reduction", color: "var(--warn)", image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=600&q=75&auto=format&fit=crop", imageAlt: "Transit route map" },
  { number: "04", title: "Driver Alert System", description: "Instant notifications for traffic delays, crowd conditions, and route changes delivered directly to the driver display. No radio chatter needed.", stat: "< 3s", statLabel: "alert delivery", color: "var(--accent)", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=75&auto=format&fit=crop", imageAlt: "Bus driver cabin" },
  { number: "05", title: "Passenger Information", description: "Give riders real-time ETAs, crowd levels, and route info through your passenger app. Fewer complaints. Higher satisfaction. More riders.", stat: "4.8★", statLabel: "app store rating", color: "var(--ok)", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=75&auto=format&fit=crop", imageAlt: "Passenger at bus stop" },
  { number: "06", title: "Analytics & Reporting", description: "Ridership trends, performance metrics, and custom reports that turn raw operational data into decisions your board can actually act on.", stat: "200+", statLabel: "report templates", color: "var(--warn)", image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=600&q=75&auto=format&fit=crop", imageAlt: "Analytics dashboard" },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || !section) return;

    const setup = () => {
      const scrollWidth = track.scrollWidth - container.offsetWidth;
      if (scrollWidth <= 0) return;

      const ctx = gsap.context(() => {
        // The tween that moves the track
        const tween = gsap.to(track, { x: -scrollWidth, ease: "none" });

        // Single ScrollTrigger — pin + scrub + animation + onUpdate all in one
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tween,
          onUpdate: (self) => {
            const p = self.progress;

            // Counter
            if (counterRef.current) {
              const idx = Math.min(Math.floor(p * cards.length), cards.length - 1);
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }

            // Background color shift
            if (bgRef.current) {
              const colors = [
                "oklch(0.16 0.01 260)", "oklch(0.17 0.015 240)",
                "oklch(0.16 0.012 220)", "oklch(0.17 0.018 200)",
                "oklch(0.16 0.014 180)", "oklch(0.17 0.016 160)",
              ];
              bgRef.current.style.background = colors[Math.min(Math.floor(p * 6), 5)];
            }

            // Progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${p})`;
            }

            // Per-card animations
            const cardEls = track.querySelectorAll(".hs-card");
            cardEls.forEach((c, i) => {
              const ce = c as HTMLElement;
              const im = ce.querySelector(".hs-card-img") as HTMLElement | null;
              const co = ce.querySelector(".hs-card-content") as HTMLElement | null;
              const mid = i / cards.length + 1 / cards.length / 2;
              const dist = Math.abs(p - mid);
              const intensity = Math.max(0, 1 - dist / 0.5);

              gsap.set(ce, { opacity: 0.25 + intensity * 0.75, scale: 0.88 + intensity * 0.12 });
              if (im) gsap.set(im, { scale: 1.15 - intensity * 0.15, opacity: intensity });
              if (co) gsap.set(co, { y: 30 - intensity * 30, opacity: intensity });
            });
          },
        });

        // Section title entrance
        gsap.fromTo(
          ".hs-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" } }
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    const raf = requestAnimationFrame(() => setup());
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={bgRef} className="absolute inset-0" style={{ background: "oklch(0.16 0.01 260)" }} />

      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-28 sm:pt-36">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div className="hs-title max-w-2xl">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-6 block">Deep Dive</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--fg-primary)] leading-[1.15]">Every feature built for the realities of transit operations.</h2>
          </div>
          <div className="hidden sm:flex items-baseline gap-1 text-[var(--fg-tertiary)]">
            <span ref={counterRef} className="text-2xl font-bold font-mono text-[var(--fg-primary)]">01</span>
            <span className="text-sm">/</span>
            <span className="text-sm font-mono">{String(cards.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-hidden">
        <div ref={trackRef} className="flex gap-6 sm:gap-8 px-6 sm:px-12 lg:px-20 pt-14 pb-24">
          {cards.map((card, i) => (
            <div key={i} className="hs-card shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image src={card.image} alt={card.imageAlt} width={600} height={400} className="hs-card-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold font-mono backdrop-blur-sm border" style={{ color: card.color, borderColor: card.color + "33", backgroundColor: card.color + "15" }}>{card.number}</span>
                </div>
              </div>
              <div className="hs-card-content flex-1 flex flex-col p-6 sm:p-7">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--fg-primary)] leading-[1.2] mb-3">{card.title}</h3>
                <p className="text-[var(--fg-secondary)] leading-relaxed text-[0.92rem] flex-1 mb-6">{card.description}</p>
                <div className="border-t border-[var(--border)] pt-5 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-bold font-mono leading-none" style={{ color: card.color }}>{card.stat}</span>
                  <span className="text-sm text-[var(--fg-tertiary)]">{card.statLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-10 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 z-10">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--border)] relative overflow-hidden">
              <div ref={progressRef} className="absolute top-0 left-0 h-full bg-[var(--accent)] origin-left" style={{ width: "100%", transform: "scaleX(0)" }} />
            </div>
            <span className="text-[10px] font-mono text-[var(--fg-tertiary)] uppercase tracking-wider shrink-0">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
