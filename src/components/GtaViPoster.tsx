"use client";

import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type SVGProps,
} from "react";

const ASSET_BASE_URL = "https://assets.aceternity.com/gta6";
const DEFAULT_DURATION = 3.6;

type LayerDef = {
  file: string;
  name: string;
  initialScale: number;
  revealDelay: number;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
  className?: string;
};

type SpringConfig = {
  type: "spring";
  bounce?: number;
  visualDuration?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export type GtaViPosterProps = {
  duration?: number;
  cameraScale?: number;
  fit?: number;
  depth?: number;
  logoBlur?: number;
  posterRadius?: number;
  background?: string;
  showReplay?: boolean;
  logoSpring?: SpringConfig;
  className?: string;
};

const baseClass = "!w-[12vw] !h-auto aspect-[4/3] rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover border-2 border-black";

const LAYERS: LayerDef[] = [
  // COLUMN 1 (Left - 3 images)
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1723921999/CSI%20Website/WhatsApp_Image_2024-08-18_at_00.42.54_yx4ndj.jpg",
    name: "Grid 1",
    initialScale: 1.3,
    revealDelay: 0.3,
    className: `${baseClass} !left-[calc(50%-19vw)] !right-auto !top-[calc(50%-14.5vw)] !bottom-auto`,
  },
  {
    file: "https://res.cloudinary.com/du0mba5mz/image/upload/v1722878890/CSI/Screenshot_2024-08-05_225816_krpfvy.png",
    name: "Grid 2",
    initialScale: 1.4,
    revealDelay: 0.4,
    className: `${baseClass} !left-[calc(50%-19vw)] !right-auto !top-[calc(50%-4.5vw)] !bottom-auto`,
  },
  {
    file: "https://res.cloudinary.com/du0mba5mz/image/upload/v1722879056/CSI/Screenshot_2024-08-05_230113_dmlxxc.png",
    name: "Grid 3",
    initialScale: 1.5,
    revealDelay: 0.5,
    className: `${baseClass} !left-[calc(50%-19vw)] !right-auto !top-[calc(50%+5.5vw)] !bottom-auto`,
  },

  // COLUMN 2 (Center - 4 images)
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1708521009/CSI%20Website/Gallery/mlduoo38gu0h85stcpdk.jpg",
    name: "Grid 4",
    initialScale: 1.6,
    revealDelay: 0.6,
    className: `${baseClass} !left-0 !right-0 !mx-auto !top-[calc(50%-19.5vw)] !bottom-auto`,
  },
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1708769478/CSI%20Website/Gallery/ewbkh5mwxgeo7sgybvfr.jpg",
    name: "Grid 5",
    initialScale: 1.7,
    revealDelay: 0.7,
    className: `${baseClass} !left-0 !right-0 !mx-auto !top-[calc(50%-9.5vw)] !bottom-auto`,
  },
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1708521349/CSI%20Website/Gallery/f7n7ssq7ggdnf1mp2bfj.jpg",
    name: "Grid 6",
    initialScale: 1.8,
    revealDelay: 0.8,
    className: `${baseClass} !left-0 !right-0 !mx-auto !top-[calc(50%+0.5vw)] !bottom-auto`,
  },
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1708770190/CSI%20Website/Gallery/h1uxdaagcx2erqt5o2e8.jpg",
    name: "Grid 7",
    initialScale: 1.9,
    revealDelay: 0.9,
    className: `${baseClass} !left-0 !right-0 !mx-auto !top-[calc(50%+10.5vw)] !bottom-auto`,
  },

  // COLUMN 3 (Right - 3 images)
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1708770260/CSI%20Website/Gallery/ojdwiuwv6bghsiugphin.jpg",
    name: "Grid 8",
    initialScale: 2.0,
    revealDelay: 1.0,
    className: `${baseClass} !left-[calc(50%+7vw)] !right-auto !top-[calc(50%-14.5vw)] !bottom-auto`,
  },
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1708770400/CSI%20Website/Gallery/ofw5hw46ppefq5bu5ep0.jpg",
    name: "Grid 9",
    initialScale: 2.1,
    revealDelay: 1.1,
    className: `${baseClass} !left-[calc(50%+7vw)] !right-auto !top-[calc(50%-4.5vw)] !bottom-auto`,
  },
  {
    file: "https://res.cloudinary.com/dfhj4i9hd/image/upload/v1708770138/CSI%20Website/Gallery/h4wme0g93t3ujkhkjc1n.jpg",
    name: "Grid 10",
    initialScale: 2.2,
    revealDelay: 1.2,
    className: `${baseClass} !left-[calc(50%+7vw)] !right-auto !top-[calc(50%+5.5vw)] !bottom-auto`,
  },

  // CSI Logo (Behind Innowave, but in front of Grid)
  {
    file: "/csi.png",
    name: "CSI logo",
    initialScale: 1.2,
    revealDelay: 0.2,
    className: "p-40 sm:p-48 md:p-16 lg:p-20 object-contain opacity-70 drop-shadow-xl",
  },

  // INNOWAVE Logo (Absolute FRONT)
  {
    file: "/innowave.png",
    name: "GTA logo", // Used to trigger the special blur/clip-path effect
    initialScale: 3.0,
    revealDelay: 1.4,
    className: "p-40 sm:p-48 md:p-16 lg:p-20 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]",
    initial: {
      opacity: 1,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    animate: { clipPath: "inset(0% 0% 0% 0%)" },
  },
];

