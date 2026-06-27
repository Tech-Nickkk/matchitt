"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TransitionImageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!section || !imageWrapper) return;

    gsap.fromTo(
      imageWrapper,
      {
        scale: 0.95,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 50%",
          markers: true,
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="transition-image-section"
      className="relative w-full h-screen overflow-hidden bg-brand-cream z-30 pointer-events-auto flex justify-center items-center"
    >
      <div
        ref={imageWrapperRef}
        className="relative w-full h-full origin-center opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <Image
          src="/images/new-image.png"
          alt="Featured visual"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
    </section>
  );
}
