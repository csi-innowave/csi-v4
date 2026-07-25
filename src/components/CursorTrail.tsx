"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { LinkedinIcon } from "lucide-react";

export default function CursorTrail() {
    const pathname = usePathname();
    const isTeamPage = pathname === "/team";

    // useMotionValue avoids React state re-renders, enabling instant 60/120fps tracking
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Hyper-responsive spring configuration for incredibly smooth, zero-lag following
    const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [hoverIcon, setHoverIcon] = useState<string | null>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        setIsTouchDevice(isTouch);
        if (isTouch) return;

        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Check if any parent element has a data-cursor attribute
            const cursorElement = target.closest('[data-cursor]');
            if (cursorElement) {
                setHoverIcon(cursorElement.getAttribute('data-cursor'));
                setIsHovering(true);
            } else {
                setHoverIcon(null);
                const isClickable =
                    window.getComputedStyle(target).cursor === "pointer" ||
                    target.tagName.toLowerCase() === "a" ||
                    target.tagName.toLowerCase() === "button";
                setIsHovering(isClickable);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (isTouchDevice) return null;

    return (
        <motion.div
            className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full flex items-center justify-center overflow-hidden
                ${isTeamPage && !hoverIcon ? "bg-white/10 backdrop-blur-sm border border-white/20" : ""}
                ${!isTeamPage && !hoverIcon ? "mix-blend-difference bg-white" : ""}
                ${hoverIcon === 'linkedin' ? "bg-[#0077b5] text-white shadow-[0_0_20px_rgba(0,119,181,0.5)]" : ""}
            `}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                width: hoverIcon ? 64 : (isHovering ? 48 : 16),
                height: hoverIcon ? 64 : (isHovering ? 48 : 16),
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.5,
            }}
        >
            {hoverIcon === 'linkedin' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    className="flex items-center justify-center w-full h-full"
                >
                    <LinkedinIcon size={28} strokeWidth={1.5} fill="currentColor" />
                </motion.div>
            )}
        </motion.div>
    );
}
