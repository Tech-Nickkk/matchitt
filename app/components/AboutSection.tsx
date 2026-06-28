"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const aboutTextImageAnimRef = useRef<HTMLDivElement>(null);
  const starStickerRef = useRef<HTMLDivElement>(null);
  const lightningStickerRef = useRef<HTMLDivElement>(null);
  const arrowStickerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textContainerRef.current) return;

    const paragraphs = textContainerRef.current.querySelectorAll("p");

    // 1. Text paragraphs fade-in and slide-up synced to scroll
    gsap.fromTo(
      paragraphs,
      { opacity: 0, y: 40 },
      {
        opacity: 0.95,
        y: 0,
        stagger: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 90%",
          end: "top 40%",
          scrub: 1.8,
          invalidateOnRefresh: true,
        }
      }
    );

    // 2. Sticker timeline for smooth, continuous parallax scrolling (scrub: 1.8)
    const stickerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when top of section enters viewport bottom
        end: "bottom top",   // Ends when bottom of section leaves viewport top
        scrub: 1.8,          // Weighted lag for a premium catch-up feel
        invalidateOnRefresh: true,
      }
    });

    // Scale up elements dynamically as they first enter the screen
    const elements = [
      aboutTextImageAnimRef.current,
      starStickerRef.current,
      lightningStickerRef.current,
      arrowStickerRef.current
    ].filter(Boolean) as HTMLElement[];

    if (elements.length > 0) {
      stickerTl.fromTo(
        elements,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
        0
      );
    }

    // Continuous float and rotation animations synced to scroll
    if (aboutTextImageAnimRef.current) {
      stickerTl.fromTo(
        aboutTextImageAnimRef.current,
        { y: 100, rotation: -8 },
        { y: -100, rotation: 8, ease: "none" },
        0
      );
    }

    if (starStickerRef.current) {
      stickerTl.fromTo(
        starStickerRef.current,
        { y: 140, rotation: 12 },
        { y: -140, rotation: -12, ease: "none" },
        0
      );
    }

    if (lightningStickerRef.current) {
      stickerTl.fromTo(
        lightningStickerRef.current,
        { y: 60, rotation: -15 },
        { y: -120, rotation: 15, ease: "none" },
        0
      );
    }

    if (arrowStickerRef.current) {
      stickerTl.fromTo(
        arrowStickerRef.current,
        { y: 120, rotation: -8 },
        { y: -60, rotation: 12, ease: "none" },
        0
      );
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-brand-burgundy py-20 overflow-hidden pointer-events-auto z-30"
    >
      <div className="max-w-5xl w-full mx-auto px-6 flex flex-col items-center justify-center">
        
        {/* Sticker Composition (Centered) */}
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] shrink-0 select-none mb-8 sm:mb-12">
          
          {/* Stars Sticker */}
          <div className="absolute top-0 right-[-5%] w-[55px] sm:w-[75px] md:w-[90px] z-0">
            <div
              ref={starStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Aboutus_Star_Img.png"
                  alt="Stars Sticker"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* About Us Sticker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] sm:w-[170px] md:w-[190px] z-10">
            <div
              ref={aboutTextImageAnimRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Aboutus_Text_Img.png"
                  alt="About Us Sticker"
                  width={600}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Lightning Bolt Sticker */}
          <div className="absolute bottom-3 left-5 w-[40px] sm:w-[55px] md:w-[75px] z-20 rotate-15">
            <div
              ref={lightningStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Aboutus_Thunder_Img.png"
                  alt="Lightning Bolt Sticker"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Cursor Arrow Sticker */}
          <div className="absolute bottom-[20%] right-6 w-[55px] sm:w-[70px] md:w-[75px] z-20 rotate-[-8deg]">
            <div
              ref={arrowStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Aboutus_Arrow_Img.png"
                  alt="Cursor Arrow Sticker"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Centered Copywriting content */}
        <div ref={textContainerRef} className="max-w-5xl w-full text-center space-y-4 px-4">
          <p className="font-recoleta-light font-bold text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed text-brand-burgundy opacity-0">
            We started Matchitt after seeing the same thing happen over and over: great brands creating endless content that barely reached the right people.
          </p>
          <p className="font-recoleta-light font-bold text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed text-brand-burgundy opacity-0">
            Everyone was chasing the next trend, posting more, spending more, and somehow connecting less.
          </p>
          <p className="font-recoleta-light font-bold text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed text-brand-burgundy opacity-0">
            We believe growth isn&apos;t about being everywhere. It&apos;s about being in the right place, with the right message, in front of the right audience.
          </p>
          <p className="font-recoleta-light font-bold text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed text-brand-burgundy opacity-0">
            That&apos;s what we do. We match strategy with creativity, content with purpose, and brands with the people who will actually care.
          </p>
        </div>

      </div>
    </section>
  );
}
