import GalleryClient from "./GalleryClient";

export const metadata = {
    title: "Gallery - CSI V3 | Maharaja Agrasen Institute of Technology",
    description:
        "Browse the photo archive of the Computer Society of India (CSI) chapter at Maharaja Agrasen Institute of Technology. Explore visual memories of workshops, flagship events, and hackathons.",
    keywords: [
        "CSI Gallery",
        "CSI Photo Archive",
        "MAIT Event Pictures",
        "Workshop Photos",
        "Hackathon Gallery",
        "Technocultural Society MAIT"
    ],
    openGraph: {
        title: "Gallery - CSI V3 | Maharaja Agrasen Institute of Technology",
        description:
            "Browse the photo archive of the Computer Society of India (CSI) chapter at MAIT.",
        url: "https://www.csiinnowave.com/gallery",
        type: "website",
        images: [
            {
                url: "/public/csi-innowave.jpg",
                width: 1200,
                height: 630,
                alt: "CSI MAIT Gallery Open Graph Image",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Gallery - CSI V3 | Maharaja Agrasen Institute of Technology",
        description:
            "Browse the photo archive of the Computer Society of India (CSI) chapter at MAIT.",
        images: ["/public/csi-innowave.jpg"],
    },
};

export default function GalleryPage() {
    return <GalleryClient />;
}