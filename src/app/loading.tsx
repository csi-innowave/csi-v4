import React from "react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#030305]/80 backdrop-blur-xl text-white relative overflow-hidden">
            {/* Top Left Header */}
            <div className="absolute top-8 left-8 flex items-center gap-3">
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

            {/* Center 5x5 LED Dot Matrix Display */}
            <div className="grid grid-cols-5 gap-3 mb-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative">
                <div className="absolute top-[-4px] left-[-4px] w-2.5 h-2.5 border-t-2 border-l-2 border-purple-400" />
                <div className="absolute bottom-[-4px] right-[-4px] w-2.5 h-2.5 border-b-2 border-r-2 border-purple-400" />

                {Array.from({ length: 25 }).map((_, i) => {
                    const row = Math.floor(i / 5);
                    const col = i % 5;
                    const delay = (row + col) * 0.08;
                    return (
                        <div
                            key={i}
                            style={{ animationDelay: `${delay}s` }}
                            className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"
                        />
                    );
                })}
            </div>

            <p className="text-xs font-semibold uppercase text-white/80 tracking-[0.5em] ml-[0.5em]">
                {"// CSI • MAIT"}
            </p>
        </div>
    );
}
