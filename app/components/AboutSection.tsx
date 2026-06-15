"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const aboutTextImageAnimRef = useRef<HTMLDivElement>(null);
  const starStickerRef = useRef<HTMLDivElement>(null);
  const lightningStickerRef = useRef<HTMLDivElement>(null);
  const arrowStickerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textContainerRef.current) return;

    const paragraphs = textContainerRef.current.querySelectorAll("p");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%", // Start when the top of the section is at the center of the viewport (elements enter bottom of screen)
        end: "top top",     // Complete when the top of the section reaches the top of the viewport (elements are centered)
        scrub: 0.5,         // Snappy scrubbing with 0.5s catch-up time to prevent lag
      }
    });

    // 1. Staggered fade in and slide up for text paragraphs
    tl.fromTo(
      paragraphs,
      { opacity: 0, y: 30 },
      { opacity: 0.95, y: 0, duration: 0.8, stagger: 0.2, ease: "power1.out" },
      0
    );

    // 2. Main about text image comes from below with a slight rotation to its current position
    if (aboutTextImageAnimRef.current) {
      tl.fromTo(
        aboutTextImageAnimRef.current,
        { y: 150, rotation: -10 },
        { y: 0, rotation: 0, duration: 1.0 },
        0.1 // Start slightly after the first paragraph starts
      );
    }

    // 3. Scale in the elements around the main image as it is about to finish
    const elements = [
      starStickerRef.current,
      lightningStickerRef.current,
      arrowStickerRef.current
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
        "-=0.4" // Start 0.4s before the main image animation completes
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center text-[#6B1D2F] overflow-hidden pointer-events-auto z-30"
    >
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">

        {/* Left Column: Scrapbook Sticker Composition */}
        <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] flex-shrink-0 select-none">
          
          {/* Stars Sticker */}
          <div className="absolute top-[-5%] right-[-2%] w-[60px] sm:w-[80px] md:w-[120px] z-0">
            <div ref={starStickerRef} className="w-full h-full origin-center">
              <div className="w-full h-auto transition-transform duration-500 hover:scale-105 hover:rotate-[18deg]">
                <Image
                  src="/images/about-star-icon.png"
                  alt="Stars Sticker"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* About Us Sticker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[220px] md:w-[210px] z-10">
            <div ref={aboutTextImageAnimRef} className="w-full h-full origin-center">
              <div className="w-full h-auto transition-transform duration-500 hover:scale-[1.03] hover:rotate-[-2deg]">
                <Image
                  src="/images/about-us-text.png"
                  alt="About Us Sticker"
                  width={600}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Lightning Bolt Sticker */}
          <div className="absolute bottom-[10%] left-[10%] w-[45px] sm:w-[60px] md:w-[100px] z-20 rotate-[15deg]">
            <div ref={lightningStickerRef} className="w-full h-full origin-center">
              <div className="w-full h-auto transition-transform duration-500 hover:scale-110 hover:rotate-[-8deg]">
                <Image
                  src="/images/about-thunder-icon.png"
                  alt="Lightning Bolt Sticker"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Cursor Arrow Sticker */}
          <div className="absolute bottom-[8%] right-[2%] w-[60px] sm:w-[75px] md:w-[85px] z-20 rotate-[-8deg]">
            <div ref={arrowStickerRef} className="w-full h-full origin-center">
              <div className="w-full h-auto transition-transform duration-500 hover:scale-110 hover:rotate-[2deg]">
                <Image
                  src="/images/about-arrow-icon.png"
                  alt="Cursor Arrow Sticker"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copywriting content */}
        <div ref={textContainerRef} className="max-w-3xl w-full text-left flex flex-col justify-center">
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] mb-6 sm:mb-8 opacity-95">
            We started Matchitt with one simple belief: most businesses don’t need
            more content, they need the right direction.
          </p>
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] mb-6 sm:mb-8 opacity-95">
            There’s too much noise online. Too many trends.
          </p>
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] opacity-95">
            MATCHITT comes in to match you with your audience, through the right
            strategy, content, and execution plan.
          </p>
        </div>

      </div>
    </section>
  );
}

