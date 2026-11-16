import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HorizontalScrollSection from "@/components/animation/HorizontalScrollSection";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import { useKitMotion, type KitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type Work = {
  title: string;
  category: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  url?: string;
  clientLocation?: string;
  results?: string;
  deliverables?: string[];
};

type GalleryWordPanelsProps = {
  label?: string;
  title?: string;
  items?: Work[];
  ariaLabel?: string;
  className?: string;
};

const DEFAULT_ITEMS: Work[] = [
  {
    title: "Apex",
    category: "High-End Builder",
    description: "A tailored digital foundation with automated enquiry routing for a luxury Berkshire commercial builder.",
    imageSrc: "https://images.pexels.com/photos/31143596/pexels-photo-31143596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Apex Construction luxury architectural build mockup preview",
    clientLocation: "Berkshire, UK",
    results: "+340% Monthly Lead Conversion",
    deliverables: ["Bespoke Editorial Website", "24/7 AI Lead Assistant", "Instant SMS Alerts"],
    url: "#contact",
  },
  {
    title: "Verve",
    category: "Automotive Specialist",
    description: "High-converting online presence and instant 24/7 AI enquiry assistant for an automotive brand in Reading.",
    imageSrc: "https://images.pexels.com/photos/26954169/pexels-photo-26954169.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Verve Detailing luxury sports car detailing web design preview",
    clientLocation: "Reading, UK",
    results: "24/7 Automated Booking System",
    deliverables: ["High-Impact Dark Theme", "Automated Intake Chatbot", "Local Search Optimization"],
    url: "#contact",
  },
  {
    title: "Crest",
    category: "Professional Services",
    description: "Cinematic layout with local search visibility setup for a regional financial and advisory provider.",
    imageSrc: "https://images.pexels.com/photos/8534382/pexels-photo-8534382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Crest Advisory modern corporate office web design mockup preview",
    clientLocation: "Slough, UK",
    results: "3.8x Qualified Prospect Pipeline",
    deliverables: ["Corporate Brand Architecture", "Schema & Local SEO", "Client Intake Portal"],
    url: "#contact",
  },
  {
    title: "Slate",
    category: "Boutique Salon",
    description: "Automated booking and lead qualification workspace crafted for a premium hair and beauty studio.",
    imageSrc: "https://images.pexels.com/photos/361755/pexels-photo-361755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Slate Salon luxury beauty studio web preview",
    clientLocation: "Windsor, UK",
    results: "+210% Online Booking Rate",
    deliverables: ["Mobile-First Reservation Engine", "Automated SMS Follow-Ups", "Fast-Load Media Gallery"],
    url: "#contact",
  },
];

const COPIES = 4;

function Header({ label, title, kit, reduce }: { label: string; title: string; kit: KitMotion; reduce: boolean | null }) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const steps = Math.max(1, label.length);
  const typed = steps * 0.02;
  return (
    <div className="flex flex-col gap-[1.5rem] lg:flex-row lg:items-end lg:justify-between lg:gap-[var(--gap)]">
      <div className="flex min-w-0 flex-col gap-[1.75rem] lg:gap-[2.5rem]">
        {label && (
          <div className="flex items-center gap-[14px] font-mono text-[length:var(--text-label)] uppercase leading-[1.5]">
            <motion.p
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: typed, ease: (t: number) => Math.floor(t * steps) / steps }}
              className="whitespace-nowrap text-foreground"
            >
              {label}
            </motion.p>
          </div>
        )}
        {words.length > 0 && (
          <h2 aria-label={title} className="max-w-[14em] text-balance text-[length:var(--text-h2)] leading-none tracking-[-0.045em]">
            {words.map((word, i) => (
              <div key={i} aria-hidden="true" className="mr-[0.25em] -mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top last:mr-0">
                <motion.div
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: kit.slow, ease: kit.ease, delay: typed * 0.5 + i * 0.04 }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </h2>
        )}
      </div>
    </div>
  );
}

