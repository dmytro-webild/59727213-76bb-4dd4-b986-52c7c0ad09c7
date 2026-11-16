import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Field = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea"; placeholder?: string; required?: boolean };

type ContactUnderlineFormProps = {
  id?: string;
  "data-section"?: string;
  title?: string;
  fields?: Field[];
  servicesLabel?: string;
  services?: string[];
  button?: { text: string };
  recipientEmail?: string;
  ariaLabel?: string;
  className?: string;
};

const ContactUnderlineForm = ({
  id,
  "data-section": dataSection,
  title = "Tell us what you're building.",
  fields = [
    { name: "name", label: "Your name", placeholder: "Your full name", required: true },
    { name: "email", label: "Your email", type: "email", placeholder: "Business Email", required: true },
    { name: "company", label: "Company or website", placeholder: "Optional" },
    { name: "message", label: "Project details", type: "textarea", placeholder: "What are you building, and what should change?", required: true },
  ],
  servicesLabel = "Service required",
  services = ["Bespoke Web Design", "24/7 AI Enquiry Systems", "Lead Automation", "Local SEO Optimisation", "Website Care & Support"],
  button = { text: "Send Enquiry" },
  recipientEmail = "admin@arivelunestudio.com",
  ariaLabel,
  className,
}: ContactUnderlineFormProps) => {
  const reduce = !!useReducedMotion();
  const live = !reduce;
  const { ease, base, slow } = useKitMotion();
  const [enquiryType, setEnquiryType] = useState<"project" | "review">("project");
  const [active, setActive] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("review")) {
        setEnquiryType("review");
      } else if (hash.includes("project")) {
        setEnquiryType("project");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeTitle =
    enquiryType === "project"
      ? "Start your bespoke web & AI project."
      : "Get a free website & lead review.";

  const words = activeTitle.trim().split(/\s+/);
  const rise = (i: number) => ({ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { duration: slow * 0.7, ease, delay: 0.1 + i * 0.06 } } });
  const wipe = (i: number) => ({ hidden: { clipPath: "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)", transition: { duration: slow, ease, delay: 0.15 + i * 0.06 } } });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};

    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    payload["enquiry_type"] = enquiryType === "project" ? "Start Your Project" : "Free Website Review";

    if (services && services[active] !== undefined) {
      payload["service_requested"] = services[active];
      payload["selected_service"] = services[active];
    }

    const emailVal = payload.email || "";
    setSubmittedEmail(emailVal);

    // Anti-spam honeypot check
    if (payload["_gotcha"]) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    const targetEmail = recipientEmail || "admin@arivelunestudio.com";
    const typeLabel = enquiryType === "project" ? "Project Enquiry" : "Free Website Review Request";
    payload["_subject"] = `New ${typeLabel} from ${payload.name || emailVal || "Website Visitor"}`;
    payload["_replyto"] = emailVal;
    payload["_template"] = "table";

    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id={id} data-section={dataSection} aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div id="contact-project" className="absolute -top-24 left-0 pointer-events-none" />
      <div id="contact-review" className="absolute -top-24 left-0 pointer-events-none" />
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col gap-[clamp(1.5rem,3vw,3rem)] p-[1.375rem] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        {/* Enquiry Type Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-4">
          <span className="font-mono text-[length:var(--text-label)] uppercase text-muted-foreground mr-2">
            Select Request Type:
          </span>
          <button
            type="button"
            onClick={() => setEnquiryType("project")}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
              enquiryType === "project"
                ? "border-accent bg-accent text-accent-foreground font-bold shadow-md"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            <span>✦ Start Your Project</span>
          </button>
          <button
            type="button"
            onClick={() => setEnquiryType("review")}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
              enquiryType === "review"
                ? "border-accent bg-accent text-accent-foreground font-bold shadow-md"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            <span>🔍 Free Website Review</span>
          </button>
        </div>

        <motion.h2
          key={enquiryType}
          aria-label={activeTitle}
          initial={live ? "hidden" : false}
          animate="shown"
          viewport={{ once: true, amount: 0.5 }}
          className="flex max-w-[14em] flex-wrap gap-x-[0.25em] text-[length:var(--text-h1)]"
        >
          {words.map((word, i) => (
            <div key={`${word}-${i}`} aria-hidden="true" className="overflow-hidden pb-[0.15em] -mb-[0.15em]">
              <motion.div variants={{ hidden: { y: "110%" }, shown: { y: "0%", transition: { duration: slow, ease, delay: i * 0.04 } } }} className="whitespace-nowrap">
                {word}
              </motion.div>
            </div>
          ))}
        </motion.h2>

        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-12 lg:gap-[var(--gap)]">
          {isSubmitted ? (
            <motion.div
              initial={live ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: slow * 0.5, ease }}
              className="flex flex-col gap-6 lg:col-span-8 py-4"
            >
              <div className="flex items-center gap-3 text-foreground">
                <svg className="size-6 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-[length:var(--text-h3)] font-medium">Thank you! Your enquiry has been received.</h3>
              </div>
              <p className="text-[length:var(--text-body)] text-muted-foreground leading-relaxed">
                Thank you for reaching out! We have safely received your enquiry details. Our team at Arivelune Studio will review your information and get back to you shortly{submittedEmail ? ` at ${submittedEmail}` : ""}.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="min-h-[2.75rem] border border-input px-5 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={live ? "hidden" : false}
              whileInView="shown"
              viewport={{ once: true }}
              className="flex flex-col gap-[clamp(1.5rem,2.4vw,2rem)] lg:col-span-8"
            >
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {fields.map((field, i) => (
                <motion.label key={field.name} variants={rise(i)} className="group flex flex-col gap-[0.75rem]">
                  <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] tracking-[var(--label-tracking)]">
                    {field.required ? `${field.label} *` : field.label}
                  </p>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={3}
                      className="w-full resize-none bg-transparent pb-[0.75rem] text-[length:var(--text-body-lg)] leading-[1.3] tracking-[-0.03em] text-foreground outline-none placeholder:text-foreground/90"
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-transparent pb-[0.75rem] text-[length:var(--text-body-lg)] leading-[1.3] tracking-[-0.03em] text-foreground outline-none placeholder:text-foreground/90"
                    />
                  )}
                  <motion.div variants={wipe(i)} aria-hidden="true" className="-mt-[0.75rem] h-px w-full bg-input transition-colors duration-300 group-focus-within:bg-foreground" />
                </motion.label>
              ))}

              {services.length > 0 && (
                <motion.fieldset
                  initial={live ? { opacity: 0, y: 24 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: slow * 0.5, ease }}
                  className="flex flex-col gap-[1rem]"
                >
                  <legend className="mb-[1rem] text-[length:var(--text-body-lg)] leading-[1.2] tracking-[-0.03em]">{servicesLabel}</legend>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {services.map((service, i) => (
                      <button
                        key={`${service}-${i}`}
                        type="button"
                        aria-pressed={active === i}
                        onClick={() => setActive(i)}
                        className={cn(
                          "min-h-[2.75rem] whitespace-nowrap border px-[0.875rem] font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] transition-colors",
                          active === i ? "border-accent text-foreground" : "border-input text-muted-foreground hover:border-foreground hover:text-foreground",
                        )}
                        style={{ transitionDuration: `${base * 0.5}s` }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </motion.fieldset>
              )}

              {button && (
                <motion.div
                  initial={live ? { opacity: 0, y: 24 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: slow * 0.5, ease }}
                  className="pt-[0.5rem]"
                >
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full lg:w-auto lg:min-w-[15rem] disabled:opacity-60 disabled:cursor-not-allowed">
                    <p className="btn-label">
                      {isSubmitting
                        ? "Sending..."
                        : enquiryType === "project"
                        ? "Start Your Project →"
                        : "Get Free Review →"}
                    </p>
                  </button>
                </motion.div>
              )}
            </motion.form>
          )}

          {/* Direct Contact & Business Email Sidebar */}
          <motion.div
            initial={live ? { opacity: 0, y: 24 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: slow * 0.5, ease, delay: 0.2 }}
            className="flex flex-col gap-6 lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border/70 pt-6 lg:pt-0 lg:pl-8"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                ✦ DIRECT BUSINESS EMAIL
              </span>
              <h3 className="text-xl font-bold text-foreground">Speak directly with our team</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Prefer to email us directly? Reach out anytime to send your project brief or enquiry directly to our Google Workspace inbox.
              </p>
            </div>

            <a
              href="mailto:admin@arivelunestudio.com"
              className="group flex flex-col gap-2 rounded-2xl border border-accent/40 bg-accent/10 p-5 transition-all hover:bg-accent/20 hover:border-accent"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                  OFFICIAL INBOX
                </span>
                <svg className="size-4 text-accent transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <span className="font-mono text-sm md:text-base font-bold text-foreground underline decoration-accent/60 underline-offset-4 group-hover:decoration-accent break-all">
                admin@arivelunestudio.com
              </span>
              <span className="text-[11px] text-muted-foreground">
                Click to send email directly →
              </span>
            </a>

            <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/40 p-4 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="text-accent text-base">⚡</span>
                <div>
                  <h4 className="font-bold text-foreground">Fast Turnaround</h4>
                  <p className="text-muted-foreground text-[11px] mt-0.5">Target initial response within 24 business hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-border/40 pt-3">
                <span className="text-accent text-base">🔒</span>
                <div>
                  <h4 className="font-bold text-foreground">UK GDPR Protected</h4>
                  <p className="text-muted-foreground text-[11px] mt-0.5">Your enquiry data is strictly protected and never shared.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-border/40 pt-3">
                <span className="text-accent text-base">📍</span>
                <div>
                  <h4 className="font-bold text-foreground">Berkshire, UK</h4>
                  <p className="text-muted-foreground text-[11px] mt-0.5">Serving clients across Berkshire & Greater London.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUnderlineForm;
