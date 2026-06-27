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

    // Animate each folder one by one as it scrolls into view
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
            start: "top 90%",
            end: "top 65%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pointer-events-auto z-30"
    >
      <style>{`
        .folder-transition-card {
          opacity: 0;
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
          <div className="flex flex-col sm:flex-row items-center sm:items-start ml-0 md:ml-[6%] mt-12 sm:mt-0">
            {bottomRowFolders.map((item, index) => {
              const desktopMt = ['sm:mt-[0px]', 'sm:mt-[25px]', 'sm:mt-[50px]', 'sm:mt-[75px]', 'sm:mt-[100px]'][index] || 'sm:mt-[0px]';
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

        {/* Space Spacer */}
        <div className="w-full h-[5vh] sm:h-0 pointer-events-none" />

      </div>
    </section>
  );
}
