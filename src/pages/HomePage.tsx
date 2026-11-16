import HeroShapeSplit from "@/components/sections/hero/HeroShapeSplit";
import AboutStatementBand from "@/components/sections/about/AboutStatementBand";
import ServicesGhostList from "@/components/sections/features/ServicesGhostList";
import GalleryWordPanels from "@/components/sections/gallery/GalleryWordPanels";
import PricingScopeColumns from "@/components/sections/pricing/PricingScopeColumns";
import FaqHairlineIndex from "@/components/sections/faq/FaqHairlineIndex";
import ContactUnderlineForm from "@/components/sections/contact/ContactUnderlineForm";
import ModelStage from "@/components/kit/ModelStage";
import LoaderWordmarkHandoff from "@/components/loaders/LoaderWordmarkHandoff";

export default function HomePage() {
  return (
    <>
      <ModelStage
        shape="arcs"
        fixed={{
          sm: {
            y: 0.8,
            scale: 0.7
          },
          scroll: {
            rotate: 540,
            tilt: 14,
            scale: 0.08,
            x: 0.05
          }
        }}
        dpr={{
          lg: 1.5,
          sm: 1.25
        }}
      />

      <LoaderWordmarkHandoff
        brand="Arivelune Studio"
      />

      <div id="hero" data-webild-section="HeroShapeSplit" data-webild-section-id="HeroShapeSplit-1" data-section="hero" className="relative z-[45]">
        <HeroShapeSplit
          tag="Arivelune Studio"
          title="Beautifully designed. Built to bring you business."
          description="Premium websites, AI assistants and smart enquiry systems for growing UK businesses."
          primaryButton={{
            text: "Free Website Review",
            href: "#contact"
          }}
          secondaryButton={{
            text: "Explore Our Work",
            href: "#services"
          }}
          scrollLabel="Scroll to discover"
          introDelay={1.7}
        />
      </div>

      <div id="about" data-webild-section="AboutStatementBand" data-webild-section-id="AboutStatementBand-1" data-section="about" className="relative z-[45]">
        <AboutStatementBand
          tag="01 / OUR PRINCIPLE"
          title="We create digital experiences designed to turn visitors into qualified customers."
          description="Based in Berkshire, Arivelune Studio crafts bespoke websites and intelligent AI enquiry systems that help UK businesses capture leads, automate growth, and stand apart."
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
          line="✦ Elevating digital presence."
        />
      </div>

      <div id="services" data-webild-section="ServicesGhostList" data-webild-section-id="ServicesGhostList-1" data-section="services" className="relative z-[45]">
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

      <div id="gallery" data-webild-section="GalleryWordPanels" data-webild-section-id="GalleryWordPanels-1" data-section="gallery" className="relative z-[45]" data-scene>
        <GalleryWordPanels
          label="Selected Work"
          title="Client outcomes."
          items={[
            {
              title: "Apex",
              category: "Web & AI System",
              description: "A tailored digital foundation with automated enquiry routing for a luxury Berkshire builder.",
              imageSrc: "https://img.b2bpic.net/free-photo/adult-man-young-women-working-together_23-2148431338.jpg",
              imageAlt: "Adult man and young women working together"
            },
            {
              title: "Verve",
              category: "Lead Capture Setup",
              description: "High-converting online presence and instant 24/7 AI enquiry assistant for an automotive brand.",
              imageSrc: "https://img.b2bpic.net/free-photo/businesswoman-working-with-modern-virtual-technologies-hands-touching-screen_1212-722.jpg",
              imageAlt: "Businesswoman working with modern virtual technologies hands touching the screen"
            },
            {
              title: "Crest",
              category: "Brand & SEO Site",
              description: "Cinematic layout with local search visibility setup for a regional professional service provider.",
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-happy-businessman-using-telephone-outdoors_1150-3008.jpg",
              imageAlt: "Portrait of happy businessman using telephone outdoors"
            },
            {
              title: "Slate",
              category: "Digital Platform",
              description: "Automated booking and lead qualification workspace crafted for a boutique hair salon.",
              imageSrc: "https://img.b2bpic.net/free-photo/woman-using-make-up-brush-mirror_23-2148752498.jpg",
              imageAlt: "Woman using a make-up brush in the mirror"
            }
          ]}
        />
      </div>

      <div id="pricing" data-webild-section="PricingScopeColumns" data-webild-section-id="PricingScopeColumns-1" data-section="pricing" className="relative z-[45]">
        <PricingScopeColumns
          tag="04 / Investment"
          title="Clear packages, no hidden costs"
          description="Fixed investment levels tailored to regional service providers and growing UK companies."
          items={[
            {
              title: "Essentials",
              description: "For local service providers seeking a distinct online presence.",
              price: "£2,500",
              period: "GBP / Fixed project",
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
              price: "£5,000",
              period: "GBP / Fixed project",
              specs: [
                {
                  label: "Scope",
                  value: "Complete digital system"
                },
                {
                  label: "Timeline",
                  value: "5 to 6 weeks"
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
              price: "Custom",
              period: "Scoped to brief",
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

      <div id="faq" data-webild-section="FaqHairlineIndex" data-webild-section-id="FaqHairlineIndex-1" data-section="faq" className="relative z-[45]">
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

      <div id="contact" data-webild-section="ContactUnderlineForm" data-webild-section-id="ContactUnderlineForm-1" data-section="contact" className="relative z-[45]">
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
