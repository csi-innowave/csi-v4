import TeamClient from "./TeamClient";

export const metadata = {
    title: "Team - CSI V3 | Maharaja Agrasen Institute of Technology",
    description:
        "Meet the talented team behind the Computer Society of India (CSI) at Maharaja Agrasen Institute of Technology. Learn about our faculty coordinators, executives, and technical team.",
    keywords: [
        "CSI Team",
        "Computer Society of India",
        "MAIT Faculty Coordinators",
        "CSI Executives",
        "Technical Team",
        "Student Leaders",
    ],
    openGraph: {
        title: "Team - CSI V3 | Maharaja Agrasen Institute of Technology",
        description:
            "Meet the talented team behind CSI MAIT, including faculty coordinators, executives, and the technical team.",
        url: "https://www.csiinnowave.com/team",
        type: "website",
        images: [
            {
                url: "/public/csi-innowave.jpg",
                width: 1200,
                height: 630,
                alt: "CSI MAIT Team Open Graph Image",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Team - CSI V3 | Maharaja Agrasen Institute of Technology",
        description:
            "Meet the talented team behind CSI MAIT, including faculty coordinators, executives, and the technical team.",
        images: ["/public/csi-innowave.jpg"],
    },
};

export default function TeamPage() {
    return <TeamClient />;
}
