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
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textContainerRef.current || !logoRef.current) return;

    const texts = textContainerRef.current.querySelectorAll(".client-text");

    // Initialize the first text to be completely visible
    gsap.set(texts[0], { opacity: 1, y: 0, scale: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // Pin exactly when the animating section hits the top of the viewport
        end: "+=300%", 
        pin: true, 
        scrub: 1, 
      }
    });

    texts.forEach((text, i) => {
      if (i === 0) {
        // First title is already there, just hold for a moment and animate out
        tl.to(
          text,
          { opacity: 0, y: -100, scale: 0.9, duration: 1, ease: "power2.in" },
          "+=0.5" // Initial delay before it starts changing
        );
      } else {
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
      }
    });

  }, { scope: sectionRef });

  return (
    <>
      {/* Part 1: Who We Work With Visual Image Section */}
      <section className="relative w-full flex justify-center bg-[#F4F2EC]">
        <div className="w-full h-auto max-w-[1600px] flex justify-center pt-8">
          <Image
            src="/images/WhoWeWorkWith-Img.png"
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
        <div ref={logoRef} className="relative w-[180px] sm:w-[240px] md:w-[320px] mt-[5vh] md:mt-[7vh] z-10">
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
    </>
  );
}
