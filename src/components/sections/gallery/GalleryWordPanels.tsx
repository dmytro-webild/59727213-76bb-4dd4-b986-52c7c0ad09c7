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
  statusType?: "completed" | "concept";
  statusLabel?: string;
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
    statusType: "completed",
    statusLabel: "Completed Client Project",
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
    statusType: "completed",
    statusLabel: "Completed Client Project",
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
    statusType: "concept",
    statusLabel: "Design Concept & Architecture",
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
    statusType: "completed",
    statusLabel: "Completed Client Project",
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
  onOpenPreview: (item: Work, index: number) => void;
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
        <div className="flex items-start justify-between gap-4 font-mono text-[length:var(--text-label)] uppercase leading-[1.5]">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <p className="min-w-0 truncate">
              {number} / {item.category}
            </p>
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-semibold border",
                item.statusType === "concept"
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              )}
            >
              {item.statusLabel ?? (item.statusType === "concept" ? "Concept Project" : "Completed Client Project")}
            </span>
          </div>
          <p className="whitespace-nowrap shrink-0">
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
            onClick={() => onOpenPreview(item, index)}
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
                onClick={() => onOpenPreview(item, index)}
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

function ApexWebsiteView({ item }: { item: Work }) {
  return (
    <div className="w-full flex flex-col gap-0 select-none bg-[#f4f1ea] text-[#1f1d19] font-sans">
      {/* Header */}
      <div className="bg-[#1a1917] px-6 py-4 text-white flex items-center justify-between border-b-2 border-[#8c6d46]">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded bg-[#8c6d46] text-white flex items-center justify-center font-bold font-serif text-sm">
            A
          </div>
          <span className="font-serif tracking-wide font-bold text-base text-[#f4f1ea]">APEX ARCHITECTURAL & COMMERCIAL</span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-xs font-mono text-[#d6cbb5]">
          <span>Projects</span>
          <span>Estimator</span>
          <span>Safety & Specs</span>
          <span>Intake Portal</span>
        </div>
        <span className="rounded bg-[#8c6d46] text-white px-3 py-1 font-mono text-xs uppercase tracking-wider font-semibold">
          Request Proposal →
        </span>
      </div>

      {/* Hero */}
      <div className="p-6 md:p-8 flex flex-col gap-5 border-b border-[#d8ccb8] bg-[#f9f7f2]">
        <span className="inline-flex items-center gap-2 rounded bg-[#8c6d46]/15 border border-[#8c6d46]/40 px-3 py-1 font-mono text-xs font-semibold text-[#8c6d46] w-fit">
          ✦ LUXURY ARCHITECTURAL & COMMERCIAL BUILDER • BERKSHIRE
        </span>
        <h4 className="font-serif text-2xl md:text-4xl font-extrabold text-[#1a1917] leading-tight">
          Engineering Exceptional Structural Architecture Across Berkshire.
        </h4>
        <p className="text-xs md:text-sm text-[#524d45] max-w-xl leading-relaxed">
          Turnkey commercial developments, executive structural renovations, and 24/7 lead intake routing for high-value tenders.
        </p>
        <div className="relative overflow-hidden rounded-lg border-2 border-[#8c6d46]/40 h-52 w-full bg-[#1c1b18]">
          <img src={item.imageSrc} alt={item.imageAlt ?? item.title} className="size-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#c4af8a] uppercase">3D BIM Model Loaded</span>
              <span className="text-sm font-bold text-white font-serif">Structural Engineering Specifications</span>
            </div>
            <span className="rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 px-2.5 py-1 font-mono text-xs">
              +340% Lead Conversion
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Bidding & Project Estimator */}
      <div className="p-6 md:p-8 flex flex-col gap-4 border-b border-[#d8ccb8] bg-white">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-bold text-[#8c6d46] uppercase tracking-wider">
            01 // INTERACTIVE PROJECT ESTIMATOR & BIDDING
          </span>
          <h5 className="font-serif text-xl font-bold text-[#1a1917]">Turnkey Structural Bidding Options</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Commercial Turnkey Build", spec: "Up to 15,000 sq ft", time: "3-4 Months Delivery", price: "From £1.2M" },
            { title: "Executive Renovation", spec: "Bespoke Structural Specs", time: "2 Months Delivery", price: "From £450,000" },
            { title: "Infrastructure Site Bids", spec: "Turnkey Scoping & Plans", time: "Fast-Track Approval", price: "From £250,000" },
          ].map((card, i) => (
            <div key={i} className="rounded-lg border border-[#d8ccb8] bg-[#fdfbf7] p-4 flex flex-col justify-between border-l-4 border-l-[#8c6d46]">
              <span className="font-mono text-[10px] font-bold text-[#8c6d46]">TIER 0{i + 1} SPEC</span>
              <h6 className="font-serif font-bold text-base text-[#1a1917] mt-1">{card.title}</h6>
              <p className="text-xs text-[#524d45] mt-1">{card.spec} • {card.time}</p>
              <div className="mt-3 pt-2 border-t border-[#e2d7c5] flex justify-between items-center text-xs font-bold font-mono text-[#8c6d46]">
                <span>Estimate:</span>
                <span>{card.price}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Estimator Slider Simulation */}
        <div className="mt-2 rounded-lg border border-[#8c6d46]/30 bg-[#f4f1ea] p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-mono font-bold text-[#1a1917]">
            <span>Project Scope Calculator: 8,500 sq ft Commercial Site</span>
            <span className="text-[#8c6d46] font-serif font-bold text-sm">Estimated Tender: £850,000</span>
          </div>
          <div className="h-2 w-full bg-[#d6cbb5] rounded-full overflow-hidden">
            <div className="h-full bg-[#8c6d46] w-[65%]" />
          </div>
        </div>
      </div>

      {/* Section 3: Site Qualification & Supervisor Bot */}
      <div className="p-6 md:p-8 flex flex-col gap-4 bg-[#1c1a17] text-white">
        <span className="font-mono text-xs text-[#c4af8a] uppercase tracking-wider">
          02 // 24/7 AUTOMATED COMMERCIAL QUALIFICATION
        </span>
        <h5 className="font-serif text-xl font-bold text-[#f4f1ea]">Live Lead Qualification Log</h5>
        <div className="rounded-lg border border-[#8c6d46]/40 bg-[#262420] p-4 flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Apex Intake Bot: "4 new commercial tender proposals qualified today"</span>
          </div>
          <p className="text-gray-300">
            Incoming clients submit structural specs and receive instant consultation schedules directly routed to Project Directors.
          </p>
        </div>
      </div>
    </div>
  );
}

function VerveWebsiteView({ item }: { item: Work }) {
  return (
    <div className="w-full flex flex-col gap-0 select-none bg-[#08090c] text-[#f0f2f8] font-sans">
      {/* Header */}
      <div className="bg-[#0f1118] px-6 py-4 text-white flex items-center justify-between border-b-2 border-[#ff2a55]">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded bg-[#ff2a55] text-white flex items-center justify-center font-extrabold text-sm tracking-wider">
            V
          </div>
          <span className="font-extrabold tracking-widest text-base text-white">VERVE AUTOMOTIVE // DETAILING</span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-xs font-mono text-gray-400">
          <span>Services</span>
          <span>Packages</span>
          <span>Bay Status</span>
          <span>Contact</span>
        </div>
        <span className="rounded bg-[#ff2a55] text-white px-3 py-1 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_15px_rgba(255,42,85,0.5)]">
          Book Bay →
        </span>
      </div>

      {/* Hero */}
      <div className="p-6 md:p-8 flex flex-col gap-5 border-b border-[#222533] bg-[#0c0e15] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff2a55]/10 rounded-full blur-3xl pointer-events-none" />
        <span className="inline-flex items-center gap-2 rounded-full bg-[#ff2a55]/20 border border-[#ff2a55]/60 px-3.5 py-1 font-mono text-xs font-extrabold text-[#ff2a55] w-fit">
          ⚡ PRECISION CERAMIC COATING & PPF • READING, UK
        </span>
        <h4 className="text-2xl md:text-4xl font-black uppercase text-white leading-tight tracking-tight">
          High-Performance Vehicle Care & Paint Protection.
        </h4>
        <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
          High-contrast digital portal and automated instant slot booking engine engineered for sports cars & hypercars.
        </p>
        <div className="relative overflow-hidden rounded-xl border-2 border-[#ff2a55]/50 h-52 w-full bg-[#000]">
          <img src={item.imageSrc} alt={item.imageAlt ?? item.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-transparent p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#00f0ff] uppercase font-bold">RPM Hardness Gauge Active</span>
              <span className="text-sm font-extrabold text-white">Ceramic Pro 9H Certified Detailing</span>
            </div>
            <span className="rounded-full bg-[#ff2a55]/30 text-[#ff2a55] border border-[#ff2a55]/70 px-3 py-1 font-mono text-xs font-bold">
              ⚡ 24/7 Automated Slot Reservation
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Ceramic & PPF Spec Matrix */}
      <div className="p-6 md:p-8 flex flex-col gap-4 border-b border-[#222533] bg-[#0e1017]">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-bold text-[#ff2a55] uppercase tracking-widest">
            01 // CERAMIC & PAINT PROTECTION PACKAGES
          </span>
          <h5 className="text-xl font-extrabold text-white">Precision Surface Protection Tiers</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Ceramic Pro 9H", spec: "5-Year Paint Guarantee", price: "From £795" },
            { title: "Full Frontal PPF", spec: "Self-Healing Urethane", price: "From £1,295" },
            { title: "Ultimate Track Shield", spec: "Full Body Gloss / Matte", price: "From £2,495" },
          ].map((card, i) => (
            <div key={i} className="rounded-xl border border-[#ff2a55]/30 bg-[#161217] p-4 flex flex-col justify-between">
              <span className="font-mono text-[10px] font-bold text-[#ff2a55]">STAGE 0{i + 1}</span>
              <h6 className="font-extrabold text-base text-white mt-1">{card.title}</h6>
              <p className="text-xs text-gray-300 mt-1">{card.spec}</p>
              <div className="mt-3 pt-2 border-t border-[#ff2a55]/20 flex justify-between items-center text-xs font-bold font-mono text-[#00f0ff]">
                <span>Package Price:</span>
                <span className="text-[#ff2a55] text-sm">{card.price}</span>
              </div>
            </div>
          ))}
        </div>
        {/* RPM Hardness Meter Widget */}
        <div className="mt-2 rounded-xl border border-[#00f0ff]/40 bg-[#07131a] p-4 flex justify-between items-center font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border-2 border-[#00f0ff] flex items-center justify-center font-bold text-[#00f0ff]">
              9H
            </div>
            <div>
              <span className="text-white font-bold block">9H Hardness Meter Rating</span>
              <span className="text-gray-400">99.6% Surface Protection Score</span>
            </div>
          </div>
          <span className="text-[#00f0ff] font-bold">✓ Verified Certified</span>
        </div>
      </div>

      {/* Section 3: Live Bay Ticker */}
      <div className="p-6 md:p-8 flex flex-col gap-4 bg-[#0a0b10]">
        <div className="rounded-xl border border-[#ff2a55]/50 bg-[#1d090f] p-4 flex flex-col gap-2 font-mono text-xs">
          <div className="flex justify-between items-center text-[#ff2a55]">
            <span className="font-bold">⚡ LIVE READING WORKSHOP CALENDAR</span>
            <span className="bg-[#ff2a55]/30 text-white px-2 py-0.5 rounded font-bold">2 Bays Remaining</span>
          </div>
          <p className="text-gray-300">
            Clients select detailing packages and confirm booking slots with instant online deposit routing.
          </p>
        </div>
      </div>
    </div>
  );
}

function CrestWebsiteView({ item }: { item: Work }) {
  return (
    <div className="w-full flex flex-col gap-0 select-none bg-[#f8fafc] text-[#0f172a] font-sans">
      {/* Header */}
      <div className="bg-[#070d19] px-6 py-4 text-white flex items-center justify-between border-b-2 border-[#d97706]">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded bg-[#d97706] text-white flex items-center justify-center font-serif font-bold text-sm">
            C
          </div>
          <span className="font-serif tracking-wider font-bold text-base text-white">CREST ADVISORY GROUP</span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-xs font-mono text-slate-300">
          <span>Disciplines</span>
          <span>Insights</span>
          <span>Compliance</span>
          <span>Portal</span>
        </div>
        <span className="rounded bg-[#d97706] text-white px-3 py-1 font-mono text-xs uppercase tracking-wider font-semibold">
          Client Portal →
        </span>
      </div>

      {/* Hero */}
      <div className="p-6 md:p-8 flex flex-col gap-5 border-b border-slate-200 bg-white">
        <span className="inline-flex items-center gap-2 rounded bg-[#d97706]/15 border border-[#d97706]/40 px-3 py-1 font-mono text-xs font-semibold text-[#b45309] w-fit">
          ✦ STRATEGIC CORPORATE WEALTH & ADVISORY • SLOUGH, UK
        </span>
        <h4 className="font-serif text-2xl md:text-4xl font-bold text-[#070d19] leading-tight">
          Institutional-Grade Advisory & Wealth Preservation Platform.
        </h4>
        <p className="text-xs md:text-sm text-slate-600 max-w-xl leading-relaxed">
          Cinematic layout with corporate compliance, confidential client portal, and local search visibility for regional firms.
        </p>
        <div className="relative overflow-hidden rounded-lg border border-slate-300 h-52 w-full bg-[#0f172a]">
          <img src={item.imageSrc} alt={item.imageAlt ?? item.title} className="size-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-transparent to-transparent p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#fbbf24] uppercase">Audited Financial Systems</span>
              <span className="text-sm font-bold text-white font-serif">Executive Wealth Preservation Matrix</span>
            </div>
            <span className="rounded bg-sky-500/20 text-sky-200 border border-sky-500/50 px-3 py-1 font-mono text-xs">
              +380% Qualified Deal Flow
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Advisory Disciplines */}
      <div className="p-6 md:p-8 flex flex-col gap-4 border-b border-slate-200 bg-slate-50">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-bold text-[#d97706] uppercase tracking-wider">
            01 // ADVISORY DISCIPLINES & SERVICES
          </span>
          <h5 className="font-serif text-xl font-bold text-[#070d19]">Corporate Governance & Transaction Advisory</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Corporate Restructuring", spec: "Cross-border tax & asset optimization" },
            { title: "Wealth Preservation", spec: "Private estate governance & audited trusts" },
            { title: "M&A Strategic Advisory", spec: "Encrypted M&A portal & deal room" },
          ].map((card, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-[#0f172a] text-white p-4 flex flex-col justify-between">
              <span className="font-mono text-[10px] font-bold text-[#fbbf24]">SECTOR 0{i + 1}</span>
              <h6 className="font-serif font-bold text-base text-white mt-1">{card.title}</h6>
              <p className="text-xs text-slate-300 mt-1">{card.spec}</p>
              <div className="mt-3 pt-2 border-t border-slate-700 flex justify-between items-center text-xs font-mono text-[#fbbf24]">
                <span>Status:</span>
                <span>Active Advisor</span>
              </div>
            </div>
          ))}
        </div>
        {/* Metric counter */}
        <div className="mt-2 rounded-lg border border-[#d97706]/30 bg-white p-4 flex justify-between items-center font-mono text-xs text-[#070d19]">
          <span className="font-bold">£420M Assets Under Advisory</span>
          <span className="text-emerald-600 font-bold">3.8x Prospect Pipeline</span>
        </div>
      </div>

      {/* Section 3: Confidential Client Portal */}
      <div className="p-6 md:p-8 flex flex-col gap-4 bg-[#070d19] text-white">
        <span className="font-mono text-xs text-[#fbbf24] uppercase tracking-wider">
          02 // CONFIDENTIAL CLIENT INTAKE PORTAL
        </span>
        <div className="rounded-lg border border-sky-500/40 bg-[#0c1e38] p-4 flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
            <span>🔒 256-Bit SSL Encrypted Intake Workspace Active</span>
          </div>
          <p className="text-slate-300">
            Prospective clients securely submit financial parameters for direct executive review and compliance clearance.
          </p>
        </div>
      </div>
    </div>
  );
}

function SlateWebsiteView({ item }: { item: Work }) {
  return (
    <div className="w-full flex flex-col gap-0 select-none bg-[#fff8f6] text-[#2d1b26] font-sans">
      {/* Header */}
      <div className="bg-[#2d1b26] px-6 py-4 text-white flex items-center justify-between border-b-2 border-[#f472b6]">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-[#f472b6] text-white flex items-center justify-center font-serif font-bold text-sm">
            S
          </div>
          <span className="font-serif tracking-widest font-bold text-base text-[#fff8f6]">S L A T E — BOUTIQUE SALON</span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-xs font-mono text-rose-200">
          <span>Rituals</span>
          <span>Stylists</span>
          <span>Reservation</span>
          <span>Contact</span>
        </div>
        <span className="rounded-full bg-[#f472b6] text-white px-3.5 py-1 font-mono text-xs uppercase tracking-wider font-semibold">
          Book VIP →
        </span>
      </div>

      {/* Hero */}
      <div className="p-6 md:p-8 flex flex-col gap-5 border-b border-[#f3d5e2] bg-[#fdf4f8]">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#f472b6]/20 border border-[#f472b6]/40 px-3.5 py-1 font-mono text-xs font-semibold text-[#c026d3] w-fit">
          ✦ BOUTIQUE SALON WORKSPACE • WINDSOR, UK
        </span>
        <h4 className="font-serif text-2xl md:text-4xl font-bold text-[#4c1d95] leading-tight">
          Tailored Hair Styling & Beauty Rituals.
        </h4>
        <p className="text-xs md:text-sm text-[#704b60] max-w-xl leading-relaxed">
          Automated reservation workspace and mobile VIP intake engine built for premium beauty studios.
        </p>
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#f472b6]/40 h-52 w-full bg-[#2d1b26]">
          <img src={item.imageSrc} alt={item.imageAlt ?? item.title} className="size-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b26]/90 via-transparent to-transparent p-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#f472b6] uppercase">VIP Reservation Engine Active</span>
              <span className="text-sm font-bold text-white font-serif">Bespoke Hair & Beauty Rituals</span>
            </div>
            <span className="rounded-full bg-pink-500/30 text-pink-200 border border-pink-400/50 px-3 py-1 font-mono text-xs">
              +210% Booking Rate
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Rituals Menu */}
      <div className="p-6 md:p-8 flex flex-col gap-4 border-b border-[#f3d5e2] bg-white">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-bold text-[#c026d3] uppercase tracking-wider">
            01 // BOUTIQUE RITUALS & SERVICES MENU
          </span>
          <h5 className="font-serif text-xl font-bold text-[#4c1d95]">Styling & Hair Care Treatments</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Bespoke Balayage", spec: "Colour Masterclass • 2.5 Hours", price: "From £165" },
            { title: "Precision Sculpting", spec: "Senior Stylist Direct • 1 Hour", price: "From £95" },
            { title: "VIP Hair Treatment", spec: "Nourishment Ritual • 45 Mins", price: "From £75" },
          ].map((card, i) => (
            <div key={i} className="rounded-xl border border-[#f3d5e2] bg-[#fcf0f5] p-4 flex flex-col justify-between">
              <span className="font-mono text-[10px] font-bold text-[#c026d3]">RITUAL 0{i + 1}</span>
              <h6 className="font-serif font-bold text-base text-[#4c1d95] mt-1">{card.title}</h6>
              <p className="text-xs text-[#704b60] mt-1">{card.spec}</p>
              <div className="mt-3 pt-2 border-t border-[#f3d5e2] flex justify-between items-center text-xs font-bold font-mono text-[#c026d3]">
                <span>Price:</span>
                <span>{card.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: SMS Reservation Engine */}
      <div className="p-6 md:p-8 flex flex-col gap-4 bg-[#2d1b26] text-white">
        <span className="font-mono text-xs text-[#f472b6] uppercase tracking-wider">
          02 // AUTOMATED SMS RESERVATIONS
        </span>
        <div className="rounded-xl border border-[#f472b6]/40 bg-[#3b2332] p-4 flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#f472b6]">
            <span className="font-bold">📱 INSTANT MOBILE SMS CONFIRMATIONS</span>
            <span className="bg-[#f472b6]/20 text-pink-200 px-2 py-0.5 rounded">+210% Booking Rate</span>
          </div>
          <p className="text-rose-100">
            Clients book treatments online and receive instant SMS confirmations with automated reminders, eliminating no-shows.
          </p>
        </div>
      </div>
    </div>
  );
}

function getProjectAnimationConfig(item: Work, index: number) {
  const titleLower = item.title.toLowerCase();

  if (titleLower.includes("apex") || index === 0) {
    return {
      accentColor: "#c4af8a",
      accentBg: "rgba(196, 175, 138, 0.15)",
      accentBorder: "rgba(196, 175, 138, 0.4)",
      badgeText: "✦ Architectural Build • Berkshire",
      baseDuration: 14,
      desktopKeyframes: ["0%", "-28%", "-28%", "-65%", "-65%", "0%"],
      mobileKeyframes: ["0%", "-32%", "-32%", "-70%", "-70%", "0%"],
      times: [0, 0.38, 0.50, 0.84, 0.93, 1],
      ease: "easeInOut" as const,
      Renderer: ApexWebsiteView,
    };
  }

  if (titleLower.includes("verve") || index === 1) {
    return {
      accentColor: "#ff2a55",
      accentBg: "rgba(255, 42, 85, 0.15)",
      accentBorder: "rgba(255, 42, 85, 0.4)",
      badgeText: "⚡ Precision Detailing • Reading",
      baseDuration: 10,
      desktopKeyframes: ["0%", "-24%", "-24%", "-58%", "-58%", "-84%", "-84%", "0%"],
      mobileKeyframes: ["0%", "-28%", "-28%", "-62%", "-62%", "-88%", "-88%", "0%"],
      times: [0, 0.22, 0.32, 0.52, 0.62, 0.82, 0.90, 1],
      ease: "easeInOut" as const,
      Renderer: VerveWebsiteView,
    };
  }

  if (titleLower.includes("crest") || index === 2) {
    return {
      accentColor: "#d97706",
      accentBg: "rgba(217, 119, 6, 0.15)",
      accentBorder: "rgba(217, 119, 6, 0.4)",
      badgeText: "✦ Corporate Wealth & Advisory • Slough",
      baseDuration: 16,
      desktopKeyframes: ["0%", "-30%", "-30%", "-68%", "-68%", "0%"],
      mobileKeyframes: ["0%", "-34%", "-34%", "-74%", "-74%", "0%"],
      times: [0, 0.40, 0.52, 0.85, 0.94, 1],
      ease: "easeInOut" as const,
      Renderer: CrestWebsiteView,
    };
  }

  return {
    accentColor: "#f472b6",
    accentBg: "rgba(244, 114, 182, 0.15)",
    accentBorder: "rgba(244, 114, 182, 0.4)",
    badgeText: "✦ Boutique Salon Workspace • Windsor",
    baseDuration: 12,
    desktopKeyframes: ["0%", "-35%", "-35%", "-74%", "-74%", "0%"],
    mobileKeyframes: ["0%", "-40%", "-40%", "-78%", "-78%", "0%"],
    times: [0, 0.32, 0.44, 0.80, 0.90, 1],
    ease: "easeInOut" as const,
    Renderer: SlateWebsiteView,
  };
}

function PortfolioPreviewModal({ item, index = 0, onClose }: { item: Work; index?: number; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [device, setDevice] = useState<"interactive" | "3d" | "desktop" | "mobile">("interactive");
  const [speed, setSpeed] = useState<number>(1);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const config = getProjectAnimationConfig(item, index);
  const cycleDuration = config.baseDuration / speed;
  const RendererComponent = config.Renderer;

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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 id="preview-modal-title" className="font-bold text-base md:text-lg text-foreground truncate">
                  {item.title} — {item.category}
                </h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold border",
                    item.statusType === "concept"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  )}
                >
                  {item.statusLabel ?? (item.statusType === "concept" ? "Concept Project" : "Completed Client Project")}
                </span>
              </div>
              <p className="font-mono text-xs text-muted-foreground truncate">
                Interactive Website Demonstration • {item.clientLocation ?? "UK Business"}
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
            {/* Left: View Mode Toggle */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#111110] p-1 rounded-lg border border-border/40">
              <button
                type="button"
                onClick={() => {
                  setDevice("interactive");
                  setIsPlaying(false);
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors",
                  device === "interactive" ? "bg-accent text-black font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>⚡ Interactive Demo</span>
              </button>
              <button
                type="button"
                onClick={() => setDevice("3d")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors",
                  device === "3d" ? "bg-accent text-black font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>⚙️ 3D Console</span>
              </button>
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
                {isPlaying ? "⏸ Pause Auto-Scroll" : "▶ Play Auto-Scroll"}
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

          {/* Device / 3D Cyber Console Viewport */}
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border border-border/80 bg-[#0e0e0d] shadow-2xl transition-all duration-300 mx-auto w-full",
              device === "mobile"
                ? "max-w-[360px] border-4 border-neutral-700 rounded-3xl"
                : device === "3d"
                ? "p-3 bg-[#18191c] border-2 border-accent/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                : "max-w-none"
            )}
          >
            {/* If 3D Cyber Console View Mode */}
            {device === "3d" && (
              <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-white uppercase tracking-widest">3D CYBER CONSOLE DRUM RACK</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>BELT DRIVE: ONLINE</span>
                  <span className="text-accent font-bold">3D TILT TIER 01</span>
                </div>
              </div>
            )}

            {/* Browser / Frame Top Bar */}
            <div className="flex items-center justify-between border-b border-border/50 bg-[#1c1c19] px-4 py-2 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-yellow-500/80" />
                <span className="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex max-w-md items-center justify-center truncate rounded-md bg-[#111110] px-3 py-0.5 text-[11px] text-muted-foreground border border-border/30">
                🔒 https://{item.title.toLowerCase().replace(/\s+/g, "")}.co.uk (Unique Design & 3D Scroll)
              </div>
              <div className="hidden sm:block text-[10px] text-accent/80 uppercase tracking-widest">
                {isPlaying ? "● REC" : "PAUSED"}
              </div>
            </div>

            {/* Scroll Animation Screen Viewport with 3D Perspective Support */}
            <div
              className={cn(
                "relative overflow-hidden bg-[#0c0c0b]",
                device === "mobile" ? "h-[460px]" : "h-[400px] md:h-[450px]",
                !isPlaying && "overflow-y-auto"
              )}
              style={
                device === "3d"
                  ? {
                      perspective: "1200px",
                    }
                  : undefined
              }
            >
              {/* Animated Canvas */}
              <motion.div
                key={`${replayKey}-${device}`}
                animate={
                  isPlaying
                    ? { y: device === "mobile" ? config.mobileKeyframes : config.desktopKeyframes }
                    : undefined
                }
                transition={
                  isPlaying
                    ? {
                        duration: cycleDuration,
                        repeat: Infinity,
                        ease: config.ease,
                        times: config.times,
                      }
                    : undefined
                }
                style={
                  device === "3d"
                    ? {
                        transform: "rotateX(10deg) rotateY(-4deg) scale(0.96)",
                        transformOrigin: "center top",
                        boxShadow: "0 25px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)",
                      }
                    : undefined
                }
                className="w-full flex flex-col gap-0 select-none pointer-events-auto transition-transform duration-300"
              >
                <RendererComponent item={item} />
              </motion.div>

              {/* Video Scrubber Overlay Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pointer-events-none flex flex-col gap-1.5 z-20">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Auto-Scroll Video Playback ({config.baseDuration}s cycle)</span>
                  </span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%`, backgroundColor: config.accentColor }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info & Action Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/60 bg-[#1a1a18] p-4 flex flex-col justify-between">
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: config.accentColor }}>
                  Project Specifications
                </h5>
                <p className="text-xs text-muted-foreground">
                  Custom scroll-driven technology built for {item.title} ({item.clientLocation ?? "UK"}), engineered to turn website visitors into high-value client enquiries.
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {(item.deliverables ?? ["Bespoke Editorial Website", "AI Lead Assistant"]).map((del, i) => (
                  <span
                    key={i}
                    className="rounded-md border px-2.5 py-1 font-mono text-[11px]"
                    style={{ backgroundColor: config.accentBg, borderColor: config.accentBorder, color: config.accentColor }}
                  >
                    ✓ {del}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-[#1a1a18] p-4 flex flex-col justify-between gap-3">
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: config.accentColor }}>
                  Interested in this format?
                </h5>
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
  const [activePreview, setActivePreview] = useState<{ item: Work; index: number } | null>(null);

  const handleOpenPreview = (item: Work, index: number) => {
    setActivePreview({ item, index });
  };

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
          <Panel
            key={index}
            item={item}
            index={index}
            total={items.length}
            x={x}
            kit={kit}
            reduce={reduce}
            onOpenPreview={handleOpenPreview}
          />
        ))}
      </HorizontalScrollSection>

      {activePreview && (
        <PortfolioPreviewModal
          item={activePreview.item}
          index={activePreview.index}
          onClose={() => setActivePreview(null)}
        />
      )}
    </section>
  );
}
