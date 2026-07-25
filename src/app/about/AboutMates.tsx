import React from "react";
import Image from "next/image";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: "normal" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const AboutMates: React.FC = () => {
    return (
        <section className="py-32 w-full flex justify-center bg-[#050505] relative overflow-hidden">

            {/* Subtle Background Decor */}
            <div className="absolute top-[40%] -left-32 w-[600px] h-[600px] opacity-[0.08] pointer-events-none rotate-12 mix-blend-screen">
                <Image src="/decors/handhold.png" alt="Decor" fill style={{ objectFit: 'contain' }} />
            </div>

            <div className="max-w-[1400px] w-full px-6 md:px-12 relative z-10">

                {/* Premium Editorial Header Section */}
                <div className="flex flex-col items-start mb-20 relative">
                    <span className={`${spaceGrotesk.className} text-blue-400 uppercase tracking-[0.5em] text-sm font-bold mb-6 flex items-center gap-4`}>
                        <div className="w-12 h-[2px] bg-blue-500/80" />
                        Institution Foundation
                    </span>
                    <h2 className={`${spaceGrotesk.className} text-6xl md:text-[9rem] uppercase tracking-tighter font-black leading-[0.85] relative z-10 flex flex-col`}>
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>
                            ABOUT
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500 drop-shadow-2xl">
                            MATES.
                        </span>
                    </h2>
                    {/* Subtle glowing reflection behind the title */}
                    <div className="absolute bottom-0 left-20 w-[50%] h-40 bg-blue-500/20 blur-[120px] pointer-events-none" />
                </div>

                {/* Editorial Content Grid */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mt-8 items-start">

                    {/* Left Column: Massive Logo & Typography */}
                    <div className="flex-1 flex flex-col xl:flex-row gap-12 xl:gap-16 relative">

                        {/* Massive Premium Logo Container */}
                        <div className="group relative w-48 h-48 md:w-64 md:h-64 shrink-0">
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-purple-500/40 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Logo Card */}
                            <div className="relative w-full h-full bg-white rounded-[2rem] flex items-center justify-center p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/20 transform transition-transform duration-700 group-hover:scale-[1.03] group-hover:-rotate-2">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/about/image3.png"
                                        alt="MATES Logo"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                {/* Glass Glare Sweep */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                            </div>
                        </div>

                        {/* Typography */}
                        <div className="flex flex-col gap-8 pt-4">
                            <h3 className={`${spaceGrotesk.className} text-2xl md:text-4xl text-white font-medium leading-tight`}>
                                Maharaja Agrasen <br className="hidden md:block" />
                                <span className="text-white/60">Technical Education Society</span>
                            </h3>

                            <div className="flex flex-col gap-6">
                                <p className={`${spaceGrotesk.className} text-white/50 text-base md:text-lg leading-relaxed max-w-lg`}>
                                    A charitable trust comprising a group of well-known Educationists, Industrialists, Businessmen, Professionals, and <span className="text-white/90 font-medium">Philanthropists</span> with an aim to promote quality education.
                                </p>
                                <p className={`${spaceGrotesk.className} text-white/50 text-base md:text-lg leading-relaxed max-w-lg`}>
                                    With its constant growth and consistent efforts, MATES has been able to keep up its commitment to serving the society and its people, shaping human society for a better future.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Structured Map */}
                    <div className="w-full lg:w-[450px] flex flex-col gap-6 shrink-0 group">
                        <div className="flex justify-between items-end border-b border-blue-500/20 pb-4">
                            <span className={`${spaceGrotesk.className} text-white uppercase tracking-widest text-xs font-bold`}>Campus Location</span>
                            <span className={`${spaceGrotesk.className} text-emerald-400 uppercase tracking-widest text-[10px] flex items-center gap-2`}>
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                Sector 22, Rohini
                            </span>
                        </div>

                        <div className="w-full h-[400px] md:h-[500px] bg-[#0a0a0a] rounded-2xl overflow-hidden relative transition-transform duration-700 group-hover:-translate-y-2 border border-white/5 shadow-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.9942790757753!2d77.06385221087814!3d28.719601678696803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d068de879339f%3A0xc3160b7319992f44!2sMaharaja%20Agrasen%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1714241684992!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full scale-[1.02] transition-transform duration-1000"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
