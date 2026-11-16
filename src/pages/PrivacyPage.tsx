import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="relative isolate py-[var(--section-space)] text-foreground">
      <div className="kit-glass mx-auto flex w-[var(--container)] max-w-5xl flex-col gap-[clamp(2rem,4vw,3.5rem)] p-[1.375rem] lg:p-[clamp(2.5rem,4vw,4rem)]">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            <span>Return to Homepage</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            UK GDPR Compliant • Updated 2026
          </span>
        </div>

        {/* Title Area */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-muted-foreground">
            <span>01 / LEGAL & DATA PROTECTION</span>
          </div>
          <h1 className="text-[clamp(2.25rem,1.8rem+2.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground">
            Privacy Policy & Data Rights
          </h1>
          <p className="max-w-3xl text-[length:var(--text-body-lg)] leading-relaxed text-muted-foreground">
            This Privacy Policy details how <strong className="text-foreground">Arivelune Studio</strong> collects, uses, protects, and handles your personal information under the UK Data Protection Act 2018 and the UK General Data Protection Regulation (UK GDPR).
          </p>
        </div>

        {/* Highlight Card */}
        <div className="rounded-2xl border border-accent/40 bg-[var(--accent-glass)] p-6 backdrop-blur-md">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-accent">
              ✦ Transparency Guarantee
            </span>
            <p className="text-sm leading-relaxed text-foreground/90">
              We collect only essential information necessary to respond to your project enquiries and deliver our web design, AI assistant, and lead automation services. We never sell, rent, or trade your data to third parties.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="grid gap-10 border-t border-border/80 pt-8">
          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              1. Data Controller Information
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Who We Are</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Arivelune Studio is a UK digital design and development agency based in Berkshire, UK. For the purposes of UK GDPR and data protection legislation, Arivelune Studio acts as the Data Controller responsible for your personal data.
            </p>
            <div className="mt-2 rounded-xl border border-border/60 bg-card/60 p-4 font-mono text-xs">
              <p className="text-foreground font-semibold">Data Protection Contact:</p>
              <p className="text-muted-foreground mt-1">Data Controller, Arivelune Studio</p>
              <p className="text-muted-foreground">Berkshire, United Kingdom</p>
              <p className="mt-2">
                Business Email:{" "}
                <a
                  href="mailto:admin@arivelunestudio.com"
                  className="text-accent underline font-bold hover:text-accent/80"
                >
                  admin@arivelunestudio.com
                </a>
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              2. Personal Data We Collect
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Information You Provide to Us</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              When you submit an enquiry form, request a free website review, or contact us via our website, we may collect the following information:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                { title: "Full Name", desc: "To identify you and address our communications professionally." },
                { title: "Business Email Address", desc: "To send project proposals, reviews, and direct responses." },
                { title: "Phone Number (Optional)", desc: "To contact you regarding urgent project brief discussions." },
                { title: "Company Name / Website URL", desc: "To review your existing web presence and prepare tailored audits." },
                { title: "Project Scope & Budget", desc: "To evaluate requirement feasibility and match suitable package options." },
                { title: "Enquiry Messages & Specs", desc: "Details you include in your submission to help us scope your build." },
              ].map((item, i) => (
                <li key={i} className="rounded-xl border border-border/50 bg-card/40 p-4">
                  <h3 className="font-mono text-xs font-bold uppercase text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              3. Lawful Basis for Processing
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">How We Justify Data Processing</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Under UK GDPR Article 6, we rely on the following lawful bases to process your personal data:
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                <h3 className="font-bold text-foreground text-sm">✦ Consent (Article 6(1)(a))</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  By voluntarily completing and submitting enquiry or website review forms on our site, you grant consent for us to contact you regarding your request.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                <h3 className="font-bold text-foreground text-sm">✦ Contract Performance (Article 6(1)(b))</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Processing is necessary to take steps at your request prior to entering into a commercial agreement for bespoke web design or AI system development.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                <h3 className="font-bold text-foreground text-sm">✦ Legitimate Interest (Article 6(1)(f))</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  We process data to protect site security, prevent commercial spam, and maintain accurate records of client communications.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              4. Third-Party Service Providers
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Data Processors & Infrastructure</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              To deliver our high-performance website and secure enquiry workflows, we work with trusted, GDPR-compliant service providers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl border border-border/50 bg-card/40 p-4">
                <h3 className="font-mono text-xs font-bold uppercase text-foreground">FormSubmit.co</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Secure form processing and honeypot anti-spam relaying. Encrypts and forwards visitor form submissions directly to our business email.
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/40 p-4">
                <h3 className="font-mono text-xs font-bold uppercase text-foreground">Google Workspace</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Encrypted business Gmail infrastructure hosting our inbox (`admin@arivelunestudio.com`), ensuring secure retention of client communications.
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/40 p-4">
                <h3 className="font-mono text-xs font-bold uppercase text-foreground">Vercel Web Hosting</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Global edge hosting network providing SSL/TLS encrypted web delivery and high-speed infrastructure.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              5. Data Retention & Security
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">How Long We Keep Your Data</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              We store personal information only for as long as necessary to fulfill the purposes for which it was collected:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 pl-1">
              <li><strong className="text-foreground">Enquiry Communications:</strong> Retained for up to 12 months for prospective clients who do not proceed to a active contract.</li>
              <li><strong className="text-foreground">Active Client Contracts:</strong> Retained for the duration of the commercial agreement plus 6 years for legal compliance and accounting requirements.</li>
              <li><strong className="text-foreground">Security Measures:</strong> All data transmissions are encrypted in transit via SSL/TLS (HTTPS). Form submissions include honeypot anti-spam filters.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              6. Cookie Policy & Local Storage
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Cookies & Technical Tracking</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Arivelune Studio uses minimal, non-intrusive operational cookies and local storage tokens strictly required for website functionality (e.g. Lenis smooth scrolling state, UI preferences, rendering probes).
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We do not deploy invasive third-party cross-site tracking cookies or advertising pixels. As our cookies are strictly operational, standard banner prompts are minimized, but you may configure your browser to block cookies if desired.
            </p>
          </section>

          {/* Section 7 */}
          <section className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              7. Your UK GDPR Rights
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Exercising Your Rights</h2>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Under UK GDPR regulations, you possess the following rights regarding your personal data:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="rounded-lg border border-border/50 bg-card/40 p-3.5">
                <span className="font-bold text-foreground">Right of Access:</span> Request a copy of the personal data we hold about you.
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-3.5">
                <span className="font-bold text-foreground">Right to Rectification:</span> Request correction of inaccurate or incomplete records.
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-3.5">
                <span className="font-bold text-foreground">Right to Erasure:</span> Request deletion of your personal data ("right to be forgotten").
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-3.5">
                <span className="font-bold text-foreground">Right to Restriction:</span> Request limited processing of your data in specific scenarios.
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-3.5">
                <span className="font-bold text-foreground">Right to Data Portability:</span> Receive your data in a structured, machine-readable format.
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-3.5">
                <span className="font-bold text-foreground">Right to Object:</span> Object to processing based on legitimate interests or direct marketing.
              </div>
            </div>
            <p className="text-sm text-muted-foreground pt-2 leading-relaxed">
              To exercise any of these rights, please email us directly at{" "}
              <a href="mailto:admin@arivelunestudio.com" className="text-accent underline font-semibold">
                admin@arivelunestudio.com
              </a>
              . We will respond to all verified data subject requests within 30 days. You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline text-foreground">ico.org.uk</a>.
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-6">
          <Link
            to="/"
            className="btn-primary !py-2.5 text-xs font-semibold"
          >
            ← Return to Arivelune Studio Home
          </Link>
          <a
            href="mailto:admin@arivelunestudio.com"
            className="btn-secondary !py-2.5 text-xs"
          >
            Contact Data Controller →
          </a>
        </div>
      </div>
    </div>
  );
}
