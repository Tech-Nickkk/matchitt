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
  const emailRef = useRef<HTMLAnchorElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  
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
      !emailRef.current ||
      !centerContentRef.current
    )
      return;

    // Center the absolute email button and initialize default opacity/position
    gsap.set(emailRef.current, { xPercent: -50, y: 15, opacity: 0 });
    const visualTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",      // Pin exactly when footer hits the top of the viewport
        end: "+=130%",         // Extended pin duration for two-stage storytelling scroll
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Trigger smooth, time-based, non-scrubbed fade-in/out of the email button
          // self.progress runs 0.0 to 1.0. Images fade out at timeline duration 0.9 / 1.3 = 0.69 progress.
          if (self.progress >= 0.69) {
            gsap.to(emailRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(emailRef.current, {
              opacity: 0,
              y: 15,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        }
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
        { y: -20, rotation: 4, ease: "none", duration: 1.3 },
        0.0
      );
    }
    if (cupSticker) {
      visualTl.fromTo(
        cupSticker,
        { y: 35, rotation: -12 },
        { y: -35, rotation: 10, ease: "none", duration: 1.3 },
        0.0
      );
    }
    if (flowerSticker) {
      visualTl.fromTo(
        flowerSticker,
        { y: 25, rotation: 15 },
        { y: -25, rotation: -10, ease: "none", duration: 1.3 },
        0.0
      );
    }
    if (starSticker) {
      visualTl.fromTo(
        starSticker,
        { y: 30, rotation: -8 },
        { y: -30, rotation: 12, ease: "none", duration: 1.3 },
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

    // 4. Scroll further -> Desk & Girls fade out, and center content shifts up slightly
    visualTl.to(
      [deskRef.current, girl1Ref.current, girl2Ref.current],
      {
        opacity: 0,
        y: 80,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0.9
    );

    visualTl.to(
      centerContentRef.current,
      {
        y: -30,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0.9
    );

  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#83333E] -mt-px flex flex-col items-center justify-center z-30 overflow-hidden"
    >
      {/* Visual Composition Container - Centered and Grouped */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[62%] sm:h-[60%] md:h-[65%] lg:h-[70%] pointer-events-none select-none overflow-visible z-10">
        {/* Left Girl */}
        <div 
          ref={girl1Ref} 
          className="absolute bottom-[8%] sm:bottom-[18%] left-[0%] sm:left-[-12%] w-[50%] sm:w-full h-[75%] sm:h-[120%] opacity-0 z-10"
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
          className="absolute bottom-[8%] sm:bottom-[18%] right-[0%] sm:right-[-15%] w-[53%] sm:w-full h-[75%] sm:h-[120%] opacity-0 z-10"
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
          className="absolute bottom-[3%] sm:-bottom-1/5 left-[0%] sm:left-[-26%] w-full sm:w-[155%] h-[55%] sm:h-full opacity-0 z-20"
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
          className="mt-8 px-8 py-3.5 bg-[#BBD7EC] text-[#83333E] font-recoleta-bold text-lg sm:text-xl font-bold tracking-wide -rotate-1 shadow-sm hover:scale-105 hover:bg-[#a5cce8] transition-all duration-300 select-none opacity-0 rounded-[20px_60px_30px_80px_/_70px_30px_80px_40px]"
        >
          Book a Calendly Meeting
        </a>

        {/* Email Address Link (Positioned absolutely so it doesn't push layout content) */}
        <a
          ref={emailRef}
          href="mailto:admin@matchitt.com"
          className="absolute top-[calc(100%+24px)] left-1/2 whitespace-nowrap bg-[#BBD7EC] text-[#83333E] font-recoleta-bold text-base sm:text-lg tracking-wide px-8 py-3.5 shadow-sm hover:scale-105 hover:bg-[#a5cce8] transition-all duration-300 select-none opacity-0 rotate-1 rounded-[60px_20px_80px_30px_/_30px_70px_40px_80px]"
        >
          admin<span className="font-sans">@</span>matchitt.com
        </a>
      </div>
    </section>
  );
}
