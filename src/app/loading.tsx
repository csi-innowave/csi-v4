import React from "react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#030305]/75 backdrop-blur-xl text-white">
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                <div className="absolute -inset-2 border border-white/10 rounded-2xl pointer-events-none" />
                <div className="absolute top-[-8px] left-[-8px] w-3 h-3 border-t-2 border-l-2 border-purple-400" />
                <div className="absolute bottom-[-8px] right-[-8px] w-3 h-3 border-b-2 border-r-2 border-purple-400" />

                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="1.5"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="url(#gradient-aperture-fallback)"
                        strokeWidth="2.5"
                        strokeDasharray="276"
                        className="animate-[spin_1.4s_easeInOut_infinite]"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="gradient-aperture-fallback" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="relative z-10 flex items-center justify-center animate-pulse">
                    <Image
                        src="/logo.png"
                        alt="CSI Logo"
                        width={46}
                        height={46}
                        className="object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                    />
                </div>
            </div>

            <p className="text-xs font-semibold uppercase text-white/80 tracking-[0.5em] ml-[0.5em]">
                {"// CSI • MAIT"}
            </p>
        </div>
    );
}
