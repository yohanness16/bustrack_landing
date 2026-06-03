"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "./AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2847, suffix: "+", label: "buses tracked in real time" },
  { value: 156, suffix: "", label: "cities on the platform" },
  { value: 35, suffix: "%", label: "average wait time reduction" },
  { value: 99.7, suffix: "%", label: "uptime guarantee", decimals: 1 },
];

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".stats-lead", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".stats-narrative", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: counterRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      ScrollTrigger.create({ trigger: sectionRef.current, start: "top 60%", onEnter: () => setInView(true), onLeaveBack: () => setInView(false) });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 max-w-2xl stats-lead">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-6 block">By the Numbers</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--fg-primary)] leading-[1.15]">Trusted by transit operators who measure results.</h2>
        </div>
        <div ref={counterRef} className="stats-narrative flex flex-wrap items-baseline gap-x-8 gap-y-4 text-[var(--fg-secondary)] text-base sm:text-lg leading-relaxed">
          {stats.map((stat, i) => (
            <span key={i} className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[var(--fg-primary)] font-mono">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} trigger={inView} duration={2} />
              </span>
              <span className="text-[var(--fg-secondary)]">{stat.label}</span>
              {i < stats.length - 1 && <span className="text-[var(--border)] ml-4 hidden sm:inline">—</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
