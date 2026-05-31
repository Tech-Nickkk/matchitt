"use client";

import { useRef } from "react";
import PuzzleScene from "@/components/PuzzleScene";
import ScatteredHeroItems from "@/components/ScatteredHeroItems";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import AboutSection from "@/components/AboutSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import ServicesFoldersSection from "@/components/ServicesFoldersSection";
import HowWeMatchSection from "@/components/HowWeMatchSection";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-auto min-h-screen bg-[#F4F2EC] overflow-clip"
    >
      {/* Fixed 3D WebGL Canvas */}
      <PuzzleScene />

      <div id="page-pin-container" className="relative w-full z-20">
        {/* Scattered folders & stickers overlay */}
        <ScatteredHeroItems />

        {/* Navbar (Header) */}
        <Navbar />

        {/* Spacer for 3D model scroll area */}
        <div className="h-[30vh] sm:h-[35vh] md:h-[40vh]" />

        {/* Envelope + editorial typography */}
        <HeroContent />
      </div>

        {/* About Section */}
        <AboutSection />

        {/* Spacer for future 3D model animation gap between sections */}
        <div className="w-full h-[55vh] sm:h-[70vh] md:h-[170vh] pointer-events-none" />
      
        {/* What We Do Section */}
        <WhatWeDoSection />
        
        {/* Services Folders Section */}
        <ServicesFoldersSection />
        
        {/* Spacer between sections */}
        <div className="w-full h-[15vh] pointer-events-none" />

        {/* How We Match Section */}
        <HowWeMatchSection />
      
    </main>
  );
}
