"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EventsDataType } from "@/types/EventData";
import PremiumEventCard from "@/components/events/PremiumEventCard";
import { Search } from "lucide-react";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
    style: "normal",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
});

export default function EventsClient({ events }: { events: EventsDataType[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    if (!events || events.length === 0) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#0e0e11] text-[#ececf1] selection:bg-purple-500/30">
                <div className="text-center">
                    <span className={`${instrumentSerif.className} text-7xl text-white/40 block mb-6 tracking-tight`}>Empty</span>
                    <p className={`${spaceGrotesk.className} uppercase tracking-[0.4em] text-[11px] text-white/30 font-light`}>
                        The archive is currently vacant.
                    </p>
                </div>
            </div>
        );
    }

    const featuredEvent = events[0];
    const regularEvents = events.slice(1);

    const filteredRegularEvents = regularEvents.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const easeCurve = [0.16, 1, 0.3, 1] as const;

    return (
        <main ref={containerRef} className="relative w-full bg-[#0e0e11] text-[#ececf1] overflow-x-hidden selection:bg-purple-500/30 selection:text-white font-[family-name:var(--space-grotesk)]">
            
            {/* Claude-style Base Background Gradient */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(107,70,193,0.12),rgba(59,130,246,0.08),transparent_80%)]" />

            {/* Subtle Dot Grid */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />

            {/* ================= HERO SECTION ================= */}
            <motion.section 
                style={{ opacity: heroOpacity, y: heroY }}
                className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 pt-40 pb-24 min-h-[85vh] flex flex-col justify-between"
            >
                {/* Decorative Rotating Text Seal with Logo */}
                <div className="absolute top-10 left-6 md:left-12 pointer-events-none hidden md:flex opacity-60 items-center justify-center z-10">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 relative flex items-center justify-center"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                            <path id="textPath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
                            <text className={`${spaceGrotesk.className} text-[7.5px] uppercase tracking-[0.2em] fill-[#a1a1aa]`}>
                                <textPath href="#textPath" startOffset="0%">
                                    • CSI INNOWAVE ARCHIVE • PREMIUM TECH EXPERIENCES 
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>
                    {/* Logo inside */}
                    <div className="absolute flex items-center justify-center w-12 h-12">
                        <Image src="/logo.png" alt="CSI Logo" fill className="object-contain opacity-80 brightness-0 invert" />
                    </div>
                </div>

                {/* Hero Decors (Clustered Center-Right) */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                    <motion.div 
                        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[15%] right-[35%] w-32 h-32 md:w-56 md:h-56 opacity-10 md:opacity-[0.15]"
                    >
                        <Image src="/decors/brain.png" alt="Brain" fill className="object-contain" />
                    </motion.div>
                    <motion.div 
                        animate={{ y: [0, 20, 0], rotate: [0, -4, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[50%] right-[40%] w-24 h-24 md:w-48 md:h-48 opacity-10 md:opacity-[0.15]"
                    >
                        <Image src="/decors/eye.png" alt="Eye" fill className="object-contain" />
                    </motion.div>
                    <motion.div 
                        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute top-[30%] right-[50%] w-28 h-28 md:w-40 md:h-40 opacity-10 md:opacity-[0.15]"
                    >
                        <Image src="/decors/laptop.png" alt="Laptop" fill className="object-contain" />
                    </motion.div>
                </div>

                {/* Top Metadata Placard (Editorial) */}
                <div className="flex justify-between items-center w-full pt-6 mb-16 relative z-10">
                    <div>
                        <span className={`${spaceGrotesk.className} text-[10px] uppercase tracking-[0.3em] text-[#a1a1aa] block mb-2 font-light`}>Index</span>
                        <span className={`${spaceGrotesk.className} text-xs uppercase tracking-[0.15em] text-[#ececf1] font-medium`}>CSI INNOWAVE</span>
                    </div>
                    <div className="text-right">
                        <span className={`${spaceGrotesk.className} text-[10px] uppercase tracking-[0.3em] text-[#a1a1aa] block mb-2 font-light`}>Archive</span>
                        <span className={`${spaceGrotesk.className} text-xs uppercase tracking-[0.15em] text-[#ececf1] font-medium`}>{events.length} Events</span>
                    </div>
                </div>

                {/* Typography Layout */}
                <div className="grid grid-cols-12 gap-8 w-full items-end relative z-10">
                    
                    <div className="absolute bottom-10 left-10 pointer-events-none hidden md:block opacity-20">
                        <span className={`${instrumentSerif.className} text-7xl italic text-purple-400/30`}>*</span>
                    </div>

                    <div className="col-span-12 lg:col-span-8 relative">
                        <h1 className={`${instrumentSerif.className} font-normal leading-[0.9] tracking-tight text-[#ececf1] text-[15vw] md:text-[12vw] lg:text-[10vw] select-none`}>
                            Legacy <br/>
                            <span className="italic text-[#ececf1]/60 ml-4 md:ml-16 lg:ml-24">of Events</span>
                        </h1>
                    </div>

                    <div className="col-span-12 lg:col-span-4 lg:pl-12 lg:pb-8 flex flex-col gap-8">
                        <p className={`${spaceGrotesk.className} text-[#a1a1aa] font-light text-sm md:text-base leading-relaxed max-w-sm`}>
                            A meticulously curated timeline of workshops, hackathons, and premium tech experiences engineered for the avant-garde.
                        </p>
                        <div className="flex items-center gap-4 group cursor-pointer w-fit">
                            <span className={`${spaceGrotesk.className} text-[11px] uppercase tracking-[0.3em] text-[#d4d4d8] group-hover:text-white transition-colors duration-300`}>
                                Enter Timeline
                            </span>
                            <div className="relative w-12 h-[1px] bg-white/20 overflow-hidden group-hover:w-16 transition-all duration-500 ease-out">
                                <motion.div 
                                    className="absolute top-0 left-0 w-full h-full bg-white"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ================= MARQUEE DIVIDER ================= */}
            <div className="relative z-20 border-y border-white/[0.05] py-5 overflow-hidden bg-black/10 backdrop-blur-md">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0">
                            {["Innovation", "Architecture", "Development", "Design Systems", "Future Tech", "CSI Innowave"].map((word) => (
                                <span key={word} className={`${spaceGrotesk.className} text-xs md:text-sm tracking-[0.4em] uppercase text-white/30 mx-10 flex items-center gap-20 font-light`}>
                                    {word}
                                    <span className="text-white/10 text-xs">◆</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ================= FEATURED SECTION ================= */}
            <section className="relative w-full max-w-[1500px] mx-auto px-6 md:px-12 py-32 md:py-48">
                
                {/* Featured Decors */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <motion.div 
                        animate={{ y: [0, -20, 0], rotate: [-2, 1, -2] }}
                        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[10%] left-[5%] w-40 h-40 md:w-56 md:h-56 opacity-10 md:opacity-[0.12]"
                    >
                        <Image src="/decors/bulb.png" alt="Bulb" fill className="object-contain" />
                    </motion.div>
                    <motion.div 
                        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[65%] right-0 md:-right-[2%] w-32 h-32 md:w-48 md:h-48 opacity-10 md:opacity-[0.12]"
                    >
                        <Image src="/decors/megaphone.png" alt="Megaphone" fill className="object-contain" />
                    </motion.div>
                    <motion.div 
                        animate={{ y: [0, -15, 0], rotate: [2, -1, 2] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                        className="absolute bottom-[15%] left-[15%] w-48 h-48 md:w-64 md:h-64 opacity-10 md:opacity-[0.12]"
                    >
                        <Image src="/decors/handshake.png" alt="Handshake" fill className="object-contain" />
                    </motion.div>
                </div>

                <div className="relative z-10 grid grid-cols-12 gap-6 mb-20 pb-6 border-b border-white/[0.08]">
                    <div className="col-span-6 md:col-span-3">
                        <span className={`${spaceGrotesk.className} text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-2 font-light`}>Category</span>
                        <span className={`${spaceGrotesk.className} text-xs tracking-[0.15em] uppercase text-white/90 font-medium`}>Featured</span>
                    </div>
                    <div className="hidden md:block col-span-6 text-center self-end">
                        <span className={`${instrumentSerif.className} text-2xl text-[#a1a1aa] italic tracking-wide`}>The Latest Event</span>
                    </div>
                    <div className="col-span-6 md:col-span-3 text-right">
                        <span className={`${spaceGrotesk.className} text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-2 font-light`}>Status</span>
                        <span className={`${spaceGrotesk.className} text-xs tracking-[0.15em] uppercase text-white/90 font-medium`}>Featured</span>
                    </div>
                </div>
                
                <div className="relative z-10 w-full max-w-[1200px] mx-auto group">
                    <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(107,70,193,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]">
                        <PremiumEventCard event={featuredEvent} index={0} isFeatured={true} />
                    </div>
                </div>
            </section>

            {/* ================= ARCHIVE GRID ================= */}
            {regularEvents.length > 0 && (
                <section className="relative w-full max-w-[1500px] mx-auto px-6 md:px-12 pb-32 md:pb-48">
                    
                    {/* Archive Decors in Margins */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden lg:block">
                        {[
                            { src: "/decors/glass.png", top: "5%", left: "2%", delay: 0 },
                            { src: "/decors/write.png", top: "15%", right: "2%", delay: 1 },
                            { src: "/decors/brain.png", top: "25%", left: "4%", delay: 2 },
                            { src: "/decors/laptop.png", top: "35%", right: "4%", delay: 0.5 },
                            { src: "/decors/handhold.png", top: "45%", left: "1%", delay: 1.5 },
                            { src: "/decors/megaphone.png", top: "55%", right: "1%", delay: 2.5 },
                            { src: "/decors/eye.png", top: "65%", left: "3%", delay: 0.8 },
                            { src: "/decors/bulb.png", top: "75%", right: "3%", delay: 1.8 },
                            { src: "/decors/trophy.png", top: "85%", left: "2%", delay: 0.3 },
                            { src: "/decors/handshake.png", top: "95%", right: "2%", delay: 1.2 },
                        ].map((decor, i) => (
                            <motion.div 
                                key={i}
                                animate={{ y: [0, i % 2 === 0 ? 20 : -20, 0], rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
                                transition={{ duration: 12 + i, repeat: Infinity, ease: "easeInOut", delay: decor.delay }}
                                className="absolute w-32 h-32 xl:w-48 xl:h-48 opacity-[0.12]"
                                style={{ top: decor.top, left: decor.left, right: decor.right }}
                            >
                                <Image src={decor.src} alt="Decor" fill className="object-contain" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative z-10 grid grid-cols-12 gap-6 mb-24 border-b border-white/[0.08] pb-6 items-end">
                        <div className="col-span-6 md:col-span-3">
                            <span className={`${spaceGrotesk.className} text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-2 font-light`}>Total Records</span>
                            <span className={`${spaceGrotesk.className} text-xs tracking-[0.15em] uppercase text-white/90 font-medium`}>{filteredRegularEvents.length} Found</span>
                        </div>
                        <div className="hidden md:block col-span-6 text-center self-end">
                            <span className={`${instrumentSerif.className} text-2xl text-[#a1a1aa] italic tracking-wide`}>Previous Iterations</span>
                        </div>
                        <div className="col-span-6 md:col-span-3 text-right flex flex-col items-end">
                            <span className={`${spaceGrotesk.className} text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-2 font-light`}>Search</span>
                            <div className="relative w-full max-w-[160px] group">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-white/50 transition-colors" />
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Keyword..."
                                    className={`${spaceGrotesk.className} w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/20 focus:border-white/30 focus:bg-white/[0.04] transition-all duration-300 rounded-full py-1.5 pl-9 pr-4 text-xs text-white/90 placeholder:text-white/30 focus:outline-none`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Constrained width to force side margins */}
                    <div className="relative z-10 w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-16">
                        {filteredRegularEvents.map((event, index) => {
                            const offsetClass = 
                                index % 3 === 1 ? 'lg:mt-16' : 
                                index % 3 === 2 ? 'lg:mt-32' : ''; 
                            
                            return (
                                <div key={event.id} className={`relative group ${offsetClass}`}>
                                    <div className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                                        <PremiumEventCard event={event} index={index + 1} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

        </main>
    );
}