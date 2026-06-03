"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const busRoutes = [
  { id: "B-101", x: 20, y: 30, targetX: 75, targetY: 60, crowd: "low", eta: "3 min" },
  { id: "B-204", x: 60, y: 20, targetX: 25, targetY: 70, crowd: "high", eta: "7 min" },
  { id: "B-307", x: 40, y: 65, targetX: 80, targetY: 25, crowd: "med", eta: "5 min" },
];

function CrowdIndicator({ level }: { level: string }) {
  const styles: Record<string, string> = { low: "var(--ok)", med: "var(--warn)", high: "var(--no)" };
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: styles[level] }} />
      <span className="text-[11px] capitalize" style={{ color: styles[level] }}>{level}</span>
    </div>
  );
}

export default function LiveDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const [busPositions, setBusPositions] = useState(busRoutes.map((b) => ({ x: b.x, y: b.y })));

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPositions((prev) => prev.map((pos, i) => ({ x: pos.x + (busRoutes[i].targetX - pos.x) * 0.02, y: pos.y + (busRoutes[i].targetY - pos.y) * 0.02 })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".dashboard-container", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".dashboard-title-block", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="dashboard" ref={sectionRef} className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-2xl dashboard-title-block">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-6 block">Live Dashboard</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--fg-primary)] leading-[1.15] mb-5">Every bus, every route, every crowd level.</h2>
          <p className="text-lg text-[var(--fg-secondary)] leading-relaxed">A real-time command center that shows exactly what is happening across your entire network right now.</p>
        </div>
        <div className="dashboard-container relative rounded-xl border border-[var(--border)] bg-[var(--bg-deep)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--no)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--warn)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--ok)]" />
              <span className="ml-3 text-xs text-[var(--fg-tertiary)] font-mono">BusTrack v2.4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-pulse" />
              <span className="text-[10px] text-[var(--ok)] font-mono uppercase tracking-wider">Live</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 relative min-h-[350px] p-4">
              <div className="absolute inset-4 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(var(--fg-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--fg-secondary) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10 20 Q 30 10 50 30 T 90 50" fill="none" stroke="var(--fg-tertiary)" strokeWidth="0.25" opacity="0.4" />
                <path d="M 20 80 Q 40 50 60 60 T 80 20" fill="none" stroke="var(--fg-tertiary)" strokeWidth="0.25" opacity="0.4" />
                <path d="M 5 50 Q 35 30 55 50 T 95 30" fill="none" stroke="var(--fg-tertiary)" strokeWidth="0.25" opacity="0.4" />
              </svg>
              {busRoutes.map((bus, i) => (
                <div key={bus.id} className="absolute transition-all duration-1000 ease-linear" style={{ left: `${busPositions[i].x}%`, top: `${busPositions[i].y}%`, transform: "translate(-50%, -50%)" }}>
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center border border-[var(--border)]">
                      <span className="text-[10px] font-bold text-[var(--fg-primary)]">{bus.id.split("-")[1]}</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border border-[var(--accent)]/30 animate-ping" />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border)] whitespace-nowrap text-[10px]">
                      <div className="font-semibold text-[var(--fg-primary)]">{bus.id}</div>
                      <div className="text-[var(--fg-tertiary)]">ETA {bus.eta}</div>
                    </div>
                  </div>
                </div>
              ))}
              {[{ x: 15, y: 25, name: "Central" }, { x: 50, y: 50, name: "Midtown" }, { x: 85, y: 45, name: "Airport" }, { x: 30, y: 75, name: "Harbor" }].map((s, i) => (
                <div key={i} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -50%)" }}>
                  <div className="w-2 h-2 rounded-full bg-[var(--fg-tertiary)] border border-[var(--border)]" />
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] text-[var(--fg-tertiary)] whitespace-nowrap">{s.name}</span>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-64 border-t lg:border-t-0 lg:border-l border-[var(--border)] p-4 space-y-2.5">
              <h4 className="text-xs font-semibold text-[var(--fg-secondary)] mb-3 uppercase tracking-wider">Active Buses</h4>
              {busRoutes.map((bus, i) => (
                <div key={bus.id} className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-light)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs text-[var(--fg-primary)]">{bus.id}</span>
                    <CrowdIndicator level={bus.crowd} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--fg-tertiary)]">
                    <span>Next: {bus.eta}</span>
                    <span>Route {i + 1}A</span>
                  </div>
                  <div className="mt-2 h-0.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${30 + i * 20}%`, backgroundColor: bus.crowd === "low" ? "var(--ok)" : bus.crowd === "med" ? "var(--warn)" : "var(--no)" }} />
                  </div>
                </div>
              ))}
              <div className="mt-3 p-3 rounded-lg bg-[var(--accent-muted)]/30 border border-[var(--accent)]/10">
                <div className="text-[11px] text-[var(--fg-tertiary)] mb-0.5">Fleet Status</div>
                <div className="text-xl font-bold text-[var(--fg-primary)] font-mono">24/28</div>
                <div className="text-[11px] text-[var(--ok)]">Buses Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
