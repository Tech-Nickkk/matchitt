"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Unified Hero & About Section with scroll-pinned storytelling transition */
export default function HeroContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!envelopeRef.current || !textContainerRef.current || !sectionRef.current || !stickerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      // Pin this section and run sequential frame transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isDesktop ? "+=250%" : "+=180%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Envelope slides up from bottom to absolute center and rotates slightly
      tl.fromTo(
        envelopeRef.current,
        { opacity: 0, y: "25vh", scale: 0.95, rotate: -6 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 2,
          ease: "power2.out",
          duration: 0.4,
        },
        0
      );

      // Sticker Step 1: Start with opacity 0 and moved down, then slide up with a slight stagger and tilt
      tl.fromTo(
        stickerRef.current,
        { opacity: 0, y: 50, rotate: 0 },
        { opacity: 1, y: 0, rotate: 8, ease: "power2.out", duration: 0.4 },
        0.1
      );

      // Step 2: Envelope moves to left (desktop) or stays in place (mobile/tablet)
      if (!isDesktop) {
        tl.to(
          envelopeRef.current,
          {
            x: 0,
            y: 0,
            scale: 0.75,
            rotate: -3,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0.5
        );
      } else {
        tl.to(
          envelopeRef.current,
          {
            x: "-22vw",
            y: 0,
            scale: 0.9,
            rotate: -4,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0.5
        );
      }

      // Sticker Step 2: Tilt back and keep it centered as the image moves
      tl.to(
        stickerRef.current,
        { x: 0, rotate: -8, ease: "power2.inOut", duration: 0.6 },
        0.6
      );

      // Step 3: Text slides up on the right (desktop) or bottom (mobile) - plays faster
      tl.fromTo(
        textContainerRef.current,
        { opacity: 0, y: isDesktop ? "40vh" : "15vh" },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        },
        0.8
      );
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative w-full min-h-screen flex items-center justify-center z-30 pointer-events-auto overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-y-4 lg:gap-y-0 min-h-screen pt-8 pb-24 lg:py-16">
        
        {/* Left Column Spacer (Desktop only) */}
        <div className="w-full lg:w-1/2 pointer-events-none hidden lg:block" />
        
        {/* Cutout Image of the Sisters (Starts centered, shifts to the left column) */}
        <div 
          ref={envelopeRef} 
          className="relative lg:absolute left-0 lg:left-1/2 top-0 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-30 opacity-0 mb-0 lg:mb-0 flex justify-center w-full lg:w-auto"
        >
          <div className="relative">
            <Image
              src="/images/Two_Girls_Hero_Img.png"
              alt="Two Sisters Matchitt"
              width={800}
              height={600}
              className="w-[200px] sm:w-[260px] md:w-[310px] lg:w-[390px] xl:w-[430px] object-contain select-none pointer-events-none drop-shadow-2xl"
              priority
            />
            
            {/* Matchitt Sticker Overlay */}
            <div 
              ref={stickerRef} 
              className="absolute bottom-0 left-0 right-0 mx-auto h-fit z-40 w-[100px] sm:w-[130px] md:w-[200px] lg:w-[240px] xl:w-[270px] transform origin-center drop-shadow-lg"
            >
              <Image
                src="/images/Matchitt_Text_Img.png"
                alt="Matchitt Sticker"
                width={400}
                height={150}
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Copywriting Text Column (Fades & slides up on the right column) */}
        <div 
          ref={textContainerRef} 
          className="w-full lg:w-1/2 opacity-0 flex flex-col justify-center text-left px-4 md:px-8 lg:px-0 z-20"
        >
          <div className="space-y-4 text-brand-burgundy font-recoleta-light font-semibold text-[17px] sm:text-[19px] md:text-[23px] leading-relaxed text-left">
            <p>
              Two sisters who<span className="font-serif">&rsquo;</span>ve been working in digital long enough to know: you don<span className="font-serif">&rsquo;</span>t need to dance to be seen, you just need the right people that actually get you.
            </p>
            <p>
              That<span className="font-serif">&rsquo;</span>s what we do: we match brands with the audience that actually gets them, through social strategy, content, and everything that makes it land.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
