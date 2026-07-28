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
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050505]/65 backdrop-blur-md transform-gpu text-white selection:bg-white/20 overflow-hidden"
                >
                    {/* Top Ultra-Thin Hairline Progress Indicator */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] w-full bg-white/5 overflow-hidden">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                            className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                        />
                    </div>

                    {/* Subtle Center Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

                    {/* Minimalist Center Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        {/* Minimal Spinner Ring with Logo */}
                        <div className="relative mb-6 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border border-white/10 border-t-white animate-spin [animation-duration:1s]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="CSI Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain opacity-90"
                                />
                            </div>
                        </div>

                        {/* Editorial Minimal Typography */}
                        <p className="text-xs font-medium tracking-[0.4em] uppercase text-white/80">
                            {targetPageName || "CSI • MAIT"}
                        </p>
                        <p className="mt-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
                            Loading
                        </p>
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
