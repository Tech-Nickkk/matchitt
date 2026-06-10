import Image from "next/image";

export default function HowWeMatchSection() {
  return (
    <section
      id="how-we-match"
      className="relative w-full h-screen flex flex-col items-center justify-start py-24 pointer-events-auto z-30"
    >
      <div className="w-full flex flex-col items-center">
        {/* HOW WE MATCH Image */}
        <div className="relative w-[280px] sm:w-[350px] md:w-[450px] z-10 transition-transform duration-500 hover:scale-[1.02]">
          <img
            src="/images/HowWeMatchIt-Text.svg"
            alt="How We Match"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
