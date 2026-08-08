import React from "react";
import Image from "next/image";
import { DotmSquare15 } from "@/components/ui/dotm-square-15";

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

            {/* Installed DotmSquare15 Component */}
            <div className="mb-6 flex items-center justify-center">
                <DotmSquare15 size={48} dotSize={6} />
            </div>

            <p className="text-xs font-semibold uppercase text-white/80 tracking-[0.5em] ml-[0.5em]">
                {"// CSI • MAIT"}
            </p>
        </div>
    );
}
