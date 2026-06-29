"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const clientTypes = [
  "Startups",
  "Entrepreneurs",
  "E-commerce",
  "Talents",
  "Specialists",
  "Personal Brand"
];

export default function WhoWeWorkWithSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bestStickerRef = useRef<HTMLDivElement>(null);
  const eyesStickerRef = useRef<HTMLDivElement>(null);
  
  const visualSectionRef = useRef<HTMLElement>(null);
  const visualImageRef = useRef<HTMLDivElement>(null);

  const personalBrandRef = useRef<HTMLSpanElement>(null);
  const lRef = useRef<HTMLSpanElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      // Helper to compute exact transform origin to center on the 'r' letter
      const getOrigin = (parent: HTMLElement | null, child: HTMLElement | null) => {
        if (!parent || !child) return "50% 50%";
        const pRect = parent.getBoundingClientRect();
        const cRect = child.getBoundingClientRect();
        const x = cRect.left - pRect.left + cRect.width / 2;
        const y = cRect.top - pRect.top + cRect.height / 2;
        return `${(x / pRect.width) * 100}% ${(y / pRect.height) * 100}%`;
      };

      // 1. Visual Image Fade-in & Scale-up (Scale 0.8 -> 1.0, Opacity 0 -> 1 by top 50%)
      const visualSection = visualSectionRef.current;
      const visualImage = visualImageRef.current;
      if (visualSection && visualImage) {
        gsap.fromTo(
          visualImage,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1.0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: visualSection,
              start: "top bottom",
              end: "top 50%",
              scrub: 1.0,
              invalidateOnRefresh: true,
            }
          }
        );
      }

      // 2. Pinned Text Carousel
      const section = sectionRef.current;
      const textContainer = textContainerRef.current;
      const logo = logoRef.current;
      const bestSticker = bestStickerRef.current;
      const eyesSticker = eyesStickerRef.current;
      if (!section || !textContainer || !logo) return;

      // 3. Logo text sticker timeline for smooth, continuous parallax scrolling (scrub: 1.8)
      const logoTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",  // Starts when top of section enters viewport bottom
          end: "top 5%",        // Completes 5vh BEFORE pinning at "top top" to avoid layout jump
          scrub: 1.8,            // Smoother weighted lag
          invalidateOnRefresh: true,
        }
      });

      // Scale up elements dynamically as they first enter the screen
      const entryElements = [logo, bestSticker, eyesSticker].filter(Boolean) as HTMLElement[];
      if (entryElements.length > 0) {
        logoTl.fromTo(
          entryElements,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
          0
        );
      }

      // Continuous float and rotation animation synced to scroll (parallax)
      if (logo) {
        logoTl.fromTo(
          logo,
          { y: 60, rotation: -6 },
          { y: -60, rotation: 6, ease: "none" },
          0
        );
      }

      if (bestSticker) {
        logoTl.fromTo(
          bestSticker,
          { y: 100, rotation: -12 },
          { y: -100, rotation: 8, ease: "none" },
          0
        );
      }

      if (eyesSticker) {
        logoTl.fromTo(
          eyesSticker,
          { y: 80, rotation: 15 },
          { y: -80, rotation: -15, ease: "none" },
          0
        );
      }

      const texts = textContainer.querySelectorAll(".client-text");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",       // Pin exactly when section hits the top of the viewport
          end: "+=500%", 
          pin: true, 
          pinSpacing: true,
          scrub: 0.3,             // Much smoother pinned slide transition weight (increased from 1)
          invalidateOnRefresh: true,
        }
      });

      texts.forEach((text, i) => {
        // For each text, animate it fading and sliding up into the center
        tl.fromTo(
          text,
          { opacity: 0, y: 100, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: "power2.out" }
        );
        
        // Then hold it for a moment, and animate it fading and sliding up out of view
        if (i !== texts.length - 1) {
          tl.to(
            text,
            { opacity: 0, y: -100, scale: 0.9, duration: 2.5, ease: "power2.in" },
            "+=1.0" // Larger delay to let the user read it
          );
        }
      });

      const wipeOffset = isMobile ? "<75%" : "<60%";

      // 1. Zoom in on the text centered on the letter "l"
      tl.to(
        personalBrandRef.current,
        {
          scale: 50,
          duration: 18.0, 
          ease: "power2.in",
          transformOrigin: () => {
            if (personalBrandRef.current && lRef.current) {
              return getOrigin(personalBrandRef.current, lRef.current);
            }
            return "50% 50%";
          }
        },
        32.5
      );

      // 2. Expand the burgundy wipe horizontally to 100% width
      tl.to(
        wipeRef.current,
        {
          width: "100%",
          duration: isMobile ? 3.5 : 5.0, // Scaled up proportionally
          ease: "none"
        },
        wipeOffset
      );

      // 3. Fade out the logo and stickers
      const fadeOutElements = [logo, bestSticker, eyesSticker].filter(Boolean);
      tl.to(
        fadeOutElements,
        {
          opacity: 0,
          scale: 0.9,
          duration: 6.0, // Increased to match the slower scale
          ease: "power2.out"
        },
        32.5
      );
    });
  }, { scope: containerRef, dependencies: [] });

  return (
    <div ref={containerRef} className="relative w-full bg-brand-cream">
      {/* Part 1: Who We Work With Visual Image Section */}
      <section 
        ref={visualSectionRef} 
        className="relative w-full flex justify-center bg-brand-cream overflow-hidden"
      >
        <div 
          ref={visualImageRef} 
          className="w-full h-auto max-w-[1600px] flex justify-center pt-8 origin-center opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src="/images/Second_Two_Girls_Img.png"
            alt="Who We Work With Visual"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Part 2: Pinned Animating Text Section */}
      <section ref={sectionRef} className="relative w-full h-screen flex flex-col items-center justify-start bg-brand-cream z-20 overflow-hidden">
        {/* Burgundy Wipe overlay */}
        <div 
          ref={wipeRef} 
          className="absolute left-1/2 -translate-x-1/2 w-0 h-[150vh] bg-[#83333E] z-0 pointer-events-none"
        />

        {/* Sticker Composition (Who We Work With) */}
        <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] shrink-0 select-none mt-[14vh] md:mt-[8vh] mb-[2vh] z-10">
          
          {/* Main WHOWEWORKWITH image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-70%] w-[190px] sm:w-[250px] md:w-[280px] z-10">
            <div
              ref={logoRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Whoweworkwith_Text_Img.png"
                  alt="Who We Work With"
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 1: Best (Bottom Left) */}
          <div className="absolute bottom-[30%] left-10 w-[55px] sm:w-[75px] md:w-[90px] z-20 -rotate-12">
            <div
              ref={bestStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Whoweworkwith_Best_Img.png"
                  alt="Best sticker"
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 2: Eyes (Top Right) */}
          <div className="absolute top-[17%] right-[20%] w-[55px] sm:w-[80px] md:w-[80px] z-0 rotate-15">
            <div
              ref={eyesStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Whoweworkwith_Eyes_Img.png"
                  alt="Eyes sticker"
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Animated Text Container */}
        <div ref={textContainerRef} className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120px] md:h-[180px] lg:h-[220px] flex items-center justify-center z-10">
          {clientTypes.map((text, index) => (
            <h2 
              key={index}
              className="client-text absolute w-full left-0 right-0 text-center text-[13vw] sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-recoleta-bold tracking-tight text-[#83333E] opacity-0"
            >
              {text === "E-commerce" ? (
                <>E<span className="font-sans">-</span>commerce</>
              ) : text === "Personal Brand" ? (
                <span ref={personalBrandRef} className="relative inline-block origin-center">
                  Persona<span ref={lRef} className="relative inline-block">l</span> Brand
                </span>
              ) : (
                text
              )}
            </h2>
          ))}
        </div>
      </section>

    </div>
  );
}
