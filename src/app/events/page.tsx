import EventsClient from "./EventsClient";
import { EventsDataType } from "@/types/EventData";
import prisma from "@/lib/prisma";

export const revalidate = 60; // revalidate page every 60 seconds

export const metadata = {
    title: "Events - CSI V3 | Maharaja Agrasen Institute of Technology",
    description:
      "Explore the latest events organized by the Computer Society of India (CSI) at Maharaja Agrasen Institute of Technology. Stay updated with workshops, seminars, and tech competitions.",
    keywords: [
      "CSI Events",
      "Computer Society of India",
      "MAIT Events",
      "Tech Workshops",
      "Seminars",
      "Tech Competitions",
      "Student Events",
    ],
    openGraph: {
        title: "Events - CSI V3 | Maharaja Agrasen Institute of Technology",
        description:
          "Explore the latest events organized by the Computer Society of India (CSI) at MAIT. Stay updated with workshops, seminars, and tech competitions.",
        url: "https://www.csiinnowave.com/events", 
        type: "website",
        images: [
          {
            url: "https://yourwebsite.com/og-image.jpg", // Replace with actual image URL
            width: 1200,
            height: 630,
            alt: "CSI MAIT Events Open Graph Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Events - CSI V3 | Maharaja Agrasen Institute of Technology",
        description:
          "Explore the latest events organized by the Computer Society of India (CSI) at MAIT. Stay updated with workshops, seminars, and tech competitions.",
        images: ["/public/csi-innowave.jpg"], // Replace with actual image URL
      },
};

async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                eventDate: 'desc'
            }
        });
        return JSON.parse(JSON.stringify(events)) as EventsDataType[];
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export default async function EventsPage() {
    let events = await getEvents();

    if (!events) return <div>Loading...</div>;

    return (
        <main className="w-full flex flex-col items-center min-h-screen bg-[#111111]">
            <EventsClient events={events} />
        </main>
    );
}
