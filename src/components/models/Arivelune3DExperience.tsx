import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { finishes, useParts } from "@/components/kit/codeModel";

// Refined Sleek Laptop dimensions (Proportional to high-end ultrabook/MacBook)
const LAPTOP_W = 3.0;
const LAPTOP_D = 2.0;
const BASE_H = 0.07;
const SCREEN_W = 3.0;
const SCREEN_H = 1.88;
const SCREEN_T = 0.04;
const DISPLAY_W = 2.86;
const DISPLAY_H = 1.76;

// Phone dimensions
const PHONE_W = 0.95;
const PHONE_H = 1.95;
const PHONE_T = 0.08;

// Helper to draw Laptop Screen Texture for 4 Scenes
function createLaptopTexture(sceneIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;

  // Rich Dark Aesthetic Background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#111110");
  grad.addColorStop(0.5, "#171715");
  grad.addColorStop(1, "#0d0d0c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle studio grid overlay
  ctx.strokeStyle = "rgba(196, 175, 138, 0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Top Navigation Bar
  ctx.fillStyle = "rgba(20, 20, 18, 0.95)";
  ctx.fillRect(0, 0, w, 80);
  ctx.strokeStyle = "rgba(196, 175, 138, 0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 80);
  ctx.lineTo(w, 80);
  ctx.stroke();

  // Brand identity
  ctx.fillStyle = "#f4f0e8";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("ARIVELUNE STUDIO", 50, 48);

  // Nav Items
  ctx.font = "500 17px sans-serif";
  ctx.fillStyle = "#a8a49c";
  ctx.fillText("Web Design", 1020, 48);
  ctx.fillText("AI Systems", 1160, 48);
  ctx.fillText("Portfolio", 1280, 48);

  // CTA Pill Button
  ctx.fillStyle = "#c4af8a";
  ctx.beginPath();
  ctx.roundRect(1410, 20, 140, 40, 20);
  ctx.fill();
  ctx.fillStyle = "#111110";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("Free Review", 1435, 45);

  if (sceneIndex === 0) {
    // SCENE 1: Premium Website Design Showcase
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("01 / AWARD-WINNING UK DIGITAL AGENCY", 60, 150);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 56px sans-serif";
    ctx.fillText("EXCEPTIONAL DESIGN.", 60, 225);
    ctx.fillStyle = "#c4af8a";
    ctx.fillText("INTELLIGENT GROWTH.", 60, 290);

    ctx.fillStyle = "#a8a49c";
    ctx.font = "400 22px sans-serif";
    ctx.fillText("Bespoke websites & 24/7 AI lead automation engineered for UK businesses.", 60, 345);

    // Hero Mockup Cards
    ctx.fillStyle = "rgba(30, 30, 28, 0.9)";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.35)";
    ctx.lineWidth = 2;

    // Card 1: Apex Construction
    ctx.beginPath();
    ctx.roundRect(60, 400, 460, 520, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#141412";
    ctx.fillRect(80, 420, 420, 240);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("APEX CONSTRUCTION", 100, 460);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("Bespoke Commercial Builds", 100, 500);
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("✓ +340% Monthly Lead Conversion", 100, 540);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Apex Construction Ltd", 80, 700);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "16px sans-serif";
    ctx.fillText("Luxury Builder • Berkshire", 80, 730);
    ctx.fillStyle = "#a8a49c";
    ctx.fillText("✦ Full Editorial Site & AI Qualification", 80, 770);

    // Card 2: Verve Automotive
    ctx.beginPath();
    ctx.roundRect(560, 400, 460, 520, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#141412";
    ctx.fillRect(580, 420, 420, 240);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("VERVE AUTOMOTIVE", 600, 460);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("Precision Vehicle Detailing", 600, 500);
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("✓ 24/7 Instant Booking System", 600, 540);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Verve Detailing & Care", 580, 700);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "16px sans-serif";
    ctx.fillText("Automotive Specialist • Reading", 580, 730);
    ctx.fillStyle = "#a8a49c";
    ctx.fillText("✦ High-Impact Dark Theme & Chatbot", 580, 770);

    // Card 3: Agency Highlights
    ctx.beginPath();
    ctx.roundRect(1060, 400, 480, 520, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("ARIVELUNE ADVANTAGE", 1090, 450);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "19px sans-serif";
    ctx.fillText("• Bespoke luxury design tailored to brand", 1090, 510);
    ctx.fillText("• 24/7 AI assistants pre-qualify leads", 1090, 560);
    ctx.fillText("• Instant SMS & Email notification routing", 1090, 610);
    ctx.fillText("• Optimized for Berkshire & UK SEO", 1090, 660);
    ctx.fillText("• Transparent fixed pricing & zero fees", 1090, 710);
    ctx.fillText("• Rapid 3-4 week project delivery", 1090, 760);
  } else if (sceneIndex === 1) {
    // SCENE 2: AI Customer Engagement
    ctx.fillStyle = "rgba(10, 10, 10, 0.75)";
    ctx.fillRect(0, 80, w, h - 80);

    const mw = 920;
    const mh = 740;
    const mx = (w - mw) / 2;
    const my = 150;

    ctx.fillStyle = "#1c1c1a";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(mx, my, mw, mh, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#262623";
    ctx.beginPath();
    ctx.roundRect(mx, my, mw, 80, [20, 20, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(mx + 45, my + 40, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("Arivelune AI Lead Qualification Assistant", mx + 70, my + 48);

    // Chat 1 (Client)
    ctx.fillStyle = "#292926";
    ctx.beginPath();
    ctx.roundRect(mx + 40, my + 110, 650, 95, 14);
    ctx.fill();
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "18px sans-serif";
    ctx.fillText("Hi! We need a new commercial website for our building company.", mx + 60, my + 148);
    ctx.fillText("Can your AI system automatically qualify leads and set appointments?", mx + 60, my + 180);

    // Chat 2 (AI Assistant)
    ctx.fillStyle = "rgba(196, 175, 138, 0.15)";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(mx + 200, my + 230, 680, 145, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("ARIVELUNE AI ASSISTANT", mx + 220, my + 260);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "18px sans-serif";
    ctx.fillText("Hello! Yes, absolutely. Our AI greets visitors 24/7, asks tailored project", mx + 220, my + 295);
    ctx.fillText("questions (budget, scope, timeline), and routes hot leads straight to your phone.", mx + 220, my + 328);

    // Chat 3 (Client)
    ctx.fillStyle = "#292926";
    ctx.beginPath();
    ctx.roundRect(mx + 40, my + 400, 560, 85, 14);
    ctx.fill();
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "18px sans-serif";
    ctx.fillText("Sounds fantastic. Can we book an initial strategy consultation?", mx + 60, my + 450);

    // Chat 4 (Confirmation)
    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(mx + 200, my + 510, 680, 90, 14);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("✓ Strategy Session Booked — Tuesday at 10:00 AM GMT", mx + 230, my + 562);
  } else if (sceneIndex === 2) {
    // SCENE 3: Smart Lead Capture Form
    ctx.fillStyle = "rgba(10, 10, 10, 0.75)";
    ctx.fillRect(0, 80, w, h - 80);

    const mw = 940;
    const mh = 740;
    const mx = (w - mw) / 2;
    const my = 140;

    ctx.fillStyle = "#1c1c1a";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(mx, my, mw, mh, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("03 / SMART LEAD INTAKE AUTOMATION", mx + 50, my + 55);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText("Automated Lead Qualification Form", mx + 50, my + 105);

    // Form inputs
    ctx.fillStyle = "#262623";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 150, 840, 75, 10);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "18px sans-serif";
    ctx.fillText("Business Name: Apex Construction Ltd (Berkshire)", mx + 70, my + 195);

    ctx.fillStyle = "#262623";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 245, 840, 75, 10);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.fillText("Contact Email: h.vance@apexconstruction.co.uk", mx + 70, my + 290);

    ctx.fillStyle = "#262623";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 340, 840, 75, 10);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.fillText("Selected Package: Professional Tier (£2,000)", mx + 70, my + 385);

    // Checklist options
    ctx.fillStyle = "rgba(196, 175, 138, 0.12)";
    ctx.strokeStyle = "#c4af8a";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 440, 400, 75, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("✓ Bespoke Web Design", mx + 80, my + 485);

    ctx.beginPath();
    ctx.roundRect(mx + 490, my + 440, 400, 75, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("✓ 24/7 AI Chatbot", mx + 520, my + 485);

    // CTA
    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 545, 840, 80, 14);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("Submit Enquiry & Lock In Starting Price →", mx + 200, my + 595);
  } else {
    // SCENE 4: Lead Management Dashboard
    ctx.fillStyle = "#141413";
    ctx.fillRect(0, 80, w, h - 80);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("ARIVELUNE OS — CLIENT GROWTH DASHBOARD", 60, 150);

    // Metric Cards
    ctx.fillStyle = "#1e1e1c";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.3)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(60, 190, 460, 160, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("MONTHLY QUALIFIED LEADS", 90, 230);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText("78", 90, 300);
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("+42% increase", 220, 300);

    ctx.beginPath();
    ctx.roundRect(560, 190, 460, 160, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("AI CHATBOT ENGAGEMENT", 590, 230);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText("94.2%", 590, 300);
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("Active 24/7", 780, 300);

    ctx.beginPath();
    ctx.roundRect(1060, 190, 480, 160, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("AVG RESPONSE TIME", 1090, 230);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText("< 3 sec", 1090, 300);

    // Table of recent enquiries
    ctx.fillStyle = "#1c1c1a";
    ctx.beginPath();
    ctx.roundRect(60, 380, 1480, 540, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("RECENT QUALIFIED CLIENT ENQUIRIES", 90, 430);

    const enquiries = [
      { name: "Harrison Vance", company: "Apex Construction", type: "Full System", status: "Proposal Sent", value: "£2,000" },
      { name: "Elena Rostova", company: "Verve Automotive", type: "Web & AI Bot", status: "Contract Signed", value: "£2,000" },
      { name: "Marcus Thorne", company: "Crest Advisory", type: "Bespoke Multi-branch", status: "Discovery Call", value: "£5,000+" },
      { name: "Sophie Bennett", company: "Slate Hair Salon", type: "Essential Site", status: "Completed", value: "£1,000" },
    ];

    enquiries.forEach((item, idx) => {
      const iy = 470 + idx * 105;
      ctx.fillStyle = "#252522";
      ctx.fillRect(90, iy, 1420, 85);

      ctx.fillStyle = "#f4f0e8";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(item.name, 120, iy + 40);
      ctx.fillStyle = "#a8a49c";
      ctx.font = "16px sans-serif";
      ctx.fillText(item.company + " • " + item.type, 120, iy + 68);

      ctx.fillStyle = "#c4af8a";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(item.value, 1000, iy + 52);

      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.roundRect(1220, iy + 25, 240, 45, 22);
      ctx.fill();
      ctx.fillStyle = "#042f2e";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(item.status, 1260, iy + 53);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper to draw Phone Screen Texture
function createPhoneTexture(sceneIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;

  // Background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#111110");
  grad.addColorStop(1, "#1c1c1a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Status Bar
  ctx.fillStyle = "#a8a49c";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("9:41", 40, 45);
  ctx.fillText("5G 100%", 480, 45);

  // Header
  ctx.fillStyle = "#c4af8a";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("ARIVELUNE STUDIO", 40, 100);

  if (sceneIndex === 0) {
    // Mobile View 1
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("Exceptional", 40, 180);
    ctx.fillText("Design.", 40, 225);
    ctx.fillStyle = "#c4af8a";
    ctx.fillText("Intelligent", 40, 270);
    ctx.fillText("Growth.", 40, 315);

    ctx.fillStyle = "rgba(196, 175, 138, 0.15)";
    ctx.strokeStyle = "#c4af8a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 360, 520, 340, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("Apex Construction", 70, 420);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "20px sans-serif";
    ctx.fillText("Bespoke Web & AI System", 70, 460);
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("+340% Enquiries", 70, 520);

    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(40, 740, 520, 80, 16);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("Explore Portfolio →", 170, 790);
  } else if (sceneIndex === 1) {
    // Mobile View 2: AI Chatbot Mobile Interface
    ctx.fillStyle = "rgba(196, 175, 138, 0.15)";
    ctx.strokeStyle = "#c4af8a";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(40, 150, 520, 200, 16);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("AI ASSISTANT ACTIVE", 70, 195);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "20px sans-serif";
    ctx.fillText("Hello! Ready to book a project?", 70, 240);
    ctx.fillText("Select your timeline below.", 70, 280);

    ctx.fillStyle = "#292926";
    ctx.beginPath();
    ctx.roundRect(40, 380, 520, 80, 12);
    ctx.fill();
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "20px sans-serif";
    ctx.fillText("• Urgent (Within 2 weeks)", 70, 428);

    ctx.fillStyle = "#292926";
    ctx.beginPath();
    ctx.roundRect(40, 480, 520, 80, 12);
    ctx.fill();
    ctx.fillStyle = "#f4f0e8";
    ctx.fillText("• Standard (3-4 weeks)", 70, 528);
  } else if (sceneIndex === 2) {
    // Mobile View 3: Lead Alert SMS
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 160, 520, 300, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#10b981";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("⚡ NEW LEAD ALERT", 70, 210);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "20px sans-serif";
    ctx.fillText("Name: Harrison Vance", 70, 260);
    ctx.fillText("Company: Apex Construction", 70, 300);
    ctx.fillText("Budget: £2,000 (Professional)", 70, 340);
    ctx.fillText("Phone: +44 7700 900123", 70, 380);
  } else {
    // Mobile View 4: Analytics
    ctx.fillStyle = "#252522";
    ctx.beginPath();
    ctx.roundRect(40, 160, 520, 200, 16);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("QUALIFIED LEADS", 70, 210);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 56px sans-serif";
    ctx.fillText("78", 70, 280);
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("+42%", 200, 280);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function Arivelune3DExperience() {
  const [activeScene, setActiveScene] = useState(0);

  // References for lid opening animation
  const laptopLidRef = useRef<THREE.Group>(null);
  const laptopGroupRef = useRef<THREE.Group>(null);
  const phoneGroupRef = useRef<THREE.Group>(null);

  // Materials & Geometries
  const f = useParts(() => finishes("#222224"), []);

  // Screen Textures for 4 Scenes
  const laptopTextures = useMemo(() => [0, 1, 2, 3].map(createLaptopTexture), []);
  const phoneTextures = useMemo(() => [0, 1, 2, 3].map(createPhoneTexture), []);

  // Cleanup textures on unmount
  useEffect(() => {
    return () => {
      laptopTextures.forEach((t) => t.dispose());
      phoneTextures.forEach((t) => t.dispose());
    };
  }, [laptopTextures, phoneTextures]);

  // Track active scene based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const h = window.innerHeight;
      let nextScene = 0;
      if (sy < h * 0.9) {
        nextScene = 0;
      } else if (sy < h * 1.9) {
        nextScene = 1;
      } else if (sy < h * 2.9) {
        nextScene = 2;
      } else {
        nextScene = 3;
      }
      setActiveScene(nextScene);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Geometries memoization
  const g = useParts(
    () => ({
      // Sleek Laptop geometries
      laptopBase: new THREE.BoxGeometry(LAPTOP_W, BASE_H, LAPTOP_D),
      trackpad: new THREE.BoxGeometry(0.9, 0.004, 0.6),
      keyboardRecess: new THREE.BoxGeometry(2.4, 0.008, 0.95),
      key: new THREE.BoxGeometry(0.15, 0.02, 0.15),
      lidChassis: new THREE.BoxGeometry(SCREEN_W, SCREEN_H, SCREEN_T),
      displayScreen: new THREE.PlaneGeometry(DISPLAY_W, DISPLAY_H),
      cameraNotch: new THREE.BoxGeometry(0.2, 0.02, 0.01),
      logoEmblem: new THREE.CircleGeometry(0.18, 32),
      hinge: new THREE.CylinderGeometry(0.035, 0.035, 0.35, 16),
      foot: new THREE.CylinderGeometry(0.06, 0.06, 0.01, 16),

      // Phone geometries
      phoneBody: new THREE.BoxGeometry(PHONE_W, PHONE_H, PHONE_T),
      phoneScreen: new THREE.PlaneGeometry(PHONE_W - 0.05, PHONE_H - 0.06),
      cameraBump: new THREE.BoxGeometry(0.35, 0.35, 0.03),
      cameraLens: new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16),
      dynamicIsland: new THREE.CapsuleGeometry(0.035, 0.14, 4, 16),
    }),
    []
  );

  // Keyboard keys grid layout
  const keyGrid = useMemo(() => {
    const keys: [number, number][] = [];
    const rows = 5;
    const cols = 12;
    const startX = -1.1;
    const startZ = -0.36;
    const stepX = 0.2;
    const stepZ = 0.18;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        keys.push([startX + c * stepX, startZ + r * stepZ]);
      }
    }
    return keys;
  }, []);

  // Frame animation loop
  useFrame(() => {
    const scrollY = window.scrollY;
    // Animate laptop lid opening dynamically in Scene 1
    // Smooth angle: screen tilts elegantly into ideal laptop viewing angle (~ -0.38 rad / ~112° open angle)
    const scrollProgress = Math.min(1, Math.max(0, scrollY / 600));
    const targetLidAngle = -0.36 - scrollProgress * 0.12; // Smooth backward angle from -0.36 to -0.48 rad

    if (laptopLidRef.current) {
      laptopLidRef.current.rotation.x = THREE.MathUtils.lerp(laptopLidRef.current.rotation.x, targetLidAngle, 0.08);
    }

    // Gentle ambient floating
    const time = performance.now() * 0.0015;
    if (laptopGroupRef.current) {
      laptopGroupRef.current.position.y = Math.sin(time) * 0.03;
    }
    if (phoneGroupRef.current) {
      phoneGroupRef.current.position.y = Math.cos(time * 1.2) * 0.03;
    }
  });

  return (
    <group name="arivelune-cinematic-experience">
      {/* LAPTOP PART */}
      <group name="part-laptop" ref={laptopGroupRef} position={[0, -0.15, 0]}>
        {/* Base Unibody Chassis */}
        <mesh geometry={g.laptopBase} material={f.paint} castShadow receiveShadow />

        {/* Trackpad */}
        <mesh geometry={g.trackpad} material={f.alloy} position={[0, BASE_H / 2 + 0.002, 0.45]} />

        {/* Keyboard Recess */}
        <mesh geometry={g.keyboardRecess} material={f.trim} position={[0, BASE_H / 2 + 0.002, -0.3]} />

        {/* Individual Keycaps */}
        {keyGrid.map(([kx, kz], idx) => (
          <mesh key={idx} geometry={g.key} material={f.trim} position={[kx, BASE_H / 2 + 0.015, -0.3 + kz]} />
        ))}

        {/* Rubber Feet */}
        {[-1.1, 1.1].map((fx) =>
          [-0.7, 0.7].map((fz) => (
            <mesh key={`foot-${fx}-${fz}`} geometry={g.foot} material={f.rubber} position={[fx, -BASE_H / 2 - 0.005, fz]} />
          ))
        )}

        {/* Rear Hinges */}
        {[-0.7, 0.7].map((hx, idx) => (
          <mesh key={idx} geometry={g.hinge} material={f.chrome} position={[hx, BASE_H / 2, -LAPTOP_D / 2]} rotation-z={Math.PI / 2} />
        ))}

        {/* Display Lid Assembly (Pivot point at rear hinge) */}
        <group ref={laptopLidRef} position={[0, BASE_H / 2, -LAPTOP_D / 2]}>
          <group position={[0, SCREEN_H / 2, 0]}>
            {/* Lid Metallic Back Case */}
            <mesh geometry={g.lidChassis} material={f.paint} castShadow />

            {/* Back Gold Logo Emblem */}
            <mesh geometry={g.logoEmblem} position={[0, 0, -SCREEN_T / 2 - 0.001]} rotation-y={Math.PI}>
              <meshStandardMaterial color="#c4af8a" roughness={0.2} metalness={0.9} />
            </mesh>

            {/* Display Screen Front Surface */}
            <mesh geometry={g.displayScreen} position={[0, 0, SCREEN_T / 2 + 0.001]}>
              <meshBasicMaterial map={laptopTextures[activeScene]} />
            </mesh>

            {/* Camera Notch at Top of Screen */}
            <mesh geometry={g.cameraNotch} position={[0, SCREEN_H / 2 - 0.02, SCREEN_T / 2 + 0.002]}>
              <meshBasicMaterial color="#000000" />
            </mesh>
          </group>
        </group>
      </group>

      {/* SMARTPHONE PART */}
      <group name="part-phone" ref={phoneGroupRef} position={[1.65, -0.1, 0.5]} rotation={[0.12, -0.3, 0.05]}>
        {/* Titanium Body Frame */}
        <mesh geometry={g.phoneBody} material={f.paint} castShadow receiveShadow />

        {/* Front Display Screen */}
        <mesh geometry={g.phoneScreen} position={[0, 0, PHONE_T / 2 + 0.001]}>
          <meshBasicMaterial map={phoneTextures[activeScene]} />
        </mesh>

        {/* Dynamic Island */}
        <mesh geometry={g.dynamicIsland} position={[0, PHONE_H / 2 - 0.1, PHONE_T / 2 + 0.002]} rotation-z={Math.PI / 2}>
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Camera Bump on Back */}
        <mesh geometry={g.cameraBump} material={f.trim} position={[-0.2, PHONE_H / 2 - 0.28, -PHONE_T / 2 - 0.015]} />

        {/* Camera Lenses */}
        {[-0.25, -0.15].map((cx, idx1) =>
          [PHONE_H / 2 - 0.2, PHONE_H / 2 - 0.35].map((cy, idx2) => (
            <mesh key={`${idx1}-${idx2}`} geometry={g.cameraLens} material={f.chrome} position={[cx, cy, -PHONE_T / 2 - 0.03]} rotation-x={Math.PI / 2} />
          ))
        )}
      </group>
    </group>
  );
}
