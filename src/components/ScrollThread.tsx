"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  WiMoonAltNew, WiMoonAltWaxingCrescent1, WiMoonAltWaxingCrescent2, WiMoonAltWaxingCrescent3, WiMoonAltWaxingCrescent4, WiMoonAltWaxingCrescent5, WiMoonAltWaxingCrescent6,
  WiMoonAltFirstQuarter, WiMoonAltWaxingGibbous1, WiMoonAltWaxingGibbous2, WiMoonAltWaxingGibbous3, WiMoonAltWaxingGibbous4, WiMoonAltWaxingGibbous5, WiMoonAltWaxingGibbous6,
  WiMoonAltFull, WiMoonAltWaningGibbous1, WiMoonAltWaningGibbous2, WiMoonAltWaningGibbous3, WiMoonAltWaningGibbous4, WiMoonAltWaningGibbous5, WiMoonAltWaningGibbous6,
  WiMoonAltThirdQuarter, WiMoonAltWaningCrescent1, WiMoonAltWaningCrescent2, WiMoonAltWaningCrescent3, WiMoonAltWaningCrescent4, WiMoonAltWaningCrescent5, WiMoonAltWaningCrescent6
} from "react-icons/wi";

const moonPhases = [
  WiMoonAltNew, WiMoonAltWaxingCrescent1, WiMoonAltWaxingCrescent2, WiMoonAltWaxingCrescent3, WiMoonAltWaxingCrescent4, WiMoonAltWaxingCrescent5, WiMoonAltWaxingCrescent6,
  WiMoonAltFirstQuarter, WiMoonAltWaxingGibbous1, WiMoonAltWaxingGibbous2, WiMoonAltWaxingGibbous3, WiMoonAltWaxingGibbous4, WiMoonAltWaxingGibbous5, WiMoonAltWaxingGibbous6,
  WiMoonAltFull, WiMoonAltWaningGibbous1, WiMoonAltWaningGibbous2, WiMoonAltWaningGibbous3, WiMoonAltWaningGibbous4, WiMoonAltWaningGibbous5, WiMoonAltWaningGibbous6,
  WiMoonAltThirdQuarter, WiMoonAltWaningCrescent1, WiMoonAltWaningCrescent2, WiMoonAltWaningCrescent3, WiMoonAltWaningCrescent4, WiMoonAltWaningCrescent5, WiMoonAltWaningCrescent6,
  WiMoonAltNew
];

export default function ScrollThread() {
    const pathname = usePathname();
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        restDelta: 0.001
    });

    const orbTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
    
    const [phaseIndex, setPhaseIndex] = useState(0);

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const index = Math.min(moonPhases.length - 1, Math.floor(latest * moonPhases.length));
        setPhaseIndex(index);
    });

    if (pathname === '/events') {
        return null;
    }

    const CurrentMoon = moonPhases[phaseIndex];

    return (
        <div className="fixed top-[15vh] left-2 md:left-6 bottom-[15vh] w-12 z-50 pointer-events-none flex justify-center">
            {/* Vertical Guide Line Track */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-0" />

            {/* The Moon Thumb */}
            <motion.div
                className="absolute w-full flex flex-col items-center justify-center -mt-4 text-violet-300"
                style={{ top: orbTop }}
            >
                {/* Glow behind the moon */}
                <div className="absolute w-8 h-8 bg-violet-500/30 rounded-full blur-[8px]" />
                
                {/* The Moon Icon */}
                {CurrentMoon ? (
                    <CurrentMoon size={32} className="relative z-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                ) : (
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                )}
            </motion.div>
        </div>
    );
}
