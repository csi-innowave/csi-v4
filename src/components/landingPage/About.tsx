"use client";

import { useEffect, useRef, useState } from "react";
import CardSwap, { Card } from "../CardSwap";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import { ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────
   Typography Configuration
   ────────────────────────────────────────────── */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* ──────────────────────────────────────────────
   Infinite Marquee Component
   ────────────────────────────────────────────── */
const Marquee = ({ children, speed = 40 }: { children: React.ReactNode; speed?: number }) => (
  <div className="overflow-hidden whitespace-nowrap flex w-full relative z-20">
    <div
      className="inline-flex gap-12 animate-marquee items-center"
      style={{ animationDuration: `${speed}s` }}
    >
      {children} {children}
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   ABOUT SECTION — EDITORIAL PREMIUM
   ══════════════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const CARDS = [
    {
      id: 0,
      num: "01",
      name: "Society Members",
      tag: "Selective Network",
      body: "A highly curated group of developers and engineers driving technical excellence across the institute.",
    },
    {
      id: 1,
      num: "02",
      name: "Tech Collaborations",
      tag: "Industry Partners",
      body: "Strategic alliances providing elite resources, exclusive mentorship, and direct industry exposure.",
    },
    {
      id: 2,
      num: "03",
      name: "Years of Excellence",
      tag: "Est. 2009",
      body: "Over a decade of consistent technical leadership, massive scale events, and community building.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent text-white pb-24"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee linear infinite; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { 
          opacity: 0; 
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .anim-slide-right {
          opacity: 0;
          animation: slideInRight 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .text-stroke {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.08);
          color: transparent;
        }
      `}</style>



      {/* ── Main Editorial Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] relative max-w-[1800px] mx-auto w-full">
        
        {/* Left Column: Typography & Overlap */}
        <div className="lg:col-span-7 px-6 md:px-12 xl:px-24 pt-10 md:pt-12 pb-16 flex flex-col justify-center relative z-10">
          
          {/* Massive Outlined Text Structure */}
          <div className={`mb-2 md:mb-4 relative ${on ? 'anim-fade-up' : 'opacity-0'}`} style={{ animationDelay: "0.3s" }}>
            <h2 className={`${spaceGrotesk.className} text-[15.5vw] lg:text-[8vw] font-bold leading-[0.75] tracking-[-0.04em] text-stroke select-none`}>
              PIONEERING
            </h2>
          </div>

          {/* Elegant Serif Headline */}
          <div className={`-mt-[5vw] lg:-mt-[3vw] mb-16 relative ${on ? 'anim-fade-up' : 'opacity-0'}`} style={{ animationDelay: "0.5s" }}>
            <h2 className={`${instrumentSerif.className} text-[15vw] lg:text-[7vw] leading-[0.85] text-violet-400`}>
              the Future.
            </h2>
          </div>

          {/* Description Block */}
          <div className={`max-w-xl pl-2 md:pl-0 ${on ? 'anim-fade-up' : 'opacity-0'}`} style={{ animationDelay: "0.7s" }}>
            <p className={`${spaceGrotesk.className} text-[17px] md:text-[20px] text-white/40 font-light leading-[1.8] mb-10`}>
              The Computer Society of India at MAIT is a premier technical society. We shape the next generation of software engineers through relentless innovation, strategic collaboration, and a tightly-knit community of creators.
            </p>
            <button className={`group ${spaceGrotesk.className} inline-flex items-center gap-4 text-sm font-medium text-white/60 hover:text-violet-400 transition-all duration-300`}>
              <span className="relative overflow-hidden pb-1">
                Explore Our Legacy
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 transform origin-left transition-transform duration-300 group-hover:scale-x-0" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-violet-400 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left" />
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-violet-400/40 group-hover:bg-violet-500/10 transition-all duration-300">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: CardSwap Collage */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-20 lg:py-0 w-full overflow-visible">
          
          {/* CardSwap Container */}
          <div className={`relative w-full flex justify-end ${on ? 'anim-slide-right' : 'opacity-0'}`} style={{ animationDelay: "0.8s" }}>
            {/* Responsive scale wrapper */}
            <div className="transform -translate-x-4 md:-translate-x-8 lg:translate-x-0 xl:translate-x-4 translate-y-24 lg:translate-y-48 scale-[0.75] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.05] xl:scale-[1.15] origin-top-left transition-transform duration-700 hover:scale-[1.18]">
              <CardSwap
                width={560}
                height={460}
                cardDistance={70}
                verticalDistance={60}
                skewAmount={4}
              >
                {CARDS.map((card) => (
                  <Card
                    key={card.id}
                    className="bg-[#050505] border border-white/[0.08] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/card group-[.is-active]/card:border-violet-500/30 transition-colors duration-700"
                  >
                    {/* Animated Radial Glow on Hover */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.15),transparent_60%)] opacity-0 group-[.is-active]/card:opacity-100 transition-opacity duration-700" />
                    
                    {/* Tech Grid Overlay */}
                    <div className="absolute inset-0 opacity-[0.02] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-[.is-active]/card:opacity-100 transition-opacity duration-700" />

                    {/* Header Row */}
                    <div className="flex justify-between items-start z-10 relative">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-[.is-active]/card:border-violet-500/30 group-[.is-active]/card:bg-violet-500/10 transition-all duration-500">
                                <span className="text-violet-400 text-xs font-mono">{card.num}</span>
                            </div>
                            <span className="text-[10px] md:text-xs font-mono tracking-widest text-white/30 uppercase group-[.is-active]/card:text-violet-300 transition-colors duration-500">
                                {card.tag}
                            </span>
                        </div>
                        {/* Decorative Top-Right Crosshair */}
                        <div className="w-5 h-5 border-t border-r border-white/20 group-[.is-active]/card:border-violet-500/50 transition-colors duration-500" />
                    </div>

                    {/* Main Content */}
                    <div className="z-10 relative mt-12 mb-8">
                      <h3 className={`${instrumentSerif.className} text-4xl md:text-5xl text-white/90 group-[.is-active]/card:text-transparent group-[.is-active]/card:bg-clip-text group-[.is-active]/card:bg-gradient-to-r group-[.is-active]/card:from-white group-[.is-active]/card:to-violet-400 transition-all duration-500 mb-4`}>
                        {card.name}
                      </h3>
                      <p className={`${spaceGrotesk.className} text-sm md:text-base text-white/40 leading-relaxed group-[.is-active]/card:text-white/70 transition-colors duration-500 max-w-[95%]`}>
                        {card.body}
                      </p>
                    </div>

                    {/* Bottom Footer Row */}
                    <div className="flex justify-between items-end relative z-10">
                        <div className="h-[2px] w-12 bg-white/10 group-[.is-active]/card:w-24 group-[.is-active]/card:bg-violet-500/60 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-[.is-active]/card:bg-violet-400 group-[.is-active]/card:shadow-[0_0_12px_rgba(167,139,250,0.9)] transition-all duration-500" />
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>


        </div>
      </div>

      {/* ── Infinite Stats Marquee ── */}
      <div className={`mt-8 py-8 border-y border-white/[0.04] ${on ? 'anim-fade-up' : 'opacity-0'}`} style={{ animationDelay: "1s" }}>
        <Marquee speed={30}>
          <div className={`flex items-center gap-16 ${spaceGrotesk.className} shrink-0`}>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light text-white tracking-tighter">50+</span>
              <span className="text-violet-400/80 text-sm font-semibold tracking-widest uppercase">Members</span>
            </div>
            <span className="text-white/5 text-xl">✦</span>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light text-white tracking-tighter">50+</span>
              <span className="text-violet-400/80 text-sm font-semibold tracking-widest uppercase">Partners</span>
            </div>
            <span className="text-white/5 text-xl">✦</span>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light text-white tracking-tighter">15+</span>
              <span className="text-violet-400/80 text-sm font-semibold tracking-widest uppercase">Years</span>
            </div>
            <span className="text-white/5 text-xl">✦</span>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light text-white tracking-tighter">2009</span>
              <span className="text-violet-400/80 text-sm font-semibold tracking-widest uppercase">Founded</span>
            </div>
            <span className="text-white/5 text-xl">✦</span>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light text-white tracking-tighter">MAIT</span>
              <span className="text-violet-400/80 text-sm font-semibold tracking-widest uppercase">Delhi</span>
            </div>
            <span className="text-white/5 text-xl mr-16">✦</span>
          </div>
        </Marquee>
      </div>

    </section>
  );
}