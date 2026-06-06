"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    puzzleSrc: "/images/blue-puzzle-1.png",
    textSrc: "/images/understand-text.png",
    tapeSrc: "/images/red-tap.png",
    alt: "Understand",
  },
  {
    puzzleSrc: "/images/red-puzzle-1.png",
    textSrc: "/images/strategize-text.png",
    tapeSrc: "/images/blue-tap.png",
    alt: "Strategize",
  },
  {
    puzzleSrc: "/images/blue-puzzle-2.png",
    textSrc: "/images/create-build-text.png",
    tapeSrc: "/images/red-tap.png",
    alt: "Create & Build",
  },
  {
    puzzleSrc: "/images/red-puzzle-2.png",
    textSrc: "/images/launch-match-text.png",
    tapeSrc: "/images/blue-tap.png",
    alt: "Launch & Match",
  },
  {
    puzzleSrc: "/images/blue-puzzle-3.png",
    textSrc: "/images/optimize-grow-text.png",
    tapeSrc: "/images/red-tap.png",
    alt: "Optimize & Grow",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const totalScrollWidth = containerRef.current.scrollWidth - window.innerWidth;
    
    gsap.to(containerRef.current, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScrollWidth}`, // Scroll amount equals the horizontal distance to translate
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      id="process-section"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F4F2EC] z-0"
    >
      <div 
        ref={containerRef} 
        className="flex h-full w-[max-content] items-center px-[10vw]"
      >
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="relative flex flex-col items-center justify-center w-[80vw] sm:w-[60vw] md:w-[40vw] flex-shrink-0"
          >
            {/* The layered puzzle graphic */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex flex-col items-center">
              {/* Puzzle Piece */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 z-10">
                <Image
                  src={step.puzzleSrc}
                  alt={`${step.alt} Puzzle`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text and Tape Overlay */}
              <div className="relative w-64 h-24 md:w-80 md:h-32 -mt-8 md:-mt-12 z-20 flex items-center justify-center">
                {/* Tape Background (made significantly larger for red tape only) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                  step.tapeSrc.includes('red-tap.png') 
                    ? 'w-[160%] h-[160%] md:w-[180%] md:h-[180%]' 
                    : 'w-[125%] h-[125%] md:w-[130%] md:h-[130%]'
                }`}>
                  <Image
                    src={step.tapeSrc}
                    alt={`${step.alt} Tape`}
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Text Overlay */}
                <Image
                  src={step.textSrc}
                  alt={step.alt}
                  fill
                  className="object-contain z-10"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
