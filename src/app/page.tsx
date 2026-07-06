import Infinitescrollbrand from "@/components/landingPage/InfineScroll";
import About from "@/components/landingPage/About";
import { UpdateSection } from "@/components/landingPage/UpdateSection";
import LegacyScrollLanding from "@/components/landingPage/LegacyScrollLanding";
import HeroAnimated from "@/components/landingPage/HeroAnimated";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CSI - INNOWAVE | Technocultural Society of MAIT",
    description: "Join MAIT's premier technocultural society. Experience workshops, internships, and innovative initiatives fostering skill development and entrepreneurial spirit.",
};

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center w-full selection:bg-white selection:text-black">
            {/* Hero Section */}
            <HeroAnimated />

            {/* Marquee Section */}
            <section className="relative z-20 w-full bg-[#111111] py-12">
                <Infinitescrollbrand />
            </section>

            {/* About Section */}
            <section className="relative z-20 w-full px-4 py-32 md:px-8 bg-[#111111]">
                <About />
            </section>

            {/* Updates Section */}
            <section className="relative z-20 w-full px-4 py-32 md:px-8 bg-[#111111]">
                <UpdateSection />
            </section>

            {/* Legacy Scroll Section */}
            <section className="relative z-20 w-full bg-[#111111]">
                <LegacyScrollLanding />
            </section>
        </main>
    );
}
