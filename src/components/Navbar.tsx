import { NAV_LINKS } from "@/data/folders";

/** Navigation bar with ripple texture background, nav links, and MATCHITT logo */
export default function Navbar() {
  return (
    <header id="navbar-container" className="relative w-full min-h-[160px] sm:min-h-[180px] md:min-h-[275px] overflow-visible flex flex-col items-center pointer-events-auto select-none z-30">
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
      <nav className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 pt-12 sm:pt-14 md:pt-26 text-brand-burgundy font-serif text-base sm:text-lg md:text-xl tracking-wide select-none">
        {NAV_LINKS.map((label, i) => (
          <span key={label} className="contents">
            <span className="cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-300">
              {label}
            </span>
            {i < NAV_LINKS.length - 1 && (
              <img
                src="/images/flower-icon.png"
                alt=""
                className="w-5 h-5 md:w-6 md:h-6 object-contain animate-spin select-none pointer-events-none"
                style={{ animationDuration: "20s" }}
              />
            )}
          </span>
        ))}
      </nav>

      {/* MATCHITT logo — overflows below header edge */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-40 pointer-events-auto">
        <img
          src="/images/matchitt-text.png"
          alt="MATCHITT"
          className="w-32 sm:w-40 md:w-52 object-contain rotate-[-2deg] drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)] hover:rotate-[1deg] hover:scale-105 transition-all duration-300"
        />
      </div>
    </header>
  );
}
