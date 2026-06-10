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
      lerp: 0.1, // Increased for a tighter, more responsive feel (closer to native scroll)
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

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
