"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function FullScreenLoaderContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [targetPageName, setTargetPageName] = useState("");
    const [counter, setCounter] = useState(0);
    const prevPathnameRef = useRef(pathname);

    // Fade out loader when pathname or searchParams change (page is loaded)
    useEffect(() => {
        if (prevPathnameRef.current !== pathname) {
            prevPathnameRef.current = pathname;
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [pathname, searchParams]);

    // Rapid 00% -> 98% percentage counter animation
    useEffect(() => {
        if (isLoading) {
            setCounter(14);
            const interval = setInterval(() => {
                setCounter((prev) => {
                    if (prev >= 98) return 98;
                    return prev + Math.floor(Math.random() * 16 + 8);
                });
            }, 75);
            return () => clearInterval(interval);
        } else {
            setCounter(0);
        }
    }, [isLoading]);

    // Safety fallback: auto dismiss after 6s in case navigation is interrupted
    useEffect(() => {
        if (isLoading) {
            const safetyTimer = setTimeout(() => {
                setIsLoading(false);
            }, 6000);
            return () => clearTimeout(safetyTimer);
        }
    }, [isLoading]);

    // Intercept clicks on any internal link instantly
    useEffect(() => {
        const handleLinkClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const anchor = target?.closest("a") as HTMLAnchorElement | null;

            if (!anchor) return;

            const href = anchor.getAttribute("href");
            const targetAttr = anchor.getAttribute("target");

            // Ignore external links, mailto/tel, new tabs, or anchor hashes
            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                targetAttr === "_blank" ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            // Check if pointing to a different internal route
            const currentPath = window.location.pathname;
            const targetPath = href.split("?")[0].split("#")[0];

            if (targetPath && targetPath !== currentPath) {
                let pageTitle = targetPath.replace("/", "").toUpperCase();
                if (!pageTitle) pageTitle = "HOME";

                setTargetPageName(pageTitle);
                setIsLoading(true);
            }
        };

        const handlePopState = () => {
            setIsLoading(true);
        };

        document.addEventListener("click", handleLinkClick, { capture: true });
        window.addEventListener("popstate", handlePopState);

        return () => {
            document.removeEventListener("click", handleLinkClick, { capture: true });
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#030305]/75 backdrop-blur-xl transform-gpu text-white selection:bg-purple-500/20 overflow-hidden"
                >
                    {/* Top Thin Glow Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] w-full bg-white/5 overflow-hidden">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                            className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.9)]"
                        />
                    </div>

                    {/* Corner Telemetry Framing */}
                    <div className="absolute top-8 left-8 text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase flex items-center gap-2 select-none pointer-events-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                        <span>CSI // INNOWAVE</span>
                    </div>
                    <div className="absolute bottom-8 right-8 text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase select-none pointer-events-none">
                        <span>SYS • NAVIGATING</span>
                    </div>

                    {/* Background Radial Spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

                    {/* Center Aperture & Telemetry Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        {/* Technocultural Aperture Frame */}
                        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                            {/* Corner Tech Brackets */}
                            <div className="absolute -inset-2 border border-white/10 rounded-2xl pointer-events-none" />
                            <div className="absolute top-[-8px] left-[-8px] w-3 h-3 border-t-2 border-l-2 border-purple-400" />
                            <div className="absolute bottom-[-8px] right-[-8px] w-3 h-3 border-b-2 border-r-2 border-purple-400" />

                            {/* Dynamic SVG Laser Arc */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="44"
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.08)"
                                    strokeWidth="1.5"
                                />
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="44"
                                    fill="none"
                                    stroke="url(#gradient-aperture)"
                                    strokeWidth="2.5"
                                    strokeDasharray="276"
                                    animate={{ strokeDashoffset: [276, 60, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gradient-aperture" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="50%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Center Logo with Breathing Aura */}
                            <motion.div
                                animate={{ scale: [0.94, 1.06, 0.94], opacity: [0.85, 1, 0.85] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="relative z-10 flex items-center justify-center"
                            >
                                <Image
                                    src="/logo.png"
                                    alt="CSI Logo"
                                    width={46}
                                    height={46}
                                    className="object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                                />
                            </motion.div>
                        </div>

                        {/* Percentage Ticker */}
                        <div className="font-mono text-3xl font-light tracking-tighter text-white/90 mb-2">
                            {String(counter).padStart(2, "0")}<span className="text-purple-400 text-sm font-normal ml-0.5">%</span>
                        </div>

                        {/* Kinetic Letter-Spacing Reveal */}
                        <motion.p
                            initial={{ letterSpacing: "0.2em", opacity: 0.6 }}
                            animate={{ letterSpacing: "0.5em", opacity: 1 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" }}
                            className="text-xs font-semibold uppercase text-white/80 tracking-[0.4em] ml-[0.4em]"
                        >
                            {targetPageName ? `// ${targetPageName}` : "// LOADING"}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function PageNavigationLoader() {
    return (
        <Suspense fallback={null}>
            <FullScreenLoaderContent />
        </Suspense>
    );
}
