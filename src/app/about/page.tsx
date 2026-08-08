import React from "react";
import { GtaViPoster } from "@/components/GtaViPoster";
import { ObjectivesSection } from "./Objectives";
import { AboutMates } from "./AboutMates";
import dynamic from 'next/dynamic';
const CurvedLoop = dynamic(() => import('@/components/CurvedLoop'), { ssr: false });
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"] });
const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata = {
    title: "About - CSI V3 | Maharaja Agrasen Institute of Technology",
    description: "Learn about the Computer Society of India (CSI) chapter at MAIT, our vision, mission, objectives, and ideology.",
    keywords: [
        "About CSI",
        "Computer Society of India MAIT",
        "Vision",
        "Mission",
        "Objectives",
        "Ideology"
    ]
};

export default function AboutCSI() {
    return (
        <main className="relative w-full min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500/30">

            {/* Background Texture */}
            <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.02] mix-blend-screen"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* GTA VI POSTER HERO */}
            <section className="relative w-full min-h-screen md:h-screen border-b border-white/10 overflow-hidden flex flex-col md:block justify-between pt-28 md:pt-0 pb-8 md:pb-0 bg-transparent">
                {/* Hero Text (Left Aligned) */}
                <div className="relative md:absolute md:inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 z-20 pointer-events-none mb-8 md:mb-0">
                    {/* Subtle glow behind text */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-blue-500/15 blur-[120px] rounded-full mix-blend-screen" />

                    <h1 className="text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-[800] tracking-[-0.05em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] leading-none mb-4 md:mb-10">
                        <span>About </span>
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>CSI</span>
                    </h1>

                    <div className="flex gap-4 md:gap-6 items-start max-w-lg pl-1 md:pl-2">
                        <div className="w-1 h-24 md:h-32 bg-gradient-to-b from-blue-500 to-transparent rounded-full mt-1.5 md:mt-2 opacity-80 shrink-0" />
                        <p className={`${spaceGrotesk.className} text-sm sm:text-base md:text-xl text-white/60 leading-relaxed`}>
                            The Computer Society of India chapter at MAIT, founded in 2009, unites passionate students and faculty. They collaborate to explore new business ideas through open discussions, interactive sessions, and practical activities. This fosters critical thinking and equips members with valuable business skills.
                        </p>
                    </div>
                </div>

                {/* Poster Container - Positioned below text on mobile, full-screen overlay on desktop */}
                <div className="relative md:absolute md:inset-0 w-full h-[60vh] xs:h-[65vh] sm:h-[75vh] md:h-full z-10 shrink-0 flex items-center justify-center overflow-hidden -mt-12 sm:-mt-16 md:mt-0">
                    <GtaViPoster background="transparent" fit={0.6} className="w-full h-full transform max-md:scale-[2.2] max-sm:scale-[1.8] md:scale-100 md:-translate-x-12 lg:-translate-x-20 origin-center" />
                </div>
            </section>

            {/* SECTIONS WRAPPER */}
            <div className="relative w-full overflow-hidden">
                {/* SUPERCHARGED IDEOLOGY SECTION */}
                <section className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 flex flex-col gap-24">
                    <div className="text-center">
                        <h2 className={`${spaceGrotesk.className} text-sm md:text-base text-blue-500 font-semibold tracking-[0.2em] uppercase mb-4`}>
                            Core Principles
                        </h2>
                        <h2 className={`${instrumentSerif.className} text-6xl md:text-[6rem] mb-6 drop-shadow-xl text-white`}>
                            Our <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Ideology.</span>
                        </h2>
                        <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full mb-8" />
                        <p className={`${spaceGrotesk.className} text-white/50 text-xl max-w-2xl mx-auto leading-relaxed`}>
                            The Computer Society of India chapter at MAIT unites passionate students to forge technological frontiers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Vision */}
                        <div className="group relative p-[1px] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(59,130,246,0.3)]">
                            {/* Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent group-hover:from-blue-500/50 transition-colors duration-700" />

                            <div className="relative h-full bg-[#08080a] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#08080a] to-[#08080a] p-10 md:p-14 rounded-[2rem] overflow-hidden">
                                {/* Number Badge */}
                                <div className="absolute -right-4 -top-8 text-[12rem] font-bold text-white/[0.02] pointer-events-none select-none tracking-tighter group-hover:text-blue-500/[0.05] transition-colors duration-700">01</div>

                                {/* Image Watermark */}
                                <div className="absolute -left-16 -bottom-16 w-80 h-80 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-1000 rotate-12">
                                    <Image src="/decors/eye.png" alt="Vision decor" fill style={{ objectFit: "contain" }} />
                                </div>

                                {/* Glow */}
                                <div className="absolute -left-32 -top-32 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-400/30 transition-all duration-700 pointer-events-none" />

                                <h3 className={`${instrumentSerif.className} text-4xl md:text-5xl text-white mb-8 uppercase tracking-tight relative z-10 flex items-center gap-6`}>
                                    Vision
                                    <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                                </h3>
                                <p className={`${spaceGrotesk.className} text-lg text-white/60 font-light leading-relaxed relative z-10`}>
                                    We envision a future where innovation, education, and sustainable practices converge to elevate India's trajectory. We nurture young minds in a learning environment of high academic value while fostering ethical competence.
                                </p>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="group relative p-[1px] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(147,51,234,0.3)]">
                            {/* Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent group-hover:from-purple-500/50 transition-colors duration-700" />

                            <div className="relative h-full bg-[#08080a] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-[#08080a] to-[#08080a] p-10 md:p-14 rounded-[2rem] overflow-hidden">
                                {/* Number Badge */}
                                <div className="absolute -right-4 -top-8 text-[12rem] font-bold text-white/[0.02] pointer-events-none select-none tracking-tighter group-hover:text-purple-500/[0.05] transition-colors duration-700">02</div>

                                {/* Image Watermark */}
                                <div className="absolute -left-16 -bottom-16 w-80 h-80 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-1000 -rotate-12">
                                    <Image src="/decors/bulb.png" alt="Mission decor" fill style={{ objectFit: "contain" }} />
                                </div>

                                {/* Glow */}
                                <div className="absolute -left-32 -top-32 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full group-hover:bg-purple-400/30 transition-all duration-700 pointer-events-none" />

                                <h3 className={`${instrumentSerif.className} text-4xl md:text-5xl text-white mb-8 uppercase tracking-tight relative z-10 flex items-center gap-6`}>
                                    Mission
                                    <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                </h3>
                                <p className={`${spaceGrotesk.className} text-lg text-white/60 font-light leading-relaxed relative z-10`}>
                                    Our mission revolves around orchestrating a myriad of initiatives: from comprehensive workshops and insightful seminars to dynamic awareness campaigns designed to champion skill development and foster an entrepreneurial spirit.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OBJECTIVES */}
                <ObjectivesSection />

                {/* ABOUT MATES */}
                <AboutMates />
            </div>

            {/* FOOTER - CURVED LOOP LOGO */}
            <footer className="relative z-10 w-full border-t border-white/5 pt-0 pb-0 overflow-hidden flex flex-col items-center justify-center">
                {/* Ambient Interaction Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="w-full relative flex items-center justify-center -translate-y-32">
                    <CurvedLoop
                        marqueeText="CSI ✦ INNOWAVE ✦ "
                        speed={2}
                        curveAmount={200}
                        className="text-[4rem] md:text-[6rem] uppercase fill-white"
                    />
                </div>
            </footer>
        </main>
    );
}