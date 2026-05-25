"use client";

import { useRef } from "react";
import PuzzleScene from "@/components/PuzzleScene";
import ScatteredFolders from "@/components/ScatteredFolders";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-[400vh] bg-[#F4F2EC] overflow-x-hidden"
    >
      {/* Fixed 3D WebGL Canvas */}
      <PuzzleScene scrollContainerRef={mainRef} />

      {/* The container that pins the entire page content */}
      <div
        id="page-pin-container"
        className="relative w-full z-20 pointer-events-none"
      >
        {/* Scattered folders & stickers overlay */}
        <ScatteredFolders />

        {/* Navbar (Header) */}
        <Navbar />

        {/* Spacer for 3D model scroll area */}
        <div className="h-[30vh] sm:h-[35vh] md:h-[40vh]" />

        {/* Envelope + editorial typography */}
        <HeroContent />
      </div>
    </main>
  );
}
