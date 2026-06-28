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
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  
  const girl1Ref = useRef<HTMLDivElement>(null);
  const girl2Ref = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);

  const mainStickerRef = useRef<HTMLDivElement>(null);
  const cupStickerRef = useRef<HTMLDivElement>(null);
  const flowerStickerRef = useRef<HTMLDivElement>(null);
  const starStickerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !sectionRef.current ||
      !textImageRef.current ||
      !buttonRef.current ||
      !centerContentRef.current ||
      !socialsRef.current
    )
      return;

    // Pinned scroll-scrubbed timeline for the footer
    const visualTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",      // Pin exactly when footer hits the top of the viewport
        end: "+=200%",         // Scroll spacing duration (increased to accommodate the dwell time)
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    const mainSticker = mainStickerRef.current;
    const cupSticker = cupStickerRef.current;
    const flowerSticker = flowerStickerRef.current;
    const starSticker = starStickerRef.current;

    // Fade in parent wrapper container
    visualTl.to(textImageRef.current, { opacity: 1, duration: 0.1 }, 0.0);

    // Scale and fade up elements dynamically
    const elements = [mainSticker, cupSticker, flowerSticker, starSticker].filter(Boolean) as HTMLElement[];
    if (elements.length > 0) {
      visualTl.fromTo(
        elements,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
        0.0
      );
    }

    // Continuous float and rotation animations synced to scroll
    if (mainSticker) {
      visualTl.fromTo(
        mainSticker,
        { y: 20, rotation: -4 },
        { y: -20, rotation: 4, ease: "none", duration: 0.9 },
        0.0
      );
    }
    if (cupSticker) {
      visualTl.fromTo(
        cupSticker,
        { y: 35, rotation: -12 },
        { y: -35, rotation: 10, ease: "none", duration: 0.9 },
        0.0
      );
    }
    if (flowerSticker) {
      visualTl.fromTo(
        flowerSticker,
        { y: 25, rotation: 15 },
        { y: -25, rotation: -10, ease: "none", duration: 0.9 },
        0.0
      );
    }
    if (starSticker) {
      visualTl.fromTo(
        starSticker,
        { y: 30, rotation: -8 },
        { y: -30, rotation: 12, ease: "none", duration: 0.9 },
        0.0
      );
    }

    // 2. Scale and fade in the button with overlap
    visualTl.fromTo(
      buttonRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" },
      0.1
    );

    // 3. Slide-up and fade-in of visual elements (Desk first, then girls staggered)
    visualTl.fromTo(
      deskRef.current,
      {
        opacity: 0,
        y: 200,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0.3
    );

    visualTl.fromTo(
      [girl1Ref.current, girl2Ref.current],
      {
        opacity: 0,
        y: 200,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0.45
    );

    // 4. Hold/dwell state between 0.7 and 0.9 (no animations here)

    // 5. Exit: Animate out visual elements (girls and desk) - Delayed to hold for a while
    visualTl.to(
      [girl1Ref.current, girl2Ref.current, deskRef.current],
      {
        opacity: 0,
        y: 200,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.in",
      },
      1.8 // Delayed significantly from 0.75
    );

    // 6. Shift center text wrapper up (runs simultaneously with the social links fade-in)
    visualTl.to(
      centerContentRef.current,
      {
        y: -90,
        duration: 0.4,
        ease: "power2.inOut",
      },
      2.4 // Shifted accordingly
    );

    // 7. Slide up and fade in social links (starts after girls and desk are fully animated out)
    visualTl.fromTo(
      socialsRef.current,
      { opacity: 0, y: 80, pointerEvents: "none" },
      {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
      },
      2.4 // Shifted accordingly
    );
  }, { scope: sectionRef });

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#83333E] -mt-px flex flex-col items-center justify-center z-30 overflow-hidden"
    >
      {/* Visual Composition Container - Centered and Grouped */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[52%] sm:h-[60%] md:h-[65%] lg:h-[70%] pointer-events-none select-none overflow-visible z-10">
        {/* Left Girl */}
        <div 
          ref={girl1Ref} 
          className="absolute bottom-0 sm:bottom-[18%] left-[-5%] sm:left-[-12%] w-[55%] sm:w-full h-[80%] sm:h-[120%] opacity-0 z-10"
        >
          <Image
            src="/images/girl-1.png"
            alt="Left Girl"
            fill
            className="object-contain object-bottom-left"
            sizes="(max-width: 768px) 42vw, 420px"
          />
        </div>

        {/* Right Girl */}
        <div 
          ref={girl2Ref} 
          className="absolute bottom-0 sm:bottom-[18%] right-[-8%] sm:right-[-15%] w-[58%] sm:w-full h-[80%] sm:h-[120%] opacity-0 z-10"
        >
          <Image
            src="/images/girl-2.png"
            alt="Right Girl"
            fill
            className="object-contain object-bottom-right"
            sizes="(max-width: 768px) 45vw, 450px"
          />
        </div>

        {/* Desk */}
        <div 
          ref={deskRef} 
          className="absolute bottom-[-5%] sm:-bottom-1/5 left-[-5%] sm:left-[-26%] w-[110%] sm:w-[155%] h-[55%] sm:h-full opacity-0 z-20"
        >
          <Image
            src="/images/desk.png"
            alt="Desk Workspace"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 80vw, 800px"
          />
        </div>
      </div>

      {/* Centered Sticker Content & Button Wrapper */}
      <div 
        ref={centerContentRef} 
        className="origin-center flex flex-col items-center justify-center z-30 relative"
      >
        {/* Centered Sticker Content */}
        <div 
          ref={textImageRef} 
          className="relative w-[280px] h-[160px] sm:w-[350px] sm:h-[200px] md:w-[420px] md:h-[240px] shrink-0 select-none mb-6 opacity-0"
        >
          {/* Main GET IN TOUCH Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[220px] md:w-[270px] z-10">
            <div
              ref={mainStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Getintouch_Text_Img.png"
                  alt="Get In Touch"
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 1: Coffee Cup (Left) */}
          <div className="absolute bottom-[20%] left-[-5%] w-[45px] sm:w-[55px] md:w-[65px] z-20 rotate-[-10deg]">
            <div
              ref={cupStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Getintouch_Cup_Img.png"
                  alt="Cup sticker"
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 2: Flower (Top Right of Text) */}
          <div className="absolute top-[20%] right-[10%] w-[35px] sm:w-[45px] md:w-[55px] z-20 rotate-12">
            <div
              ref={flowerStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Getintouch_Flower_Img.png"
                  alt="Flower sticker"
                  width={150}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Sticker 3: Double Star (Far Right) */}
          <div className="absolute top-[15%] right-[-5%] w-[45px] sm:w-[55px] md:w-[65px] z-0 rotate-[-8deg]">
            <div
              ref={starStickerRef}
              className="w-full h-full origin-center opacity-0 scale-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-full h-auto">
                <Image
                  src="/images/Getintouch_Star_Img.png"
                  alt="Star sticker"
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>
        
        {/* Calendly button link */}
        <a
          ref={buttonRef}
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-8 py-3 bg-[#BBD7EC] text-[#83333E] font-recoleta-bold text-lg sm:text-xl font-bold tracking-wide -rotate-2 shadow-sm hover:scale-105 hover:bg-[#a5cce8] transition-all duration-300 select-none opacity-0"
        >
          Book a Calendly Meeting
        </a>
      </div>

      {/* Social Links at the bottom (absolutely positioned, hidden initially) */}
      <div 
        ref={socialsRef} 
        className="absolute bottom-[8%] sm:bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-xl flex flex-col items-center gap-2 z-30 opacity-0 pointer-events-none"
      >
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4">
          <a 
            href="mailto:Hala@matchitt.com" 
            className="relative w-[140px] sm:w-[180px] md:w-[220px] transition-all duration-300 hover:scale-105 pointer-events-auto"
          >
            <Image
              src="/images/Hala_Footer_Img.png"
              alt="Email Hala"
              width={300}
              height={100}
              className="w-full h-auto object-contain"
            />
          </a>
          <a 
            href="mailto:Lynn@matchitt.com" 
            className="relative w-[140px] sm:w-[180px] md:w-[220px] transition-all duration-300 hover:scale-105 pointer-events-auto"
          >
            <Image
              src="/images/Lynn_Footer_Img.png"
              alt="Email Lynn"
              width={300}
              height={100}
              className="w-full h-auto object-contain"
            />
          </a>
        </div>
        
        <a 
          href="https://instagram.com/matchittcom" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative w-[140px] sm:w-[180px] md:w-[220px] transition-all duration-300 hover:scale-105 pointer-events-auto mt-2"
        >
          <Image
            src="/images/Matchitt_Footer_Img.png"
            alt="Matchitt Instagram"
            width={400}
            height={100}
            className="w-full h-auto object-contain"
          />
        </a>
      </div>
    </section>
  );
}
