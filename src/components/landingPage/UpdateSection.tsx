"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { EventsDataType } from "@/types/EventData";
import { useOutsideClick } from "@/hooks/use-outside-click";
import EventDetailsDialog from "../EventDetailsDialog";
import { CalendarIcon, ClockIcon, GlobeIcon, MapPinIcon, ArrowRightIcon } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { motion } from "framer-motion";
import { GlowingCard } from "../ui/GlowingCard";

function formatDate(isoString: Date): string {
    const date: Date = new Date(isoString);
    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year: number = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export function UpdateSection() {
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<EventsDataType[]>([]);
    const [activeEvent, setActiveEvent] = useState<EventsDataType | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = (event: EventsDataType) => {
        setActiveEvent(event);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setActiveEvent(null);
        setIsOpen(false);
    };

    const fetchEvents = async () => {
        try {
            noStore();
            const response = await fetch("/api/events?limit=3", {
                cache: "no-store",
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP ${response.status}: ${errorText}`);
                throw new Error(
                    `Failed to fetch events: ${response.status} ${response.statusText}`
                );
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
        const interval = setInterval(() => {
            if (document.visibilityState === "visible") {
                fetchEvents();
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useOutsideClick(ref, () => setActiveEvent(null));

    return (
        <div className="w-full relative z-20">
            <div className="mb-20 text-center">
                <h2 className="text-xs font-semibold tracking-[0.3em] text-violet-500 uppercase mb-4">Latest</h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">UPDATES & EVENTS</h3>
            </div>

            <EventDetailsDialog
                isOpen={isOpen}
                onClose={handleCloseDialog}
                activeEvent={activeEvent}
            />

            {events.length > 0 ? (
                <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {events.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </ul>
            ) : (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="text-sm tracking-widest uppercase text-white/40 animate-pulse">
                        Loading events...
                    </div>
                </div>
            )}
        </div>
    );
}

export function EventCard({
    event,
    index,
}: {
    event: EventsDataType;
    index: number;
}) {
    const [activeEvent, setActiveEvent] = useState<EventsDataType | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = (event: EventsDataType) => {
        setActiveEvent(event);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setActiveEvent(null);
        setIsOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.8, 
                delay: index * 0.15, 
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100,
                damping: 20
            }}
            style={{ transformPerspective: 1000 }}
        >
            <EventDetailsDialog
                isOpen={isOpen}
                onClose={handleCloseDialog}
                activeEvent={activeEvent}
            />

            <div onClick={() => handleOpenDialog(event)} className="h-full">
                <GlowingCard
                    className="h-full group cursor-pointer hover:-translate-y-2 transition-transform duration-500"
                    innerClassName="flex flex-col overflow-hidden h-full"
                >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <Image
                        src={event.banner}
                        alt={event.name}
                        fill
                        className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                
                <div className="flex flex-col flex-grow p-6 relative z-20">
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-violet-500 text-black p-3 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-[-50%] transition-all duration-500 z-20 shadow-xl">
                        <ArrowRightIcon className="w-5 h-5 -rotate-45" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white tracking-widest uppercase line-clamp-1">
                        {event.name}
                    </h3>
                    
                    <p className="text-sm font-light text-white/50 mb-6 line-clamp-2 leading-relaxed">
                        {event.description}
                    </p>
                    
                    <div className="mt-auto space-y-3 pt-6 border-t border-white/[0.05]">
                        <div className="flex items-center text-xs tracking-wider uppercase text-white/60">
                            <CalendarIcon className="w-4 h-4 mr-3 text-violet-500 opacity-80" />
                            <span>{formatDate(event.eventDate)}</span>
                        </div>
                        <div className="flex items-center text-xs tracking-wider uppercase text-white/60">
                            <ClockIcon className="w-4 h-4 mr-3 text-violet-500 opacity-80" />
                            <span>{event.eventTime}</span>
                        </div>
                        <div className="flex items-center text-xs tracking-wider uppercase text-white/60">
                            {event.isOnline ? (
                                <>
                                    <GlobeIcon className="w-4 h-4 mr-3 text-violet-500 opacity-80" />
                                    <span>Online Event</span>
                                </>
                            ) : (
                                <>
                                    <MapPinIcon className="w-4 h-4 mr-3 text-violet-500 opacity-80" />
                                    <span className="line-clamp-1">{event.venue}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                </GlowingCard>
            </div>
        </motion.div>
    );
}
