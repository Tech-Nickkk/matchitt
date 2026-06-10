import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center text-[#6B1D2F] overflow-hidden pointer-events-auto z-30"
    >
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">

        {/* Left Column: Scrapbook Sticker Composition */}
        <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] flex-shrink-0 select-none">
          <div className="absolute top-[-5%] right-[-2%] w-[60px] sm:w-[80px] md:w-[120px] z-0 transition-transform duration-500 hover:scale-105 hover:rotate-[18deg]">
            <Image
              src="/images/about-star-icon.png"
              alt="Stars Sticker"
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[220px] md:w-[210px] z-10 transition-transform duration-500 hover:scale-[1.03] hover:rotate-[-2deg]">
            <Image
              src="/images/about-us-text.png"
              alt="About Us Sticker"
              width={600}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="absolute bottom-[10%] left-[10%] w-[45px] sm:w-[60px] md:w-[100px] z-20 rotate-[15deg] transition-transform duration-500 hover:scale-110 hover:rotate-[-8deg]">
            <Image
              src="/images/about-thunder-icon.png"
              alt="Lightning Bolt Sticker"
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="absolute bottom-[8%] right-[2%] w-[60px] sm:w-[75px] md:w-[85px] z-20 rotate-[-8deg] transition-transform duration-500 hover:scale-110 hover:rotate-[2deg]">
            <Image
              src="/images/about-arrow-icon.png"
              alt="Cursor Arrow Sticker"
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Column: Copywriting content */}
        <div className="max-w-3xl w-full text-left flex flex-col justify-center">
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] mb-6 sm:mb-8 opacity-95">
            We started Matchitt with one simple belief: most businesses don’t need
            more content, they need the right direction.
          </p>
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] mb-6 sm:mb-8 opacity-95">
            There’s too much noise online. Too many trends.
          </p>
          <p className="font-recoleta-light font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-snug text-[#6B1D2F] opacity-95">
            MATCHITT comes in to match you with your audience, through the right
            strategy, content, and execution plan.
          </p>
        </div>

      </div>
    </section>
  );
}
