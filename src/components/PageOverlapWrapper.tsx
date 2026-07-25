"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function PageOverlapWrapper({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [winHeight, setWinHeight] = useState(1000);

    useEffect(() => {
        setWinHeight(window.innerHeight);
        const handleResize = () => setWinHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["end end", "end start"]
    });

    // Map scroll progress to exact pixel values using window height for perfectly smooth hardware acceleration
    const y = useTransform(scrollYProgress, [0, 1], [0, winHeight]);

    return (
        <motion.div suppressHydrationWarning ref={containerRef} style={{ y, willChange: "transform" }} className="relative z-0 w-full bg-[#111111] pb-40 md:pb-56">
            {children}
        </motion.div>
    );
}
