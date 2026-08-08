"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DotmSquare15 } from "@/components/ui/dotm-square-15";

function FullScreenLoaderContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [targetPageName, setTargetPageName] = useState("");
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
                            src="/logo.webp"
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

                    {/* Background Radial Spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />

                    {/* Center Installed DotMatrix Component & Telemetry Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        {/* Installed DotmSquare15 Component */}
                        <div className="mb-6 flex items-center justify-center">
                            <DotmSquare15 size={48} dotSize={6} />
                        </div>

                        {/* Kinetic Letter-Spacing Reveal */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-xs font-semibold uppercase text-white/80 tracking-[0.5em] ml-[0.5em]"
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
