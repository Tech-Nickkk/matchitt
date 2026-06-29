"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FullscreenImageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 0.8,
        // markers: true,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      imageWrapperRef.current,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 0.7,
      },
      0.25 // Starts a bit late in the pinning scroll sequence
    );
  }, { scope: containerRef, dependencies: [] });

  return (
    <section
      ref={containerRef}
      id="fullscreen-image-section"
      className="relative w-full h-auto md:h-screen overflow-hidden bg-brand-cream z-30 pointer-events-auto flex justify-center items-center"
    >
      <div
        ref={imageWrapperRef}
        className="w-full h-auto md:h-full md:relative origin-center"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Mobile & Tablet: full width, auto height */}
        <div className="block md:hidden w-full h-auto">
          <Image
            src="/images/First_Two_Girls_Img.png"
            alt="Fullscreen transition image"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        {/* Desktop: fill container */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image
            src="/images/First_Two_Girls_Img.png"
            alt="Fullscreen transition image"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
