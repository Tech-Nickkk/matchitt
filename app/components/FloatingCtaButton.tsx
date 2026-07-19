"use client";

import { useState, useEffect } from "react";

export default function FloatingCtaButton() {
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  // Synchronize button visibility with Navbar visibility (inverted)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // Ignore small scroll shifts to prevent rapid jittering
      if (Math.abs(diff) < 15) {
        return;
      }

      // If at the very top of the page, navbar is always visible, so button is hidden
      if (currentScrollY < 80) {
        setIsBtnVisible(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Scrolling down -> Navbar hides -> Show button
        setIsBtnVisible(true);
      } else {
        // Scrolling up -> Navbar shows -> Hide button
        setIsBtnVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out select-none ${
        isBtnVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <button
        onClick={() => {
          document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="relative group px-5 py-2.5 sm:px-6 sm:py-3 bg-[#83333E] text-[#F4F2EC] font-recoleta-bold font-bold rounded-full shadow-2xl border border-[#F4F2EC]/20 flex items-center gap-2 cursor-pointer outline-none transition-all duration-300"
      >
        {/* Text */}
        <span 
          className="relative z-10 text-[15px] sm:text-[16px] tracking-wide antialiased"
          style={{ fontVariantLigatures: "none" }}
        >
          Get in touch
        </span>

        {/* Dynamic sliding arrow icon */}
        <span className="relative flex items-center justify-center w-5 h-5 overflow-hidden z-10">
          <svg 
            className="w-4 h-4 absolute text-[#F4F2EC] transition-all duration-300 transform translate-x-0 group-hover:translate-x-6" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.8" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <svg 
            className="w-4 h-4 absolute text-[#F4F2EC] transition-all duration-300 transform -translate-x-6 group-hover:translate-x-0" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.8" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </button>
    </div>
  );
}
