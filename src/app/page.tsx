"use client";

import { useRef } from "react";
import PuzzleScene from "@/components/PuzzleScene";
import ScatteredHeroItems from "@/components/ScatteredHeroItems";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-auto min-h-screen bg-[#F4F2EC] overflow-clip"
    >
      {/* Fixed 3D WebGL Canvas */}
      {/* <PuzzleScene scrollContainerRef={mainRef} /> */}

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
      
    </main>
  );
}
