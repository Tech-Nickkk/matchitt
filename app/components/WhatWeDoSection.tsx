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

    // 1. Text paragraphs fade-in and slide-up synced to scroll
    gsap.fromTo(
      paragraphs,
      { opacity: 0, y: 40 },
      {
        opacity: 0.95,
        y: 0,
        stagger: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 90%",
          end: "top 75%",
          scrub: 1.8,
        }
      }
    );

    // 2. Sticker timeline for smooth, continuous parallax scrolling (scrub: 1.8)
    const stickerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when top of section enters viewport bottom
        end: "bottom top",   // Ends when bottom of section leaves viewport top
        scrub: 1.8,          // Weighted lag for a premium catch-up feel
      }
    });

    // Scale up elements dynamically as they first enter the screen
    const elements = [
      mainStickerRef.current,
      bandAidStickerRef.current,
      enjoyStickerRef.current,
      smileStickerRef.current
    ].filter(Boolean) as HTMLElement[];

    if (elements.length > 0) {
      stickerTl.fromTo(
        elements,
        { scale: 0 },
        { scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
        0
      );
    }

    // Continuous float and rotation animations synced to scroll
    if (mainStickerRef.current) {
      stickerTl.fromTo(
        mainStickerRef.current,
        { y: 80, rotation: -6 },
        { y: -80, rotation: 6, ease: "none" },
        0
      );
    }

    if (bandAidStickerRef.current) {
      stickerTl.fromTo(
        bandAidStickerRef.current,
        { y: 150, rotation: -20 },
        { y: -90, rotation: 10, ease: "none" },
        0
      );
    }

    if (enjoyStickerRef.current) {
      stickerTl.fromTo(
        enjoyStickerRef.current,
        { y: 50, rotation: 15 },
        { y: -150, rotation: -10, ease: "none" },
        0
      );
    }

    if (smileStickerRef.current) {
      stickerTl.fromTo(
        smileStickerRef.current,
        { y: 120, rotation: -15 },
        { y: -60, rotation: 15, ease: "none" },
        0
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-brand-burgundy py-24 overflow-hidden pointer-events-auto z-30"
    >
      <div className="relative max-w-5xl w-full mx-auto px-6 flex flex-col items-center justify-center">
        
        {/* Container for the Main Image and Stickers */}
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] shrink-0 select-none mb-6 sm:mb-8">
          
          {/* Main WHAT WE DO image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] sm:w-[210px] md:w-[225px] z-10">
            <div
              ref={mainStickerRef}
              className="w-full h-full origin-center"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/whatwedo_Text_Img.png"
                  alt="What We Do"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 1: Band-aid (Left) */}
          <div className="absolute bottom-40 left-[-25%] w-[40px] sm:w-[55px] md:w-[100px] z-20 rotate-[-35deg]">
            <div
              ref={bandAidStickerRef}
              className="w-full h-full origin-center"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Whatwedo_Sticker01_Img.png"
                  alt="Band-aid sticker"
                  width={150}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 2: ENJOY Poster (Top Right) */}
          <div className="absolute top-[-0%] right-[-5%] w-[55px] sm:w-[75px] md:w-[110px] z-0 rotate-25">
            <div
              ref={enjoyStickerRef}
              className="w-full h-full origin-center"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Whatwedo_Sticker02_Img.png"
                  alt="Enjoy sticker"
                  width={250}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 3: Blue Smile (Bottom Right) */}
          <div className="absolute bottom-[15%] right-[-15%] w-[55px] sm:w-[70px] md:w-[100px] z-20 rotate-[-20deg]">
            <div
              ref={smileStickerRef}
              className="w-full h-full origin-center"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Whatwedo_Sticker03_Img.png"
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
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-brand-burgundy opacity-95">
            Getting your brand in front of the<br className="hidden sm:block" /> right people in the right way.
          </p>
        </div>

      </div>
    </section>
  );
}

