"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "GPS tracking", description: "Every bus transmits location data every second. The platform aggregates it into a live, interactive map that updates in real time." },
  { number: "02", title: "Crowd analysis", description: "Passenger counting algorithms and boarding pattern analysis predict crowd density before it becomes a problem, not after." },
  { number: "03", title: "Route optimization", description: "Machine learning models process historical and real-time data to suggest optimal routes, reducing average wait times across the network." },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hiw-lead", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" } });
      steps.forEach((_, i) => {
        gsap.fromTo(`.hiw-step-${i}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: `.hiw-step-${i}`, start: "top 85%", toggleActions: "play none none reverse" } });
      });
      gsap.fromTo(".hiw-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".hiw-steps", start: "top 60%", end: "bottom 40%", scrub: 1 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 sm:mb-20 max-w-2xl hiw-lead">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-6 block">How It Works</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--fg-primary)] leading-[1.15] mb-5">From raw data to smarter transit.</h2>
          <p className="text-lg text-[var(--fg-secondary)] leading-relaxed">Three layers of intelligence that transform how your fleet operates.</p>
        </div>
        <div className="hiw-steps relative">
          <div className="hiw-line absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-[var(--border)] origin-top hidden sm:block" />
          <div className="space-y-16 sm:space-y-20">
            {steps.map((step, i) => (
              <div key={i} className={`hiw-step-${i} relative flex gap-6 sm:gap-10`}>
                <div className="shrink-0 w-10 sm:w-12 flex items-start justify-center pt-1">
                  <span className="font-mono text-sm text-[var(--accent)] bg-[var(--bg)] relative z-10">{step.number}</span>
                </div>
                <div className="flex-1 border-t border-[var(--border)] pt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--fg-primary)] mb-3">{step.title}</h3>
                  <p className="text-[var(--fg-secondary)] leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
