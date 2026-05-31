import Image from "next/image";

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-[#6B1D2F] py-24 overflow-hidden pointer-events-auto z-30"
    >
      <div className="relative max-w-5xl w-full mx-auto px-6 flex flex-col items-center justify-center">
        
        {/* Container for the Main Image and Stickers */}
        <div className="relative w-[240px] sm:w-[320px] md:w-[420px] flex flex-col items-center justify-center mb-12">
          
          {/* Main WHAT WE DO image */}
          <div className="relative w-full z-10 transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/images/whatwedo-text.png"
              alt="What We Do"
              width={800}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Sticker 1: Band-aid (Left) */}
          <div className="absolute top-[42%] left-[-24%] w-[45px] sm:w-[60px] md:w-[75px] z-20 rotate-[-35deg] transition-transform duration-500 hover:scale-110 hover:rotate-[-25deg]">
            <Image
              src="/images/whatwedoicon-2.png"
              alt="Band-aid sticker"
              width={150}
              height={150}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Sticker 2: ENJOY Poster (Top Right) */}
          <div className="absolute top-[-26%] right-[8%] w-[65px] sm:w-[85px] md:w-[110px] z-0 rotate-[-6deg] transition-transform duration-500 hover:scale-105 hover:rotate-[-5deg]">
            <Image
              src="/images/whatwedoicon-1.png"
              alt="Enjoy sticker"
              width={250}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Sticker 3: Blue Smile (Bottom Right) */}
          <div className="absolute top-[60%] right-[-20%] w-[50px] sm:w-[65px] md:w-[95px] z-20 rotate-[-20deg] transition-transform duration-500 hover:scale-110 hover:rotate-[-10deg]">
            <Image
              src="/images/whatwedoicon-3.png"
              alt="Smile sticker"
              width={200}
              height={200}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Copywriting content */}
        <div className="max-w-2xl text-center z-10 px-4">
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] opacity-95">
            Getting your brand in front of the<br className="hidden sm:block" /> right people in the right way.
          </p>
        </div>

      </div>
    </section>
  );
}
