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

  useGSAP(() => {
    if (!sectionRef.current || !textImageAnimRef.current) return;

    gsap.fromTo(
      textImageAnimRef.current,
      { y: 150, rotation: -10 },
      {
        y: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Starts animating when top of section is at 70% viewport height
          end: "top 20%",     // Finishes when top of section reaches 20% viewport height
          scrub: 0.5,         // Snappy scrubbing
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="how-we-match"
      className="relative w-full h-screen flex flex-col items-center justify-start py-24 pointer-events-auto z-30"
    >
      <div className="w-full flex flex-col items-center">
        {/* HOW WE MATCH Image */}
        <div className="relative w-[280px] sm:w-[350px] md:w-[450px] z-10">
          <div ref={textImageAnimRef} className="w-full h-full origin-center">
            <div className="w-full h-auto transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/HowWeMatchIt-Text.svg"
                alt="How We Match"
                width={800}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

