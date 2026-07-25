"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { imagesOne, imagesTwo } from "@/data/galleryData";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Instrument_Serif, Space_Grotesk } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const GalleryImage = ({ imageUrl, index, setLightboxIndex }: { imageUrl: string, index: number, setLightboxIndex: (index: number) => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate a stable pseudo-random height for the skeleton based on the index to simulate masonry
  const placeholderHeight = 250 + (index % 3) * 60 + (index % 5) * 30;

  return (
    <div 
      className="mb-6 w-full md:cursor-none group relative" 
      onClick={() => setLightboxIndex(index)}
    >
      <div 
        className="relative w-full bg-[#0a0a0a] rounded-xl overflow-hidden shadow-lg border border-white/[0.04] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-violet-500/40 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-violet-500/10"
        style={{ height: isLoaded ? 'auto' : `${placeholderHeight}px`, contain: 'content' }}
      >
          {!isLoaded && (
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
              src={imageUrl} 
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              decoding="async"
              className={`w-full opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-[1.03] object-cover ${isLoaded ? 'h-auto blur-0' : 'h-0 blur-md text-transparent'}`}
              onLoad={() => setIsLoaded(true)}
              onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
              }}
          />
      </div>
    </div>
  );
};

export default function GalleryClient() {
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(15);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor & Spotlight refs
  const spotlightRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);

  const optimizeCloudinaryUrl = (url: string): string => {
    // Check if it's a Cloudinary URL
    if (url.includes('/upload/')) {
      // Use Cloudinary auto-format (avif/webp), auto-quality, and scale down to 800px width.
      return url.replace(/\/upload\//, '/upload/f_auto,q_auto,w_800/');
    }
    return url;
  };

  const fetchEvents = async () => {
    try {
      const hardcodedImages = [...imagesOne, ...imagesTwo].map(optimizeCloudinaryUrl);
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          const liveImages = data.images.map(optimizeCloudinaryUrl);
          const combinedImages = Array.from(new Set([...liveImages, ...hardcodedImages]));
          setEventImages(combinedImages);
          return;
        }
      }
      setEventImages(hardcodedImages);
    } catch (error) {
      console.error("Error loading live gallery images, falling back:", error);
      const hardcodedImages = [...imagesOne, ...imagesTwo].map(optimizeCloudinaryUrl);
      setEventImages(hardcodedImages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") { fetchEvents(); }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for Infinite Scrolling
  useEffect(() => {
    if (!loadMoreRef.current || eventImages.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + 12, eventImages.length));
      }
    }, { rootMargin: '400px' });
    
    observer.observe(loadMoreRef.current);
    
    return () => observer.disconnect();
  }, [eventImages.length]);

  // Global High-Performance Mouse Tracking (Spotlight & Custom Cursor)
  // Completely disabled on touch devices to optimize memory/CPU
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--x', `${targetX}px`);
        spotlightRef.current.style.setProperty('--y', `${targetY}px`);
      }
    };

    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      
      if (customCursorRef.current) {
        customCursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const visibleImages = eventImages.slice(0, visibleCount);

  // Parallax scroll effects for the floating hero images
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -200]);
  const y2 = useTransform(scrollY, [0, 800], [0, 150]);
  const y3 = useTransform(scrollY, [0, 800], [0, -350]);
  const y4 = useTransform(scrollY, [0, 800], [0, 100]);
  const y5 = useTransform(scrollY, [0, 800], [0, -180]);
  const y6 = useTransform(scrollY, [0, 800], [0, 250]);
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <main className="relative w-full min-h-screen bg-[#0e0e11] text-[#ececf1] overflow-hidden selection:bg-purple-500/30">
      
      {/* Global Ambient Spotlight */}
      <div 
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 hidden md:block"
        style={{
          background: 'radial-gradient(1000px circle at var(--x, 50%) var(--y, 50%), rgba(139, 92, 246, 0.08), transparent 70%)'
        }}
      />
      
      {/* Custom View Cursor */}
      <div 
        ref={customCursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest shadow-2xl transition-all duration-300 ${isHoveringGrid ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        style={{ willChange: 'transform' }}
      >
        VIEW
      </div>

      {/* Background gradients and dot grid */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(107,70,193,0.15),rgba(59,130,246,0.1),transparent_80%)]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-70" />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto pt-24 px-6 md:px-12 pb-32 flex flex-col items-center">
          <div className="w-full md:w-11/12 xl:w-10/12">
            
            {/* EDITORIAL FLOATING PARALLAX HERO */}
            <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center mb-32 border-b border-white/[0.05]">
                {/* Subtle Background Glows & UI Decors */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(107,70,193,0.1),transparent_100%)] pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none" />
                
                {/* Modern Tech UI Grid crosses */}
                <div className="absolute top-[20%] left-[10%] w-4 h-4 border-l border-t border-white/20 pointer-events-none" />
                <div className="absolute top-[20%] right-[10%] w-4 h-4 border-r border-t border-white/20 pointer-events-none" />
                <div className="absolute bottom-[20%] left-[10%] w-4 h-4 border-l border-b border-white/20 pointer-events-none" />
                <div className="absolute bottom-[20%] right-[10%] w-4 h-4 border-r border-b border-white/20 pointer-events-none" />

                {/* Floating Images (Atmospheric Layer) with Scroll Parallax */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                   {/* Floater 1 - Top Left */}
                   <motion.div style={{ y: y1 }} animate={{ rotate: [-6, -4, -6] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] left-[2%] md:left-[5%] w-[130px] sm:w-[200px] lg:w-[260px] aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.1] shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 mix-blend-overlay" />
                      <img src={imagesOne[0]} className="w-full h-full object-cover" alt="" />
                   </motion.div>
                   
                   {/* Floater 2 - Top Right */}
                   <motion.div style={{ y: y2 }} animate={{ rotate: [8, 10, 8] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[8%] right-[2%] md:right-[5%] w-[110px] sm:w-[170px] lg:w-[230px] aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.15] shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-70">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 mix-blend-overlay" />
                      <img src={imagesOne[1]} className="w-full h-full object-cover" alt="" />
                   </motion.div>
                   
                   {/* Floater 3 - Mid Left */}
                   <motion.div style={{ y: y3 }} animate={{ rotate: [15, 12, 15] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-[45%] left-[-2%] md:left-[0%] w-[150px] sm:w-[190px] lg:w-[220px] aspect-square rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 mix-blend-overlay" />
                      <img src={imagesOne[2]} className="w-full h-full object-cover" alt="" />
                   </motion.div>
                   
                   {/* Floater 4 - Mid Right */}
                   <motion.div style={{ y: y4 }} animate={{ rotate: [-12, -15, -12] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[40%] right-[-2%] md:right-[0%] w-[140px] sm:w-[210px] lg:w-[260px] aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.1] shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 mix-blend-overlay" />
                      <img src={imagesOne[3]} className="w-full h-full object-cover" alt="" />
                   </motion.div>

                   {/* Floater 5 - Bottom Left */}
                   <motion.div style={{ y: y5 }} animate={{ rotate: [-8, -6, -8] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-[5%] left-[5%] md:left-[10%] w-[160px] sm:w-[230px] lg:w-[300px] aspect-[3/2] rounded-xl overflow-hidden border border-white/[0.12] shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-70">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 mix-blend-overlay" />
                      <img src={imagesOne[4] || imagesOne[0]} className="w-full h-full object-cover" alt="" />
                   </motion.div>

                   {/* Floater 6 - Bottom Right */}
                   <motion.div style={{ y: y6 }} animate={{ rotate: [5, 8, 5] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }} className="absolute bottom-[8%] right-[5%] md:right-[12%] w-[170px] sm:w-[250px] lg:w-[320px] aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.1] shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 mix-blend-overlay" />
                      <img src={imagesOne[5] || imagesOne[1]} className="w-full h-full object-cover" alt="" />
                   </motion.div>
                </div>

                {/* Central Typography with fade out on scroll */}
                <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mt-12">
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="mb-8 flex items-center gap-4">
                      <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-violet-400" />
                      <span className={`${spaceGrotesk.className} text-[10px] sm:text-xs uppercase tracking-[0.4em] text-violet-300 font-medium`}>
                        Captured Moments
                      </span>
                      <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-fuchsia-400" />
                   </motion.div>
                   
                   <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className={`${instrumentSerif.className} text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight text-white mb-8 drop-shadow-2xl`}>
                      <span className="italic pr-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">The</span> Archive
                   </motion.h1>

                   <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }} className={`${spaceGrotesk.className} text-zinc-300 font-light text-sm sm:text-base md:text-lg max-w-xl leading-relaxed drop-shadow-md`}>
                      A meticulously curated collection of our most iconic workshops, flagship events, and groundbreaking hackathons. 
                   </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 flex flex-col items-center gap-3">
                    <span className={`${spaceGrotesk.className} text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-medium`}>Scroll to Explore</span>
                    <motion.div 
                        animate={{ height: ["0%", "100%"], opacity: [0, 1, 0] }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                        className="w-[1px] h-12 bg-gradient-to-b from-violet-500 to-transparent" 
                    />
                </motion.div>
            </div>

            <div className="pb-20">
              <div className="flex flex-col items-center mb-20 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] h-[150px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
                  <span className={`${spaceGrotesk.className} text-[10px] sm:text-xs uppercase tracking-[0.4em] text-blue-400/80 mb-6 block font-medium`}>Gallery</span>
                  <h2 className={`${instrumentSerif.className} text-5xl md:text-6xl font-normal tracking-tight text-[#ececf1] text-center`}>
                    Photo <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Archive</span>
                  </h2>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="mb-6 overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.04] p-1.5">
                       <div 
                         className="relative w-full rounded-xl overflow-hidden bg-white/5 animate-pulse"
                         style={{ height: `${Math.floor(Math.random() * 150) + 200}px` }}
                       />
                    </div>
                  ))}
                </div>
              ) : eventImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-white/[0.05] rounded-3xl bg-white/[0.01]">
                  <p className={`${spaceGrotesk.className} text-center text-white/40 uppercase tracking-[0.2em] text-sm`}>Archive is empty</p>
                </div>
              ) : (
                <>
                  {/* Stable DOM Masonry mimicking Pinterest using actual column flexboxes */}
                  <div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:cursor-none relative z-10"
                    onMouseEnter={() => setIsHoveringGrid(true)}
                    onMouseLeave={() => setIsHoveringGrid(false)}
                  >
                    {/* Column 1 */}
                    <div className="flex flex-col gap-0">
                      {visibleImages.filter((_, i) => i % 3 === 0).map((imageUrl, index) => (
                        <GalleryImage key={imageUrl + (index * 3)} imageUrl={imageUrl} index={index * 3} setLightboxIndex={setLightboxIndex} />
                      ))}
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col gap-0 hidden sm:flex">
                      {visibleImages.filter((_, i) => i % 3 === 1).map((imageUrl, index) => (
                        <GalleryImage key={imageUrl + (index * 3 + 1)} imageUrl={imageUrl} index={index * 3 + 1} setLightboxIndex={setLightboxIndex} />
                      ))}
                    </div>
                    {/* Column 3 */}
                    <div className="flex flex-col gap-0 hidden lg:flex">
                      {visibleImages.filter((_, i) => i % 3 === 2).map((imageUrl, index) => (
                        <GalleryImage key={imageUrl + (index * 3 + 2)} imageUrl={imageUrl} index={index * 3 + 2} setLightboxIndex={setLightboxIndex} />
                      ))}
                    </div>
                  </div>
                  
                  {visibleCount < eventImages.length && (
                    <div ref={loadMoreRef} className="w-full h-32 flex items-center justify-center mt-10 relative z-10">
                      <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
      </div>

      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={eventImages.map((url) => ({ src: url }))}
        styles={{ container: { backgroundColor: "rgba(10, 10, 10, 0.95)" } }}
      />
    </main>
  );
}
