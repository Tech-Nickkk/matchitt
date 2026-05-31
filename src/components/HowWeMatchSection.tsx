import Image from "next/image";

export default function HowWeMatchSection() {
  return (
    <section
      id="how-we-match"
      className="relative w-full min-h-[150vh] flex flex-col items-center justify-start py-24 pointer-events-auto z-30"
    >
      <div className="sticky top-[10%] w-full flex flex-col items-center">
        {/* HOW WE MATCH Image */}
        <div className="relative w-[280px] sm:w-[350px] md:w-[450px] z-10 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="/images/howwematch-text.png"
            alt="How We Match"
            width={600}
            height={300}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      
      {/* 
        The remaining vertical space (min-h-[150vh]) gives GSAP ScrollTrigger 
        room to scrub the 3D puzzle pieces moving back to the center and connecting 
        below the sticky text.
      */}
    </section>
  );
}
