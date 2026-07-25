import React from "react";
import Image from "next/image";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: "normal" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const ObjectivesSection: React.FC = () => (
    <section className="py-16 md:py-24 relative z-10 w-full flex justify-center">
        <div className="max-w-6xl w-full px-6 md:px-12">
            <div className="flex flex-col items-center mb-16">
                <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold tracking-tight text-white`}>
                    Objectives
                </h2>
            </div>
            
            <div className="flex flex-col gap-24 md:gap-32 mt-12">
                {/* Objective 1 */}
                <div className="group flex flex-col md:flex-row items-center gap-12 md:gap-20 cursor-default">
                    {/* Text Content */}
                    <div className="flex-1 relative">
                        {/* Watermark */}
                        <div className="absolute -top-16 -left-8 text-[12rem] font-bold text-white/[0.03] group-hover:text-blue-500/[0.05] pointer-events-none select-none tracking-tighter z-0 transition-colors duration-700">
                            01
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-blue-500/50 group-hover:w-20 group-hover:bg-blue-400 transition-all duration-700" />
                                <span className={`${spaceGrotesk.className} tracking-[0.3em] text-xs text-blue-400/70 group-hover:text-blue-400 uppercase font-medium transition-colors duration-500`}>Objective 01</span>
                            </div>
                            
                            <h3 className={`${instrumentSerif.className} text-5xl md:text-6xl leading-[1.1] mb-8 text-white/90 group-hover:text-white transition-colors duration-500`}>
                                Cultivate interest in <br />
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg">management & commerce</span>
                            </h3>
                            
                            <p className={`${spaceGrotesk.className} text-white/50 group-hover:text-white/70 text-lg leading-relaxed border-l-2 border-white/5 group-hover:border-blue-500/40 pl-6 transition-all duration-500`}>
                                To cultivate students' interest in the field of management or commerce in a convivial environment, without the pressure of being graded. We provide a space for practical learning and open discussion.
                            </p>
                        </div>
                    </div>
                    
                    {/* Image Content */}
                    <div className="flex-1 w-full flex justify-center items-center p-8">
                        <div className="relative w-[90%] md:w-[80%] aspect-[4/3] perspective-1000">
                            {/* Offset Outline (Bottom-Left) */}
                            <div className="absolute inset-0 border-2 border-white/10 group-hover:border-blue-500/60 rounded-[2rem] -translate-x-5 translate-y-5 group-hover:-translate-x-8 group-hover:translate-y-8 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] transition-all duration-700 ease-out pointer-events-none" />
                            
                            {/* Main Image Container */}
                            <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-10 bg-[#fae8d4] group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-700 ease-out shadow-2xl">
                                <Image
                                    src="/about/image1.png"
                                    alt="Students collaborating"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="group-hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                            </div>
                            
                            {/* Floating Badge (Bottom-Right) */}
                            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-black/60 backdrop-blur-xl group-hover:bg-blue-600/90 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20 border border-white/10 group-hover:border-blue-400 group-hover:scale-110 transition-all duration-500 ease-out">
                                <span className={`${spaceGrotesk.className} text-blue-400 group-hover:text-white font-bold text-lg transition-colors duration-500`}>01</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Objective 2 */}
                <div className="group flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20 cursor-default">
                    {/* Text Content */}
                    <div className="flex-1 relative">
                        {/* Watermark */}
                        <div className="absolute -top-16 -left-8 text-[12rem] font-bold text-white/[0.03] group-hover:text-purple-500/[0.05] pointer-events-none select-none tracking-tighter z-0 transition-colors duration-700">
                            02
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-purple-500/50 group-hover:w-20 group-hover:bg-purple-400 transition-all duration-700" />
                                <span className={`${spaceGrotesk.className} tracking-[0.3em] text-xs text-purple-400/70 group-hover:text-purple-400 uppercase font-medium transition-colors duration-500`}>Objective 02</span>
                            </div>
                            
                            <h3 className={`${instrumentSerif.className} text-5xl md:text-6xl leading-[1.1] mb-8 text-white/90 group-hover:text-white transition-colors duration-500`}>
                                Commitment to <br />
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 drop-shadow-lg">sustainable development</span>
                            </h3>
                            
                            <p className={`${spaceGrotesk.className} text-white/50 group-hover:text-white/70 text-lg leading-relaxed border-l-2 border-white/5 group-hover:border-purple-500/40 pl-6 transition-all duration-500`}>
                                Central to our mission is the creation of an environment that not only promotes innovation but also ensures sustainable progress. We believe in building for the future responsibly.
                            </p>
                        </div>
                    </div>
                    
                    {/* Image Content */}
                    <div className="flex-1 w-full flex justify-center items-center p-8">
                        <div className="relative w-[90%] md:w-[80%] aspect-[4/3] perspective-1000">
                            {/* Offset Outline (Bottom-Right) */}
                            <div className="absolute inset-0 border-2 border-white/10 group-hover:border-purple-500/60 rounded-[2rem] translate-x-5 translate-y-5 group-hover:translate-x-8 group-hover:translate-y-8 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all duration-700 ease-out pointer-events-none" />
                            
                            {/* Main Image Container */}
                            <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-10 bg-[#fae8d4] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700 ease-out shadow-2xl">
                                <Image
                                    src="/about/image2.png"
                                    alt="Sustainable development"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="group-hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                            </div>
                            
                            {/* Floating Badge (Bottom-Left) */}
                            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-black/60 backdrop-blur-xl group-hover:bg-purple-600/90 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20 border border-white/10 group-hover:border-purple-400 group-hover:scale-110 transition-all duration-500 ease-out">
                                <span className={`${spaceGrotesk.className} text-purple-400 group-hover:text-white font-bold text-lg transition-colors duration-500`}>02</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
