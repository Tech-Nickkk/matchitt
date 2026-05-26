"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full h-screen flex items-center justify-center bg-[#6B1D2F] text-[#F4F2EC] overflow-hidden pointer-events-auto z-30"
    >
      {/* Decorative floral elements */}
      <div className="absolute top-10 right-10 opacity-10 animate-spin pointer-events-none select-none" style={{ animationDuration: "30s" }}>
        <img src="/images/flower-icon.png" alt="" className="w-24 h-24 object-contain invert" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 animate-spin pointer-events-none select-none" style={{ animationDuration: "25s" }}>
        <img src="/images/flower-icon.png" alt="" className="w-32 h-32 object-contain invert" />
      </div>

      <div className="text-center px-4 relative z-10">
        <h2
          ref={titleRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F4F2EC]"
        >
          About Us
        </h2>
      </div>
    </section>
  );
}
