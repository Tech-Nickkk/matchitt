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

    // Initial state: folders hidden (moved down and right from bottom right corner)
    gsap.set(foldersRef.current, {
      x: 200,
      y: 200,
      opacity: 0,
      scale: 0.8
    });

    let currentIndex = -1;

    // Pin the section and animate folders in one by one based on scroll progress (without scrub)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const total = foldersRef.current.length;
        // Map progress to an index. If progress is <= 0, targetIndex is -1 (all hidden)
        let targetIndex = Math.min(Math.floor(progress * total), total - 1);
        if (progress <= 0) targetIndex = -1;

        if (targetIndex > currentIndex) {
          // Animate newly reached folders in
          for (let i = currentIndex + 1; i <= targetIndex; i++) {
            if (foldersRef.current[i]) {
              gsap.to(foldersRef.current[i], {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.inOut",
                overwrite: "auto"
              });
            }
          }
          currentIndex = targetIndex;
        } else if (targetIndex < currentIndex && targetIndex >= -1) {
          // Animate folders out if scrolling back up
          for (let i = currentIndex; i > targetIndex; i--) {
            if (foldersRef.current[i]) {
              gsap.to(foldersRef.current[i], {
                x: 200,
                y: 200,
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "power2.inOut",
                overwrite: "auto"
              });
            }
          }
          currentIndex = targetIndex;
        }
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pointer-events-auto z-30"
    >
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-8 md:gap-8">

        {/* Top Row */}
        <div className="flex w-full justify-center">
          <div className="flex items-start">
            {topRowFolders.map((item, index) => (
              <div
                key={`top-${index}`}
                ref={el => { foldersRef.current[index] = el; }}
                className={`relative w-[180px] sm:w-[220px] md:w-[260px] shrink-0 ${index === 0 ? '' : '-ml-6 sm:-ml-8 md:-ml-10'}`}
                style={{
                  zIndex: index,
                  marginTop: `${index * 25}px`,
                  // transform: `rotate(${item.folderRotate}deg)`
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
                  // style={{ transform: `rotate(${item.stickerRotate}deg)` }}
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
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex w-full justify-center">
          <div className="flex items-start ml-0 md:ml-[6%]">
            {bottomRowFolders.map((item, index) => (
              <div
                key={`bottom-${index}`}
                ref={el => { foldersRef.current[topRowFolders.length + index] = el; }}
                className={`relative w-[180px] sm:w-[220px] md:w-[260px] shrink-0 ${index === 0 ? '' : '-ml-6 sm:-ml-8 md:-ml-10'}`}
                style={{
                  zIndex: index,
                  marginTop: `${index * 25}px`,
                  // transform: `rotate(${item.folderRotate}deg)`
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
                  // style={{ transform: `rotate(${item.stickerRotate}deg)` }}
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
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
