"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Central envelope image with overlapping editorial typography, pined scroll, and zoom-reveal animation */
export default function HeroContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLSpanElement>(null);
  const creativityRef = useRef<HTMLSpanElement>(null);
  const executionRef = useRef<HTMLSpanElement>(null);
  const perfectlyMatchedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    
    if (!sectionRef.current) return;

    // Create GSAP ScrollTrigger to pin the entire page content container when "Creativity" centers
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "10% top",// Starts earlier (when top of Creativity hits 75% viewport height)
        end: "+=100%",  
        // markers: true,        // Pin duration (200% of viewport height scroll)
        pin: "#page-pin-container", // Pin the entire page content container!
        pinSpacing: true,
        scrub: 1,               // Smooth scrubbing driven by scroll speed
        invalidateOnRefresh: true,
      },
    });

    // 1. Fade out other elements and secondary texts concurrently (starts at 0, completes early!)
    tl.to(
      [
        envelopeRef.current,
        strategyRef.current,
        executionRef.current,
        perfectlyMatchedRef.current,
        "#navbar-container",
        "#scattered-folders",
      ],
      {
        opacity: 0,
        y: (i, target) => {
          if (target === envelopeRef.current) return -60;
          return -30;
        },
        scale: (i, target) => {
          if (target === envelopeRef.current) return 0.85;
          return 0.98;
        },
        duration: 0.6, // Completes early!
        ease: "power2.out",
      },
      0
    );

    // 2. Scale up "Creativity." massively concurrently (starts at 0, takes longer to fill the screen)
    tl.to(
      creativityRef.current,
      {
        scale: 140,
        duration: 1.5,
        ease: "power2.inOut",
        transformOrigin: "center center",
      },
      0 // Runs in parallel with the fade-out!
    );

    // Force immediately refresh of all ScrollTrigger geometries
    ScrollTrigger.refresh();

    return () => {
      // Clean up timeline and ScrollTrigger on unmount
      tl.kill();
    };
    
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-pin-container"
      className="relative w-full min-h-screen flex flex-col items-center justify-center z-30 pointer-events-auto overflow-visible"
    >
      {/* Envelope image */}
      <div ref={envelopeRef} className="relative z-30">
        <img
          src="/images/main-center-image.png"
          alt="Perfectly Matched Envelope"
          className="w-[260px] sm:w-[340px] md:w-[420px] object-contain drop-shadow-[0_16px_35px_rgba(0,0,0,0.10)] select-none pointer-events-none"
        />
      </div>

      {/* Typography — overlaps bottom of envelope via negative margin */}
      <div className="relative -mt-10 sm:-mt-14 md:-mt-40 px-4 max-w-5xl w-full text-center z-40">
        <h1 className="font-serif font-bold text-center text-brand-burgundy text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight select-none flex flex-col items-center justify-center">
          <span ref={strategyRef} className="relative inline-block">
            Strategy.
          </span>

          <span
            ref={creativityRef}
            id="creativity-text"
            className="inline-block origin-center select-none"
          >
            Creativity.
          </span>

          <span ref={executionRef} className="inline-block">
            Execution.
          </span>

          <span ref={perfectlyMatchedRef} className="inline-block">
            Perfectly Matched.
          </span>
        </h1>
      </div>
    </section>
  );
}
