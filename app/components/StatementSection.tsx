"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Statement banner section with crinkled paper texture background and scroll entrance animation */
export default function StatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current || !containerRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 0.85,
        y: 0,
        ease: "power2.out",
        duration: 1.0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Starts when top reaches 75% down the viewport
          end: "center center", // Completes when center reaches viewport center
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: containerRef, dependencies: [] });

  return (
    <section
      ref={containerRef}
      id="statement-section"
      className="relative w-full min-h-[60vh] sm:min-h-screen flex items-center justify-center pointer-events-auto select-none overflow-hidden"
    >
      {/* Ripple/Crinkled texture background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div
          className="w-full h-[42vh] sm:h-[55vh] md:h-[70vh] lg:h-full opacity-60 bg-no-repeat bg-center bg-[length:100%_100%] lg:bg-contain"
          style={{
            backgroundImage: 'url("/images/New_Bg_Statement_Img.png")',
          }}
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2
          ref={textRef}
          className="font-recoleta-bold text-[17px] sm:text-[22px] md:text-[28px] lg:text-[34px] xl:text-[38px] leading-tight text-brand-burgundy font-bold opacity-0 flex flex-col items-center w-full text-center"
        >
          {/* Desktop/Tablet split */}
          <span className="hidden sm:block sm:whitespace-nowrap">Most businesses don<span className="font-sans">&apos;</span>t need more content, they need the</span>
          <span className="hidden sm:block sm:whitespace-nowrap">right direction</span>

          {/* Mobile split */}
          <span className="block sm:hidden">Most businesses don<span className="font-sans">&apos;</span>t need more content,</span>
          <span className="block sm:hidden">they need the right direction</span>
        </h2>
      </div>
    </section>
  );
}
