import React from "react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#050505] text-white">
            <div className="relative mb-6 flex items-center justify-center">
                {/* Thin Minimal Spinner Ring */}
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
            <p className="text-xs font-medium tracking-[0.4em] uppercase text-white/80">
                CSI • MAIT
            </p>
            <p className="mt-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
                Loading
            </p>
        </div>
    );
}
