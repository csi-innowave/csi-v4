"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalWatermark() {
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Transformation maps
    const scrollProgress = useTransform(scrollY, [0, 800], [0, 1]);
    const smoothProgress = useSpring(scrollProgress, { damping: 20, stiffness: 100 });

    const scale = useTransform(smoothProgress, [0, 1], [1, 0.2]);
    const rotate = useTransform(smoothProgress, [0, 1], [0, 90]);
    const opacity = useTransform(smoothProgress, [0, 1], [1, 0.05]);
    
    // We move it from its initial hero position to the far right edge
    const x = useTransform(smoothProgress, [0, 1], ["0vw", "45vw"]);
    const y = useTransform(smoothProgress, [0, 1], ["0vh", "30vh"]);

    // Entrance animation matching the hero
    const textReveal = {
        hidden: { y: "100%", opacity: 0 },
        show: { 
            y: "0%", 
            opacity: 1,
            transition: { ease: [0.16, 1, 0.3, 1], duration: 1.2, delay: 0.1 } // matches hero stagger
        },
    };

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-start pl-4 md:pl-12 pt-[10vh]">
            <motion.div 
                className="origin-left w-full max-w-[1400px] mx-auto overflow-hidden"
                style={{ scale, rotate, opacity, x, y }}
            >
                <motion.h1 
                    variants={textReveal}
                    initial="hidden"
                    animate="show"
                    className="text-[12vw] md:text-[10vw] lg:text-[14vw] font-black tracking-tighter leading-[0.8] text-white flex items-baseline"
                >
                    CSI<span className="text-violet-500">.</span>
                </motion.h1>
            </motion.div>
        </div>
    );
}
