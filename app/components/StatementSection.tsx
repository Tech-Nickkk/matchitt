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
        opacity: 1,
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
      className="relative w-full min-h-screen flex items-center justify-center pointer-events-auto select-none overflow-hidden"
    >
      {/* Ripple/Crinkled texture background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'url("/images/Statement_Bg_Img.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2
          ref={textRef}
          className="font-recoleta-bold text-[5vw] sm:text-3xl md:text-4xl lg:text-[52px] xl:text-[56px] leading-tight text-brand-burgundy font-bold opacity-0 flex flex-col items-center w-full"
        >
          <span className="whitespace-nowrap">Most businesses don<span className="font-sans">&apos;</span>t need more content.</span>
          <span className="whitespace-nowrap">They need the right direction.</span>
        </h2>
      </div>
    </section>
  );
}
