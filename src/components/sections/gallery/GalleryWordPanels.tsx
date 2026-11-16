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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative my-auto flex w-full max-w-4xl flex-col rounded-2xl border border-accent/40 bg-[#161614] text-foreground shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-[#1c1c19] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-block size-3 rounded-full bg-accent" />
            <h3 id="preview-modal-title" className="font-bold text-lg text-foreground">
              {item.title} Website Design Preview
            </h3>
            <span className="rounded-full bg-accent/10 px-3 py-0.5 font-mono text-xs text-accent uppercase">
              {item.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border/80 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
            aria-label="Close website preview modal"
          >
            Close ✕
          </button>
        </div>

        {/* Modal Content: Browser Frame Preview */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-[#111110] shadow-inner">
            {/* Top Browser Bar */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-[#1e1e1b] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-md bg-[#121210] px-3 py-1 font-mono text-xs text-muted-foreground">
                🔒 https://{item.title.toLowerCase().replace(/\s+/g, "")}-preview.arivelune.studio
              </div>
            </div>

            {/* Simulated Live Website View */}
            <div className="relative min-h-[300px] md:min-h-[360px] w-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${item.imageSrc})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/70 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent mb-2">
                  <span>Client Site Built By Arivelune Studio</span>
                  <span>•</span>
                  <span>{item.clientLocation ?? "UK Business"}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title} Official Digital Platform</h4>
                <p className="text-sm md:text-base text-gray-300 max-w-2xl mb-4">{item.description}</p>
                {item.results && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 font-mono text-xs text-emerald-400 w-fit">
                    ✦ Verified Outcome: {item.results}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deliverables & Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border/60 bg-[#1a1a18] p-5">
              <h5 className="font-mono text-xs uppercase text-accent tracking-wider mb-3">Key System Deliverables</h5>
              <ul className="space-y-2 font-sans text-sm text-foreground/90">
                {(item.deliverables ?? ["Bespoke Luxury UI", "24/7 AI Enquiry Assistant", "Local Search Optimization"]).map((del, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border/60 bg-[#1a1a18] p-5 flex flex-col justify-between">
              <div>
                <h5 className="font-mono text-xs uppercase text-accent tracking-wider mb-2">Commercial Value</h5>
                <p className="text-sm text-muted-foreground">
                  Engineered to maximize qualified customer conversions and automate lead intake for local UK service providers.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="btn-primary w-full justify-center !py-3 text-sm"
                >
                  Request Similar Website Build →
                </a>
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
