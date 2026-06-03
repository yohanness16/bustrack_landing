"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  { number: "01", title: "Unpredictable arrivals", description: "Passengers wait endlessly with no real-time information about when the next bus arrives. Schedules on paper bear no resemblance to reality." },
  { number: "02", title: "Overcrowded buses", description: "Drivers and operators have no visibility into crowd density until the doors open and it is already too late to redirect." },
  { number: "03", title: "Static routes", description: "Fixed schedules do not adapt to real-time demand. Buses run empty on some routes and overflow on others, wasting fuel and passenger time alike." },
  { number: "04", title: "Blind decisions", description: "Transit authorities lack the analytics to make informed fleet management choices. Every adjustment is a guess." },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".problem-lead", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".problem-item", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".problem-list", start: "top 80%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 sm:mb-20 max-w-2xl problem-lead">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-6 block">The Problem</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--fg-primary)] leading-[1.15] mb-5">Transit systems operate blind.</h2>
          <p className="text-lg text-[var(--fg-secondary)] leading-relaxed">Without real-time data, bus networks run on hope and outdated schedules. Passengers suffer. Operators guess. Resources drain.</p>
        </div>
        <div className="problem-list grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {problems.map((problem) => (
            <div key={problem.number} className="problem-item group flex gap-5">
              <span className="font-mono text-xs text-[var(--accent)] mt-1.5 shrink-0 w-8">{problem.number}</span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--fg-primary)] mb-2">{problem.title}</h3>
                <p className="text-[var(--fg-secondary)] leading-relaxed text-[0.95rem]">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
