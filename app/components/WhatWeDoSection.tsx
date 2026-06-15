"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainStickerRef = useRef<HTMLDivElement>(null);
  const bandAidStickerRef = useRef<HTMLDivElement>(null);
  const enjoyStickerRef = useRef<HTMLDivElement>(null);
  const smileStickerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textContainerRef.current) return;

    const paragraphs = textContainerRef.current.querySelectorAll("p");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%", // Start when top of section is at the center of viewport
        end: "top top",     // Complete when top of section is at the top of viewport
        scrub: 0.5,         // Snappy scrubbing with 0.5s catch-up time
      }
    });

    // 1. Main WHAT WE DO sticker comes from below with a rotation
    if (mainStickerRef.current) {
      tl.fromTo(
        mainStickerRef.current,
        { y: 150, rotation: -10 },
        { y: 0, rotation: 0, duration: 1.0 },
        0 // Start immediately at 0
      );
    }

    // 2. Scale in the elements around it as the main image completes
    const elements = [
      bandAidStickerRef.current,
      enjoyStickerRef.current,
      smileStickerRef.current
    ].filter(Boolean) as HTMLElement[];

    if (elements.length > 0) {
      tl.fromTo(
        elements,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.4" // Play 0.4s before the main sticker animation completes
      );
    }

    // 3. Staggered fade-in and slide-up for the copywriting text (plays late)
    tl.fromTo(
      paragraphs,
      { opacity: 0, y: 30 },
      { opacity: 0.95, y: 0, duration: 0.8, stagger: 0.2, ease: "power1.out" },
      0.8 // Start even later at 0.8s to align with scroll visibility
    );
  }, { scope: sectionRef });

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-[#6B1D2F] py-24 overflow-hidden pointer-events-auto z-30"
    >
      <div className="relative max-w-5xl w-full mx-auto px-6 flex flex-col items-center justify-center">
        
        {/* Container for the Main Image and Stickers */}
        <div className="relative w-[190px] sm:w-[260px] md:w-[330px] flex flex-col items-center justify-center mb-12">
          
          {/* Main WHAT WE DO image */}
          <div ref={mainStickerRef} className="w-full z-10 origin-center">
            <div className="w-full h-auto transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/whatwedo-text.png"
                alt="What We Do"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Sticker 1: Band-aid (Left) */}
          <div className="absolute top-[42%] left-[-24%] w-[35px] sm:w-[50px] md:w-[60px] z-20 rotate-[-35deg]">
            <div ref={bandAidStickerRef} className="w-full h-full origin-center">
              <div className="w-full h-auto transition-transform duration-500 hover:scale-110 hover:rotate-[-25deg]">
                <Image
                  src="/images/whatwedoicon-2.png"
                  alt="Band-aid sticker"
                  width={150}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 2: ENJOY Poster (Top Right) */}
          <div className="absolute top-[-20%] right-[8%] w-[50px] sm:w-[65px] md:w-[70px] z-0 rotate-25">
            <div ref={enjoyStickerRef} className="w-full h-full origin-center">
              <div className="w-full h-auto transition-transform duration-500 hover:scale-105 hover:rotate-[-5deg]">
                <Image
                  src="/images/whatwedoicon-1.png"
                  alt="Enjoy sticker"
                  width={250}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 3: Blue Smile (Bottom Right) */}
          <div className="absolute top-[60%] right-[-20%] w-[40px] sm:w-[50px] md:w-[75px] z-20 rotate-[-20deg]">
            <div ref={smileStickerRef} className="w-full h-full origin-center">
              <div className="w-full h-auto transition-transform duration-500 hover:scale-110 hover:rotate-[-10deg]">
                <Image
                  src="/images/whatwedoicon-3.png"
                  alt="Smile sticker"
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copywriting content */}
        <div ref={textContainerRef} className="max-w-2xl text-center z-10 px-4">
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] opacity-95">
            Getting your brand in front of the<br className="hidden sm:block" /> right people in the right way.
          </p>
        </div>

      </div>
    </section>
  );
}

