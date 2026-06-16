"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeMatchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textImageAnimRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textImageAnimRef.current) return;

    // Sticker timeline for smooth, continuous parallax scrolling (scrub: 1.8)
    const stickerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when top of section enters viewport bottom
        end: "bottom top",   // Ends when bottom of section leaves viewport top
        scrub: 1.8,          // Weighted lag for a premium catch-up feel
      }
    });

    // Scale up element dynamically as it first enters the screen
    stickerTl.fromTo(
      textImageAnimRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.3, ease: "back.out(1.5)" },
      0
    );

    // Continuous float and rotation animation synced to scroll
    stickerTl.fromTo(
      textImageAnimRef.current,
      { y: 100, rotation: -8 },
      { y: -100, rotation: 8, ease: "none" },
      0
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="how-we-match"
      className="relative w-full h-screen flex flex-col items-center justify-start py-24 pointer-events-auto z-30"
    >
      <div className="w-full flex flex-col items-center">
        {/* HOW WE MATCH Image */}
        <div className="relative w-[280px] sm:w-[350px] md:w-[450px] z-10">
          <div ref={textImageAnimRef} className="w-full h-full origin-center">
            <div className="w-full h-auto">
              <Image
                src="/images/HowWeMatchIt-Text.svg"
                alt="How We Match"
                width={800}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

