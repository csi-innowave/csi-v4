"use client";

import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { motion, useScroll, useSpring, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
    style: "italic",
});

const items = [
    {
        title: "SPIRIT OF ADVENTURE",
        description: "Embracing the digital revolution by hosting a VR gaming station at Techsurge & Mridang.",
        media: {
            type: "image",
            src: "https://res.cloudinary.com/du0mba5mz/image/upload/f_auto,q_auto/v1722872876/CSI/WhatsApp_Image_2024-08-05_at_14.28.28_95e8cc38_oeaoze.jpg",
            alt: "Adventure",
            className: ""
        }
    },
    {
        title: "ART OF DESIGN",
        description: "Our team hand-printed this to leave a lasting mark on MindForge! The creativity speaks for itself.",
        media: {
            type: "video",
            src: "https://res.cloudinary.com/du0mba5mz/video/upload/v1722875071/CSI/Recording_2024-08-05_215455_anz67d.mp4",
            alt: "Art of Design",
            className: ""
        }
    },
    {
        title: "COMMUNICATION",
        description: "Communication and planning are absolutely crucial for any successful event.",
        media: {
            type: "video",
            src: "https://res.cloudinary.com/du0mba5mz/video/upload/v1722875836/CSI/Untitled_design2_y9ylh7.mp4",
            alt: "Communication",
            className: "object-top"
        }
    },
    {
        title: "TEAM COLLABORATION",
        description: "The people who became family, always there through our highs and lows.",
        media: {
            type: "image",
            src: "https://res.cloudinary.com/du0mba5mz/image/upload/f_auto,q_auto/v1722877884/CSI/Screenshot_2024-08-05_224149_cdr5aj.png",
            alt: "Team Collaboration",
            className: "grayscale hover:grayscale-0 transition-all duration-1000 object-[center_30%]"
        }
    },
    {
        title: "DIGITAL REVOLUTION",
        description: "Our VR gaming stall showcased our tech enthusiasm in the Innovation Mela.",
        media: {
            type: "video",
            src: "https://res.cloudinary.com/du0mba5mz/video/upload/v1722877017/CSI/Untitled_design3_cvfszb.mp4",
            alt: "Digital Revolution",
            className: ""
        }
    },
    {
        title: "JOY OF CREATION",
        description: "Our entire team came together to create joyous memories and build something amazing!",
        media: {
            type: "image",
            src: "https://res.cloudinary.com/du0mba5mz/image/upload/f_auto,q_auto/v1722837673/CSI/Screenshot_2024-08-05_113134_vueyzc.png",
            alt: "Joy of Creation",
            className: "object-[center_30%]"
        }
    },
    {
        title: "VR INFUSION",
        description: "Join the quest for experiencing the ultimate thrill of bringing ideas to life.",
        media: {
            type: "image",
            src: "https://res.cloudinary.com/du0mba5mz/image/upload/f_auto,q_auto/v1722872876/CSI/WhatsApp_Image_2024-08-05_at_14.27.21_8391df60_ukn57q.jpg",
            alt: "VR Infusion",
            className: "object-top"
        }
    },
];

