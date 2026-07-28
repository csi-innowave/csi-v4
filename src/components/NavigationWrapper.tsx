"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Framer Motion Variants for staggering the menu links
const menuListVariants = {
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: 80,
    filter: "blur(10px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuFullyClosed, setMenuFullyClosed] = useState(true);
  const [savedScroll, setSavedScroll] = useState(0);
  const [docHeight, setDocHeight] = useState(0);
  
  // Live clock for that premium agency detail
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Lock body scroll and restore when fully closed
  useIsomorphicLayoutEffect(() => {
    if (!menuFullyClosed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (!isMenuOpen && savedScroll > 0) {
        window.scrollTo(0, savedScroll);
      }
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuFullyClosed, isMenuOpen, savedScroll]);

  const NAV_LINKS = [
    { name: "Home", href: "/", num: "01", sub: "Back to base" },
    { name: "Team", href: "/team", num: "02", sub: "Meet the crew" },
    { name: "Events", href: "/events", num: "03", sub: "What's happening" },
    { name: "Gallery", href: "/gallery", num: "04", sub: "Our memories" },
    { name: "About", href: "/about", num: "05", sub: "Who we are" },
  ];

  return (
    <div className={`relative w-full min-h-screen bg-[#020202] overflow-clip ${spaceGrotesk.className}`}>
      {!menuFullyClosed && <div style={{ height: docHeight, width: "100%" }} />}
      
      {/* ── THE REVEALED MENU (Sits behind the main page) ── */}
      <div className="fixed inset-0 z-0 flex flex-col justify-between bg-[#020202] p-8 md:p-12 lg:p-16 overflow-hidden">
        
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
        
        {/* Ambient Glows for Depth */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-10 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

        {/* Massive Watermark */}
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none mix-blend-overlay">
          <span className={`${instrumentSerif.className} text-[40vw] leading-none`}>CSI</span>
        </div>

        {/* Top Bar - Logo & Time */}
        <div className="flex justify-between items-start relative z-10 pr-16 md:pr-24">
          <div className="flex items-center gap-8 md:gap-12">
            <Image src="/logo.png" alt="CSI Logo" width={90} height={90} className="object-contain" />
            
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/1BgcnhzFb_Q0ed2aLFJKaH5rwMzs1DLvL/view"
              className="group hidden md:flex relative items-center gap-4 px-6 py-3 rounded-full overflow-hidden bg-white/5 border border-white/10 hover:border-violet-400/50 transition-all duration-500"
            >
              {/* Animated hover background */}
              <div className="absolute inset-0 bg-violet-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              <span className="relative z-10 text-white/80 group-hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-500">
                Download Brochure
              </span>
              
              <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-violet-400 transition-colors duration-500">
                <svg className="w-4 h-4 text-white group-hover:text-[#020202] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex flex-col items-end mt-2">
            <span className="text-white/40 text-xs tracking-widest">{time} IST</span>
            <span className="text-white/20 text-xs tracking-widest mt-1">New Delhi, IN</span>
          </div>
        </div>

        {/* Center - Nav Links */}
        <motion.ul
          variants={menuListVariants}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          className="flex flex-col items-end gap-3 md:gap-5 relative z-10 my-auto w-full md:pr-12 lg:pr-24"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <motion.li key={link.name} variants={menuItemVariants} className="w-full flex justify-end">
                <Link
                  href={link.href}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-end gap-6 md:gap-10 w-fit relative py-2"
                >
                  {/* Active Page Glow Pill / Subtitle - Left side */}
                  <span className={`hidden md:block absolute right-[110%] transition-all duration-500 font-medium tracking-[0.3em] text-xs uppercase whitespace-nowrap ${
                    isActive 
                      ? "opacity-100 translate-y-0 text-violet-400" 
                      : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 text-violet-400"
                  }`}>
                    {isActive ? `✦ ACTIVE` : link.sub}
                  </span>

                  {/* Main Text */}
                  <div className="relative py-2">
                    <span className={`${instrumentSerif.className} block text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-500 origin-bottom ${
                      isActive 
                        ? "text-white font-semibold shadow-sm" 
                        : "text-white/70 group-hover:text-white group-hover:-translate-x-4 group-hover:skew-x-[-6deg]"
                    }`}>
                      {link.name}
                    </span>
                    
                    {/* Underline reveal */}
                    <div className={`absolute bottom-2 right-0 h-[3px] bg-violet-400 transition-all duration-500 ${
                      isActive ? "w-full shadow-[0_0_12px_rgba(168,85,247,0.9)]" : "w-0 group-hover:w-full"
                    }`} />
                  </div>

                {/* Number Slot Machine Effect */}
                <div className="flex flex-col items-center justify-center relative overflow-hidden h-6 w-6">
                  <span className="absolute text-white/30 text-xs md:text-sm font-bold tracking-widest transition-transform duration-500 group-hover:-translate-y-full">
                    {link.num}
                  </span>
                  <span className="absolute text-violet-400 text-xs md:text-sm font-bold tracking-widest translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                    {link.num}
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
        </motion.ul>

        {/* Bottom Bar - Socials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 40 }}
          transition={{ delay: isMenuOpen ? 0.6 : 0, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10"
        >
          <div className="flex gap-8">
            <Link href="https://instagram.com" target="_blank" className="text-white/30 text-xs tracking-widest hover:text-white transition-colors">INSTA</Link>
            <Link href="https://linkedin.com" target="_blank" className="text-white/30 text-xs tracking-widest hover:text-white transition-colors">LINKD</Link>
            <Link href="https://twitter.com" target="_blank" className="text-white/30 text-xs tracking-widest hover:text-white transition-colors">X</Link>
          </div>
        </motion.div>
      </div>

      {/* ── THE TRAILING COMIC LAYERS (Tight Stack) ── */}
      <motion.div
        initial={false}
        animate={{
          x: isMenuOpen ? "-29vw" : "0vw",
          y: isMenuOpen ? 144 : 0,
          scale: isMenuOpen ? 0.85 : 1,
          skewY: isMenuOpen ? "-2deg" : "0deg",
          borderRadius: isMenuOpen ? "1.5rem" : "0rem",
        }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: isMenuOpen ? 0.1 : 0 }}
        className="fixed inset-0 z-[8] w-full h-full bg-blue-400 origin-bottom-left will-change-transform"
      />
      
      <motion.div
        initial={false}
        animate={{
          x: isMenuOpen ? "-29.5vw" : "0vw",
          y: isMenuOpen ? 147 : 0,
          scale: isMenuOpen ? 0.85 : 1,
          skewY: isMenuOpen ? "-2deg" : "0deg",
          borderRadius: isMenuOpen ? "1.5rem" : "0rem",
        }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: isMenuOpen ? 0.05 : 0.05 }}
        className="fixed inset-0 z-[9] w-full h-full bg-violet-500 origin-bottom-left will-change-transform"
      />

      {/* ── THE MAIN WEBSITE WRAPPER (3D Pushback) ── */}
      <motion.div
        initial={false}
        animate={{
          x: isMenuOpen ? "-30vw" : "0vw",
          y: isMenuOpen ? 150 : 0,
          scale: isMenuOpen ? 0.85 : 1,
          skewY: isMenuOpen ? "-2deg" : "0deg",
          borderRadius: isMenuOpen ? "1.5rem" : "0rem",
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.32, 0.72, 0, 1],
          delay: isMenuOpen ? 0 : 0.1
        }}
        onAnimationComplete={() => {
          if (!isMenuOpen) {
            setMenuFullyClosed(true);
          }
        }}
        className="z-10 w-full bg-[#050505] origin-bottom-left will-change-transform"
        style={{
          position: menuFullyClosed ? "relative" : "fixed",
          top: 0,
          left: 0,
          height: menuFullyClosed ? "auto" : "100vh",
          minHeight: "100vh",
          overflow: menuFullyClosed ? "visible" : "hidden",
        }}
      >
        {/* Floating Premium Hamburger Toggle */}
        <div className="fixed top-6 right-6 md:top-10 md:right-12 z-50 pointer-events-auto">
          <button
            onClick={() => {
              if (!isMenuOpen) {
                setSavedScroll(window.scrollY);
                setDocHeight(document.documentElement.scrollHeight);
                setMenuFullyClosed(false);
              }
              setIsMenuOpen(!isMenuOpen);
            }}
            className="relative flex flex-col justify-center items-center w-14 h-14 group focus:outline-none"
            aria-label="Toggle Menu"
          >
            {/* Background blur circle on hover */}
            <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 backdrop-blur-none group-hover:backdrop-blur-md transition-all duration-500" />
            
            {/* Top Line */}
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -7,
                width: isMenuOpen ? 28 : 24,
                backgroundColor: isMenuOpen ? "#10b981" : "rgba(255,255,255,0.8)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="block h-[2px] rounded-full origin-center z-10"
            />
            
            {/* Bottom Line */}
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 7,
                width: isMenuOpen ? 28 : 16,
                backgroundColor: isMenuOpen ? "#10b981" : "rgba(255,255,255,0.8)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="block h-[2px] rounded-full origin-center z-10 group-hover:w-6 transition-all duration-300"
            />
          </button>
        </div>
        
        {/* Render the rest of the site with translated scroll compensation */}
        <div style={{ transform: menuFullyClosed ? "none" : `translateY(-${savedScroll}px)` }}>
          <div className={`relative ${isMenuOpen ? "pointer-events-none select-none" : ""}`}>
            {children}
            
            {/* Highly performant opacity overlay to dim the site instead of expensive CSS blur filter */}
            <motion.div
                initial={false}
                animate={{ opacity: isMenuOpen ? 0.6 : 0 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 bg-black z-50 pointer-events-none will-change-opacity"
            />
          </div>
        </div>
        
        {/* Click overlay to close menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 cursor-pointer rounded-[1.5rem]" 
            onClick={() => setIsMenuOpen(false)} 
          />
        )}
      </motion.div>
    </div>
  );
}