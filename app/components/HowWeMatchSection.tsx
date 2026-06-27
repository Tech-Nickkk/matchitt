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
        start: "top bottom",
        end: "bottom+=50% top",
        scrub: 1.0,
        invalidateOnRefresh: true,
      }
    });

    const textTargetY = 0;
    const paraTargetY = 0;

    // Step 1: Text and para start invisible
    tl.set(textImageAnimRef.current, { opacity: 0, y: 50 }, 0);
    tl.set(paraRef.current, { opacity: 0, y: 50 }, 0);
    if (mainSticker) tl.set(mainSticker, { scale: 0, rotation: -6 }, 0);
    if (handSticker) tl.set(handSticker, { scale: 0, rotation: -10 }, 0);
    if (fireSticker) tl.set(fireSticker, { scale: 0, rotation: 15 }, 0);

    // Step 3 (0.20 to 0.30): Text sticker container slides up from center to top of screen and fades in
    tl.fromTo(
      textImageAnimRef.current,
      { y: 50, opacity: 0 },
      { y: textTargetY, opacity: 1, ease: "power2.out", duration: 0.10 },
      0.20
    );

    // Stickers scale and fade up (0.20 to 0.34)
    if (mainSticker) {
      tl.to(mainSticker, { scale: 1, duration: 0.10, ease: "back.out(1.5)" }, 0.20);
    }
    if (handSticker) {
      tl.to(handSticker, { scale: 1, duration: 0.10, ease: "back.out(1.5)" }, 0.22);
    }
    if (fireSticker) {
      tl.to(fireSticker, { scale: 1, duration: 0.10, ease: "back.out(1.5)" }, 0.24);
    }

    // Stickers float and rotate continuously during the active scroll phase (0.20 to 0.44)
    if (mainSticker) {
      tl.to(mainSticker, { y: -25, rotation: 6, ease: "none", duration: 0.24 }, 0.20);
    }
    if (handSticker) {
      tl.to(handSticker, { y: -45, rotation: 10, ease: "none", duration: 0.24 }, 0.20);
    }
    if (fireSticker) {
      tl.to(fireSticker, { y: -35, rotation: -15, ease: "none", duration: 0.24 }, 0.20);
    }

    // Paragraph fades in and slides slightly up (0.22 to 0.32)
    tl.fromTo(
      paraRef.current,
      { y: 50, opacity: 0 },
      { y: paraTargetY, opacity: 0.95, ease: "power2.out", duration: 0.10 },
      0.22
    );

    // Keep active/centered (0.30/0.32 to 0.44)
    tl.to(textImageAnimRef.current, { y: textTargetY, duration: 0.14 }, 0.30);
    tl.to(paraRef.current, { y: paraTargetY, duration: 0.12 }, 0.32);

    // Step 5 (0.44 to 0.50): Exit slide up and fade out as model starts joining
    tl.to(
      textImageAnimRef.current,
      { y: "-100vh", opacity: 0, ease: "power2.in", duration: 0.06 },
      0.44
    );
    tl.to(
      paraRef.current,
      { y: "-100vh", opacity: 0, ease: "power2.in", duration: 0.06 },
      0.44
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="how-we-match"
      className="relative w-full h-[350vh] pointer-events-auto z-30"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        
        {/* HOW WE MATCH Image & Para Wrapper */}
        <div className="flex flex-col items-center justify-center pointer-events-auto">
          {/* Text Sticker */}
          <div ref={textImageAnimRef} className="relative z-10 opacity-0">
            {/* Sticker composition wrapper container */}
            <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] shrink-0 select-none mb-4">
              
              {/* Main THE MATCHITT WAY image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] sm:w-[210px] md:w-[225px] z-10">
                <div ref={mainStickerRef} className="w-full h-full origin-center" style={{ willChange: "transform, opacity" }}>
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
              <div className="absolute bottom-[5%] left-[-10%] w-[55px] sm:w-[70px] md:w-[90px] z-20 rotate-[-10deg]">
                <div ref={handStickerRef} className="w-full h-full origin-center" style={{ willChange: "transform, opacity" }}>
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
              <div className="absolute top-[35%] right-[-10%] w-[50px] sm:w-[65px] md:w-[80px] z-20 rotate-15">
                <div ref={fireStickerRef} className="w-full h-full origin-center" style={{ willChange: "transform, opacity" }}>
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
            className="mt-6 font-recoleta-light font-bold text-brand-burgundy text-base sm:text-lg md:text-xl text-center max-w-xl opacity-0 px-6 leading-relaxed"
          >
            Getting your brand in front of the<br className="hidden sm:block" /> right people in the right way.
          </p>
        </div>

      </div>
    </section>
  );
}

