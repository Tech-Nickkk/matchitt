"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Digital Strategy",
    image: "/images/Digital_Strategy_Text_Img.png",
    sizeClass: "w-[69%] h-[65%] bottom-[-28%]",
    description: "The plan before the post"
  },
  {
    title: "Content Creation",
    image: "/images/Content_Creation_Text_Img.png",
    sizeClass: "w-[62%] h-[60%] bottom-[-22%]",
    description: "The content people actually stop for"
  },
  {
    title: "Influencer Engagement",
    image: "/images/Infuencer_Engagement_Text_Img.png",
    sizeClass: "w-[80%] h-[60%] bottom-[-25%]",
    translateXClass: "-translate-x-[51.5%]",
    description: "The right voices for the right audiences"
  },
  {
    title: "Paid Amplification",
    image: "/images/Paid_Amplification_Text_Img.png",
    sizeClass: "w-[90%] h-[70%] bottom-[-22%]",
    translateXClass: "-translate-x-[53%]",
    description: "Putting budget where it counts"
  },
  {
    title: "Branding and Creative Design",
    image: "/images/Creative_Design_Text_Img.png",
    sizeClass: "w-[70%] h-[70%] bottom-[-25%]",
    description: "Identity and visuals that make you recognizable"
  },
  {
    title: "SEO and Website",
    image: "/images/Seo_Website_Text_Img.png",
    sizeClass: "w-[92%] h-[37%] bottom-[-15%]",
    description: "Making sure those looking for you actually find you"
  }
];

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainStickerRef = useRef<HTMLDivElement>(null);
  const bandAidStickerRef = useRef<HTMLDivElement>(null);
  const enjoyStickerRef = useRef<HTMLDivElement>(null);
  const smileStickerRef = useRef<HTMLDivElement>(null);
  const folderWrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current || !folderWrapperRef.current) return;

    // 1. Sticker timeline for smooth, continuous parallax scrolling (scrub: 1.8)
    const stickerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when top of section enters viewport bottom
        end: "top top",      // Ends when section pins at top of viewport
        scrub: 1.8,          // Weighted lag for a premium catch-up feel
        invalidateOnRefresh: true,
      }
    });

    // Scale up elements dynamically as they first enter the screen
    const elements = [
      mainStickerRef.current,
      bandAidStickerRef.current,
      enjoyStickerRef.current,
      smileStickerRef.current
    ].filter(Boolean) as HTMLElement[];

    if (elements.length > 0) {
      // 1a. Scale up elements dynamically as they first enter the screen (synced to scroll timeline)
      stickerTl.fromTo(
        elements,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
        0
      );
    }

    // Continuous float and rotation animations synced to scroll (subtle, non-disorienting)
    if (mainStickerRef.current) {
      stickerTl.fromTo(
        mainStickerRef.current,
        { y: 15, rotation: -3 },
        { y: -15, rotation: 3, ease: "none" },
        0
      );
    }

    if (bandAidStickerRef.current) {
      stickerTl.fromTo(
        bandAidStickerRef.current,
        { y: 20, rotation: -10 },
        { y: -20, rotation: 5, ease: "none" },
        0
      );
    }

    if (enjoyStickerRef.current) {
      stickerTl.fromTo(
        enjoyStickerRef.current,
        { y: 15, rotation: 8 },
        { y: -30, rotation: -5, ease: "none" },
        0
      );
    }

    if (smileStickerRef.current) {
      stickerTl.fromTo(
        smileStickerRef.current,
        { y: 20, rotation: -8 },
        { y: -15, rotation: 8, ease: "none" },
        0
      );
    }

    // 3. Entrance animation for the folder (scale 0.8, opacity 0 -> scale 1.0, opacity 1 by top top)
    gsap.fromTo(
      folderWrapperRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1.0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.0,
          invalidateOnRefresh: true,
        }
      }
    );

    // 4. Pinned service cards carousel animation
    const textImages = folderWrapperRef.current.querySelectorAll(".service-text-image");
    const paragraphs = sectionRef.current.querySelectorAll(".service-desc-paragraph");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        invalidateOnRefresh: true,
      }
    });

    textImages.forEach((img, i) => {
      const para = paragraphs[i];
      if (i === 0) {
        // The first image/paragraph starts visible. Hold, then animate out.
        tl.to(
          [img, para],
          { opacity: 0, y: -60, scale: 0.95, duration: 2.5, ease: "power2.in" },
          "+=1.0"
        );
      } else {
        // Animate in: folder image first, then paragraph with a slight delay
        tl.fromTo(
          img,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 2.0, ease: "power2.out" }
        );
        tl.fromTo(
          para,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" },
          "-=1.2" // Overlaps entry to start while folder image is finishing
        );

        // Animate out (if not last)
        if (i !== textImages.length - 1) {
          tl.to(
            [img, para],
            { opacity: 0, y: -60, scale: 0.95, duration: 2.5, ease: "power2.in" },
            "+=1.0"
          );
        }
      }
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center gap-6 md:gap-15 text-brand-burgundy pt-12 sm:pt-16 pb-[10vh] sm:pb-[12vh] md:pb-[14vh] overflow-hidden pointer-events-auto z-30 bg-brand-cream"
    >
      {/* 1. Header Sticker Composition (Shifts a tiny bit on click) */}
      <div 
        className={`relative w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] md:w-[220px] md:h-[220px] shrink-0 select-none mb-0 transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-[-2.5vh]" : "translate-y-0"
        }`}
      >
        
        {/* Main WHAT WE DO image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] sm:w-[115px] md:w-[150px] z-10">
          <div
            ref={mainStickerRef}
            className="w-full h-full origin-center opacity-0 scale-0"
            style={{ willChange: "transform" }}
          >
            <div className="w-full h-auto">
              <Image
                src="/images/Whatwedo_Text_Img.png"
                alt="What We Do"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Sticker 1: Band-aid (Left) */}
        <div className="absolute top-[32%] left-[-10%] sm:left-[-12%] md:left-[-15%] w-[28px] sm:w-[36px] md:w-[50px] z-20 rotate-[-35deg]">
          <div
            ref={bandAidStickerRef}
            className="w-full h-full origin-center opacity-0 scale-0"
            style={{ willChange: "transform" }}
          >
            <div className="w-full h-auto">
              <Image
                src="/images/Whatwedo_Sticker01_Img.png"
                alt="Band-aid sticker"
                width={150}
                height={150}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Sticker 2: ENJOY Poster (Top Right) */}
        <div className="absolute top-[2%] right-[-2%] sm:right-[-4%] md:right-[-6%] w-[35px] sm:w-[48px] md:w-[68px] z-0 rotate-25">
          <div
            ref={enjoyStickerRef}
            className="w-full h-full origin-center opacity-0 scale-0"
            style={{ willChange: "transform" }}
          >
            <div className="w-full h-auto">
              <Image
                src="/images/Whatwedo_Sticker02_Img.png"
                alt="Enjoy sticker"
                width={250}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Sticker 3: Blue Smile (Bottom Right) */}
        <div className="absolute bottom-[20%] right-[-2%] sm:right-[-4%] md:right-[-15%] w-[35px] sm:w-[44px] md:w-[58px] z-20 rotate-[-20deg]">
          <div
            ref={smileStickerRef}
            className="w-full h-full origin-center opacity-0 scale-0"
            style={{ willChange: "transform" }}
          >
            <div className="w-full h-auto">
              <Image
                src="/images/Whatwedo_Sticker03_Img.png"
                alt="Smile sticker"
                width={200}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Wrapper that moves ONLY the folder up when clicked */}
      <div 
        className={`transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-[-8vh]" : "translate-y-0"
        }`}
      >
        <div 
          ref={folderWrapperRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-[28vw] sm:w-[20vw] md:w-[15vw] aspect-1690/1478 origin-center opacity-0 mb-0 shrink-0 cursor-pointer"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Folder Background Image */}
          <div className="w-full h-full relative">
            <Image
              src="/images/Whatwedo_Folder_Img.png"
              alt="What We Do Folder"
              fill
              className="object-contain drop-shadow-md select-none pointer-events-none"
              priority
            />
          </div>

          {/* Absolute container for the text images at bottom center of the folder */}
          <div className="absolute inset-0 select-none pointer-events-none">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-text-image absolute left-1/2 ${service.translateXClass || "-translate-x-1/2"} flex items-center justify-center ${service.sizeClass} ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain object-bottom"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description Paragraph Container */}
      <div 
        className={`absolute bottom-[3.5vh] sm:bottom-[4.5vh] md:bottom-[5.5vh] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center transition-all duration-500 ease-out z-40 h-[100px] flex items-center justify-center select-none pointer-events-none ${
          isOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {services.map((service, index) => (
            <p
              key={index}
              className={`service-desc-paragraph absolute font-recoleta-light font-bold text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] leading-relaxed text-brand-burgundy w-full text-center ${
                index === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{ willChange: "transform, opacity", fontVariantLigatures: "none" }}
            >
              {service.description}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

