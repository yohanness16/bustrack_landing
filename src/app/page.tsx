import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import HorizontalScroll from "@/components/HorizontalScroll";
import LiveDashboard from "@/components/LiveDashboard";
import StatsCounter from "@/components/StatsCounter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <HorizontalScroll />
      <LiveDashboard />
      <StatsCounter />
      <CTA />
      <Footer />
    </main>
  );
}
