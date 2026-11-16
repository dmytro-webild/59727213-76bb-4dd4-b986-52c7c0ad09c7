import { Outlet } from "react-router-dom";
import NavbarMenuPill from "@/components/navbars/NavbarMenuPill";
import FooterWordmarkLanding from "@/components/sections/footer/FooterWordmarkLanding";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarMenuPill
          brand="Arivelune Studio"
          navItems={[
            {
              name: "Studio",
              href: "#about"
            },
            {
              name: "Services",
              href: "#services"
            },
            {
              name: "Work",
              href: "#gallery"
            },
            {
              name: "Pricing",
              href: "#pricing"
            },
            {
              name: "Contact",
              href: "#contact"
            }
          ]}
          contact={{
            text: "Business Email",
            href: "mailto:admin@arivelunestudio.com"
          }}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer" className="relative z-[45]">
        <FooterWordmarkLanding
          brand="Arivelune Studio"
          links={[
            {
              text: "Services",
              href: "#services"
            },
            {
              text: "Pricing",
              href: "#pricing"
            },
            {
              text: "Contact",
              href: "#contact"
            },
            {
              text: "Privacy Policy",
              href: "#"
            }
          ]}
          tagline="Exceptional design. Intelligent growth."
          copyright="© 2026 Arivelune Studio. Berkshire, UK."
        />
      </footer>
    </div>
  );
}
