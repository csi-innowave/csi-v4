import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/NavigationWrapper";
import { Noise } from "@/components/ui/noise";
import CursorTrail from "@/components/CursorTrail";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollThread from "@/components/ScrollThread";

import PageOverlapWrapper from "@/components/PageOverlapWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`bg-[#111111] text-white ${inter.className}`} suppressHydrationWarning>
                <SmoothScrollProvider>
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
