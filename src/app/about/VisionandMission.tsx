import React from "react";
import { BookOpen, Heart, Users } from "lucide-react";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: "normal" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const VisionMissionSection: React.FC = () => (
    <section className="py-16 md:py-24 relative z-10 w-full flex justify-center">
        <div className="max-w-6xl w-full px-6 md:px-12">
            <div className="flex flex-col items-center mb-16">
                <BookOpen className="text-violet-400 mb-6 opacity-80" size={32} strokeWidth={1.5} />
                <h2 className={`${instrumentSerif.className} text-5xl md:text-6xl font-normal tracking-tight text-[#ececf1] mb-6`}>
                    Vision <span className="italic text-white/50">&</span> Mission
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent mx-auto"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <div className="group w-full md:w-1/2">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-8 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:border-violet-500/30 relative h-full flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_50px_rgba(107,70,193,0.15)]">
                        <div className="flex items-center mb-8 relative z-10">
                            <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-2xl mr-6 group-hover:border-violet-500/40 transition-colors duration-500">
                                <Users className="text-violet-300" size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className={`${instrumentSerif.className} text-3xl md:text-4xl font-normal tracking-tight text-[#ececf1]`}>
                                Our <span className="italic text-white/50">Vision</span>
                            </h3>
                        </div>
                        <p className={`${spaceGrotesk.className} text-base md:text-lg text-[#a1a1aa] font-light leading-relaxed flex-grow`}>
                            CSI envisions a future where innovation, education,
                            and sustainable practices converge to elevate
                            India's trajectory towards progress. Nurturing young
                            minds in a learning environment of high academic
                            value and also fostering spiritual and ethical
                            values along with technological and managerial
                            competence.
                        </p>
                    </div>
                </div>
                
                <div className="group w-full md:w-1/2">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-8 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:blue-500/30 relative h-full flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_50px_rgba(59,130,246,0.15)] hover:border-blue-500/30">
                        <div className="flex items-center mb-8 relative z-10">
                            <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-2xl mr-6 group-hover:border-blue-500/40 transition-colors duration-500">
                                <Heart className="text-blue-300" size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className={`${instrumentSerif.className} text-3xl md:text-4xl font-normal tracking-tight text-[#ececf1]`}>
                                Our <span className="italic text-white/50">Mission</span>
                            </h3>
                        </div>
                        <p className={`${spaceGrotesk.className} text-base md:text-lg text-[#a1a1aa] font-light leading-relaxed flex-grow`}>
                            Our mission revolves around orchestrating a myriad
                            of initiatives: from comprehensive workshops and
                            insightful seminars to dynamic awareness campaigns.
                            These endeavors are meticulously designed to
                            champion skill development, foster entrepreneurial
                            spirit, and champion environmental conservation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
