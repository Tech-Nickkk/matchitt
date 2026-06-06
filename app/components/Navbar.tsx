import Image from "next/image";
import { NAV_LINKS } from "@/data/icons";

/** Navigation bar with ripple texture background, nav links, and MATCHITT logo */
export default function Navbar() {
  return (
    <header id="navbar-container" className="relative w-full min-h-[210px] sm:min-h-[230px] md:min-h-[275px] overflow-visible flex flex-col items-center pointer-events-auto select-none z-30">
      {/* Ripple texture background — clipped to header bounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/nav-bg.png")',
            backgroundSize: "120% 115%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center -20px",
          }}
        />
      </div>

      {/* Nav links with flower separators */}
      <nav className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-26 md:pb-0 text-brand-burgundy font-serif text-base sm:text-lg md:text-xl tracking-wide select-none">
        {NAV_LINKS.map((label, i) => (
          <span key={label} className="contents">
            <span className="cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-300">
              {label}
            </span>
            {i < NAV_LINKS.length - 1 && (
              <Image
                src="/images/flower-icon.png"
                alt=""
                width={50}
                height={50}
                className="w-5 h-5 md:w-6 md:h-6 object-contain animate-spin select-none pointer-events-none"
                style={{ animationDuration: "20s" }}
              />
            )}
          </span>
        ))}
      </nav>

      {/* MATCHITT logo — overflows below header edge */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-40 pointer-events-auto">
        <Image
          src="/images/matchitt-text.png"
          alt="MATCHITT"
          width={500}
          height={150}
          className="w-32 sm:w-40 md:w-52 object-contain rotate-[-2deg] hover:rotate-[1deg] hover:scale-105 transition-all duration-300"
        />
      </div>
    </header>
  );
}
