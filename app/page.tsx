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
import FullscreenImageSection from "@/components/FullscreenImageSection";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-auto min-h-screen bg-brand-cream overflow-clip"
    >
      <div id="page-pin-container" className="relative w-full z-20">
        {/* Navbar (Header) */}
        <Navbar />

        {/* Spacer for 3D model initial position spacing */}
        <div id="hero-spacer" className="h-[50vh] sm:h-[70vh]" />

        {/* Envelope & About Content (Unified Pinned Transition) */}
        <HeroContent />
      </div>


      {/* Statement banner section */}
      <StatementSection />

      {/* Spacer for 3D Model Transition Trigger */}
      <div id="puzzle-transition-section" className="w-full h-[90vh] pointer-events-none" />
  
      {/* Fullscreen Image Transition */}
      <FullscreenImageSection />

      {/* About Us Section */}
      <AboutSection />
    
      {/* What We Do Section */}
      <WhatWeDoSection />
      
      {/* Spacer before How We Match */}
      <div className="w-full h-[20vh] md:h-[30vh] pointer-events-none" />

      {/* How We Match Section */}
      <HowWeMatchSection />

      {/* Spacer after How We Match to allow 3D model to fall down off-screen */}
      <div className="w-full h-[180vh] md:h-[240vh] pointer-events-none" />

      {/* Process Section (Pinned) */}
      <ProcessSection />

      {/* Who We Work With Section */}
      <WhoWeWorkWithSection />

      {/* CTA Section */}
      <CtaSection />

      {/* Fixed 3D WebGL Canvas */}
      <PuzzleScene />
    </main>
  );
}
