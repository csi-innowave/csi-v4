"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EventsDataType } from "@/types/EventData";
import EventDetailsDialog from "../EventDetailsDialog";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import { MapPin } from "lucide-react";

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
    style: "normal",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
});

function formatDate(isoString: Date): string {
    const date: Date = new Date(isoString);
    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const year: number = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function DynamicClock({ timeStr }: { timeStr: string }) {
    let hours = 12;
    let minutes = 0;
    
    if (timeStr) {
        const match = timeStr.match(/(\d+):(\d+)/);
        if (match) {
            let h = parseInt(match[1], 10);
            const m = parseInt(match[2], 10);
            
            if (timeStr.toLowerCase().includes('pm') && h < 12) h += 12;
            if (timeStr.toLowerCase().includes('am') && h === 12) h = 0;
            
            hours = h;
            minutes = m;
        }
    }

    const minuteRotation = minutes * 6;
    const hourRotation = ((hours % 12) + minutes / 60) * 30;

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#71717a] group-hover:text-blue-400 transition-colors duration-300">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="12" x2="12" y2="6" transform={`rotate(${minuteRotation} 12 12)`}></line>
            <line x1="12" y1="12" x2="12" y2="8.5" transform={`rotate(${hourRotation} 12 12)`}></line>
        </svg>
    );
}

export default function PremiumEventCard({
    event,
    index,
    isFeatured = false,
}: {
    event: EventsDataType;
    index: number;
    isFeatured?: boolean;
}) {
    const [activeEvent, setActiveEvent] = useState<EventsDataType | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveEvent(event);
        setIsOpen(true);
    };

    return (
        <>
            <EventDetailsDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                activeEvent={activeEvent}
            />

            <div
                className="group flex flex-col w-full cursor-pointer"
                onClick={handleOpenDialog}
            >
                {/* Image Block */}
                <div className={`relative w-full overflow-hidden bg-white/[0.02] border border-white/10 group-hover:border-white/30 transition-colors duration-700 rounded-2xl shadow-xl ${isFeatured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3] md:aspect-[3/4]"}`}>
                    <Image
                        src={event.banner}
                        alt={event.name}
                        fill
                        className="object-cover transform transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                </div>

                {/* Info Block */}
                <div className={`flex flex-col mt-5 ${spaceGrotesk.className}`}>
                    
                    {/* Top Meta */}
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] tracking-[0.2em] text-[#a1a1aa] uppercase font-light">
                            {formatDate(event.eventDate)}
                        </span>
                        {event.isPaid && (
                            <>
                                <span className="text-white/20 text-[10px]">•</span>
                                <span className="text-[10px] tracking-[0.2em] text-purple-400 uppercase font-light">
                                    Premium
                                </span>
                            </>
                        )}
                    </div>

                    <h3 className={`${instrumentSerif.className} ${isFeatured ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl"} text-[#ececf1] font-normal tracking-tight leading-tight group-hover:text-white transition-colors duration-500`}>
                        {event.name}
                    </h3>
                    
                    <p className={`text-[#a1a1aa] font-light mt-3 leading-relaxed ${isFeatured ? "max-w-2xl text-base md:text-lg" : "text-sm line-clamp-2"}`}>
                        {event.description}
                    </p>

                    {/* Meta Footer */}
                    <div className="flex flex-wrap items-center gap-6 mt-5 text-[10px] tracking-[0.2em] uppercase text-[#71717a] font-light border-t border-white/[0.05] pt-4">
                        <span className="flex items-center gap-2">
                            <DynamicClock timeStr={event.eventTime} />
                            <span className="group-hover:text-[#ececf1] transition-colors duration-300">{event.eventTime}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-[#71717a] group-hover:text-purple-400 transition-colors duration-300" strokeWidth={1.5} />
                            <span className="group-hover:text-[#ececf1] transition-colors duration-300">{event.isOnline ? "Online" : event.venue}</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
