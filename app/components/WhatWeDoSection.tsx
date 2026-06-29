"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topRowFolders = [
  {
    folder: '/images/Blue_Folder_Img.png',
    sticker: '/images/branding-text.png',
    alt: 'Branding',
    stickerClasses: 'bottom-[-10px] left-[15%] w-[60%]'
  },
  {
    folder: '/images/Red_Folder_Img.png',
    sticker: '/images/content-creation-text.png',
    alt: 'Content Creation',
    stickerClasses: 'bottom-[-20px] left-[23%] w-[45%]'
  },
  {
    folder: '/images/Blue_Folder_Img.png',
    sticker: '/images/digital-strategy-text.png',
    alt: 'Digital Strategy',
    stickerClasses: 'bottom-[-10px] left-[15%] w-[70%]'
  },
  {
    folder: '/images/Red_Folder_Img.png',
    sticker: '/images/social-media-management-text.png',
    alt: 'Social Media Management',
    stickerClasses: 'bottom-[-25px] left-[18%] w-[60%]'
  },
  {
    folder: '/images/Blue_Folder_Img.png',
    sticker: '/images/paid-amplification-text.png',
    alt: 'Paid Amplification',
    stickerClasses: 'bottom-[-20px] left-[15%] w-[65%]'
  },
];

