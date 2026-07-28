"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import { usePathname } from "next/navigation";
import Lanyard from "@/components/Lanyard";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { motion } from "framer-motion";

export default function Footer() {
    const [frontImg, setFrontImg] = useState('/ID_front.avif');
    const [backImg, setBackImg] = useState('/ID_back.avif');

    useEffect(() => {
        const img = new window.Image();
        img.onload = () => {}; 
        img.onerror = () => {
            setFrontImg('/ID_front_compressed.jpg');
            setBackImg('/ID_back_compressed.jpg');
        };
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRJU09mdXAAAQAAACAAAOAAACAAAABFaXBpcwAAAAQAAABsaXNwZQAAAAAAAAABAAAAAQAAACBNQzFjAAAAABhhdjFDZ0EAAAAAAAMAAAAAAAAAAAAAAA0KcGl4aQAAAAADCAgIAAAAAQAAY29scgBObGN4AAsAAwAAcGNhZAAAAAA1aXBtYQAAAAAAAAABAAEEAQKDBQQFAwAAAAZtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    }, []);

    return (
        <div className="relative w-full z-50">
            <motion.footer className="relative bg-[#0a0a0a] text-white/80 rounded-t-[2rem] md:rounded-t-[3rem] w-full px-5 sm:px-8 md:px-12 pt-10 md:pt-16 pb-6 md:pb-8 border-t border-white/[0.04] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                
                {/* Background Layer (Clipped to rounded corners) */}
                <div className="absolute inset-0 overflow-hidden rounded-t-[2rem] md:rounded-t-[3rem] z-0">
                    {/* Topographic Background SVG - Violet tinted (Original Style Extended) */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen" 
                        style={{ 
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-100 100 C 150 -50 300 250 600 150 S 900 -50 1200 200 S 1500 450 1800 150 S 2100 -50 2500 200 S 2800 450 3200 150' stroke='%238b5cf6' fill='none' stroke-width='1.5'/%3E%3Cpath d='M-100 200 C 200 0 400 350 800 200 S 1200 200 1400 300 S 1800 400 2200 200 S 2600 200 3000 300 S 3400 400 3800 200' stroke='%238b5cf6' fill='none' stroke-width='1.5'/%3E%3Cpath d='M-100 300 C 100 100 350 450 750 300 S 1200 300 1400 400 S 1700 500 2100 300 S 2600 300 3000 400 S 3300 500 3700 300' stroke='%238b5cf6' fill='none' stroke-width='1.5'/%3E%3Cpath d='M-100 400 C 150 250 350 550 700 400 S 1200 400 1400 500 S 1800 600 2200 400 S 2600 400 3000 500 S 3400 600 3800 400' stroke='%238b5cf6' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`, 
                            backgroundSize: 'cover'
                        }}>
                    </div>
                </div>

                {/* Lanyard Layer - Hidden on Mobile to prevent overlapping text */}
                <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden rounded-t-[2rem] md:rounded-t-[3rem] hidden md:block">
                    <div className="absolute top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-full flex items-center justify-center translate-x-8 md:translate-x-16 lg:translate-x-24 pointer-events-auto">
                        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} flipped={true} frontImage={frontImg} backImage={backImg} lanyardImage="/lanyard.webp" />
                    </div>
                </div>

                {/* Logo on Top Left */}
                <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20 pointer-events-none">
                    <div className="relative">
                        {/* Glow behind the logo */}
                        <div className="absolute inset-0 bg-violet-600/30 blur-[20px] md:blur-[30px] rounded-full w-12 h-12 md:w-20 md:h-20"></div>
                        <Image 
                            src="/logo.webp" 
                            alt="CSI Innowave Logo" 
                            width={80} 
                            height={80} 
                            className="relative w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                        />
                    </div>
                </div>

                {/* Central Floating 3D Asterisk */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center z-20 pointer-events-none">
                    <div className="relative w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                        <div className="absolute w-full h-[25%] bg-violet-600 rounded-full rotate-0 opacity-90 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] border border-violet-400/50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 6px)'}}></div>
                        <div className="absolute w-full h-[25%] bg-violet-600 rounded-full rotate-[60deg] opacity-90 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] border border-violet-400/50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 6px)'}}></div>
                        <div className="absolute w-full h-[25%] bg-violet-600 rounded-full -rotate-[60deg] opacity-90 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] border border-violet-400/50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 6px)'}}></div>
                    </div>
                </div>

                <div className="relative z-50 max-w-7xl mx-auto flex flex-col items-center mt-2 md:mt-4 mb-8 md:mb-12">
                    <h2 className={`${instrumentSerif.className} text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-2 md:mb-3 text-center tracking-tight leading-tight`}>
                        CSI Innowave
                    </h2>
                    <p className={`${instrumentSerif.className} text-sm sm:text-base md:text-2xl text-white/50 italic mb-6 md:mb-8 text-center`}>
                        Pioneering the future of technology
                    </p>

                    {/* Pill Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
                        <Link href="https://www.instagram.com/mait_csi_innowave/" target="_blank" className={`${spaceGrotesk.className} bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 md:px-6 md:py-2.5 rounded-full flex items-center justify-center gap-3 font-semibold text-xs sm:text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.3)]`}>
                            Follow on Instagram <span className="bg-white text-violet-600 rounded-full p-1"><FaArrowRight size={10} /></span>
                        </Link>
                        <Link href="#" target="_blank" className={`${spaceGrotesk.className} border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 px-5 py-2.5 md:px-6 md:py-2.5 rounded-full flex items-center justify-center gap-3 font-semibold text-xs sm:text-sm transition-transform hover:scale-105`}>
                            Join Community <span className="bg-violet-500/20 text-violet-400 rounded-full p-1"><FaArrowRight size={10} /></span>
                        </Link>
                    </div>
                </div>

                <div className={`relative z-50 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-white/60 text-xs sm:text-sm ${spaceGrotesk.className} mb-8 md:mb-10`}>
                    {/* Column 1: Contact */}
                    <div className="flex flex-col gap-1 pt-0 md:pt-6">
                        <h3 className="text-white text-base md:text-lg font-medium mb-2 md:mb-3">Contact</h3>
                        <p>MAIT, Sector 22, Rohini</p>
                        <p>110086 Delhi</p>
                        <p className="mt-1">+91 8920125672</p>
                        <Link href="mailto:csiinnowave@gmail.com" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white mt-1">csiinnowave@gmail.com</Link>
                    </div>

                    {/* Column 2: Socials */}
                    <div className="flex flex-col gap-2 pt-0 md:pt-6">
                        <h3 className="text-white text-base md:text-lg font-medium mb-2 md:mb-3 sm:hidden">Socials</h3>
                        <Link href="https://www.instagram.com/mait_csi_innowave/" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors w-fit group">
                            Instagram <span className="text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                        </Link>
                        <Link href="https://www.linkedin.com/company/csi-innowave/" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors w-fit group">
                            LinkedIn <span className="text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                        </Link>
                        <Link href="https://x.com/CsiInnowave" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors w-fit group">
                            X / Twitter <span className="text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                        </Link>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="flex flex-col gap-1 md:col-span-2 pt-0 md:pt-6">
                        <h3 className="text-white text-base md:text-lg font-medium mb-2 md:mb-3">Quick links</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <Link href="/" prefetch={true} className="hover:text-white transition-colors">Home</Link>
                            <Link href="/team" prefetch={true} className="hover:text-white transition-colors">Team</Link>
                            <Link href="/events" prefetch={true} className="hover:text-white transition-colors">Events</Link>
                            <Link href="/gallery" prefetch={true} className="hover:text-white transition-colors">Gallery</Link>
                            <Link href="/about" prefetch={true} className="hover:text-white transition-colors">About</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`relative z-50 max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-6 mt-6 border-t border-white/5 pt-4 ${spaceGrotesk.className}`}>
                    <div className="flex flex-wrap justify-center text-white/50 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">
                        <span>© 2025 CSI Innowave</span>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
}