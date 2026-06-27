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
    rotation: "-rotate-[2.5deg]",
    alignment: "-translate-x-2 sm:-translate-x-6 md:-translate-x-10",
  },
  {
    textSrc: "/images/Strategize_Text_Img.png",
    alt: "Strategize",
    rotation: "rotate-[3deg]",
    alignment: "translate-x-2 sm:translate-x-6 md:translate-x-10",
  },
  {
    textSrc: "/images/Create&Build_Text_Img.png",
    alt: "Create & Build",
    rotation: "-rotate-[1.5deg]",
    alignment: "-translate-x-1 sm:-translate-x-4 md:-translate-x-6",
  },
  {
    textSrc: "/images/Launch&Match_Text_Img.png",
    alt: "Launch & Match",
    rotation: "rotate-[2deg]",
    alignment: "translate-x-3 sm:translate-x-8 md:translate-x-14",
  },
  {
    textSrc: "/images/Optimize&Grow_Text_Img.png",
    alt: "Optimize & Grow",
    rotation: "-rotate-[3deg]",
    alignment: "-translate-x-3 sm:-translate-x-8 md:-translate-x-14",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    stepsRef.current.forEach((triggerEl) => {
      if (!triggerEl) return;

      const innerCard = triggerEl.querySelector(".process-inner-card");

      if (innerCard) {
        gsap.fromTo(
          innerCard,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 95%",
              end: "top 55%",
              scrub: 1.0,
              invalidateOnRefresh: true,
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="process-section"
      ref={containerRef}
      className="relative w-full min-h-screen bg-brand-cream flex flex-col items-center justify-center pointer-events-auto z-30 overflow-hidden py-12"
    >
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full max-w-md sm:max-w-xl md:max-w-2xl px-6 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={el => { stepsRef.current[index] = el; }}
            className={`relative flex items-center justify-center transition-all duration-500 ease-out hover:scale-[1.03] ${step.alignment} ${step.rotation}`}
            style={{ transformOrigin: "center center" }}
          >
            {/* Label Container - scaled down to fit on one screen page */}
            <div
              className="process-inner-card relative w-[170px] h-[64px] sm:w-[240px] sm:h-[90px] md:w-[300px] md:h-[112px] lg:w-[350px] lg:h-[131px] flex items-center justify-center"
              style={{ willChange: "transform, opacity", opacity: 0 }}
            >
              
              {/* Unified Text, Tape, and Sticker Image */}
              <div className="relative w-full h-full z-10">
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
