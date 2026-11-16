import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Spec = { label: string; value: string };

type Plan = {
  title: string;
  badge?: string;
  featured?: boolean;
  description?: string;
  price: string;
  period?: string;
  specs?: Spec[];
  benefits?: string[];
  button?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
};

type PricingScopeColumnsProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: Plan[];
  ariaLabel?: string;
  className?: string;
};

const PricingScopeColumns = ({
  tag = "09 / Pricing",
  title = "Clear scope. Fixed price.",
  description = "Choose a starting point. We shape the brief, define the deliverables and build something worth noticing.",
  items = [
    {
      title: "Essential",
      description: "For local service providers seeking a distinct online presence.",
      price: "£1,000",
      period: "GBP / Starting project",
      specs: [
        { label: "Scope", value: "Bespoke editorial website" },
        { label: "Timeline", value: "3 to 4 weeks target" },
        { label: "AI Systems", value: "Smart enquiry form & email alerts" },
        { label: "Support", value: "30 days post-launch care" },
      ],
      button: { text: "Check availability", href: "#contact" },
    },
    {
      title: "Professional",
      description: "For businesses aiming to automate customer intake and lead follow-up.",
      price: "£2,000",
      period: "GBP / Full digital system",
      specs: [
        { label: "Scope", value: "Complete digital system" },
        { label: "Timeline", value: "4 to 6 weeks target" },
        { label: "AI Systems", value: "24/7 AI chatbot integration" },
        { label: "Support", value: "90 days priority support" },
      ],
      button: { text: "Check availability", href: "#contact" },
    },
    {
      title: "Bespoke",
      description: "Tailored multi-location systems and lead-generation automation design.",
      price: "£5,000+",
      period: "GBP / Scoped to brief",
      specs: [
        { label: "Scope", value: "Custom multi-branch platform" },
        { label: "Timeline", value: "Agreed together" },
        { label: "AI Systems", value: "Custom AI & workflow deliverables" },
        { label: "Support", value: "Ongoing technical care option" },
      ],
      button: { text: "Discuss project", href: "#contact" },
    },
  ],
  ariaLabel,
  className,
}: PricingScopeColumnsProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const words = title ? title.split(/\s+/) : [];
  const labelSteps = tag.length;

  return (
    <section
      aria-label={ariaLabel ?? title ?? "Pricing"}
      className={cn("relative py-[var(--section-space)] text-foreground", className)}
    >
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col p-[1.375rem] lg:p-[clamp(2rem,3vw,3rem)]">
        <div className="flex items-center gap-[0.875rem]">
          <motion.p
            initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true }}
            transition={{ duration: labelSteps * 0.02, ease: (t: number) => Math.ceil(t * labelSteps) / labelSteps }}
            className="whitespace-nowrap font-[family-name:var(--font-label)] text-[length:var(--text-label)] uppercase leading-[1.5]"
          >
            {tag}
          </motion.p>
        </div>

        <div className="mt-[1.75rem] lg:mt-[2.5rem]">
          <div className="flex min-w-0 flex-col gap-[1.5rem] lg:flex-row lg:items-end lg:justify-between lg:gap-[3rem]">
            <h2 className="max-w-[9em] text-balance text-[length:var(--text-h2)] [overflow-wrap:anywhere]">
              {words.map((word, i) => (
                <Fragment key={i}>
                  <div className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                    <motion.div
                      initial={reduce ? false : { y: "110%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: kit.base, ease: kit.ease, delay: labelSteps * 0.02 + i * 0.04 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.div>
                  </div>
                  {i < words.length - 1 && " "}
                </Fragment>
              ))}
            </h2>
            {description && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: "1rem" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
                className="max-w-[40rem] text-balance text-[length:var(--text-body)] leading-[1.5] text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>

        <ul className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-1 gap-[0.75rem] lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] lg:gap-[1rem]">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={reduce ? false : "hide"}
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              className="h-full"
            >
              <motion.div
                variants={{
                  hide: { clipPath: "inset(100% 0% 0% 0%)" },
                  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: kit.slow, ease: kit.ease, delay: index * 0.08 } },
                }}
                className={cn(
                  "kit-card relative flex h-full flex-col p-[clamp(1.25rem,1.8vw,1.5rem)] [container-type:inline-size]",
                  item.featured && "border-2 border-accent bg-[var(--accent-glass)] backdrop-blur-md"
                )}
              >
                {item.badge && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-accent/20 border border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider font-semibold text-accent">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-balance text-[length:var(--text-h3)] leading-[1.1] [overflow-wrap:anywhere]">{item.title}</h3>
                {item.description && <p className="mt-[0.75rem] text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{item.description}</p>}
                <p className="mt-[clamp(1.5rem,2.5vw,2.5rem)] whitespace-nowrap text-[length:min(var(--text-h2),17cqi)] leading-[1] tracking-[var(--heading-tracking)]">{item.price}</p>
                {item.period && <p className="mt-[0.5rem] whitespace-nowrap font-[family-name:var(--font-label)] text-[length:var(--text-label)] uppercase leading-[1.5] text-muted-foreground">{item.period}</p>}

                {item.specs && item.specs.length > 0 && (
                  <ul className="mt-[clamp(1.5rem,2vw,2rem)] flex flex-col gap-[1.25rem] border-t border-border/80 pt-[1.25rem]">
                    {item.specs.map((spec, s) => (
                      <li key={s} className="flex flex-col gap-[0.25rem]">
                        <p className="font-[family-name:var(--font-label)] text-[length:var(--text-label)] uppercase leading-[1.5] text-muted-foreground">{spec.label}</p>
                        <p className="text-[length:var(--text-body)] leading-[1.4] [overflow-wrap:anywhere] font-medium">{spec.value}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {item.benefits && item.benefits.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2 border-t border-border/60 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">Key Business Outcomes:</p>
                    <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                      {item.benefits.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-1.5">
                          <span className="text-accent shrink-0 font-bold">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-[clamp(1.5rem,2.5vw,2rem)] flex flex-col gap-2">
                  {item.button && (
                    <a
                      href={item.button.href}
                      className={cn(
                        "w-full justify-between !px-[1.25rem] !py-[0.875rem]",
                        item.featured ? "btn-primary" : "btn-secondary"
                      )}
                    >
                      <p className="btn-label">{item.button.text}</p>
                      <svg aria-hidden="true" viewBox="0 0 12 12" className="size-[0.75rem]" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
                      </svg>
                    </a>
                  )}
                  {item.secondaryButton && (
                    <a
                      href={item.secondaryButton.href}
                      className="btn-link justify-center text-xs text-muted-foreground hover:text-foreground py-1 font-mono uppercase tracking-wider"
                    >
                      {item.secondaryButton.text} →
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PricingScopeColumns;