const DEFAULT_LOGO_SPRING: SpringConfig = {
  type: "spring",
  visualDuration: 4,
  bounce: 0.5,
};

export const controls = {
  duration: [3.6, 1, 8, 0.1],
  cameraScale: [1.14, 1, 1.8, 0.01],
  fit: [0.96, 0.5, 1, 0.01],
  depth: [1, 0, 1.6, 0.01],
  logoBlur: [4, 0, 16, 0.5],
  posterRadius: [0, 0, 48, 1],
  background: "radial-gradient(circle at 50% 28%, #2a1133, #080611 72%)",
  showReplay: false,
  logoSpring: DEFAULT_LOGO_SPRING,
};

export function GtaViPoster({
  duration = DEFAULT_DURATION,
  cameraScale = 1.14,
  fit = 0.96,
  depth = 1,
  logoBlur = 4,
  posterRadius = 0,
  background = "transparent",
  showReplay = false,
  logoSpring = DEFAULT_LOGO_SPRING,
  className,
}: GtaViPosterProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const timeScale = duration / DEFAULT_DURATION;

  useLayoutEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const update = () => {
      const bounds = element.getBoundingClientRect();
      setSize(Math.min(bounds.width, bounds.height) * fit);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [fit]);

  const logoTransition: Transition = {
    clipPath: { ...logoSpring, delay: 0.8 * timeScale },
    filter: { ...logoSpring, delay: 0.8 * timeScale },
  };

  return (
    <div
      ref={stageRef}
      className={`relative flex h-full w-full items-center justify-center md:justify-end md:pr-[5vw] lg:pr-[8vw] overflow-hidden ${className ?? ""}`}
      style={{ background }}
    >
      {size > 0 ? (
        <motion.div
          key={playKey}
          className="relative"
          style={{
            width: size,
            height: size,
            borderRadius: posterRadius,
            transformOrigin: "center",
          }}
          initial={{ scale: cameraScale, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration, ease: [0.33, 0, 0.2, 1] }}
        >
          {LAYERS.map((layer, index) => {
            const isGtaLogo = layer.name === "GTA logo";
            const scale = 1 + (layer.initialScale - 1) * depth;
            const initialFilter = isGtaLogo ? `blur(${logoBlur}px)` : undefined;
            const animateFilter = isGtaLogo ? "blur(0px)" : undefined;

            return (
              <motion.img
                key={layer.file}
                src={layer.file.startsWith('/') || layer.file.startsWith('http') ? layer.file : `${ASSET_BASE_URL}/${layer.file}`}
                alt={layer.name}
                draggable={false}
                className={`pointer-events-none absolute inset-0 h-full w-full select-none ${layer.className || ""}`}
                style={
                  {
                    zIndex: index,
                    transformOrigin: "center",
                    willChange: "transform, opacity, filter, clip-path",
                  } as CSSProperties
                }
                initial={{
                  opacity: 0,
                  scale,
                  filter: initialFilter,
                  ...layer.initial,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: animateFilter,
                  ...layer.animate,
                }}
                transition={{
                  scale: { duration, ease: [0.16, 1, 0.3, 1] },
                  opacity: {
                    duration: 0.7 * timeScale,
                    delay: layer.revealDelay * timeScale,
                    ease: "easeOut",
                  },
                  ...(isGtaLogo ? logoTransition : layer.transition),
                }}
              />
            );
          })}
        </motion.div>
      ) : null}

      {showReplay ? (
        <button
          type="button"
          onClick={() => setPlayKey((key) => key + 1)}
          aria-label="Replay poster intro"
          className="absolute top-4 left-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98]"
        >
          <ReplayIcon className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

const ReplayIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
      <path d="M20 4v5h-5" />
    </svg>
  );
};

export default function GtaViPosterDemo(props: GtaViPosterProps) {
  return <GtaViPoster {...props} />;
}