const bottomRowFolders = [
  {
    folder: '/images/Red_Folder_Img.png',
    sticker: '/images/creative-design-text.png',
    alt: 'Creative & Design',
    stickerClasses: 'bottom-[-25px] left-[18%] w-[55%]'
  },
  {
    folder: '/images/Blue_Folder_Img.png',
    sticker: '/images/influencer-engagment-text.png',
    alt: 'Influencer Engagement',
    stickerClasses: 'bottom-[-35px] left-[18%] w-[60%]'
  },
  {
    folder: '/images/Red_Folder_Img.png',
    sticker: '/images/seo-website-text.png',
    alt: 'SEO & Website',
    stickerClasses: 'bottom-[-10px] left-[15%] w-[65%]'
  },
  {
    folder: '/images/Blue_Folder_Img.png',
    sticker: '/images/sem-programmatic-text.png',
    alt: 'SEM & Programmatic',
    stickerClasses: 'bottom-[-15px] left-[18%] w-[70%]'
  },
];

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainStickerRef = useRef<HTMLDivElement>(null);
  const bandAidStickerRef = useRef<HTMLDivElement>(null);
  const enjoyStickerRef = useRef<HTMLDivElement>(null);
  const smileStickerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const foldersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !textContainerRef.current) return;

    const paragraphs = textContainerRef.current.querySelectorAll("p");

    // 1. Text paragraphs fade-in and slide-up synced to scroll
    gsap.fromTo(
      paragraphs,
      { opacity: 0, y: 40 },
      {
        opacity: 0.95,
        y: 0,
        stagger: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 90%",
          end: "top 75%",
          scrub: 1.8,
          invalidateOnRefresh: true,
        }
      }
    );

    // 2. Sticker timeline for smooth, continuous parallax scrolling (scrub: 1.8)
    const stickerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when top of section enters viewport bottom
        end: "bottom top",   // Ends when bottom of section leaves viewport top
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
      stickerTl.fromTo(
        elements,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
        0
      );
    }

    // Continuous float and rotation animations synced to scroll
    if (mainStickerRef.current) {
      stickerTl.fromTo(
        mainStickerRef.current,
        { y: 80, rotation: -6 },
        { y: -80, rotation: 6, ease: "none" },
        0
      );
    }

    if (bandAidStickerRef.current) {
      stickerTl.fromTo(
        bandAidStickerRef.current,
        { y: 150, rotation: -20 },
        { y: -90, rotation: 10, ease: "none" },
        0
      );
    }

    if (enjoyStickerRef.current) {
      stickerTl.fromTo(
        enjoyStickerRef.current,
        { y: 50, rotation: 15 },
        { y: -150, rotation: -10, ease: "none" },
        0
      );
    }

    if (smileStickerRef.current) {
      stickerTl.fromTo(
        smileStickerRef.current,
        { y: 120, rotation: -15 },
        { y: -60, rotation: 15, ease: "none" },
        0
      );
    }

    // 3. Animate each folder one by one as it scrolls into view
    foldersRef.current.forEach((folder) => {
      if (!folder) return;

      gsap.fromTo(
        folder,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: folder,
            start: "top bottom", // Start earlier
            end: "top 70%",   // Finish earlier
            scrub: 1.0,
            invalidateOnRefresh: true,
          }
        }
      );
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center text-brand-burgundy pt-32 pb-12 overflow-hidden pointer-events-auto z-30"
    >
      <div className="relative max-w-5xl w-full mx-auto px-6 flex flex-col items-center justify-center">
        
        {/* Container for the Main Image and Stickers */}
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] shrink-0 select-none mb-6 sm:mb-8">
          
          {/* Main WHAT WE DO image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] sm:w-[170px] md:w-[190px] z-10">
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
          <div className="absolute bottom-40 left-[-10%] sm:left-[-15%] md:left-[-25%] w-[40px] sm:w-[55px] md:w-[100px] z-20 rotate-[-35deg]">
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
          <div className="absolute top-[-0%] right-[-5%] w-[55px] sm:w-[75px] md:w-[110px] z-0 rotate-25">
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
          <div className="absolute bottom-[15%] right-[-5%] sm:right-[-10%] md:right-[-15%] w-[55px] sm:w-[70px] md:w-[100px] z-20 rotate-[-20deg]">
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

        {/* Copywriting content */}
        <div ref={textContainerRef} className="max-w-5xl text-center z-10 px-4">
          <p className="font-recoleta-light font-bold text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed text-brand-burgundy opacity-85">
            Getting your brand in front of the<br className="hidden sm:block" /> right people in the right way.
          </p>
        </div>

      </div>

      <style>{`
        .folder-transition-card {
          opacity: 0;
        }
      `}</style>
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-0 sm:gap-14 mt-24">
        {/* Top Row */}
        <div className="flex w-full justify-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            {topRowFolders.map((item, index) => {
              const desktopMt = 'sm:mt-[0px]';
              return (
                <div
                  key={`top-${index}`}
                  ref={el => { foldersRef.current[index] = el; }}
                  className={`relative w-[200px] sm:w-[180px] md:w-[220px] lg:w-[260px] shrink-0 folder-transition-card ${desktopMt} ${
                    index === 0 ? 'mt-0' : 'mt-12 sm:-ml-6 md:-ml-8 lg:-ml-10'
                  }`}
                  style={{
                    zIndex: index,
                    willChange: "transform, opacity"
                  }}
                >
                  <Image
                    src={item.folder}
                    alt={`${item.alt} folder`}
                    width={400}
                    height={300}
                    className="w-full h-auto drop-shadow-md"
                  />
                  <div className={`absolute ${item.stickerClasses}`}>
                    <Image
                      src={item.sticker}
                      alt={`${item.alt} sticker`}
                      width={300}
                      height={150}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex w-full justify-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start ml-0 md:ml-[6%] mt-12 sm:mt-0">
            {bottomRowFolders.map((item, index) => {
              const desktopMt = 'sm:mt-[0px]';
              return (
                <div
                  key={`bottom-${index}`}
                  ref={el => { foldersRef.current[topRowFolders.length + index] = el; }}
                  className={`relative w-[200px] sm:w-[180px] md:w-[220px] lg:w-[260px] shrink-0 folder-transition-card ${desktopMt} ${
                    index === 0 ? 'mt-0' : 'mt-12 sm:-ml-6 md:-ml-8 lg:-ml-10'
                  }`}
                  style={{
                    zIndex: topRowFolders.length + index,
                    willChange: "transform, opacity"
                  }}
                >
                  <Image
                    src={item.folder}
                    alt={`${item.alt} folder`}
                    width={400}
                    height={300}
                    className="w-full h-auto drop-shadow-md"
                  />
                  <div className={`absolute ${item.stickerClasses}`}>
                    <Image
                      src={item.sticker}
                      alt={`${item.alt} sticker`}
                      width={300}
                      height={150}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