function Panel({
  item,
  index,
  total,
  x,
  kit,
  reduce,
  onOpenPreview,
}: {
  item: Work;
  index: number;
  total: number;
  x: MotionValue<number>;
  kit: KitMotion;
  reduce: boolean | null;
  onOpenPreview: (item: Work) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const geo = useRef({ base: 0, width: 1, view: 1 });
  const red = index % 2 === 1;
  const dir = index % 2 === 0 ? 1 : -1;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const rect = row.getBoundingClientRect();
      geo.current = { base: rect.left - x.get(), width: rect.width || 1, view: window.innerWidth || 1 };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [x]);

  const offset = (v: number) => {
    const { base, width, view } = geo.current;
    return base + v + width / 2 - view / 2;
  };
  const wordX = useTransform(x, (v) => -offset(v) * 0.4 * dir);
  const wordOpacity = useTransform(x, (v) => 0.15 + 0.85 * Math.max(0, 1 - Math.abs(offset(v)) / (geo.current.view * 0.5)));

  const number = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <article className="h-[max(22rem,calc(100svh-28rem))] w-[100vw] px-[var(--gutter)] lg:h-[max(26rem,calc(100svh-16rem))]">
      <div
        className={cn(
          "grid size-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden p-[var(--gutter)] transition-colors duration-300",
          red ? "border border-accent bg-[var(--accent-glass)] text-accent-foreground backdrop-blur-[10px] lg:backdrop-blur-[16px]" : "kit-glass",
        )}
      >
        <div className="flex items-start justify-between gap-6 font-mono text-[length:var(--text-label)] uppercase leading-[1.5]">
          <p className="min-w-0 truncate">
            {number} / {item.category}
          </p>
          <p className="whitespace-nowrap">
            {number} / {count}
          </p>
        </div>

        <div
          ref={rowRef}
          aria-hidden="true"
          className="relative flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <motion.div
            style={reduce ? undefined : { x: wordX, opacity: wordOpacity }}
            className="absolute left-1/2 top-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 items-center gap-[0.22em] whitespace-nowrap text-[length:min(clamp(4.5rem,16vw,16rem),24svh)] leading-none tracking-[-0.065em] will-change-transform"
          >
            {Array.from({ length: COPIES }, (_, i) => (
              <div key={i} className="flex items-center gap-[0.22em]">
                <p>{item.title}</p>
                <div className="size-[0.13em] rounded-full bg-current" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-wrap items-end justify-between gap-[var(--gap)]">
          <button
            type="button"
            onClick={() => onOpenPreview(item)}
            className="group/preview focus-visible:outline-accent relative w-[clamp(9rem,18vw,17rem)] shrink-0 text-left"
            aria-label={`Open website preview for ${item.title}`}
          >
            <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
              <motion.div
                variants={reduce ? undefined : { hidden: { clipPath: "inset(100% 0 0 0)" }, shown: { clipPath: "inset(0% 0 0 0)" } }}
                transition={{ duration: kit.slow, ease: kit.ease }}
              >
                <motion.div variants={reduce ? undefined : { hidden: { scale: 1.08 }, shown: { scale: 1 } }} transition={{ duration: kit.slow, ease: kit.ease }}>
                  <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? item.title} strength={0.1} className="rounded-none transition-transform duration-300 group-hover/preview:scale-105" />
                </motion.div>
              </motion.div>
            </motion.div>
            <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent transition-colors group-hover/preview:underline">
              View Design Preview →
            </span>
          </button>

          <div className="flex flex-col gap-3">
            {item.description && (
              <p className="max-w-[25rem] text-balance text-[length:var(--text-small)] leading-[1.5] opacity-80 lg:text-[length:var(--text-body)]">{item.description}</p>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenPreview(item)}
                className="btn-secondary !px-4 !py-2 text-xs"
              >
                <span className="btn-label">Launch Design Preview</span>
                <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioPreviewModal({ item, onClose }: { item: Work; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [speed, setSpeed] = useState<number>(1);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const cycleDuration = 12 / speed;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => (prev + 0.5) % cycleDuration);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, cycleDuration]);

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  const progressPercent = Math.min(100, Math.max(0, (elapsedSeconds / cycleDuration) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 md:p-6 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative my-auto flex w-full max-w-5xl flex-col rounded-2xl border border-accent/40 bg-[#141412] text-foreground shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-[#1a1a18] px-5 py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-red-500" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 id="preview-modal-title" className="font-bold text-base md:text-lg text-foreground truncate">
                  {item.title} — Website Scroll Video Preview
                </h3>
                <span className="hidden sm:inline-block rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] text-accent uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <p className="font-mono text-xs text-muted-foreground truncate">
                Interactive video recording • {item.clientLocation ?? "UK Business"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/30 px-3.5 py-1.5 font-mono text-xs font-semibold text-accent hover:bg-accent hover:text-black transition-all"
            aria-label="Close website preview modal"
          >
            <span>Close Preview</span>
            <span className="font-bold text-sm">✕</span>
          </button>
        </div>

        {/* Video Screen Container */}
        <div className="p-4 md:p-6 flex flex-col gap-5">
          {/* Top Control Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-[#1a1a18] p-3 text-xs font-mono">
            {/* Left: Device Toggle */}
            <div className="flex items-center gap-1.5 bg-[#111110] p-1 rounded-lg border border-border/40">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors",
                  device === "desktop" ? "bg-accent text-black font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>🖥️ Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors",
                  device === "mobile" ? "bg-accent text-black font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>📱 Mobile</span>
              </button>
            </div>

            {/* Middle: Video Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 rounded-lg bg-accent/20 border border-accent/40 px-3 py-1 text-accent font-semibold hover:bg-accent/30 transition-colors"
              >
                {isPlaying ? "⏸ Pause Scroll Video" : "▶ Play Scroll Video"}
              </button>
              <button
                type="button"
                onClick={handleReplay}
                className="rounded-lg bg-card border border-border/80 px-2.5 py-1 text-muted-foreground hover:text-foreground transition-colors"
                title="Restart Scroll Video"
              >
                ↺ Replay
              </button>
              <div className="hidden sm:flex items-center gap-1 bg-[#111110] p-1 rounded-lg border border-border/40 text-[11px]">
                <span className="px-1 text-muted-foreground">Speed:</span>
                {[1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeed(s)}
                    className={cn(
                      "rounded px-1.5 py-0.5 transition-colors",
                      speed === s ? "bg-accent/30 text-accent font-bold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Time Status */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                00:{String(Math.floor(elapsedSeconds)).padStart(2, "0")} / 00:{String(Math.floor(cycleDuration)).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Device Mockup Window */}
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border border-border/80 bg-[#0e0e0d] shadow-2xl transition-all duration-300 mx-auto w-full",
              device === "mobile" ? "max-w-[360px] border-4 border-neutral-700 rounded-3xl" : "max-w-none"
            )}
          >
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between border-b border-border/50 bg-[#1c1c19] px-4 py-2 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-yellow-500/80" />
                <span className="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex max-w-md items-center justify-center truncate rounded-md bg-[#111110] px-3 py-0.5 text-[11px] text-muted-foreground border border-border/30">
                🔒 https://{item.title.toLowerCase().replace(/\s+/g, "")}.co.uk (Video Scroll Preview)
              </div>
              <div className="hidden sm:block text-[10px] text-accent/80 uppercase tracking-widest">
                {isPlaying ? "● REC" : "PAUSED"}
              </div>
            </div>

            {/* Scroll Animation Screen Viewport */}
            <div
              className={cn(
                "relative overflow-hidden bg-[#0c0c0b]",
                device === "mobile" ? "h-[460px]" : "h-[380px] md:h-[420px]",
                !isPlaying && "overflow-y-auto"
              )}
            >
              {/* Simulated Website Content Canvas */}
              <motion.div
                key={`${replayKey}-${device}`}
                animate={
                  isPlaying
                    ? { y: device === "mobile" ? ["0%", "-68%", "-68%", "0%", "0%"] : ["0%", "-60%", "-60%", "0%", "0%"] }
                    : undefined
                }
                transition={
                  isPlaying
                    ? {
                        duration: cycleDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.44, 0.54, 0.94, 1],
                      }
                    : undefined
                }
                className="w-full flex flex-col gap-0 select-none pointer-events-auto"
              >
                {/* Section 1: Simulated Website Navigation & Hero */}
                <div className="relative border-b border-border/40 bg-[#161614] p-5 md:p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-border/30 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded bg-accent flex items-center justify-center font-bold text-black text-xs">
                        {item.title.charAt(0)}
                      </div>
                      <span className="font-bold tracking-tight text-white">{item.title}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>Services</span>
                      <span>Portfolio</span>
                      <span>About</span>
                      <span>Contact</span>
                    </div>
                    <span className="rounded bg-accent/20 border border-accent/40 px-2.5 py-1 text-[11px] text-accent font-mono">
                      Enquire →
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-3 py-1 font-mono text-[10px] text-accent w-fit uppercase tracking-widest">
                      ✦ Bespoke Website Architecture • {item.clientLocation ?? "UK Business"}
                    </div>
                    <h4 className="text-xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                      Next-Generation Digital Platform for {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Hero Image Showcase Banner */}
                  <div className="relative overflow-hidden rounded-xl border border-border/60 h-48 md:h-56 w-full">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex items-end justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-accent uppercase">Live Platform Status</span>
                        <span className="text-sm font-bold text-white">Interactive Client Booking System</span>
                      </div>
                      {item.results && (
                        <div className="rounded-full bg-emerald-500/20 border border-emerald-500/50 px-3 py-1 font-mono text-xs text-emerald-300">
                          ✦ {item.results}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Key Deliverables & System Capabilities */}
                <div className="bg-[#121210] p-5 md:p-8 border-b border-border/40 flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase text-accent tracking-widest">Architectural Features</span>
                    <h5 className="text-lg font-bold text-white">Engineered for High Conversion & Automation</h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(item.deliverables ?? ["Bespoke UI Design", "24/7 AI Lead Assistant", "Local SEO Engine"]).map((del, i) => (
                      <div key={i} className="rounded-xl border border-border/50 bg-[#191917] p-4 flex flex-col gap-2">
                        <span className="font-mono text-xs text-accent">0{i + 1} //</span>
                        <h6 className="font-semibold text-sm text-white">{del}</h6>
                        <p className="text-xs text-gray-400">
                          Tailored performance module built to automate customer intake and drive verified conversions.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Simulated AI Lead Assistant Widget */}
                <div className="bg-[#171715] p-5 md:p-8 border-b border-border/40 flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div className="flex flex-col gap-2 max-w-md">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
                      <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>24/7 AI Intake Assistant Active</span>
                    </div>
                    <h5 className="text-lg font-bold text-white">Instant Customer Qualification</h5>
                    <p className="text-xs text-gray-300">
                      Visitors receive immediate answers, personalized recommendations, and instant booking options.
                    </p>
                  </div>

                  <div className="w-full md:w-72 rounded-xl border border-accent/30 bg-[#10100f] p-3.5 flex flex-col gap-2 shadow-lg">
                    <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                      <span className="size-2.5 rounded-full bg-accent" />
                      <span className="font-mono text-xs font-semibold text-white">{item.title} Concierge</span>
                    </div>
                    <p className="text-xs text-gray-300 italic">
                      &quot;Hello! How can we assist you with {item.category.toLowerCase()} inquiries today?&quot;
                    </p>
                    <div className="flex gap-2 pt-1">
                      <span className="rounded bg-accent/20 px-2 py-1 font-mono text-[10px] text-accent">Book Call</span>
                      <span className="rounded bg-card border border-border/50 px-2 py-1 font-mono text-[10px] text-muted-foreground">View Rates</span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Client Outcome & Footer */}
                <div className="bg-[#10100e] p-6 md:p-8 flex flex-col gap-6">
                  <div className="rounded-xl border border-border/40 bg-[#161614] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] text-accent uppercase">Client Success Story</span>
                      <p className="text-sm font-semibold text-gray-200 mt-1">
                        &quot;Arivelune Studio delivered a high-converting digital experience that elevated our brand.&quot;
                      </p>
                    </div>
                    <div className="shrink-0 font-mono text-xs text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                      {item.results ?? "+340% Growth"}
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
                    <span>© 2026 {item.title}. All rights reserved.</span>
                    <span>Designed by Arivelune Studio</span>
                  </div>
                </div>
              </motion.div>

              {/* Video Scrubber Overlay Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pointer-events-none flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Auto-Scroll Video Playback</span>
                  </span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info & Action Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/60 bg-[#1a1a18] p-4 flex flex-col justify-between">
              <div>
                <h5 className="font-mono text-xs uppercase text-accent tracking-wider mb-2">Project Specifications</h5>
                <p className="text-xs text-muted-foreground">
                  Custom scroll-driven technology built for {item.title} ({item.clientLocation ?? "UK"}), engineered to turn website visitors into high-value client enquiries.
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {(item.deliverables ?? ["Bespoke Editorial Website", "AI Lead Assistant"]).map((del, i) => (
                  <span key={i} className="rounded-md bg-accent/10 border border-accent/20 px-2.5 py-1 font-mono text-[11px] text-accent">
                    ✓ {del}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-[#1a1a18] p-4 flex flex-col justify-between gap-3">
              <div>
                <h5 className="font-mono text-xs uppercase text-accent tracking-wider mb-1">Interested in this format?</h5>
                <p className="text-xs text-muted-foreground">
                  We create tailored, high-converting digital experiences with automated intake systems for your business.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="btn-primary w-full justify-center !py-2.5 text-xs font-semibold"
                >
                  Request Similar Website Build →
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary !px-4 !py-2.5 text-xs whitespace-nowrap"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryWordPanels({
  label = "04 / Selected work",
  title = "Client outcomes & pipeline results.",
  items = DEFAULT_ITEMS,
  ariaLabel,
  className,
}: GalleryWordPanelsProps) {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const x = useMotionValue(0);
  const [activePreview, setActivePreview] = useState<Work | null>(null);

  return (
    <section aria-label={ariaLabel ?? "Selected work"} className={cn("relative overflow-x-clip text-foreground", className)}>
      <HorizontalScrollSection
        compact
        progress={false}
        x={x}
        header={<Header label={label} title={title} kit={kit} reduce={reduce} />}
        headerClassName="w-[var(--container)] max-w-none px-0"
        trackClassName="gap-0 px-0 md:gap-0"
        className="py-0"
      >
        {items.map((item, index) => (
          <Panel key={index} item={item} index={index} total={items.length} x={x} kit={kit} reduce={reduce} onOpenPreview={setActivePreview} />
        ))}
      </HorizontalScrollSection>

      {activePreview && <PortfolioPreviewModal item={activePreview} onClose={() => setActivePreview(null)} />}
    </section>
  );
}
