"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topRowFolders = [
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/branding-text.png',
    alt: 'Branding',
    // folderRotate: -2,
    // stickerRotate: 2,
    stickerClasses: 'bottom-[-10px] left-[10%] w-[65%]'
  },
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/content-creation-text.png',
    alt: 'Content Creation',
    // folderRotate: 0,
    // stickerRotate: -2,
    stickerClasses: 'bottom-[-20px] left-[20%] w-[45%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/digital-strategy-text.png',
    alt: 'Digital Strategy',
    // folderRotate: 2,
    // stickerRotate: 1,
    stickerClasses: 'bottom-[-10px] left-[15%] w-[55%]'
  },
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/social-media-management-text.png',
    alt: 'Social Media Management',
    // folderRotate: 1,
    // stickerRotate: -1,
    stickerClasses: 'bottom-[-25px] left-[10%] w-[65%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/paid-amplification-text.png',
    alt: 'Paid Amplification',
    // folderRotate: -1,
    // stickerRotate: 3,
    stickerClasses: 'bottom-[-20px] left-[15%] w-[55%]'
  },
];

const bottomRowFolders = [
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/creative-design-text.png',
    alt: 'Creative & Design',
    // folderRotate: -1,
    // stickerRotate: 1,
    stickerClasses: 'bottom-[-15px] left-[15%] w-[55%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/influencer-engagment-text.png',
    alt: 'Influencer Engagement',
    // folderRotate: 1,
    // stickerRotate: -2,
    stickerClasses: 'bottom-[-25px] left-[10%] w-[65%]'
  },
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/seo-website-text.png',
    alt: 'SEO & Website',
    // folderRotate: -2,
    // stickerRotate: 2,
    stickerClasses: 'bottom-[-10px] left-[10%] w-[65%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/sem-programmatic-text.png',
    alt: 'SEM & Programmatic',
    // folderRotate: 2,
    // stickerRotate: -1,
    stickerClasses: 'bottom-[-25px] left-[10%] w-[65%]'
  },
];

export default function ServicesFoldersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const foldersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Set initial state of all folders
    gsap.set(foldersRef.current, {
      x: 200,
      y: 200,
      opacity: 0,
      scale: 0.8
    });

    const total = foldersRef.current.length;
    // Space thresholds so last folder triggers at ~95% progress, minimal dead scroll after
    const enterThresholds = Array.from({ length: total }, (_, i) => 0.05 + i * (0.90 / (total - 1)));

    // Track state: 'hidden' | 'visible'
    const states: string[] = foldersRef.current.map(() => 'hidden');

    // 2. Create ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=1200%", // ~135vh per folder, pin releases right after last folder enters
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;

        foldersRef.current.forEach((folder, i) => {
          if (!folder) return;

          const targetState = progress >= enterThresholds[i] ? 'visible' : 'hidden';

          if (targetState !== states[i]) {
            states[i] = targetState;

            if (targetState === 'visible') {
              gsap.to(folder, {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "expo.out",
                overwrite: "auto"
              });
            } else {
              gsap.to(folder, {
                x: 200,
                y: 200,
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: "expo.out",
                overwrite: "auto"
              });
            }
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pointer-events-auto z-30"
    >
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-0 sm:gap-8">

        {/* Top Row */}
        <div className="flex w-full justify-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            {topRowFolders.map((item, index) => {
              const desktopMt = ['sm:mt-[0px]', 'sm:mt-[25px]', 'sm:mt-[50px]', 'sm:mt-[75px]', 'sm:mt-[100px]'][index] || 'sm:mt-[0px]';
              return (
                <div
                  key={`top-${index}`}
                  ref={el => { foldersRef.current[index] = el; }}
                  className={`relative w-[200px] sm:w-[180px] md:w-[220px] lg:w-[260px] shrink-0 ${desktopMt} ${
                    index === 0 ? 'mt-0' : '-mt-28 sm:-ml-6 md:-ml-8 lg:-ml-10'
                  }`}
                  style={{
                    zIndex: index,
                  }}
                >
                  <Image
                    src={item.folder}
                    alt={`${item.alt} folder`}
                    width={400}
                    height={300}
                    className="w-full h-auto drop-shadow-md"
                  />
                  <div
                    className={`absolute ${item.stickerClasses}`}
                  >
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
          <div className="flex flex-col sm:flex-row items-center sm:items-start ml-0 md:ml-[6%] -mt-28 sm:mt-0">
            {bottomRowFolders.map((item, index) => {
              const desktopMt = ['sm:mt-[0px]', 'sm:mt-[25px]', 'sm:mt-[50px]', 'sm:mt-[75px]', 'sm:mt-[100px]'][index] || 'sm:mt-[0px]';
              return (
                <div
                  key={`bottom-${index}`}
                  ref={el => { foldersRef.current[topRowFolders.length + index] = el; }}
                  className={`relative w-[200px] sm:w-[180px] md:w-[220px] lg:w-[260px] shrink-0 ${desktopMt} ${
                    index === 0 ? 'mt-0' : '-mt-28 sm:-ml-6 md:-ml-8 lg:-ml-10'
                  }`}
                  style={{
                    zIndex: topRowFolders.length + index,
                  }}
                >
                  <Image
                    src={item.folder}
                    alt={`${item.alt} folder`}
                    width={400}
                    height={300}
                    className="w-full h-auto drop-shadow-md"
                  />
                  <div
                    className={`absolute ${item.stickerClasses}`}
                  >
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
