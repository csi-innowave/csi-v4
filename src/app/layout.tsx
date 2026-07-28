import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/NavigationWrapper";
import { Noise } from "@/components/ui/noise";
import CursorTrail from "@/components/CursorTrail";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollThread from "@/components/ScrollThread";
import PageNavigationLoader from "@/components/PageNavigationLoader";

import PageOverlapWrapper from "@/components/PageOverlapWrapper";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL("https://csiinnowave.com"),
    title: {
        default: "CSI - INNOWAVE | Technocultural Society of MAIT",
        template: "%s | CSI - INNOWAVE",
    },
    description: "Official website of Computer Society of India (CSI) chapter at Maharaja Agrasen Institute of Technology (MAIT). Discover our events, workshops, team, and legacy.",
    keywords: [
        "CSI MAIT",
        "CSI Innowave",
        "Computer Society of India MAIT",
        "MAIT Delhi",
        "Technocultural Society",
        "MAIT Events",
        "Innowave MAIT"
    ],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://csiinnowave.com",
        siteName: "CSI - INNOWAVE",
        title: "CSI - INNOWAVE | Technocultural Society of MAIT",
        description: "Official website of Computer Society of India (CSI) chapter at Maharaja Agrasen Institute of Technology (MAIT). Discover our events, workshops, team, and legacy.",
        images: [
            {
                url: "/logo.png",
                width: 512,
                height: 512,
                alt: "CSI MAIT Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CSI - INNOWAVE | Technocultural Society of MAIT",
        description: "Official website of Computer Society of India (CSI) chapter at Maharaja Agrasen Institute of Technology (MAIT).",
        images: ["/logo.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Computer Society of India - MAIT Chapter",
        alternateName: "CSI INNOWAVE",
        url: "https://csiinnowave.com",
        logo: "https://csiinnowave.com/logo.png",
        parentOrganization: {
            "@type": "EducationalOrganization",
            name: "Maharaja Agrasen Institute of Technology",
            url: "https://mait.ac.in",
        },
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`bg-[#111111] text-white ${inter.className}`} suppressHydrationWarning>
                <SmoothScrollProvider>
                    <PageNavigationLoader />
                    <ScrollThread />
                    <Noise />
                    <NavigationWrapper>
                        <PageOverlapWrapper>
                            {children}
                        </PageOverlapWrapper>
                        <Footer />
                    </NavigationWrapper>
                    <CursorTrail />
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
