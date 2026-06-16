"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textImageRef.current) return;

    // Sticker timeline for smooth, continuous parallax scrolling (scrub: 1.8)
    const stickerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when top of section enters viewport bottom
        end: "bottom top",   // Ends when bottom of section leaves viewport top
        scrub: 1.8,          // Weighted lag for a premium catch-up feel
      }
    });

    // Scale up element dynamically as it first enters the screen
    stickerTl.fromTo(
      textImageRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.3, ease: "back.out(1.5)" },
      0
    );
  }, { scope: sectionRef });

  return (
    <section id="cta-section" ref={sectionRef} className="relative w-full flex flex-col bg-[#F4F2EC] z-30">
      
      {/* Top Burgundy Section */}
      <div className="relative w-full bg-[#6a2634] pt-24 pb-28 md:pb-32 flex flex-col items-center justify-center z-10">
        <div ref={textImageRef} className="origin-center">
          <Image
            src="/images/getonmatchitttoday-text.png"
            alt="Get On Matchitt Today"
            width={345}
            height={179}
            className="w-[200px] sm:w-[280px] md:w-[345px] h-auto object-contain"
          />
        </div>
        
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 sm:mt-8 px-6 py-2 bg-[#A8D5E5] text-[#6a2634] font-serif text-xl font-bold tracking-wide hover:bg-[#8ec2d5] hover:scale-105 transition-all duration-300"
        >
          Book a Calendly Meeting
        </a>
      </div>

      {/* Layered Images Section */}
      <div className="relative w-full z-20">
        {/* Background Image (Blue Wavy Texture) - Absolute behind, shifted up further to show more */}
        <div className="absolute -top-[5%] sm:-top-[7%] md:-top-[10%] left-0 w-full -z-10">
          <Image
            src="/images/getonmatchitttoday-bg.png"
            alt="Decorative Background"
            width={1728}
            height={1049}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Foreground Image (Girls with Puzzle Pieces) - Normal flow dictates height */}
        <Image
          src="/images/getonmatchitttoday-image.png"
          alt="Matchitt Team"
          width={1728}
          height={1102}
          className="w-full h-auto object-cover relative z-10"
        />
      </div>

    </section>
  );
}
