"use client";

import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LINK_TARGETS: Record<string, string> = {
  "The Matchitt Way": "#process-section",
  "Who we are": "#who-we-are",
  "What we do": "#what-we-do",
  "Who we work with": "#who-we-work-with",
  "About Us": "#about",
  "Get in touch": "#cta-section",
};

const navLinksLeft = ["The Matchitt Way", "Who we are", "What we do"];
const navLinksRight = ["Who we work with", "About Us", "Get in touch"];
const allLinks = [...navLinksLeft, ...navLinksRight];

const FlowerSeparator = () => (
  <Image
    src="/images/flower-icon.png"
    alt=""
    width={40}
    height={40}
    className="w-3.5 h-3.5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 object-contain animate-spin select-none pointer-events-none shrink-0"
    style={{ animationDuration: "20s" }}
  />
);

const InstagramIcon = () => (
  <a 
    href="https://www.instagram.com/matchittcom/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 flex items-center justify-center rounded-lg bg-brand-burgundy text-brand-cream hover:scale-105 hover:opacity-90 transition-all duration-300 shrink-0"
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
    href="https://www.tiktok.com/@matchittcom?_r=1&_t=ZS-98C5qsMfcyS" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 flex items-center justify-center rounded-lg bg-brand-burgundy text-brand-cream hover:scale-105 hover:opacity-90 transition-all duration-300 shrink-0"
    aria-label="TikTok"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.2 1.13 1.25 2.75 2.05 4.41 2.24v3.83c-1.42-.08-2.82-.53-4.03-1.32-.71-.47-1.34-1.07-1.83-1.78v6.79c-.06 2.37-.89 4.74-2.58 6.4-1.76 1.83-4.41 2.76-6.9 2.45-2.61-.25-5.06-2.03-6.04-4.52C.07 15.6-.2 12.66.72 10.15c.92-2.65 3.29-4.7 6.06-5.11 1.05-.18 2.12-.13 3.16.14V9.05c-.86-.27-1.81-.31-2.66-.02-1.39.43-2.53 1.64-2.89 3.06-.41 1.48-.05 3.16.99 4.25.96 1.09 2.5 1.61 3.93 1.34 1.45-.22 2.66-1.39 2.97-2.82.08-.47.1-1 .1-1.48V.02z"/>
    </svg>
  </a>
);

