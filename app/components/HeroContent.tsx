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

  // Wipes
  const wipe1Ref = useRef<HTMLDivElement>(null);
  const wipe2Ref = useRef<HTMLDivElement>(null);
  const wipe3Ref = useRef<HTMLDivElement>(null);
  const wipe4Ref = useRef<HTMLDivElement>(null);

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
        end: "+=5000%", 
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

    const getStrategyScale = () => {
      if (typeof window === "undefined") return 85;
      if (window.innerWidth < 640) return 100; // Mobile
      if (window.innerWidth < 1024) return 95; // Tablet
      return 50; // Desktop
    };

    // 2. Zoom original Strategy text into its 't'
    tl.to(strategyRef.current, { scale: () => getStrategyScale(), duration: 2, ease: "power2.inOut", transformOrigin: strategyOrigin }, 0);

    // Wipe 1 (Burgundy)
    tl.to(wipe1Ref.current, { width: "100%", duration: 1.2, ease: "none" }, 1);

    // 3. Zoom Creativity into its 't'
    tl.fromTo(zoomCreativityRef.current, { scale: 0 }, { scale: 75, duration: 2.2, ease: "power2.inOut", transformOrigin: creativityOrigin }, 2);

    // Wipe 2 (Light)
    tl.to(wipe2Ref.current, { width: "100%", duration: 1.2, ease: "none" }, 3);

    // 4. Zoom Execution into its 't'
    tl.fromTo(zoomExecutionRef.current, { scale: 0 }, { scale: 75, duration: 2.2, ease: "power2.inOut", transformOrigin: executionOrigin }, 4);

    // Wipe 3 (Burgundy)
    tl.to(wipe3Ref.current, { width: "100%", duration: 1.2, ease: "none" }, 5);

    // 5. Zoom Perfectly Matched into its 't'
    tl.fromTo(zoomPerfectlyRef.current, { scale: 0 }, { scale: 75, duration: 2.2, ease: "power2.inOut", transformOrigin: perfectlyOrigin }, 6);

    // Wipe 4 (Light)
    tl.to(wipe4Ref.current, { width: "100%", duration: 1.2, ease: "none" }, 6.8);

    // 6. Instantly hide all scaled texts and wipes once the zoom animations are completely finished
    tl.to(
      [
        strategyRef.current, 
        zoomCreativityRef.current, 
        zoomExecutionRef.current, 
        zoomPerfectlyRef.current,
        wipe1Ref.current,
        wipe2Ref.current,
        wipe3Ref.current,
        wipe4Ref.current
      ],
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
      {/* Wipe 1 */}
      <div ref={wipe1Ref} className="absolute -top-[25vh] left-1/2 -translate-x-1/2 w-0 h-[150vh] bg-brand-burgundy z-[41] pointer-events-none"></div>
      
      {/* Creativity Text */}
      <div className="absolute inset-0 flex items-center font-extrabold justify-center pointer-events-none z-[42] translate-y-[5vh] md:translate-y-[8vh]">
        <span ref={zoomCreativityRef} className="absolute text-[#F4F2EC] font-recoleta-bold text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight origin-center text-center whitespace-nowrap">
          Crea<span ref={tCreativityRef}>t</span>ivity.
        </span>
      </div>

      {/* Wipe 2 */}
      <div ref={wipe2Ref} className="absolute -top-[25vh] left-1/2 -translate-x-1/2 w-0 h-[150vh] bg-[#F4F2EC] z-[43] pointer-events-none"></div>

      {/* Execution Text */}
      <div className="absolute inset-0 flex items-center font-extrabold justify-center pointer-events-none z-[44] translate-y-[5vh] md:translate-y-[8vh]">
        <span ref={zoomExecutionRef} className="absolute text-brand-burgundy font-recoleta-bold text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight origin-center text-center whitespace-nowrap">
          Execu<span ref={tExecutionRef}>t</span>ion.
        </span>
      </div>

      {/* Wipe 3 */}
      <div ref={wipe3Ref} className="absolute -top-[25vh] left-1/2 -translate-x-1/2 w-0 h-[150vh] bg-brand-burgundy z-[45] pointer-events-none"></div>

      {/* Perfectly Matched Text */}
      <div className="absolute inset-0 flex items-center font-extrabold justify-center pointer-events-none z-[46] translate-y-[5vh] md:translate-y-[8vh]">
        <span ref={zoomPerfectlyRef} className="absolute text-[#F4F2EC] font-recoleta-bold text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight origin-center text-center whitespace-nowrap">
          Perfect<span ref={tPerfectlyRef}>l</span>y Matched.
        </span>
      </div>

      {/* Wipe 4 */}
      <div ref={wipe4Ref} className="absolute -top-[25vh] left-1/2 -translate-x-1/2 w-0 h-[150vh] bg-[#F4F2EC] z-[47] pointer-events-none"></div>

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

