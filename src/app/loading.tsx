import React from "react";

export default function Loading() {
    return (
        <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#111111] text-white">
            <div className="relative flex items-center justify-center">
                {/* Outer Spinning Ring */}
                <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
                {/* Inner Reverse Spinning Ring */}
                <div className="absolute w-10 h-10 rounded-full border-2 border-blue-500/20 border-b-blue-500 animate-spin [animation-direction:reverse]" />
            </div>
            <p className="mt-6 text-xs font-semibold tracking-[0.3em] uppercase text-white/40 animate-pulse">
                Loading...
            </p>
        </div>
    );
}
