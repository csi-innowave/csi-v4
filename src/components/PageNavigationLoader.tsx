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
            }, 250);
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
                // Format page name for display
                let pageTitle = targetPath.replace("/", "").toUpperCase();
                if (!pageTitle) pageTitle = "HOME";

                setTargetPageName(pageTitle);
                setIsLoading(true);
            }
        };

        // Handle browser back/forward buttons
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
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050507] text-white selection:bg-purple-500/30 overflow-hidden"
                >
                    {/* Background Radial Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[25rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Centered Content Card */}
                    <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-sm">
                        {/* Logo with Spinning Gradient Ring */}
                        <div className="relative mb-8 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                                className="w-20 h-20 rounded-full border-2 border-transparent border-t-violet-500 border-r-blue-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="CSI Logo"
                                    width={42}
                                    height={42}
                                    className="object-contain animate-pulse"
                                />
                            </div>
                        </div>

                        {/* Navigation Status Text */}
                        <h3 className="text-xl font-bold tracking-[0.25em] text-white uppercase mb-2">
                            {targetPageName ? `LOADING ${targetPageName}` : "LOADING EXPERIENCE..."}
                        </h3>

                        {/* Animated Gradient Progress Line */}
                        <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden mt-4 relative">
                            <motion.div
                                animate={{
                                    x: ["-100%", "100%"],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.2,
                                    ease: "easeInOut",
                                }}
                                className="w-full h-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-full"
                            />
                        </div>

                        <p className="mt-4 text-[11px] font-semibold tracking-[0.3em] uppercase text-white/40">
                            CSI • MAIT
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
