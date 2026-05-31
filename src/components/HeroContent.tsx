"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Central envelope image with overlapping editorial typography, pined scroll, and infinite zoom-reveal animation */
export default function HeroContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  
  const strategyRef = useRef<HTMLSpanElement>(null);
  const zoomCreativityRef = useRef<HTMLSpanElement>(null);
  const zoomExecutionRef = useRef<HTMLSpanElement>(null);
  const zoomPerfectlyRef = useRef<HTMLSpanElement>(null);

  // Refs for the 't' letters to calculate exact transform origins
  const tStrategyRef = useRef<HTMLSpanElement>(null);
  const tCreativityRef = useRef<HTMLSpanElement>(null);
  const tExecutionRef = useRef<HTMLSpanElement>(null);
  const tPerfectlyRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Helper to compute exact transform origin to center on the 't' letter
    const getOrigin = (parent: HTMLElement | null, child: HTMLElement | null) => {
      if (!parent || !child) return "50% 50%";
      const pRect = parent.getBoundingClientRect();
      const cRect = child.getBoundingClientRect();
      // calculate the center of the child relative to the parent
      const x = cRect.left - pRect.left + cRect.width / 2;
      const y = cRect.top - pRect.top + cRect.height / 2;
      return `${(x / pRect.width) * 100}% ${(y / pRect.height) * 100}%`;
    };

    // Calculate origins dynamically
    const strategyOrigin = getOrigin(strategyRef.current, tStrategyRef.current);
    const creativityOrigin = getOrigin(zoomCreativityRef.current, tCreativityRef.current);
    const executionOrigin = getOrigin(zoomExecutionRef.current, tExecutionRef.current);
    const perfectlyOrigin = getOrigin(zoomPerfectlyRef.current, tPerfectlyRef.current);

    // Create GSAP ScrollTrigger to pin the entire page content container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "10% top",
        end: "+=2000%", 
        pin: "#page-pin-container",
        pinSpacing: true,
        scrub: 0.1,
        invalidateOnRefresh: true,
      },
    });

    // 1. Initial fade out of non-target elements
    tl.to(
      [envelopeRef.current, "#navbar-container", "#scattered-folders"],
      { opacity: 0, y: -30, duration: 0.5, ease: "power2.out" },
      0
    );

    // 2. Zoom original Strategy text into its 't'
    tl.to(
      strategyRef.current,
      {
        scale: 250,
        duration: 2,
        ease: "power2.inOut",
        transformOrigin: strategyOrigin,
      },
      0
    );

    // 3. Zoom Creativity into its 't'
    tl.fromTo(
      zoomCreativityRef.current,
      { scale: 0 },
      { scale: 250, duration: 2, ease: "power2.inOut", transformOrigin: creativityOrigin },
      "-=1.1"
    );

    // 4. Zoom Execution into its 't'
    tl.fromTo(
      zoomExecutionRef.current,
      { scale: 0 },
      { scale: 210, duration: 2, ease: "power2.inOut", transformOrigin: executionOrigin },
      "-=1.1"
    );

    // 5. Zoom Perfectly Matched into its 't'
    tl.fromTo(
      zoomPerfectlyRef.current,
      { scale: 0 },
      { scale: 125, duration: 2, ease: "power2.inOut", transformOrigin: perfectlyOrigin },
      "-=1"
    );

    // 6. Instantly hide all scaled texts once the zoom animations are completely finished
    tl.to(
      [strategyRef.current, zoomCreativityRef.current, zoomExecutionRef.current, zoomPerfectlyRef.current],
      {
        autoAlpha: 0,
        duration: 0
      }
    );

    ScrollTrigger.refresh();
  }, { dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="hero-pin-container"
      className="relative w-full min-h-screen flex flex-col items-center justify-center z-30 pointer-events-auto overflow-visible"
    >
      {/* Zoom Sequence Container */}
      <div className="absolute inset-0 flex items-center font-extrabold justify-center pointer-events-none z-50 translate-y-[5vh] md:translate-y-[8vh]">
        
        {/* Absolute centered texts */}
        <span ref={zoomCreativityRef} className="absolute text-[#F4F2EC] font-recoleta-bold text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight origin-center text-center whitespace-nowrap">
          Creat<span ref={tCreativityRef}>i</span>vity.
        </span>
        <span ref={zoomExecutionRef} className="absolute text-brand-burgundy font-recoleta-bold text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight origin-center text-center whitespace-nowrap">
          Execu<span ref={tExecutionRef}>t</span>ion.
        </span>
        <span ref={zoomPerfectlyRef} className="absolute text-[#F4F2EC] font-recoleta-bold text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight origin-center text-center whitespace-nowrap">
          Perfect<span ref={tPerfectlyRef}>l</span>y Matched.
        </span>
      </div>

      {/* Envelope image */}
      <div ref={envelopeRef} className="relative z-30">
        <Image
          src="/images/main-center-image.png"
          alt="Perfectly Matched Envelope"
          width={800}
          height={600}
          className="w-[260px] sm:w-[340px] md:w-[420px] object-contain select-none pointer-events-none"
        />
      </div>

      {/* Typography — overlaps bottom of envelope via negative margin */}
      <div className="relative -mt-10 sm:-mt-14 px-4 max-w-5xl w-full text-center z-40">
        <h1 className="font-recoleta-bold text-center text-brand-burgundy text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight select-none flex flex-col items-center justify-center">
          <span ref={strategyRef} className="relative inline-block origin-center">
            Stra<span ref={tStrategyRef}>t</span>egy.
          </span>
        </h1>
      </div>
    </section>
  );
}

