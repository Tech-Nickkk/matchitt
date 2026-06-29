"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // Tuned for a silkier, slightly more cushioned momentum
      smoothWheel: true,
      syncTouch: true, // Crucial for mobile feel
    });

    lenisRef.current = lenis;

    // The synchronization engine
    function raf(time: number) {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0); // Forces frame-perfect sync

    // Sync scroll triggers and Lenis on resize
    const handleResize = () => {
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
