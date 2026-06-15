"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const clientTypes = [
  "Startups",
  "Personal Brands",
  "E-commerce",
  "Talents",
  "Specialists",
  "Entrepreneurs"
];

export default function WhoWeWorkWithSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  const visualSectionRef = useRef<HTMLElement>(null);
  const visualImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Visual Image animate-in (Scale 0.7 -> 1, Slide up from y: 150 -> 0)
    const visualSection = visualSectionRef.current;
    const visualImage = visualImageRef.current;
    if (visualSection && visualImage) {
      gsap.fromTo(
        visualImage,
        { scale: 0.7, y: 150 },
        {
          scale: 1,
          y: 0,
          scrollTrigger: {
            trigger: visualSection,
            start: "top bottom",  // Animates as soon as top of section enters viewport bottom
            end: "bottom bottom",   // Completes exactly when the entire image is fully on the screen
            scrub: 1,              // Smooth scrubbing with a 1s delay for cushioned parallax
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // 2. Pinned Text Carousel
    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    const logo = logoRef.current;
    if (!section || !textContainer || !logo) return;

    // 3. Logo text sticker entry (Slide up with rotation) — must complete BEFORE pinning engages
    gsap.fromTo(
      logo,
      { y: 100, rotation: -10 },
      {
        y: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",  // Starts when top of section enters viewport bottom
          end: "top 5%",        // Completes 5vh BEFORE pinning at "top top" to avoid layout jump
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      }
    );

    const texts = textContainer.querySelectorAll(".client-text");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",       // Pin exactly when section hits the top of the viewport
        end: "+=500%", 
        pin: true, 
        pinSpacing: false,
        scrub: 1, 
        invalidateOnRefresh: true,
      }
    });

    texts.forEach((text, i) => {
      // For each text, animate it fading and sliding up into the center
      tl.fromTo(
        text,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
      );
      
      // Then hold it for a moment, and animate it fading and sliding up out of view
      if (i !== texts.length - 1) {
        tl.to(
          text,
          { opacity: 0, y: -100, scale: 0.9, duration: 1, ease: "power2.in" },
          "+=0.3" // Small delay to let the user read it
        );
      }
    });

    // Parallax overlap phase (starts immediately after text animations complete)
    // Logo and text container slowly slide up as CtaSection overlaps
    tl.to(
      [logo, textContainer],
      {
        y: "-=250",
        ease: "power1.inOut",
        duration: 8.33, // Mathematically fits the 40% scroll window (12.5s / 0.6 - 12.5 = 8.33)
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-[#F4F2EC]">
      {/* Part 1: Who We Work With Visual Image Section */}
      <section 
        ref={visualSectionRef} 
        className="relative w-full flex justify-center bg-[#F4F2EC] overflow-hidden"
      >
        <div 
          ref={visualImageRef} 
          className="w-full h-auto max-w-[1600px] flex justify-center pt-8 origin-center"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/Image-02.png"
            alt="Who We Work With Visual"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Part 2: Pinned Animating Text Section */}
      <section ref={sectionRef} className="relative w-full h-screen flex flex-col items-center justify-start bg-[#F4F2EC] z-20 overflow-hidden">
        {/* Logo Text Sticker */}
        <div 
          ref={logoRef} 
          className="relative w-[180px] sm:w-[240px] md:w-[320px] mt-[5vh] md:mt-[7vh] z-10"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/WhoWeWorkWith-Text.svg"
            alt="Who We Work With Text"
            width={600}
            height={300}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Animated Text Container */}
        <div ref={textContainerRef} className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120px] md:h-[180px] lg:h-[220px] flex items-center justify-center z-10">
          {clientTypes.map((text, index) => (
            <h2 
              key={index}
              className="client-text absolute w-full left-0 right-0 text-center text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-recoleta-bold tracking-tight text-[#83333E] opacity-0"
              style={{ willChange: "transform, opacity" }}
            >
              {text === "E-commerce" ? (
                <>E<span className="font-sans">-</span>commerce</>
              ) : (
                text
              )}
            </h2>
          ))}
        </div>
      </section>

      {/* Overlap spacer: this creates the scrollable distance for the overlap to happen */}
      <div className="w-full h-[300vh] pointer-events-none" />
    </div>
  );
}
