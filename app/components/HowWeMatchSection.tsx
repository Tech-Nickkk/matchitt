"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeMatchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textImageAnimRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const mainStickerRef = useRef<HTMLDivElement>(null);
  const handStickerRef = useRef<HTMLDivElement>(null);
  const fireStickerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textImageAnimRef.current || !paraRef.current) return;

    const mainSticker = mainStickerRef.current;
    const handSticker = handStickerRef.current;
    const fireSticker = fireStickerRef.current;

    // Timeline for pin & text/para animations matching the 3D model scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.0,
        invalidateOnRefresh: true,
      }
    });

    // Disable ScrollTrigger initially so the entrance animation can run unimpeded
    tl.scrollTrigger?.disable();

    // Set initial state at scroll = 0 (fully visible, normal scale, correct rotations)
    tl.set(textImageAnimRef.current, { opacity: 1, y: 0 }, 0);
    tl.set(paraRef.current, { opacity: 1, scale: 1, rotation: 0, y: 0 }, 0);
    if (mainSticker) tl.set(mainSticker, { scale: 1, opacity: 1, y: 0, rotation: -6 }, 0);
    if (handSticker) tl.set(handSticker, { scale: 1, opacity: 1, y: 0, rotation: -10 }, 0);
    if (fireSticker) tl.set(fireSticker, { scale: 1, opacity: 1, y: 0, rotation: 15 }, 0);

    // Keep active/centered initially (0.0 to 0.12)
    tl.to(textImageAnimRef.current, { opacity: 1, duration: 0.12 }, 0);
    tl.to(paraRef.current, { opacity: 1, scale: 1, duration: 0.12 }, 0);

    // Scale out and rotate from 0.12 to 0.30 (before the 3D model pieces join)
    if (mainSticker) {
      tl.to(mainSticker, { scale: 0, rotation: -30, ease: "back.in(1.5)", duration: 0.18 }, 0.12);
    }
    if (handSticker) {
      tl.to(handSticker, { scale: 0, rotation: -50, ease: "back.in(1.5)", duration: 0.18 }, 0.12);
    }
    if (fireSticker) {
      tl.to(fireSticker, { scale: 0, rotation: 60, ease: "back.in(1.5)", duration: 0.18 }, 0.12);
    }
    tl.to(
      paraRef.current,
      { scale: 0, rotation: -8, ease: "back.in(1.5)", duration: 0.18 },
      0.12
    );

    // Fade out at the end of the scale out transition (0.20 to 0.30)
    tl.to(
      textImageAnimRef.current,
      { opacity: 0, ease: "power2.in", duration: 0.10 },
      0.20
    );
    tl.to(
      paraRef.current,
      { opacity: 0, ease: "power2.in", duration: 0.10 },
      0.20
    );

    // Anchor the timeline to exactly 1.00 to match the 3D model scroll timeline
    tl.to(
      {},
      { duration: 0.02 },
      0.98
    );

    // One-shot page-load entrance animation
    const entryTl = gsap.timeline({
      defaults: { ease: "back.out(1.7)", duration: 0.8 },
      onComplete: () => {
        // Enable ScrollTrigger and refresh to capture current scroll state
        tl.scrollTrigger?.enable();
        ScrollTrigger.refresh();
      }
    });

    if (mainSticker) {
      entryTl.fromTo(mainSticker,
        { scale: 0, opacity: 0, rotation: -6 },
        { scale: 1, opacity: 1, rotation: -6, delay: 0.2 }
      );
    }
    if (handSticker) {
      entryTl.fromTo(handSticker,
        { scale: 0, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: -10 },
        "-=0.6"
      );
    }
    if (fireSticker) {
      entryTl.fromTo(fireSticker,
        { scale: 0, opacity: 0, rotation: 15 },
        { scale: 1, opacity: 1, rotation: 15 },
        "-=0.6"
      );
    }
    entryTl.fromTo(paraRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, ease: "power3.out", duration: 0.6 },
      "-=0.4"
    );


  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id="how-we-match"
      className="relative w-full h-[335vh] pointer-events-auto z-30"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        
        {/* HOW WE MATCH Image & Para Wrapper */}
        <div className="flex flex-col items-center justify-center pointer-events-auto">
          {/* Text Sticker */}
          <div ref={textImageAnimRef} className="relative z-10 opacity-100">
            {/* Sticker composition wrapper container */}
            <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] shrink-0 select-none mb-4">
              
              {/* Main THE MATCHITT WAY image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] sm:w-[210px] md:w-[225px] z-10">
                <div ref={mainStickerRef} className="w-full h-full origin-center" style={{ willChange: "transform, opacity", transform: "scale(0) rotate(-6deg)", opacity: 0 }}>
                  <div className="w-full h-auto">
                    <Image
                      src="/images/Thematchittway_Text_Img.png"
                      alt="The Matchitt Way"
                      width={800}
                      height={800}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Sticker 1: Hand (Bottom Left) */}
              <div className="absolute bottom-[5%] left-[-10%] w-[55px] sm:w-[70px] md:w-[90px] z-20">
                <div ref={handStickerRef} className="w-full h-full origin-center" style={{ willChange: "transform, opacity", transform: "scale(0) rotate(-10deg)", opacity: 0 }}>
                  <div className="w-full h-auto">
                    <Image
                      src="/images/Thematchittway_Hand_Img.png"
                      alt="Hand sticker"
                      width={200}
                      height={200}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Sticker 2: Fire (Right / Middle Right) */}
              <div className="absolute top-[35%] right-[-10%] w-[50px] sm:w-[65px] md:w-[80px] z-20">
                <div ref={fireStickerRef} className="w-full h-full origin-center" style={{ willChange: "transform, opacity", transform: "scale(0) rotate(15deg)", opacity: 0 }}>
                  <div className="w-full h-auto">
                    <Image
                      src="/images/Thematchittway_Fire_Img.png"
                      alt="Fire sticker"
                      width={200}
                      height={200}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Paragraph below the text */}
          <p
            ref={paraRef}
            className="font-recoleta-light font-bold text-brand-burgundy text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] leading-relaxed text-center max-w-5xl px-6"
            style={{ opacity: 0, transform: "scale(0.9)" }}
          >
            Helping brands reach the people<br className="hidden sm:block" /> who matter the most
          </p>
        </div>

      </div>
    </section>
  );
}

