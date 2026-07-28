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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#030305]/80 backdrop-blur-xl transform-gpu text-white selection:bg-purple-500/20 overflow-hidden"
                >
                    {/* Top Thin Glow Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] w-full bg-white/5 overflow-hidden">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                            className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.9)]"
                        />
                    </div>

                    {/* Top Left Logo & Telemetry Header */}
                    <div className="absolute top-8 left-8 flex items-center gap-3 select-none pointer-events-none z-20">
                        <Image
                            src="/logo.png"
                            alt="CSI Logo"
                            width={28}
                            height={28}
                            className="object-contain opacity-90"
                        />
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                            <span>CSI // INNOWAVE</span>
                        </div>
                    </div>

                    {/* Bottom Right Status Tag */}
                    <div className="absolute bottom-8 right-8 text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase select-none pointer-events-none">
                        <span>MATRIX • NAVIGATING</span>
                    </div>

                    {/* Background Radial Spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />

                    {/* Center Dot Matrix & Telemetry Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        {/* 5x5 LED Dot Matrix Display */}
                        <div className="grid grid-cols-5 gap-3 mb-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl relative">
                            {/* Matrix Framing Corner Highlights */}
                            <div className="absolute top-[-4px] left-[-4px] w-2.5 h-2.5 border-t-2 border-l-2 border-purple-400" />
                            <div className="absolute bottom-[-4px] right-[-4px] w-2.5 h-2.5 border-b-2 border-r-2 border-purple-400" />

                            {Array.from({ length: 25 }).map((_, i) => {
                                const row = Math.floor(i / 5);
                                const col = i % 5;
                                const delay = (row + col) * 0.08;
                                return (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: [0.65, 1.2, 0.65],
                                            opacity: [0.25, 1, 0.25],
                                            backgroundColor: [
                                                "rgba(255, 255, 255, 0.2)",
                                                "rgba(168, 85, 247, 1)",
                                                "rgba(255, 255, 255, 0.2)",
                                            ],
                                            boxShadow: [
                                                "0 0 0px rgba(0,0,0,0)",
                                                "0 0 12px rgba(168,85,247,0.9)",
                                                "0 0 0px rgba(0,0,0,0)",
                                            ],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.2,
                                            delay,
                                            ease: "easeInOut",
                                        }}
                                        className="w-2.5 h-2.5 rounded-full"
                                    />
                                );
                            })}
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
