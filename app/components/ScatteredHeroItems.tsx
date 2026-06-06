import Image from "next/image";
import { SCATTERED_FOLDERS, DECORATIVE_STICKERS } from "@/data/icons";

/** Absolutely-positioned layer of scattered folder icons and decorative stickers matching the Figma mockup */
export default function ScatteredHeroItems() {
  return (
    <div id="scattered-folders" className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
      {/* Folder icons */}
      {SCATTERED_FOLDERS.map((folder, idx) => (
        <div
          key={`folder-${idx}`}
          className="absolute select-none"
          style={{
            top: folder.top,
            left: folder.left,
            transform: `rotate(${folder.rot}deg)`,
          }}
        >
          <Image
            src={
              folder.type === "blue"
                ? "/images/blue-folder.png"
                : "/images/red-folder.png"
            }
            alt=""
            width={100}
            height={100}
            className="w-6 sm:w-7 md:w-8 object-contain opacity-90"
          />
        </div>
      ))}

      {/* Decorative stickers */}
      {DECORATIVE_STICKERS.map((sticker, idx) => (
        <div
          key={`sticker-${idx}`}
          className="absolute select-none"
          style={{
            top: sticker.top,
            left: sticker.left,
            transform: `rotate(${sticker.rot}deg)`,
          }}
        >
          <Image
            src={sticker.src}
            alt={sticker.alt}
            width={150}
            height={150}
            className="w-8 sm:w-10 md:w-16 object-contain"
          />
        </div>
      ))}
    </div>
  );
}
