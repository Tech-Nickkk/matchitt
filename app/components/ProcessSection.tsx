"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    textSrc: "/images/Understand_Text_Img.png",
    alt: "Understand",
    rotation: "-rotate-[0deg]",
    alignment: "-translate-x-2 sm:-translate-x-4 md:-translate-x-6",
  },
  {
    textSrc: "/images/Strategize_Text_Img.png",
    alt: "Strategize",
    rotation: "rotate-[0deg]",
    alignment: "translate-x-2 sm:translate-x-4 md:translate-x-10",
    extraClass: "scale-[0.9]",
  },
  {
    textSrc: "/images/Create&Build_Text_Img.png",
    alt: "Create & Build",
    rotation: "rotate-[0deg]",
    alignment: "-translate-x-1 sm:-translate-x-2 md:-translate-x-10",
    extraClass: "scale-[0.9]",
  },
  {
    textSrc: "/images/Launch&Match_Text_Img.png",
    alt: "Launch & Match",
    rotation: "rotate-[0deg]",
    alignment: "translate-x-2 sm:translate-x-4 md:translate-x-10",
    extraClass: "scale-[1.1]",
  },
  {
    textSrc: "/images/Optimize&Grow_Text_Img.png",
    alt: "Optimize & Grow",
    rotation: "rotate-[0deg]",
    alignment: "-translate-x-2 sm:-translate-x-3 md:-translate-x-10",
    extraClass: "scale-[1.05]",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Create a pinned timeline for the entire section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Pin for 200% of viewport height to give enough scroll time
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
      }
    });

    // Stagger each item: first one animates independently before pinning, the rest during pinning
    stepsRef.current.forEach((triggerEl, index) => {
      if (!triggerEl) return;

      const innerCard = triggerEl.querySelector(".process-inner-card");

      if (innerCard) {
        if (index === 0) {
          // Animate the very first item as the section scrolls into view (before pinning)
          gsap.fromTo(
            innerCard,
            { opacity: 0, scale: 0.9, y: 100 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", // Start animating when the top of the container reaches 80% down the screen
                end: "top 20%",   // Finish before it pins at 'top top'
                scrub: 1.0,
                invalidateOnRefresh: true, // Recalculates on resize to prevent glitching
              }
            }
          );
        } else {
          // Animate the rest inside the pinned timeline
          tl.fromTo(
            innerCard,
            { opacity: 0, scale: 0.9, y: 100 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "power2.out",
              duration: 1
            },
            (index - 1) * 0.6 // Stagger starts from 0 for the second item
          );
        }
      }
    });
  }, { scope: containerRef, dependencies: [] });

  return (
    <section
      id="process-section"
      ref={containerRef}
      className="relative w-full min-h-screen bg-brand-cream flex flex-col items-center justify-center pointer-events-auto z-30 overflow-hidden pb-8"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-md sm:max-w-xl md:max-w-2xl px-6 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={el => { stepsRef.current[index] = el; }}
            className={`relative flex items-center justify-center transition-all duration-500 ease-out hover:scale-[1.03] ${step.alignment} ${step.rotation} ${
              index !== 0 ? "-mt-2 sm:-mt-3 md:-mt-4 lg:-mt-3" : ""
            }`}
            style={{ transformOrigin: "center center", zIndex: index }}
          >
            {/* Label Container - scaled down to fit on one screen page */}
            <div
              className="process-inner-card relative w-[140px] h-[52px] sm:w-[200px] sm:h-[75px] md:w-[250px] md:h-[94px] lg:w-[300px] lg:h-[112px] flex items-center justify-center"
              style={{ willChange: "transform, opacity", opacity: 0 }}
            >
              
              {/* Unified Text, Tape, and Sticker Image */}
              <div className={`relative w-full h-full z-10 ${step.extraClass || ""}`}>
                <Image
                  src={step.textSrc}
                  alt={step.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
