import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { finishes, useParts } from "@/components/kit/codeModel";

// Laptop dimensions
const LAPTOP_W = 3.2;
const LAPTOP_D = 2.1;
const BASE_H = 0.12;
const SCREEN_W = 3.1;
const SCREEN_H = 2.0;
const SCREEN_T = 0.08;
const BEZEL = 0.08;

// Phone dimensions
const PHONE_W = 1.05;
const PHONE_H = 2.15;
const PHONE_T = 0.09;

// Helper to draw Laptop Screen Texture for 4 Scenes
function createLaptopTexture(sceneIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;

  // Background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#111110");
  grad.addColorStop(0.5, "#181816");
  grad.addColorStop(1, "#0d0d0c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle grid lines
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

  // Top Nav Bar
  ctx.fillStyle = "rgba(22, 22, 20, 0.9)";
  ctx.fillRect(0, 0, w, 90);
  ctx.strokeStyle = "rgba(196, 175, 138, 0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 90);
  ctx.lineTo(w, 90);
  ctx.stroke();

  // Brand logo
  ctx.fillStyle = "#f4f0e8";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("ARIVELUNE STUDIO", 60, 54);

  // Nav Links
  ctx.font = "500 18px sans-serif";
  ctx.fillStyle = "#a8a49c";
  ctx.fillText("Services", 1000, 54);
  ctx.fillText("AI Systems", 1140, 54);
  ctx.fillText("Case Studies", 1280, 54);

  // CTA Pill
  ctx.fillStyle = "#c4af8a";
  ctx.beginPath();
  ctx.roundRect(1430, 24, 130, 42, 21);
  ctx.fill();
  ctx.fillStyle = "#111110";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("Free Review", 1450, 50);

  if (sceneIndex === 0) {
    // SCENE 1: Premium Website Design Showcase
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("01 / EDITORIAL DIGITAL STUDIO", 80, 180);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "900 64px sans-serif";
    ctx.fillText("EXCEPTIONAL DESIGN.", 80, 260);
    ctx.fillStyle = "#c4af8a";
    ctx.fillText("INTELLIGENT GROWTH.", 80, 335);

    ctx.fillStyle = "#9a9a94";
    ctx.font = "400 24px sans-serif";
    ctx.fillText("Bespoke websites & 24/7 AI lead automation engineered for growing UK businesses.", 80, 395);

    // Hero Mockup Cards
    ctx.fillStyle = "rgba(34, 34, 32, 0.85)";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.3)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(80, 460, 440, 460, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(196, 175, 138, 0.15)";
    ctx.fillRect(100, 480, 400, 220);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Apex Construction", 100, 740);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "16px sans-serif";
    ctx.fillText("High-End Builder • Berkshire", 100, 770);
    ctx.fillStyle = "#8a8a84";
    ctx.fillText("✦ 3.4x Enquiries via AI Assistant", 100, 810);

    ctx.beginPath();
    ctx.roundRect(560, 460, 440, 460, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(196, 175, 138, 0.15)";
    ctx.fillRect(580, 480, 400, 220);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Verve Automotive", 580, 740);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "16px sans-serif";
    ctx.fillText("Luxury Detailing • Reading", 580, 770);
    ctx.fillStyle = "#8a8a84";
    ctx.fillText("✦ 24/7 Automated Booking Workflow", 580, 810);

    ctx.beginPath();
    ctx.roundRect(1040, 460, 480, 460, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("WHY ARIVELUNE?", 1070, 510);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "18px sans-serif";
    ctx.fillText("• Bespoke luxury design tailored to your brand", 1070, 560);
    ctx.fillText("• AI chatbots pre-qualify prospects 24/7", 1070, 610);
    ctx.fillText("• Direct SMS/Email instant lead alerts", 1070, 660);
    ctx.fillText("• Optimized for UK search visibility", 1070, 710);
    ctx.fillText("• Fixed pricing & zero hidden fees", 1070, 760);
  } else if (sceneIndex === 1) {
    // SCENE 2: AI Customer Engagement
    ctx.fillStyle = "rgba(10, 10, 10, 0.6)";
    ctx.fillRect(0, 90, w, h - 90);

    // AI Chatbot Modal Window
    const mw = 900;
    const mh = 700;
    const mx = (w - mw) / 2;
    const my = 180;

    ctx.fillStyle = "#1e1e1c";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(mx, my, mw, mh, 20);
    ctx.fill();
    ctx.stroke();

    // Modal Header
    ctx.fillStyle = "#272724";
    ctx.beginPath();
    ctx.roundRect(mx, my, mw, 80, [20, 20, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(mx + 45, my + 40, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("Arivelune AI Customer Engagement Assistant", mx + 70, my + 48);

    // Chat Message 1 (Visitor)
    ctx.fillStyle = "#2a2a27";
    ctx.beginPath();
    ctx.roundRect(mx + 40, my + 120, 620, 90, 14);
    ctx.fill();
    ctx.fillStyle = "#e5e1d8";
    ctx.font = "18px sans-serif";
    ctx.fillText("Hi! We're a commercial building firm in Berkshire.", mx + 60, my + 155);
    ctx.fillText("Can your system automatically pre-qualify project leads?", mx + 60, my + 185);

    // Chat Message 2 (AI Assistant)
    ctx.fillStyle = "rgba(196, 175, 138, 0.15)";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(mx + 200, my + 240, 660, 140, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("ARIVELUNE AI ASSISTANT", mx + 220, my + 270);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "18px sans-serif";
    ctx.fillText("Hello! Absolutely. Our custom AI asks visitors about their project scope,", mx + 220, my + 305);
    ctx.fillText("timeline & budget, then routes qualified details directly to your mobile.", mx + 220, my + 335);

    // Chat Message 3 (Visitor)
    ctx.fillStyle = "#2a2a27";
    ctx.beginPath();
    ctx.roundRect(mx + 40, my + 400, 540, 80, 14);
    ctx.fill();
    ctx.fillStyle = "#e5e1d8";
    ctx.font = "18px sans-serif";
    ctx.fillText("That sounds ideal! Can it schedule a strategy call?", mx + 60, my + 448);

    // Chat Message 4 (AI Assistant Action)
    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(mx + 200, my + 500, 660, 80, 14);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("✓ Consultation Call Booked for Tuesday, 10:00 AM", mx + 240, my + 548);
  } else if (sceneIndex === 2) {
    // SCENE 3: Smart Lead Capture Form
    ctx.fillStyle = "rgba(10, 10, 10, 0.6)";
    ctx.fillRect(0, 90, w, h - 90);

    const mw = 940;
    const mh = 720;
    const mx = (w - mw) / 2;
    const my = 160;

    ctx.fillStyle = "#1c1c1a";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(mx, my, mw, mh, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("03 / SMART LEAD CAPTURE WORKFLOW", mx + 50, my + 60);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("Interactive Lead Qualification System", mx + 50, my + 110);

    // Progress Bar
    ctx.fillStyle = "#2a2a27";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 140, 840, 12, 6);
    ctx.fill();

    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 140, 650, 12, 6);
    ctx.fill();

    // Checkbox Options
    ctx.fillStyle = "rgba(196, 175, 138, 0.1)";
    ctx.strokeStyle = "#c4af8a";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 180, 390, 80, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("✓ Bespoke Web Design", mx + 80, my + 228);

    ctx.fillStyle = "rgba(196, 175, 138, 0.1)";
    ctx.beginPath();
    ctx.roundRect(mx + 470, my + 180, 420, 80, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("✓ 24/7 AI Enquiry Chatbot", mx + 500, my + 228);

    // Inputs
    ctx.fillStyle = "#262624";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 290, 840, 70, 10);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "18px sans-serif";
    ctx.fillText("Full Name: Harrison Vance (Vance & Partners Construction)", mx + 70, my + 333);

    ctx.fillStyle = "#262624";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 380, 840, 70, 10);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.fillText("Email Address: h.vance@vanceconstruction.co.uk", mx + 70, my + 423);

    ctx.fillStyle = "#262624";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 470, 840, 70, 10);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.fillText("Project Budget: £5,000 - Professional System", mx + 70, my + 513);

    // Submit Button
    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(mx + 50, my + 570, 840, 80, 14);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("Submit Qualified Enquiry & Receive Proposal →", mx + 180, my + 620);
  } else {
    // SCENE 4: Lead Management Dashboard
    ctx.fillStyle = "#141413";
    ctx.fillRect(0, 90, w, h - 90);

    // Header title
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("ARIVELUNE OS — LEAD MANAGEMENT DASHBOARD", 60, 160);

    // 3 Metric Cards
    ctx.fillStyle = "#1e1e1c";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.25)";
    ctx.lineWidth = 1.5;

    // Card 1
    ctx.beginPath();
    ctx.roundRect(60, 200, 460, 160, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("QUALIFIED LEADS THIS MONTH", 90, 240);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "900 52px sans-serif";
    ctx.fillText("64", 90, 310);
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("+38% vs last month", 220, 310);

    // Card 2
    ctx.beginPath();
    ctx.roundRect(560, 200, 460, 160, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("QUALIFIED REVENUE PIPELINE", 590, 240);
    ctx.fillStyle = "#c4af8a";
    ctx.font = "900 52px sans-serif";
    ctx.fillText("£94,500", 590, 310);

    // Card 3
    ctx.beginPath();
    ctx.roundRect(1060, 200, 480, 160, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("AVG. AI RESPONSE TIME", 1090, 240);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "900 52px sans-serif";
    ctx.fillText("8 secs", 1090, 310);

    // Lead Stream Table
    ctx.fillStyle = "#1a1a18";
    ctx.beginPath();
    ctx.roundRect(60, 390, 1480, 550, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("LIVE QUALIFIED ENQUIRY STREAM", 100, 440);

    const rows = [
      { name: "Apex Construction", location: "Ascot, Berkshire", type: "Web & AI Package", value: "£5,000", time: "2 mins ago", status: "Auto-Qualified" },
      { name: "Verve Automotive", location: "Reading, Berkshire", type: "Lead Automation", value: "£2,500", time: "14 mins ago", status: "Call Booked" },
      { name: "Slate Salon & Spa", location: "Windsor, Berkshire", type: "Full System", value: "£5,000", time: "1 hour ago", status: "Proposal Sent" },
      { name: "Crest Professional Services", location: "Maidenhead, Berkshire", type: "Bespoke System", value: "Custom", time: "3 hours ago", status: "Auto-Qualified" }
    ];

    rows.forEach((r, idx) => {
      const ry = 480 + idx * 105;
      ctx.fillStyle = "rgba(40, 40, 37, 0.6)";
      ctx.beginPath();
      ctx.roundRect(90, ry, 1420, 85, 12);
      ctx.fill();

      ctx.fillStyle = "#f4f0e8";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(r.name, 120, ry + 40);
      ctx.fillStyle = "#8a8a84";
      ctx.font = "16px sans-serif";
      ctx.fillText(r.location, 120, ry + 66);

      ctx.fillStyle = "#e5e1d8";
      ctx.font = "18px sans-serif";
      ctx.fillText(r.type, 540, ry + 50);

      ctx.fillStyle = "#c4af8a";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(r.value, 880, ry + 50);

      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.roundRect(1140, ry + 22, 180, 42, 21);
      ctx.fill();
      ctx.fillStyle = "#042f2e";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText(r.status, 1165, ry + 48);

      ctx.fillStyle = "#8a8a84";
      ctx.font = "15px sans-serif";
      ctx.fillText(r.time, 1340, ry + 48);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper to draw Phone Screen Texture for 4 Scenes
function createPhoneTexture(sceneIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 1600;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = "#0f0f0e";
  ctx.fillRect(0, 0, w, h);

  // Status Bar
  ctx.fillStyle = "#f4f0e8";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText("09:41", 60, 70);

  // Dynamic Island
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.roundRect(w / 2 - 110, 30, 220, 50, 25);
  ctx.fill();

  if (sceneIndex === 0) {
    // Mobile Web Preview
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("ARIVELUNE", 60, 180);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("Exceptional Design.", 60, 270);
    ctx.fillStyle = "#c4af8a";
    ctx.fillText("Intelligent Growth.", 60, 330);

    ctx.fillStyle = "#9a9a94";
    ctx.font = "24px sans-serif";
    ctx.fillText("Premium web design & AI systems", 60, 400);

    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(60, 460, 680, 90, 45);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("Get Free Website Review", 190, 518);

    // Cards
    ctx.fillStyle = "#1e1e1c";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(60, 600, 680, 400, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("Bespoke Web Design", 100, 670);
    ctx.fillStyle = "#a8a49c";
    ctx.font = "24px sans-serif";
    ctx.fillText("High-converting digital presence", 100, 720);

    ctx.beginPath();
    ctx.roundRect(60, 1040, 680, 400, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("AI Enquiry Chatbot", 100, 1110);
    ctx.fillStyle = "#a8a49c";
    ctx.font = "24px sans-serif";
    ctx.fillText("24/7 lead intake and qualification", 100, 1160);
  } else if (sceneIndex === 1) {
    // AI Chat App
    ctx.fillStyle = "#1c1c1a";
    ctx.fillRect(0, 110, w, 110);
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(90, 165, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("Arivelune AI Assistant", 125, 175);

    // Chat 1
    ctx.fillStyle = "rgba(196, 175, 138, 0.2)";
    ctx.beginPath();
    ctx.roundRect(60, 260, 680, 160, 20);
    ctx.fill();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("ARIVELUNE AI", 90, 305);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "24px sans-serif";
    ctx.fillText("Hi! Looking to boost your business leads?", 90, 355);

    // Chat 2
    ctx.fillStyle = "#2a2a27";
    ctx.beginPath();
    ctx.roundRect(140, 450, 600, 140, 20);
    ctx.fill();
    ctx.fillStyle = "#e5e1d8";
    ctx.font = "24px sans-serif";
    ctx.fillText("Yes, we need lead automation for our", 170, 505);
    ctx.fillText("trade firm in Reading.", 170, 545);

    // Chat 3
    ctx.fillStyle = "rgba(196, 175, 138, 0.2)";
    ctx.beginPath();
    ctx.roundRect(60, 620, 680, 200, 20);
    ctx.fill();
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("ARIVELUNE AI", 90, 665);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "24px sans-serif";
    ctx.fillText("Our system pre-qualifies incoming scope,", 90, 715);
    ctx.fillText("budget & sends SMS alerts in seconds!", 90, 755);

    // Quick action
    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(60, 860, 680, 90, 45);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("✓ Auto-Schedule Free Review", 180, 915);
  } else if (sceneIndex === 2) {
    // Mobile Smart Lead Capture
    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("03 / QUICK LEAD FORM", 60, 160);

    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText("Instant Project Quote", 60, 230);

    ctx.fillStyle = "#262624";
    ctx.beginPath();
    ctx.roundRect(60, 300, 680, 110, 16);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.font = "24px sans-serif";
    ctx.fillText("Name: Harrison Vance", 90, 365);

    ctx.fillStyle = "#262624";
    ctx.beginPath();
    ctx.roundRect(60, 440, 680, 110, 16);
    ctx.fill();
    ctx.fillStyle = "#a8a49c";
    ctx.fillText("Phone: 07700 900123", 90, 505);

    ctx.fillStyle = "#262624";
    ctx.beginPath();
    ctx.roundRect(60, 580, 680, 110, 16);
    ctx.fill();
    ctx.fillStyle = "#c4af8a";
    ctx.fillText("Service: Web + AI Chatbot (£5,000)", 90, 645);

    ctx.fillStyle = "#c4af8a";
    ctx.beginPath();
    ctx.roundRect(60, 740, 680, 100, 50);
    ctx.fill();
    ctx.fillStyle = "#111110";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("Submit Enquiry →", 260, 802);
  } else {
    // Mobile Dashboard & Push Notification
    // Push Banner
    ctx.fillStyle = "#222220";
    ctx.strokeStyle = "rgba(196, 175, 138, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 120, 720, 220, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#c4af8a";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("🔔 ARIVELUNE LEAD HUB", 80, 170);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("NEW QUALIFIED LEAD!", 80, 220);
    ctx.fillStyle = "#a8a49c";
    ctx.font = "22px sans-serif";
    ctx.fillText("Apex Construction — £5,000 Package", 80, 265);
    ctx.fillText("Just captured via 24/7 AI Chatbot", 80, 300);

    // Dashboard Items
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("Today's Leads (6)", 60, 410);

    const items = [
      { name: "Apex Construction", value: "£5,000", status: "Qualified" },
      { name: "Verve Automotive", value: "£2,500", status: "Booked" },
      { name: "Slate Salon & Spa", value: "£5,000", status: "Proposal" }
    ];

    items.forEach((it, idx) => {
      const iy = 460 + idx * 200;
      ctx.fillStyle = "#1e1e1c";
      ctx.beginPath();
      ctx.roundRect(60, iy, 680, 170, 20);
      ctx.fill();

      ctx.fillStyle = "#f4f0e8";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText(it.name, 90, iy + 65);
      ctx.fillStyle = "#c4af8a";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(it.value, 90, iy + 115);

      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.roundRect(500, iy + 45, 200, 60, 30);
      ctx.fill();
      ctx.fillStyle = "#042f2e";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(it.status, 545, iy + 83);
    });
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
      // Laptop geometries
      laptopBase: new THREE.BoxGeometry(LAPTOP_W, BASE_H, LAPTOP_D),
      trackpad: new THREE.BoxGeometry(1.0, 0.005, 0.7),
      keyboardRecess: new THREE.BoxGeometry(2.8, 0.01, 1.05),
      key: new THREE.BoxGeometry(0.18, 0.03, 0.18),
      lidChassis: new THREE.BoxGeometry(SCREEN_W, SCREEN_H, SCREEN_T),
      screenBezel: new THREE.PlaneGeometry(SCREEN_W - BEZEL, SCREEN_H - BEZEL),
      logoEmblem: new THREE.CircleGeometry(0.2, 32),
      hinge: new THREE.CylinderGeometry(0.04, 0.04, 0.3, 16),

      // Phone geometries
      phoneBody: new THREE.BoxGeometry(PHONE_W, PHONE_H, PHONE_T),
      phoneScreen: new THREE.PlaneGeometry(PHONE_W - 0.06, PHONE_H - 0.08),
      cameraBump: new THREE.BoxGeometry(0.38, 0.38, 0.04),
      cameraLens: new THREE.CylinderGeometry(0.07, 0.07, 0.05, 16),
      dynamicIsland: new THREE.CapsuleGeometry(0.04, 0.16, 4, 16),
    }),
    []
  );

  // Keyboard keys matrix
  const keyGrid = useMemo(() => {
    const keys: [number, number][] = [];
    const rows = 5;
    const cols = 12;
    const startX = -1.25;
    const startZ = -0.4;
    const stepX = 0.23;
    const stepZ = 0.2;
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
    const lidAngleProgress = Math.min(1, Math.max(0, scrollY / 500));
    // Smooth angle from ~15 deg (0.26 rad) to ~110 deg (1.92 rad)
    const targetLidAngle = 0.26 + lidAngleProgress * (1.92 - 0.26);

    if (laptopLidRef.current) {
      laptopLidRef.current.rotation.x = THREE.MathUtils.lerp(laptopLidRef.current.rotation.x, targetLidAngle, 0.1);
    }

    // Gentle ambient floating
    const time = performance.now() * 0.0015;
    if (laptopGroupRef.current) {
      laptopGroupRef.current.position.y = Math.sin(time) * 0.04;
    }
    if (phoneGroupRef.current) {
      phoneGroupRef.current.position.y = Math.cos(time * 1.2) * 0.04;
    }
  });

  return (
    <group name="arivelune-cinematic-experience">
      {/* LAPTOP PART */}
      <group name="part-laptop" ref={laptopGroupRef} position={[0, -0.2, 0]}>
        {/* Base Chassis */}
        <mesh geometry={g.laptopBase} material={f.paint} castShadow receiveShadow />

        {/* Trackpad */}
        <mesh geometry={g.trackpad} material={f.alloy} position={[0, BASE_H / 2 + 0.003, 0.55]} />

        {/* Keyboard Recess */}
        <mesh geometry={g.keyboardRecess} material={f.trim} position={[0, BASE_H / 2 + 0.002, -0.3]} />

        {/* Individual Keycaps */}
        {keyGrid.map(([kx, kz], idx) => (
          <mesh key={idx} geometry={g.key} material={f.trim} position={[kx, BASE_H / 2 + 0.02, -0.3 + kz]} />
        ))}

        {/* Rear Hinges */}
        {[-0.8, 0.8].map((hx, idx) => (
          <mesh key={idx} geometry={g.hinge} material={f.chrome} position={[hx, BASE_H / 2, -LAPTOP_D / 2]} rotation-z={Math.PI / 2} />
        ))}

        {/* Display Lid Assembly (Pivot at hinge point) */}
        <group ref={laptopLidRef} position={[0, BASE_H / 2, -LAPTOP_D / 2]}>
          <group position={[0, SCREEN_H / 2, 0]}>
            {/* Lid Metallic Back Case */}
            <mesh geometry={g.lidChassis} material={f.paint} castShadow />

            {/* Back Gold Emblem */}
            <mesh geometry={g.logoEmblem} position={[0, 0, -SCREEN_T / 2 - 0.001]} rotation-y={Math.PI}>
              <meshStandardMaterial color="#c4af8a" roughness={0.2} metalness={0.9} />
            </mesh>

            {/* Display Screen Front */}
            <mesh geometry={g.screenBezel} position={[0, 0, SCREEN_T / 2 + 0.001]}>
              <meshBasicMaterial map={laptopTextures[activeScene]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* SMARTPHONE PART */}
      <group name="part-phone" ref={phoneGroupRef} position={[1.8, -0.1, 0.6]} rotation={[0.1, -0.35, 0.05]}>
        {/* Titanium Body Frame */}
        <mesh geometry={g.phoneBody} material={f.paint} castShadow receiveShadow />

        {/* Front Display Screen */}
        <mesh geometry={g.phoneScreen} position={[0, 0, PHONE_T / 2 + 0.001]}>
          <meshBasicMaterial map={phoneTextures[activeScene]} />
        </mesh>

        {/* Dynamic Island */}
        <mesh geometry={g.dynamicIsland} position={[0, PHONE_H / 2 - 0.12, PHONE_T / 2 + 0.002]} rotation-z={Math.PI / 2}>
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Camera Plateau on Back */}
        <mesh geometry={g.cameraBump} material={f.trim} position={[-0.22, PHONE_H / 2 - 0.3, -PHONE_T / 2 - 0.02]} />

        {/* Camera Lenses */}
        {[-0.28, -0.16].map((cx, idx1) =>
          [PHONE_H / 2 - 0.22, PHONE_H / 2 - 0.38].map((cy, idx2) => (
            <mesh key={`${idx1}-${idx2}`} geometry={g.cameraLens} material={f.chrome} position={[cx, cy, -PHONE_T / 2 - 0.04]} rotation-x={Math.PI / 2} />
          ))
        )}
      </group>
    </group>
  );
}