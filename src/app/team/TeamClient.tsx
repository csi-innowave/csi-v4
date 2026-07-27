"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React, { MouseEvent, useRef } from "react";
import {
    people1,
    people2,
    people3,
    executivesData,
} from "@/data/teamData";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Premium Cyber-Glass Card Component with Google-Color Magic Border
const CyberGlassCard = ({ person, isLarge = false }: { person: any, isLarge?: boolean }) => {
    const boundingRef = useRef<HTMLDivElement>(null);

    // Glow Values for Magic Border
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(ev: MouseEvent<HTMLDivElement>) {
        if (!boundingRef.current) return;
        const rect = boundingRef.current.getBoundingClientRect();
        mouseX.set(ev.clientX - rect.left);
        mouseY.set(ev.clientY - rect.top);
    }

    // The mask that reveals the colorful background only around the cursor
    const magicMask = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black, transparent 100%)`;
    // A softer spotlight for the inside of the card
    const innerSpotlight = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255, 0.05), transparent 80%)`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`relative flex flex-col w-full ${isLarge ? "aspect-[3/4] max-w-[320px]" : "aspect-[3/4] max-w-[280px]"}`}
        >
            <motion.div
                ref={boundingRef}
                onMouseMove={handleMouseMove}
                whileHover={{ zIndex: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                // Increased padding to p-1.5 (6px) to make the border thicker/deeper
                className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer p-1.5 bg-zinc-900 shadow-xl"
            >
                {/* The Mask Wrapper (Exactly matches the container bounds for perfect cursor tracking) */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        WebkitMaskImage: magicMask,
                        maskImage: magicMask
                    }}
                >
                    {/* The Google-Color Conic Gradient Layer (Spins inside the masked wrapper) */}
                    <div
                        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
                        style={{
                            background: "conic-gradient(from 0deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 75%, #4285F4 100%)",
                        }}
                    />
                </motion.div>

                {/* The Inner Card Content Layer (Hollow/Valley Effect) - Entire area acts as a link */}
                <Link
                    href={person.links?.linkedin || "#"}
                    target="_blank"
                    data-cursor="linkedin"
                    className="relative z-10 w-full h-full bg-[#0a0a0a] rounded-xl overflow-hidden flex flex-col shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(0,0,0,0.9)] ring-1 ring-black/50 cursor-none block"
                >

                    {/* Soft Inner Spotlight */}
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
                        style={{ background: innerSpotlight }}
                    />

                    {/* The Image */}
                    <div className="absolute inset-0 w-full h-full opacity-100 transition-opacity duration-500">
                        {person.image_source ? (
                            <img
                                src={person.image_source.includes('/upload/') ? person.image_source.replace(/\/upload\//, '/upload/f_auto,q_auto,w_400/') : person.image_source}
                                alt={person.name}
                                className="w-full h-full object-cover object-top brightness-110 group-hover:brightness-115 transition-all duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 animate-pulse flex items-center justify-center">
                                <svg className="w-20 h-20 text-zinc-700" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Focused Bottom Dark Gradient for Text Contrast */}
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none z-20" />

                    {/* Frosted Glass Info Block at the Bottom (Static, no movement on hover) */}
                    <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end z-30 pointer-events-none">
                        <div className="relative z-10">
                            <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight drop-shadow-md">
                                {person.name}
                            </h3>
                            <p className="text-xs text-zinc-300 font-light mt-1 drop-shadow-md">
                                {person.position || "Executive"}
                            </p>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
};

// Bento Box with Google-Color Magic Border
const BentoBox = ({ dept, index }: { dept: any, index: number }) => {
    const boundingRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(ev: MouseEvent<HTMLDivElement>) {
        if (!boundingRef.current) return;
        const rect = boundingRef.current.getBoundingClientRect();
        mouseX.set(ev.clientX - rect.left);
        mouseY.set(ev.clientY - rect.top);
    }

    const magicMask = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, black, transparent 100%)`;
    const isWide = dept.name.includes("Technical");
    const isSuperior = dept.name.includes("Technical") || dept.name.includes("Research");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            className={`relative flex flex-col ${isWide ? "md:col-span-2" : "col-span-1"}`}
        >
            <motion.div
                ref={boundingRef}
                onMouseMove={handleMouseMove}
                className={`group relative w-full h-full rounded-[2rem] overflow-hidden p-1.5 bg-zinc-900 shadow-xl ${isSuperior ? 'ring-1 ring-white/5' : ''}`}
            >
                {/* The Mask Wrapper (Exactly matches the container bounds for perfect cursor tracking) */}
                <motion.div
                    className={`absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none ${isSuperior ? 'opacity-20 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{
                        WebkitMaskImage: magicMask,
                        maskImage: magicMask
                    }}
                >
                    {/* The Google-Color Conic Gradient Layer (Spins inside the masked wrapper) */}
                    <div
                        className="absolute inset-[-100%] animate-[spin_6s_linear_infinite]"
                        style={{
                            background: "conic-gradient(from 0deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 75%, #4285F4 100%)",
                        }}
                    />
                </motion.div>

                {/* Inner Content Layer (Hollow/Valley Effect) */}
                <div className={`relative z-10 w-full h-full flex flex-col p-6 lg:p-8 rounded-[1.6rem] bg-[#0a0a0a]/95 overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(0,0,0,0.9)] ring-1 ${isSuperior ? 'ring-blue-500/10' : 'ring-black/50'}`}>
                    <h3 className={`relative z-10 font-mono text-lg mb-6 tracking-wider ${isSuperior ? 'text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]' : 'text-blue-400'}`}>
                        {dept.name.replace("Executives", "").trim()}
                    </h3>

                    <div className="relative z-10 flex flex-wrap gap-3">
                        {dept.people && dept.people.map((executive: any, idx: number) => (
                            <Link
                                key={executive.name || idx}
                                href={executive.links?.linkedin || "#"}
                                target="_blank"
                                data-cursor="linkedin"
                                className="group/pill relative overflow-hidden rounded-full border border-white/10 bg-black/60 px-4 py-2 hover:border-blue-500/50 transition-all duration-500 cursor-none flex items-center gap-3 shadow-inner"
                            >
                                {/* Sweeping gradient background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-transparent -translate-x-[100%] group-hover/pill:translate-x-0 transition-transform duration-700 ease-out" />

                                {/* Glowing dot indicator */}
                                <div className="relative z-10 h-1.5 w-1.5 rounded-full bg-zinc-600 group-hover/pill:bg-blue-400 transition-colors shadow-[0_0_0px_rgba(96,165,250,0)] group-hover/pill:shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

                                <span className="relative z-10 text-sm font-medium text-zinc-300 group-hover/pill:text-white transition-colors">
                                    {executive.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


export default function TeamClient() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden bg-[#111111]">
            {/* Global Ambient Glow */}
            <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0" />

            {/* Hero Section */}
            <div className="relative w-full flex flex-col items-center justify-center z-10 px-4 mt-32 mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold tracking-widest uppercase mb-6"
                >
                    MAIT Chapter
                </motion.div>

                {/* Animated Gradient Hero Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text text-center pb-2 bg-[linear-gradient(110deg,#fff,45%,#93c5fd,55%,#fff)] bg-[length:200%_auto] animate-shimmer"
                >
                    Meet the Team
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-4 text-zinc-400 max-w-2xl text-center font-light text-lg px-4"
                >
                    The creative minds, brilliant engineers, and visionary leaders powering the Computer Society of India at MAIT.
                </motion.p>
            </div>

            <div className="w-full max-w-7xl px-4 md:px-8 flex flex-col gap-y-32 z-10">

                {/* 1. Chief Patron */}
                <section className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-mono text-blue-500 tracking-widest uppercase mb-10 text-center">
                        &lt; Chief Patron /&gt;
                    </h2>
                    <CyberGlassCard
                        person={{
                            name: "Dr. Nand Kishore Garg",
                            position: "Chief Patron",
                            image_source: "https://res.cloudinary.com/dpp2rltxx/image/upload/v1709131195/csi/team/k7in6h3xqjfzqr9dwcma.jpg"
                        }}
                        isLarge={true}
                    />
                </section>

                {/* 2. Faculty Coordinators */}
                <section className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-mono text-purple-500 tracking-widest uppercase mb-10 text-center">
                        &lt; Faculty Coordinators /&gt;
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center w-full"
                    >
                        {people1.map((person) => (
                            <CyberGlassCard key={person.id || person.name} person={person} />
                        ))}
                    </motion.div>
                </section>
                {/* 3. Advisors */}
                <section className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-mono text-indigo-500 tracking-widest uppercase mb-10 text-center">
                        &lt; Advisors /&gt;
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center w-full"
                    >
                        {people3.map((person) => (
                            <CyberGlassCard key={person.id || person.name} person={person} />
                        ))}
                    </motion.div>
                </section>

                {/* 4. Core Team */}
                <section className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-mono text-blue-500 tracking-widest uppercase mb-10 text-center">
                        &lt; Core Team /&gt;
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center w-full"
                    >
                        {people2.map((person) => (
                            <CyberGlassCard key={person.id || person.name} person={person} />
                        ))}
                    </motion.div>
                </section>

                {/* 5. Department Executives - Bento Box UI */}
                <section className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-mono text-purple-500 tracking-widest uppercase mb-10 text-center">
                        &lt; Department Executives /&gt;
                    </h2>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                        {executivesData.slice(0, 3).map((dept, index) => (
                            <BentoBox key={dept.name || index} dept={dept} index={index} />
                        ))}
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {executivesData.slice(3).map((dept, index) => (
                            <BentoBox key={dept.name || (index + 3)} dept={dept} index={index + 3} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