const ScrubbableContentBlock = ({
    item,
    index,
    scrollYProgress,
    totalItems
}: {
    item: typeof items[0],
    index: number,
    scrollYProgress: MotionValue<number>,
    totalItems: number
}) => {
    const isEven = index % 2 === 0;

    // Mathematically calculate the scroll window for this specific item
    const chunk = 1 / totalItems;
    const start = index * chunk;
    const enterEnd = start + chunk * 0.30;
    const exitStart = start + chunk * 0.70;
    const end = start + chunk;

    // If this is the last item, we freeze it at the active state instead of letting it drop down
    const isLast = index === totalItems - 1;
    const val = (active: number, exit: number) => isLast ? active : exit;

    // Core opacity
    const opacity = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [0, 1, 1, val(1, 0)]
    );

    // Track active/visible state dynamically to unmount hidden videos/images
    const [isVisible, setIsVisible] = useState(false);
    useMotionValueEvent(opacity, "change", (latest) => {
        setIsVisible(latest > 0.05);
    });

    // ==========================================
    // NATURAL MEDIA TRANSFORMS (Images/Videos)
    // ==========================================
    const mediaX = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [isEven ? -150 : 150, 0, 0, val(0, isEven ? -50 : 50)]
    );
    const mediaY = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [60, 0, 0, val(0, 100)]
    );
    const mediaRotate = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [isEven ? -4 : 4, 0, 0, val(0, isEven ? 4 : -4)]
    );
    const mediaScale = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [0.85, 1, 1, val(1, 0.9)]
    );

    // ==========================================
    // ELEGANT TEXT TRANSFORMS (Typography)
    // ==========================================
    const textX = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [isEven ? 100 : -100, 0, 0, val(0, isEven ? 40 : -40)]
    );
    const textY = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [40, 0, 0, val(0, 80)]
    );
    const textScale = useTransform(
        scrollYProgress,
        [start, enterEnd, exitStart, end],
        [0.9, 1, 1, val(1, 0.95)]
    );

    const pointerEvents = useTransform(
        scrollYProgress,
        [enterEnd, exitStart],
        ["auto", isLast ? "auto" : "none"]
    );

    return (
        <motion.div
            style={{ opacity, pointerEvents: pointerEvents as any }}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-start md:justify-between gap-3 sm:gap-4 md:gap-12 px-4 sm:px-6 md:px-12 pt-[70px] sm:pt-[90px] md:pt-[180px] pb-4 md:pb-24"
        >
            {/* Media Block */}
            <motion.div
                style={{
                    x: mediaX,
                    y: mediaY,
                    rotate: mediaRotate,
                    scale: mediaScale,
                    transformPerspective: 1200
                }}
                className={cn(
                    "relative w-full md:w-[55%] h-[30vh] sm:h-[36vh] md:h-[50vh] lg:h-[55vh] min-h-[190px] max-h-[480px] shrink-0 rounded-xl sm:rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.4)]",
                    isEven ? "md:order-1" : "md:order-2"
                )}
            >
                <div className="w-full h-full group hover:scale-[1.05] transition-transform duration-[1.5s] ease-out">
                    {isVisible && (
                        item.media.type === "video" ? (
                            <video
                                src={item.media.src}
                                className={cn("w-full h-full object-cover", item.media.className)}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <Image
                                src={item.media.src}
                                alt={item.media.alt || ""}
                                fill
                                className={cn("object-cover", item.media.className)}
                            />
                        )
                    )}
                </div>

                {/* Premium Overlays & Decorations */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl sm:rounded-2xl md:rounded-[2rem] pointer-events-none z-10" />

                {/* Editorial Corner Crosshairs */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-white/30 rounded-tl-sm pointer-events-none z-10" />
                <div className="absolute top-4 right-4 md:top-6 md:right-6 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-white/30 rounded-tr-sm pointer-events-none z-10" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-white/30 rounded-bl-sm pointer-events-none z-10" />
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-white/30 rounded-br-sm pointer-events-none z-10" />
            </motion.div>

            {/* Text Block */}
            <motion.div
                style={{
                    x: textX,
                    y: textY,
                    scale: textScale
                }}
                className={cn(
                    "w-full md:w-[40%] flex flex-col justify-center relative z-10 shrink-0 md:shrink mt-14 sm:mt-20 md:mt-0 pt-8 sm:pt-12 md:pt-0",
                    isEven ? "md:order-2 md:pl-16 lg:pl-24 items-start text-left" : "md:order-1 md:pr-16 lg:pr-24 items-start md:items-end text-left md:text-right"
                )}
            >
                {/* Massive Watermark Number */}
                <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-[8rem] sm:text-[12rem] lg:text-[18rem] font-bold text-white/[0.02] select-none pointer-events-none z-0 tracking-tighter hidden sm:block",
                    isEven ? "-left-8" : "-right-8"
                )}>
                    0{index + 1}
                </div>

                <div className={cn(
                    "relative z-10 flex flex-col mt-4 sm:mt-6 md:mt-0",
                    isEven ? "items-start border-l border-violet-500/20 pl-4 md:pl-8" : "items-start md:items-end border-l md:border-l-0 md:border-r border-violet-500/20 pl-4 md:pl-0 md:pr-8"
                )}>
                    {/* Eyebrow Accent */}
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-6">
                        {!isEven && <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-violet-500/50 hidden md:block" />}
                        <span className="text-violet-400 font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">
                            Highlight 0{index + 1}
                        </span>
                        {isEven && <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-violet-500/50 to-transparent" />}
                    </div>

                    <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 md:mb-6 uppercase leading-[1.1] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent drop-shadow-xl">
                        {item.title}
                    </h3>

                    <p className="text-white/60 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-full md:max-w-md font-light">
                        {item.description}
                    </p>

                    {/* Ultra-Luxury Minimalist Progress Line & Counter */}
                    <div className="mt-6 md:mt-10 pt-4 border-t border-white/10 w-full max-w-[260px] sm:max-w-xs flex items-center justify-between gap-5">
                        <div className="flex items-baseline gap-1 font-mono">
                            <span className="text-base md:text-lg font-medium text-white tracking-tight">
                                0{index + 1}
                            </span>
                            <span className="text-xs text-white/30 font-light">
                                / 0{totalItems}
                            </span>
                        </div>

                        <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                            <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-violet-500 via-indigo-400 to-white rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(139,92,246,0.8)]"
                                style={{ width: `${((index + 1) / totalItems) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function LegacyScrollLanding() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [footerHeight, setFooterHeight] = useState(250);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setFooterHeight(350);
            } else {
                setFooterHeight(250);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Extremely smooth, slow physics for the content blocks
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 14,
        mass: 1,
        restDelta: 0.001
    });

    const smoothProgressMapped = useTransform(smoothProgress, [0, 0.9], [0, 1]);

    const activeIndexTransform = useTransform(smoothProgressMapped, (latest) => {
        const chunks = items.length;
        let index = Math.round(latest * (chunks - 1));
        return Math.max(0, Math.min(index, chunks - 1));
    });

    return (
        <section ref={containerRef} className="w-full relative z-20 bg-[#111111]" style={{ height: `calc(${items.length * 120}vh + ${footerHeight}px)` }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col pt-4 md:pt-8">

                {/* Massive Premium Background Decorations */}

                {/* 1. Subtle Technical Grid Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

                {/* 2. Huge Hollow Vertical Watermark (Left Edge) */}
                <div
                    className="absolute top-1/2 left-0 -translate-x-[35%] -translate-y-1/2 -rotate-90 text-[10rem] md:text-[16rem] lg:text-[20rem] font-bold text-transparent select-none pointer-events-none z-0 tracking-tighter whitespace-nowrap opacity-30 hidden md:block"
                    style={{ WebkitTextStroke: '2px rgba(139, 92, 246, 0.5)' }}
                >
                    LEGACY
                </div>

                {/* Sidebar Tracker */}
                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 items-end">
                    {/* Vertical line behind dots */}
                    <div className="absolute right-[1px] top-2 bottom-2 w-[1px] bg-white/[0.08] pointer-events-none z-0" />
                    {items.map((_, i) => (
                        <SidebarDot key={i} index={i} activeIndexTransform={activeIndexTransform} />
                    ))}
                </div>

                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] bg-violet-700/20 blur-[150px] rounded-full pointer-events-none z-0"
                />

                {/* Fixed Pinned Header - Split Layout */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-end justify-between shrink-0 min-h-[80px] md:min-h-[100px] gap-6">
                    {/* Left Side: Titles */}
                    <div className="flex flex-col items-start relative">
                        {/* Massive subtle background typography for editorial feel */}
                        <div className="absolute -top-16 -left-8 text-[8rem] font-bold text-white/[0.015] pointer-events-none select-none z-0 tracking-tighter hidden lg:block">
                            07
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-4 mb-2 md:mb-4 relative z-10"
                        >
                            <h2 className="text-[11px] md:text-sm font-medium tracking-[0.5em] text-violet-300 uppercase">
                                Our Legacy
                            </h2>
                            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-violet-500/60 via-violet-500/10 to-transparent" />
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            className={`${instrumentSerif.className} relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight bg-gradient-to-b from-white via-white/90 to-white/20 bg-clip-text text-transparent drop-shadow-2xl leading-none`}
                        >
                            HIGHLIGHTS
                        </motion.h3>
                    </div>

                    {/* Right Side: Decorated Subtext */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="relative z-10 hidden sm:flex flex-col justify-end max-w-xs md:max-w-sm mt-4 md:mt-0"
                    >
                        <div className="relative pl-5 md:pl-0 md:pr-6 md:border-r border-l md:border-l-0 border-white/10 py-1">
                            {/* Premium glowing accent on the border */}
                            <div className="absolute top-0 left-[-1px] md:left-auto md:right-[-1px] w-[2px] h-10 bg-gradient-to-b from-violet-400 to-transparent" />

                            {/* Faded decorative quotation mark */}
                            <div className={`${instrumentSerif.className} absolute -top-6 -left-3 md:left-auto md:-top-6 md:-right-2 text-6xl text-white/[0.03] select-none pointer-events-none`}>
                                &quot;
                            </div>

                            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed text-left md:text-right">
                                A curated journey through our most memorable moments, <span className="text-white/80 font-medium">monumental achievements</span>, and the digital legacy we continue to build.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto">
                    {items.map((item, index) => (
                        <ScrubbableContentBlock
                            key={index}
                            item={item}
                            index={index}
                            scrollYProgress={smoothProgressMapped}
                            totalItems={items.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

const SidebarDot = ({ index, activeIndexTransform }: { index: number, activeIndexTransform: MotionValue<number> }) => {
    const [isActive, setIsActive] = useState(false);

    useMotionValueEvent(activeIndexTransform, "change", (latest) => {
        setIsActive(latest === index);
    });

    return (
        <div className="flex items-center gap-4 group cursor-pointer py-1">
            <span className={cn(
                "text-[10px] font-medium tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isActive ? "text-white opacity-100 translate-x-0" : "text-white/20 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
            )}>
                0{index + 1}
            </span>
            <div className={cn(
                "w-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isActive
                    ? "h-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    : "h-3 bg-white/20 group-hover:bg-white/50 group-hover:h-5"
            )} />
        </div>
    );
};