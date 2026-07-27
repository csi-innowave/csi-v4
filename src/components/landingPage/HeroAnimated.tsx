"use client";

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/magicui/Magnetic";
import { useEffect } from "react";
import Particles from "@/components/Particles";

export default function HeroAnimated() {

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
            },
        },
    };

    // Premium heavy-deceleration ease
    const easeOut = [0.76, 0, 0.24, 1] as const;

    const textReveal = {
        hidden: { y: "110%" },
        show: {
            y: "0%",
            transition: { ease: easeOut, duration: 1.2 }
        },
    };

    const dotReveal = {
        hidden: { y: "110%" },
        show: {
            y: "0%",
            transition: { ease: easeOut, duration: 1, delay: 0.5 }
        },
    };


    // Global Mouse Tracking for CSS Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Slight translation for the WebGL canvas wrapper
    const parallaxX = useTransform(smoothMouseX, [-1000, 1000], [30, -30]);
    const parallaxY = useTransform(smoothMouseY, [-1000, 1000], [30, -30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX - innerWidth / 2);
            mouseY.set(e.clientY - innerHeight / 2);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative w-full bg-[#111111]">
            <div className="relative h-screen w-full flex flex-col justify-between pt-32 pb-12 px-4 md:px-12 overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* High-Performance WebGL Particles with Parallax Wrapper */}
                    <motion.div
                        style={{ x: parallaxX, y: parallaxY, scale: 1.15 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <Particles
                            particleColors={['#ffffff', '#ffffff']}
                            particleCount={700}
                            particleSpread={25}
                            speed={0.1}
                            particleBaseSize={100}
                            moveParticlesOnHover={false} // Disable internal WebGL mouse move, using CSS parallax instead
                            alphaParticles={true}
                            disableRotation={false}
                            className="w-full h-full"
                        />
                    </motion.div>

                    {/* Subtle Tech Grid Background */}
                    <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-80" />

                    {/* Ambient Grounding Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,_rgba(30,30,40,0.4),_rgba(0,0,0,0))] z-0" />

                    {/* Glowing Animated Orbs */}
                    <motion.div
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 30, 0],
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.15, 1]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            y: [0, 50, 0],
                            x: [0, -40, 0],
                            opacity: [0.15, 0.35, 0.15],
                            scale: [1, 1.25, 1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[20%] right-[0%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
                    />
                </div> {/* End background wrapper */}

                {/* Text layer */}
                <motion.div
                    className="absolute inset-0 z-10 flex flex-col justify-between pt-32 pb-12 px-4 md:px-12 pointer-events-none mix-blend-lighten"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="w-full max-w-[1400px] mx-auto flex flex-col flex-grow pointer-events-auto"
                    >
                        {/* Top Row: Ethos (Left) & College Name (Right) */}
                        <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-start w-full mb-auto">
                            <div className="overflow-hidden text-left max-w-sm">
                                <motion.p
                                    variants={textReveal}
                                    className="text-sm md:text-base font-light text-white/50 leading-[1.8] tracking-wide"
                                >
                                    Fostering innovation,<br />
                                    sustainable progress, and the<br />
                                    entrepreneurial spirit since 2009.
                                </motion.p>
                            </div>

                            <div className="overflow-hidden mt-8 md:mt-2 flex items-center gap-3">
                                <motion.div variants={textReveal} className="w-12 h-px bg-white/20"></motion.div>
                                <motion.p
                                    variants={textReveal}
                                    className="text-[10px] md:text-[11px] font-light tracking-[0.4em] uppercase text-white/40"
                                >
                                    Maharaja Agrasen Institute of Technology
                                </motion.p>
                            </div>
                        </motion.div>



                        {/* Bottom Block: Typography & CTA */}
                        <div className="flex flex-col w-full mt-12 md:mt-0 z-10">

                            {/* Row 1: CSI (Left) & CTA (Right) */}
                            <motion.div className="flex items-end justify-between w-full">

                                {/* CSI Typography */}
                                <div className="overflow-hidden pb-6 pr-8 -mr-8 -mb-4">
                                    <motion.h1
                                        variants={textReveal}
                                        className="text-[18vw] md:text-[15vw] font-black tracking-[-0.06em] leading-[0.85] text-white flex items-baseline"
                                    >
                                        CSI
                                        <motion.span
                                            variants={dotReveal}
                                            className="text-purple-500 inline-block ml-1"
                                            style={{ filter: 'drop-shadow(0 0 16px rgba(168, 85, 247, 0.6))' }}
                                        >
                                            .
                                        </motion.span>
                                    </motion.h1>
                                </div>

                                {/* Refined Split-Pill CTA */}
                                <motion.div variants={textReveal} className="hidden md:flex flex-col items-end gap-3 mb-6 md:mb-10">
                                    <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-mono">
                                        [ 01 ] Recruitment Open
                                    </span>
                                    <Magnetic>
                                        <Link href="https://forms.gle/oynZTTsJxGzPNyV76" target="_blank" rel="noopener noreferrer">
                                            <div className="group flex items-center gap-6 pl-6 pr-2 py-2 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-sm transition-all duration-500 cursor-pointer">
                                                <span className="text-xs tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors duration-500">
                                                    Join Society
                                                </span>
                                                {/* Arrow Circle */}
                                                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full transition-all duration-500 group-hover:bg-blue-500 group-hover:scale-110">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-black group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                                                        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </Magnetic>
                                </motion.div>
                            </motion.div>

                            {/* Row 2: INNOWAVE (Right Aligned - scales without fading!) */}
                            <div className="relative flex justify-end w-full mt-2 md:mt-1 overflow-hidden pb-6 -mr-4 md:-mr-12">
                                {/* The Box around the text */}
                                <motion.div variants={textReveal} className="relative overflow-hidden rounded-none border border-white/10 shadow-2xl">
                                    {/* Video in background of the box */}
                                    <video 
                                        src="/textfill.mp4" 
                                        autoPlay loop muted playsInline 
                                        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90" 
                                    />
                                    
                                    {/* The Animating Black Text (Becomes transparent due to parent mix-blend-lighten) */}
                                    <motion.div variants={textReveal} className="relative z-10 pl-4 md:pl-8 pr-2 md:pr-4 py-2 md:py-4 flex justify-end">
                                        <h1
                                            className="text-[18vw] md:text-[15vw] font-black tracking-[-0.06em] leading-[0.85] text-black inline-block"
                                            style={{
                                                WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
                                            }}
                                        >
                                            INNOWAVE
                                        </h1>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                {/* Global <Noise /> from layout.tsx applies here seamlessly */}

            </div>
        </section>
    );
}