"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1722239365/dolfy_okslvf.png", alt: "Dolfy Learning" },
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1722239908/awsap-modify_ogpqgc.jpg", alt: "Download" },
    { src: "https://res.cloudinary.com/djhilzrxt/image/upload/v1722794702/Uno_eo5gl6.jpg", alt: "uno" },
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1724785424/pizza_hut_yss9fg.png", alt: "pizza hut" },
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1722238954/festa-new_h4sim3.jpg", alt: "Festa Marketing" },
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1722238970/idp-new_iqlzgc.png", alt: "IDP" },
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1722238968/meta_space_xhg8di.png", alt: "Meta Space" },
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1722238965/momentum_ias_ptmdje.png", alt: "Momentum IAS" },
    { src: "https://res.cloudinary.com/dzvdh7yez/image/upload/v1722238948/programming_pathshala_new_cpoipf.jpg", alt: "Programming Pathshala" },
    { src: "https://res.cloudinary.com/djhilzrxt/image/upload/v1722794668/Zenzia_tfxldh.jpg", alt: "zenzia" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317178/social-media-default-screen_afwm4g.jpg", alt: "Krafton India" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317178/YTCJwDgo_400x400_gib8gq.jpg", alt: "IEEE Smart Cities" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317178/wtn_logo_8_qh7tvv.png", alt: "kyndryl" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317178/the_belgian_waffle_co_logo_gnp6zd.jpg", alt: "The Belgian Waffle Co" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317178/stockedgelogoimage28102022144458_ra0sny.png", alt: "Stockedge" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317177/epyc_logo_dzluh8.jpg", alt: "EPYC" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317177/Mother_Dairy.svg_j84cj5.png", alt: "Mother Dairy" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317177/Social-Imagery-47_visg4h.webp", alt: "Unidays" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317177/CNCF_Community_Groups_Logo_2023_PRjuBUd_zvgrko.webp", alt: "Cloud Native Community groups" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317177/images_s3lguz.jpg", alt: "MapmyIndia" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756317176/360_F_238159412_HhVnn8jBWgYG9IoRSlPw2Iz5FMZz93CH_sly5np.jpg", alt: "Bistro" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756321734/reskilll_paqslv.png", alt: "Reskill" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756321570/Screenshot_2025-08-28_at_12.35.41_AM_eqnlbo.png", alt: "Launched Global" },
    { src: "https://res.cloudinary.com/dcvl4olut/image/upload/v1756318894/Microsoft-Azure-Logo_vvmcjr.png", alt: "Microsoft Azure" },
];

const LogoCard = ({ logo }: { logo: { src: string; alt: string } }) => {
    const optimizedSrc = logo.src.includes('/upload/') 
        ? logo.src.replace(/\/upload\//, '/upload/f_auto,q_auto,w_250/') 
        : logo.src;
    return (
        <div className="relative group w-32 md:w-40 h-16 md:h-20 mx-4 md:mx-6 flex items-center justify-center cursor-pointer flex-shrink-0">
            <Image
                src={optimizedSrc}
                alt={logo.alt}
                width={200}
                height={100}
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
            />
        </div>
    );
};

const InfiniteScrollBrand = () => {
    // Split logos into two rows for a denser, premium look
    const row1 = logos.slice(0, 12);
    const row2 = logos.slice(12, 24);

    return (
        <div className="w-full overflow-hidden flex flex-col items-center py-20 relative bg-[#111111]">
            {/* Premium Header - Minimalist */}
            <div className="mb-12 flex items-center justify-center w-full px-4 overflow-hidden">
                <div className="w-full max-w-[150px] md:max-w-[250px] h-[1px] bg-gradient-to-r from-transparent to-purple-500/40" />
                <h2 className="mx-6 text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-white/40 text-center whitespace-nowrap">
                    Trusted by industry leaders
                </h2>
                <div className="w-full max-w-[150px] md:max-w-[250px] h-[1px] bg-gradient-to-l from-transparent to-purple-500/40" />
            </div>
            
            {/* Marquee Container with fade masks */}
            <div 
                className="relative w-full max-w-[100vw] overflow-hidden flex flex-col gap-6 md:gap-8" 
                style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
                }}
            >
                {/* Row 1 - Left to Right */}
                <div className="flex w-full">
                    <motion.div 
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                        className="flex w-fit"
                    >
                        {/* Duplicate content to create perfect seamless loop (2 full sets) */}
                        {[...row1, ...row1, ...row1, ...row1].map((logo, index) => (
                            <LogoCard key={`row1-${index}`} logo={logo} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="flex w-full">
                    <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                        className="flex w-fit"
                    >
                        {/* Duplicate content to create perfect seamless loop (2 full sets) */}
                        {[...row2, ...row2, ...row2, ...row2].map((logo, index) => (
                            <LogoCard key={`row2-${index}`} logo={logo} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Ambient Background Glow for the section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />
        </div>
    );
};

export default InfiniteScrollBrand;
