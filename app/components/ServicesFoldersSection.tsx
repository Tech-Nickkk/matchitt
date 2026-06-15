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
    stickerClasses: 'bottom-[-10px] left-[15%] w-[60%]'
  },
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/content-creation-text.png',
    alt: 'Content Creation',
    // folderRotate: 0,
    // stickerRotate: -2,
    stickerClasses: 'bottom-[-20px] left-[23%] w-[45%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/digital-strategy-text.png',
    alt: 'Digital Strategy',
    // folderRotate: 2,
    // stickerRotate: 1,
    stickerClasses: 'bottom-[-10px] left-[15%] w-[70%]'
  },
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/social-media-management-text.png',
    alt: 'Social Media Management',
    // folderRotate: 1,
    // stickerRotate: -1,
    stickerClasses: 'bottom-[-25px] left-[18%] w-[60%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/paid-amplification-text.png',
    alt: 'Paid Amplification',
    // folderRotate: -1,
    // stickerRotate: 3,
    stickerClasses: 'bottom-[-20px] left-[15%] w-[65%]'
  },
];

const bottomRowFolders = [
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/creative-design-text.png',
    alt: 'Creative & Design',
    // folderRotate: -1,
    // stickerRotate: 1,
    stickerClasses: 'bottom-[-25px] left-[18%] w-[55%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/influencer-engagment-text.png',
    alt: 'Influencer Engagement',
    // folderRotate: 1,
    // stickerRotate: -2,
    stickerClasses: 'bottom-[-35px] left-[18%] w-[60%]'
  },
  {
    folder: '/images/red-folder-wwd.png',
    sticker: '/images/seo-website-text.png',
    alt: 'SEO & Website',
    // folderRotate: -2,
    // stickerRotate: 2,
    stickerClasses: 'bottom-[-10px] left-[15%] w-[65%]'
  },
  {
    folder: '/images/blue-folder-wwd.png',
    sticker: '/images/sem-programmatic-text.png',
    alt: 'SEM & Programmatic',
    // folderRotate: 2,
    // stickerRotate: -1,
    stickerClasses: 'bottom-[-15px] left-[18%] w-[70%]'
  },
];

export default function ServicesFoldersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const foldersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Track state: 'hidden' | 'visible'
    const states: string[] = foldersRef.current.map(() => 'hidden');

    // 1. Create the Pin ScrollTrigger
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=830%", // Last folder enters at 810vh (8 gaps of 110vh starting at S_pin - 70vh), so 830vh total duration
      pin: true,
      invalidateOnRefresh: true,
    });

    const updateFolders = (scrollPos: number) => {
      const S_pin = pinTrigger.start;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1000;
      const D_gap = viewportHeight * 1.1; // 110vh gap for slow, smooth transitions

      foldersRef.current.forEach((folder, i) => {
        if (!folder) return;

        // Folder 1 (i=0) enters at S_pin - 70vh (when folders are fully visible)
        // Folder 2 (i=1) enters at S_pin + 40vh (during pinning, 110vh gap)
        // Folders 3-9 (i=2-8) enter at subsequent 110vh intervals
        const S_enter = S_pin - viewportHeight * 0.7 + i * D_gap;
        const targetState = scrollPos >= S_enter ? 'visible' : 'hidden';

        if (targetState !== states[i]) {
          states[i] = targetState;

          if (targetState === 'visible') {
            folder.classList.add('is-visible');
          } else {
            folder.classList.remove('is-visible');
          }
        }
      });
    };

    // 2. Create the Animation ScrollTrigger (starts before pinning and updates folders)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: () => pinTrigger.end,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateFolders(self.scroll()),
      onRefresh: (self) => updateFolders(self.scroll()),
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pointer-events-auto z-30"
    >
      <style>{`
        .folder-transition-card {
          will-change: transform, opacity;
          transition-property: opacity, transform;
          transition-duration: 1.2s;
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
          opacity: 0;
          transform: translate3d(200px, 200px, 0) scale(0.8);
        }
        .folder-transition-card.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }
      `}</style>
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
                  className={`relative w-[200px] sm:w-[180px] md:w-[220px] lg:w-[260px] shrink-0 folder-transition-card ${desktopMt} ${
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
                  className={`relative w-[200px] sm:w-[180px] md:w-[220px] lg:w-[260px] shrink-0 folder-transition-card ${desktopMt} ${
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
