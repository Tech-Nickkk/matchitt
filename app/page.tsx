"use client";

import { useRef } from "react";
import PuzzleScene from "@/components/PuzzleScene";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import StatementSection from "@/components/StatementSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import HowWeMatchSection from "@/components/HowWeMatchSection";
import ProcessSection from "@/components/ProcessSection";
import WhoWeWorkWithSection from "@/components/WhoWeWorkWithSection";
import CtaSection from "@/components/CtaSection";
import AboutSection from "@/components/AboutSection";
import FloatingCtaButton from "@/components/FloatingCtaButton";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-auto min-h-screen bg-brand-cream overflow-clip"
    >
      {/* Navbar (Header) */}
      <Navbar />

      {/* How We Match Section (at the top now!) */}
      <HowWeMatchSection />

      <div id="page-pin-container" className="relative w-full z-20">
        {/* Envelope & About Content (Unified Pinned Transition) */}
        <HeroContent />
      </div>

      {/* Statement banner section */}
      <StatementSection />

      {/* Spacer for 3D Model Transition Trigger */}
      <div id="puzzle-transition-section" className="w-full h-[90vh] pointer-events-none" />
  
      {/* What We Do Section */}
      <WhatWeDoSection />

      {/* About Us Section */}
      <AboutSection />

      {/* Process Section (Pinned) */}
      <ProcessSection />

      {/* Who We Work With Section */}
      <WhoWeWorkWithSection />

      {/* CTA Section */}
      <CtaSection />

      {/* Fixed 3D WebGL Canvas */}
      <PuzzleScene />

      {/* Floating Get in Touch Button (Burgundy Theme, viewport fixed) */}
      <FloatingCtaButton />
    </main>
  );
}
