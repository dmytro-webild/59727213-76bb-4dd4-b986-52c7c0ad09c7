import HeroShapeSplit from "@/components/sections/hero/HeroShapeSplit";
import AboutStatementBand from "@/components/sections/about/AboutStatementBand";
import ServicesGhostList from "@/components/sections/features/ServicesGhostList";
import GalleryWordPanels from "@/components/sections/gallery/GalleryWordPanels";
import PricingScopeColumns from "@/components/sections/pricing/PricingScopeColumns";
import FaqHairlineIndex from "@/components/sections/faq/FaqHairlineIndex";
import ContactUnderlineForm from "@/components/sections/contact/ContactUnderlineForm";
import ModelStage from "@/components/kit/ModelStage";
import Arivelune3DExperience from "@/components/models/Arivelune3DExperience";
import LoaderWordmarkHandoff from "@/components/loaders/LoaderWordmarkHandoff";

export default function HomePage() {
  return (
    <>
      <ModelStage
        model={<Arivelune3DExperience />}
        size={2.4}
        scale={1}
        dpr={{
          lg: 1.5,
          sm: 1.25
        }}
      />

      <LoaderWordmarkHandoff
        brand="Arivelune Studio"
      />

      {/* SCENE 1: Premium Website Design Showcase (Floating Opening Laptop) */}
      <div
        id="hero"
        data-webild-section="HeroShapeSplit"
        data-webild-section-id="HeroShapeSplit-1"
        data-section="hero"
        data-model='[{"x":0.28,"y":0.05,"z":0,"rx":14,"ry":-28,"rz":2,"scale":1.12,"explode":0,"dial":1}]'
        className="relative z-[45]"
      >
        <HeroShapeSplit
          tag="Arivelune Studio"
          title="First impressions that make an impact. Built to bring you business."
          description="Premium website design, 24/7 AI assistants and smart enquiry systems for growing UK businesses."
          primaryButton={{
            text: "Free Website Review",
            href: "#contact"
          }}
          secondaryButton={{
            text: "Explore Our Work",
            href: "#gallery"
          }}
          scrollLabel="Scroll to discover 3D experience"
          introDelay={1.7}
        />
      </div>

      {/* SCENE 2: AI Customer Engagement (Transition to Smartphone) */}
      <div
        id="about"
        data-webild-section="AboutStatementBand"
        data-webild-section-id="AboutStatementBand-1"
        data-section="about"
        data-model='[{"x":-0.28,"y":0,"z":0,"rx":8,"ry":25,"rz":-2,"scale":1.25,"explode":0.6,"dial":0.7}]'
        className="relative z-[45]"
      >
        <AboutStatementBand
          tag="01 / OUR PRINCIPLE"
          title="From beautiful websites to automated business opportunities."
          description="Based in Berkshire, Arivelune Studio crafts bespoke websites and intelligent AI enquiry systems that turn passive visitors into qualified customers 24/7."
          button={{
            text: "Explore Services",
            href: "#services"
          }}
          visionTag="02 / FOCUS"
          items={[
            {
              title: "DESIGN"
            },
            {
              title: "SYSTEMS"
            },
            {
              title: "GROWTH"
            }
          ]}
          line="✦ Elevating digital presence through AI & high-end design."
        />
      </div>

      {/* SCENE 3: Smart Lead Capture (Interactive Form on Devices) */}
      <div
        id="services"
        data-webild-section="ServicesGhostList"
        data-webild-section-id="ServicesGhostList-1"
        data-section="services"
        data-model='[{"x":0.28,"y":-0.05,"z":0,"rx":16,"ry":-18,"rz":1,"scale":1.2,"explode":0.4,"dial":0.4}]'
        className="relative z-[45]"
      >
        <ServicesGhostList
          tag="03 / Services"
          items={[
            {
              title: "Bespoke Web Design",
              description: "High-end editorial websites engineered to turn visitors into qualified enquiries."
            },
            {
              title: "AI Assistants",
              description: "Intelligent 24/7 automated tools that capture and pre-qualify incoming prospects."
            },
            {
              title: "Lead Automation",
              description: "Instant notification workflows connecting your team with new business leads fast."
            },
            {
              title: "SEO Foundations",
              description: "Local search optimization designed to elevate visibility across Berkshire and the UK."
            },
            {
              title: "Website Care",
              description: "Ongoing performance updates and technical support to keep your site growing.",
              button: {
                text: "Get free review",
                href: "#contact"
              }
            }
          ]}
          description="Intelligent digital systems for growing businesses."
        />
      </div>

      {/* SCENE 4: Lead-Management Dashboard (Dual Devices View) */}
      <div
        id="gallery"
        data-webild-section="GalleryWordPanels"
        data-webild-section-id="GalleryWordPanels-1"
        data-section="gallery"
        data-model='[{"x":0,"y":0.02,"z":0,"rx":12,"ry":-5,"rz":0,"scale":1.1,"explode":1.0,"dial":0}]'
        className="relative z-[45]"
        data-scene
      >
        <GalleryWordPanels
          label="Selected Work"
          title="Client outcomes & pipeline results."
          items={[
            {
              title: "Apex",
              category: "High-End Builder",
              description: "A tailored digital foundation with automated enquiry routing for a luxury Berkshire commercial builder.",
              imageSrc: "https://images.pexels.com/photos/4906412/pexels-photo-4906412.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
              imageAlt: "Apex Construction luxury architectural build website preview",
              clientLocation: "Berkshire, UK",
              results: "+340% Monthly Lead Conversion",
              deliverables: ["Bespoke Editorial Website", "24/7 AI Lead Assistant", "Instant SMS Alerts"],
              url: "#contact"
            },
            {
              title: "Verve",
              category: "Automotive Specialist",
              description: "High-converting online presence and instant 24/7 AI enquiry assistant for an automotive brand in Reading.",
              imageSrc: "https://images.pexels.com/photos/39280825/pexels-photo-39280825.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
              imageAlt: "Verve Detailing luxury sports car detailing website preview",
              clientLocation: "Reading, UK",
              results: "24/7 Automated Booking System",
              deliverables: ["High-Impact Dark Theme", "Automated Intake Chatbot", "Local Search Optimization"],
              url: "#contact"
            },
            {
              title: "Crest",
              category: "Professional Services",
              description: "Cinematic layout with local search visibility setup for a regional financial and advisory provider.",
              imageSrc: "https://images.pexels.com/photos/5833861/pexels-photo-5833861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
              imageAlt: "Crest Advisory corporate office web design preview",
              clientLocation: "Slough, UK",
              results: "3.8x Qualified Prospect Pipeline",
              deliverables: ["Corporate Brand Architecture", "Schema & Local SEO", "Client Intake Portal"],
              url: "#contact"
            },
            {
              title: "Slate",
              category: "Boutique Salon",
              description: "Automated booking and lead qualification workspace crafted for a premium hair and beauty studio.",
              imageSrc: "https://images.pexels.com/photos/39190730/pexels-photo-39190730.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
              imageAlt: "Slate Salon luxury beauty studio web preview",
              clientLocation: "Windsor, UK",
              results: "+210% Online Booking Rate",
              deliverables: ["Mobile-First Reservation Engine", "Automated SMS Follow-Ups", "Fast-Load Media Gallery"],
              url: "#contact"
            }
          ]}
        />
      </div>

      <div
        id="pricing"
        data-webild-section="PricingScopeColumns"
        data-webild-section-id="PricingScopeColumns-1"
        data-section="pricing"
        data-model='[{"x":0.4,"y":0.1,"z":-1,"rx":20,"ry":-35,"rz":0,"scale":0.85,"explode":0.8,"opacity":0.8}]'
        className="relative z-[45]"
      >
        <PricingScopeColumns
          tag="04 / Investment"
          title="Clear packages, no hidden costs"
          description="Transparent starting prices tailored for local service providers, regional firms, and growing UK businesses."
          items={[
            {
              title: "Essential",
              description: "For local service providers seeking a distinct online presence.",
              price: "£1,000",
              period: "GBP / Starting project",
              specs: [
                {
                  label: "Scope",
                  value: "Bespoke editorial website"
                },
                {
                  label: "Timeline",
                  value: "3 to 4 weeks"
                },
                {
                  label: "AI Systems",
                  value: "Smart enquiry capture"
                },
                {
                  label: "Support",
                  value: "30 days included"
                }
              ],
              button: {
                text: "Check availability",
                href: "#contact"
              }
            },
            {
              title: "Professional",
              description: "For businesses ready to automate customer intake and lead follow-up.",
              price: "£2,000",
              period: "GBP / Full digital system",
              specs: [
                {
                  label: "Scope",
                  value: "Complete digital system"
                },
                {
                  label: "Timeline",
                  value: "4 to 6 weeks"
                },
                {
                  label: "AI Systems",
                  value: "24/7 enquiry chatbot"
                },
                {
                  label: "Support",
                  value: "90 days included"
                }
              ],
              button: {
                text: "Check availability",
                href: "#contact"
              }
            },
            {
              title: "Bespoke",
              description: "Tailored multi-location systems and lead-generation automation.",
              price: "£5,000+",
              period: "GBP / Scoped to brief",
              specs: [
                {
                  label: "Scope",
                  value: "Custom multi-branch site"
                },
                {
                  label: "Timeline",
                  value: "Agreed together"
                },
                {
                  label: "AI Systems",
                  value: "Custom AI & workflows"
                },
                {
                  label: "Support",
                  value: "Ongoing priority care"
                }
              ],
              button: {
                text: "Discuss project",
                href: "#contact"
              }
            }
          ]}
        />
      </div>

      <div
        id="faq"
        data-webild-section="FaqHairlineIndex"
        data-webild-section-id="FaqHairlineIndex-1"
        data-section="faq"
        data-model='[{"x":-0.4,"y":0,"z":-1,"rx":15,"ry":35,"rz":0,"scale":0.8,"explode":0.5,"opacity":0.7}]'
        className="relative z-[45]"
      >
        <FaqHairlineIndex
          tag="06 / FAQ"
          title="Everything you need to know"
          items={[
            {
              title: "How long does a website project take?",
              description: "Most bespoke builds are completed within four to six weeks following our initial strategy call and project kickoff."
            },
            {
              title: "How does the AI enquiry assistant work?",
              description: "We train the custom AI assistant on your specific services so it can answer visitor questions 24/7 and capture qualified lead details."
            },
            {
              title: "Is local SEO included with every build?",
              description: "Yes, standard technical SEO, schema markups, and local keyword structures are built into every website we deliver for maximum visibility."
            },
            {
              title: "Will I be able to edit my own content?",
              description: "Yes, we integrate simple editing tools and provide custom documentation so your team can easily update text and photos anytime."
            },
            {
              title: "Do you provide ongoing site maintenance?",
              description: "We offer ongoing support packages covering security checks, speed monitoring, and regular performance improvements."
            }
          ]}
        />
      </div>

      <div
        id="contact"
        data-webild-section="ContactUnderlineForm"
        data-webild-section-id="ContactUnderlineForm-1"
        data-section="contact"
        data-model='[{"x":0.35,"y":0,"z":0,"rx":10,"ry":-20,"rz":0,"scale":0.95,"explode":0.9,"opacity":0.9}]'
        className="relative z-[45]"
      >
        <ContactUnderlineForm
          title="Get a free website review"
          fields={[
            {
              name: "name",
              label: "Your name",
              type: "text",
              placeholder: "Full name",
              required: true
            },
            {
              name: "email",
              label: "Email address",
              type: "email",
              placeholder: "hello@arivelune.studio",
              required: true
            },
            {
              name: "phone",
              label: "Phone number",
              type: "tel",
              placeholder: "+44 118 970 1234"
            },
            {
              name: "website",
              label: "Current website",
              type: "text",
              placeholder: "www.yourbusiness.co.uk"
            },
            {
              name: "message",
              label: "Project details",
              type: "textarea",
              placeholder: "Tell us about your business and goals",
              required: true
            }
          ]}
          servicesLabel="Service required"
          services={[
            "Web Design",
            "AI Chatbots",
            "Lead Automation",
            "Local SEO",
            "Full System"
          ]}
          button={{
            text: "Get Free Review"
          }}
        />
      </div>
    </>
  );
}
