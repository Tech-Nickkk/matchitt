"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINK_TARGETS: Record<string, string> = {
  "About Us": "#about",
  "What We Do": "#what-we-do",
  "How We Match": "#how-we-match",
  "Our Work": "#process-section",
  "Let Us Match You": "#cta-section",
};

const navLinksLeft = ["About Us", "What We Do", "How We Match"];
const navLinksRight = ["Our Work", "Let Us Match You"];
const allLinks = Object.keys(LINK_TARGETS);

const FlowerSeparator = () => (
  <Image
    src="/images/flower-icon.png"
    alt=""
    width={40}
    height={40}
    className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain animate-spin select-none pointer-events-none shrink-0"
    style={{ animationDuration: "20s" }}
  />
);

const InstagramIcon = () => (
  <a 
    href="https://instagram.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg bg-brand-burgundy text-brand-cream hover:scale-105 hover:opacity-90 transition-all duration-300 shrink-0"
    aria-label="Instagram"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </a>
);

const TikTokIcon = () => (
  <a 
    href="https://tiktok.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg bg-brand-burgundy text-brand-cream hover:scale-105 hover:opacity-90 transition-all duration-300 shrink-0"
    aria-label="TikTok"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.2 1.13 1.25 2.75 2.05 4.41 2.24v3.83c-1.42-.08-2.82-.53-4.03-1.32-.71-.47-1.34-1.07-1.83-1.78v6.79c-.06 2.37-.89 4.74-2.58 6.4-1.76 1.83-4.41 2.76-6.9 2.45-2.61-.25-5.06-2.03-6.04-4.52C.07 15.6-.2 12.66.72 10.15c.92-2.65 3.29-4.7 6.06-5.11 1.05-.18 2.12-.13 3.16.14V9.05c-.86-.27-1.81-.31-2.66-.02-1.39.43-2.53 1.64-2.89 3.06-.41 1.48-.05 3.16.99 4.25.96 1.09 2.5 1.61 3.93 1.34 1.45-.22 2.66-1.39 2.97-2.82.08-.47.1-1 .1-1.48V.02z"/>
    </svg>
  </a>
);

/** Navigation bar with new wavy ripple texture background, centered logo, and social icons */
export default function Navbar() {
  const handleScroll = (label: string) => {
    const targetId = LINK_TARGETS[label];
    if (!targetId) return;
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(() => {
    gsap.to(".nav-logo-animate", {
      y: -150,
      rotate: 40, // Slight rotation
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "600px top", // Extended to make the animation slower
        scrub: true,
      }
    });
  });

  const NavLink = ({ label, className = "" }: { label: string, className?: string }) => (
    <span 
      onClick={() => handleScroll(label)}
      className={`cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-300 ${className}`}
    >
      {label}
    </span>
  );

  return (
    <header 
      id="navbar-container" 
      className="relative w-full min-h-[90px] sm:min-h-[110px] md:min-h-[140px] overflow-visible flex items-center justify-center pointer-events-auto select-none z-30 px-4 md:px-6 py-4 md:py-6"
    >
      {/* Wavy liquid texture background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/nav-new-bg.png")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="relative z-10 hidden md:flex items-center justify-center gap-x-3 lg:gap-x-5 text-brand-burgundy font-recoleta-light font-bold text-sm lg:text-base xl:text-lg tracking-wide select-none w-full max-w-7xl mx-auto">
        {navLinksLeft.map(label => (
          <Fragment key={label}>
            <NavLink label={label} className="shrink-0" />
            <FlowerSeparator />
          </Fragment>
        ))}

        {/* Center Logo */}
        <div className="mx-2 lg:mx-4 shrink-0 nav-logo-animate">
          <Image
            src="/images/Matchitt_Text_Img.png"
            alt="MATCHITT"
            width={240}
            height={80}
            className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>

        <FlowerSeparator />

        {navLinksRight.map(label => (
          <Fragment key={label}>
            <NavLink label={label} className="shrink-0" />
            <FlowerSeparator />
          </Fragment>
        ))}

        {/* Social Icons */}
        <div className="flex items-center gap-x-2 shrink-0">
          <InstagramIcon />
          <TikTokIcon />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="relative z-10 flex md:hidden flex-col items-center gap-y-3 px-2 py-2 w-full text-brand-burgundy font-serif font-bold text-xs sm:text-sm tracking-wide select-none">
        {/* Top Logo */}
        <div className="nav-logo-animate">
          <Image
            src="/images/Matchitt_Text_Img.png"
            alt="MATCHITT"
            width={180}
            height={60}
            className="w-20 sm:w-24 object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
        
        {/* Links and Separators Wrapper */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {allLinks.map((label, index) => (
            <Fragment key={label}>
              <NavLink label={label} />
              {index < allLinks.length - 1 && <FlowerSeparator />}
            </Fragment>
          ))}
        </div>

        {/* Mobile Social Icons */}
        <div className="flex items-center gap-x-2 pt-1">
          <InstagramIcon />
          <TikTokIcon />
        </div>
      </nav>
    </header>
  );
}
