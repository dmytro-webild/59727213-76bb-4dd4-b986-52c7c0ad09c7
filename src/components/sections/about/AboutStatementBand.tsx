import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Word = { title: string };

type AboutStatementBandProps = {
  tag?: string;
  title?: string;
  description?: string;
  button?: { text: string; href: string };
  visionTag?: string;
  items?: Word[];
  line?: string;
  ariaLabel?: string;
  className?: string;
};

const MonoLabel = ({ tag }: { tag?: string }) => {
  const reduce = useReducedMotion();
  const typing = (tag?.length ?? 0) * 0.02;
  if (!tag) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-[14px] gap-y-1 font-mono text-[length:var(--text-label)] uppercase leading-[1.5] tracking-[var(--label-tracking)]">
      {tag && (
        <motion.p
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: typing, ease: "linear" }}
          className="whitespace-nowrap text-foreground"
        >
          {tag}
        </motion.p>
      )}
    </div>
  );
};

const AboutStatementBand = ({
  tag = "01 / The studio",
  title = "We shape brands and websites that turn one sharp idea into a place people want to stay.",
  description = "From positioning and identity to interface design and build, we connect every part of how your brand shows up online.",
  button = { text: "Our approach", href: "#process" },
  visionTag = "02 / Vision",
  items = [{ title: "FORM" }, { title: "MOTION" }, { title: "CRAFT" }],
  line = "✦ A thought becomes a world.",
  ariaLabel,
  className,
}: AboutStatementBandProps) => {
  const bandRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-33.333%"]);
  const words = title.split(" ");

  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn("relative overflow-x-clip py-[var(--section-space)] text-foreground", className)}
    >
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col p-[1.375rem] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        <MonoLabel tag={tag} />
        <motion.h2
          aria-label={title}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ staggerChildren: 0.04, delayChildren: 0.15 }}
          className="mt-7 max-w-[17em] text-[length:var(--text-h2)] leading-[1.05] lg:mt-10"
        >
          {words.map((word, index) => (
            <div key={index} aria-hidden="true" className={cn("-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top", index < words.length - 1 && "mr-[0.25em]")}>
              <motion.div
                variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                transition={{ duration: slow, ease }}
                className="inline-block"
              >
                {word}
              </motion.div>
            </div>
          ))}
        </motion.h2>
        <div className="mt-[clamp(1.5rem,3vw,3rem)] grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-12 lg:gap-[var(--gap)]">
          {(description || button) && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: slow, ease, delay: 0.2 }}
              className="flex flex-col items-start gap-[30px] lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9"
            >
              {description && <p className="max-w-[24em] text-[length:var(--text-body-lg)] leading-[1.3]">{description}</p>}
              {button && (
                <a href={button.href} className="btn-link w-[15rem] max-w-full justify-between">
                  <p className="whitespace-nowrap">{button.text}</p>
                  <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M3 9l6-6M4 3h5v5" />
                  </svg>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <div ref={bandRef} className="flex flex-col gap-7 pt-[var(--section-space)] lg:gap-9">
        <div className="mx-auto w-[var(--container)]">
          <MonoLabel tag={visionTag} />
        </div>
        {items.length > 0 && (
          <div
            aria-label={items.map((item) => item.title).join(", ")}
            role="img"
            className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,color-mix(in_srgb,black_15%,transparent)_8%,black_38%,black_62%,color-mix(in_srgb,black_15%,transparent)_92%,transparent)]"
          >
            <motion.div style={reduce ? undefined : { x }} className="flex w-max items-center">
              {[0, 1, 2].map((copy) =>
                items.map((item, index) => (
                  <div key={`${copy}-${index}`} aria-hidden="true" className="flex shrink-0 items-center">
                    <p className="whitespace-nowrap px-[clamp(1rem,2.5vw,2.25rem)] text-[length:var(--text-h1)] leading-[1.05] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)]">
                      {item.title}
                    </p>
                    <svg viewBox="0 0 16 16" className="size-[clamp(0.75rem,1.2vw,1.125rem)] shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M8 1v14M1 8h14" />
                    </svg>
                  </div>
                )),
              )}
            </motion.div>
          </div>
        )}
        {line && (
          <div className="mx-auto w-[var(--container)]">
            <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)]">{line}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutStatementBand;