/** Navigation bar with new wavy ripple texture background, centered logo, and social icons */
export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // 1. Slide in navbar container
    tl.fromTo(
      headerRef.current,
      { y: -150 },
      { y: 0, duration: 1.0, clearProps: "transform" }
    );

    // 2. Parallax slide in the background image
    const bgContainer = headerRef.current.querySelector(".nav-bg-container");
    if (bgContainer) {
      tl.fromTo(
        bgContainer,
        { y: -150 },
        { y: 0, duration: 1.2, ease: "power2.out" },
        0
      );
    }

    // 3. Animate the logos with rotation and translation from top (no fade-in)
    const logos = headerRef.current.querySelectorAll(".nav-logo");
    if (logos.length > 0) {
      tl.fromTo(
        logos,
        { y: -100, rotation: -20 },
        { y: 0, rotation: 0, duration: 1.0, ease: "back.out(1.5)" },
        0.3
      );
    }

    // 4. Fade/slide in the rest of navigation links and social icons
    const fadeElements = headerRef.current.querySelectorAll(
      ".nav-links-left, .nav-links-right, .social-icons-container, .nav-links-mobile, .mobile-social-icons"
    );
    if (fadeElements.length > 0) {
      tl.fromTo(
        fadeElements,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        0.5
      );
    }
  }, { scope: headerRef });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // If scroll distance is tiny, ignore it to prevent rapid jittering
      if (Math.abs(diff) < 15) {
        return;
      }

      // Navbar show/hide on scroll
      if (currentScrollY < 80) {
        setShowNavbar(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up -> show navbar
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScroll = (label: string) => {
    const targetId = LINK_TARGETS[label];
    if (!targetId) return;
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      ref={headerRef}
      id="navbar-container" 
      className={`fixed top-0 left-0 right-0 w-full min-h-[90px] sm:min-h-[110px] md:min-h-[120px] overflow-visible flex items-center justify-center pointer-events-auto select-none z-50 px-2 md:px-4 lg:px-6 py-4 md:py-6 transition-transform duration-700 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Wavy liquid texture background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden nav-bg-container">
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
      <nav className="relative z-10 hidden md:flex items-center justify-center text-brand-burgundy font-recoleta-light font-bold text-[10px] md:text-[10.5px] lg:text-[12.5px] xl:text-[14.5px] 2xl:text-[16px] tracking-wide select-none w-full px-28 lg:px-32 xl:px-40 2xl:max-w-[78%] 2xl:mx-auto 2xl:px-0">
        {/* Center Side: Links + Logo */}
        <div className="flex items-center justify-center gap-x-1 md:gap-x-1 lg:gap-x-2 xl:gap-x-3 2xl:gap-x-4 flex-grow">
          
          {/* Left links container */}
          <div className="flex items-center gap-x-1 md:gap-x-1 lg:gap-x-2 xl:gap-x-3 2xl:gap-x-4 nav-links-left shrink-0" style={{ opacity: 0 }}>
            {navLinksLeft.map(label => (
              <Fragment key={label}>
                <NavLink label={label} className="shrink-0" />
                <FlowerSeparator />
              </Fragment>
            ))}
          </div>

          {/* Center Logo */}
          <div className="mx-1.5 lg:mx-3 xl:mx-4 shrink-0 nav-logo">
            <Image
              src="/images/Matchitt_Text_Img.png"
              alt="MATCHITT"
              width={240}
              height={80}
              className="w-16 sm:w-20 md:w-[72px] lg:w-[96px] xl:w-[112px] 2xl:w-[144px] object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>

          {/* Right links container */}
          <div className="flex items-center gap-x-1 md:gap-x-1 lg:gap-x-2 xl:gap-x-3 2xl:gap-x-4 nav-links-right shrink-0" style={{ opacity: 0 }}>
            <FlowerSeparator />

            {navLinksRight.map((label, index) => (
              <Fragment key={label}>
                <NavLink label={label} className="shrink-0" />
                {index < navLinksRight.length - 1 && <FlowerSeparator />}
              </Fragment>
            ))}
          </div>

        </div>
      </nav>

      {/* Social Icons (Absolute Right for Desktop Layout) */}
      <div className="hidden md:flex absolute right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 top-1/2 -translate-y-1/2 items-center gap-x-2 z-20 social-icons-container" style={{ opacity: 0 }}>
        <InstagramIcon />
        <TikTokIcon />
      </div>

      {/* Mobile Navigation */}
      <nav className="relative z-10 flex md:hidden flex-col items-center gap-y-3 px-2 py-2 w-full text-brand-burgundy font-serif font-bold text-xs sm:text-sm tracking-wide select-none">
        {/* Top Logo */}
        <div className="nav-logo">
          <Image
            src="/images/Matchitt_Text_Img.png"
            alt="MATCHITT"
            width={180}
            height={60}
            className="w-20 sm:w-24 object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
        
        {/* Links Wrapper */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 nav-links-mobile" style={{ opacity: 0 }}>
          {allLinks.map((label, index) => (
            <Fragment key={label}>
              <NavLink label={label} />
              {index < allLinks.length - 1 && <FlowerSeparator />}
            </Fragment>
          ))}
        </div>

        {/* Mobile Social Icons */}
        <div className="flex items-center gap-x-2 pt-1 mobile-social-icons" style={{ opacity: 0 }}>
          <InstagramIcon />
          <TikTokIcon />
        </div>
      </nav>

    </header>
  );
}
