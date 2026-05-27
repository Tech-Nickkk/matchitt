/** Position data for scattered folder icons across the page */
export interface FolderPosition {
  top: string;
  left: string;
  type: "blue" | "red";
  rot: number;
}

/** Decorative sticker positions */
export interface StickerPosition {
  top: string;
  left: string;
  rot: number;
  src: string;
  alt: string;
}

/** Navigation link labels */
export const NAV_LINKS = [
  "About Us",
  "What We Do",
  "How We Match",
  "Our Work",
  "Let Us Match You",
] as const;

/** 
 * Hand-crafted folder positions from the Figma design.
 * Positioned on the left and right sides, leaving the center clear for the WebGL canvas, 
 * header, envelope, and text.
 */
export const SCATTERED_FOLDERS: FolderPosition[] = [
  // --- LEFT SIDE CLUSTER (left: 0% to 32%) ---
  { top: "4%", left: "3%", type: "blue", rot: 4 },
  { top: "8%", left: "14%", type: "blue", rot: 5 },
  { top: "10%", left: "22%", type: "red", rot: -6 },
  { top: "13%", left: "8%", type: "blue", rot: -8 },
  { top: "17%", left: "2%", type: "red", rot: 12 },
  { top: "22%", left: "7%", type: "blue", rot: 10 },
  { top: "23%", left: "19%", type: "red", rot: -4 },
  { top: "28%", left: "10%", type: "red", rot: -6 },
  { top: "33%", left: "2%", type: "blue", rot: 8 },
  { top: "34%", left: "18%", type: "red", rot: -12 },
  { top: "39%", left: "13%", type: "blue", rot: 7 },
  { top: "44%", left: "25%", type: "blue", rot: 5 },
  { top: "46%", left: "8%", type: "red", rot: -4 },
  { top: "50%", left: "26%", type: "blue", rot: -10 },
  { top: "54%", left: "6%", type: "blue", rot: -9 },
  { top: "58%", left: "28%", type: "red", rot: 11 },
  { top: "60%", left: "17%", type: "red", rot: 8 },
  { top: "66%", left: "12%", type: "blue", rot: -7 },
  { top: "69%", left: "3%", type: "red", rot: 5 },
  { top: "74%", left: "5%", type: "blue", rot: -4 },
  { top: "78%", left: "12%", type: "red", rot: 9 },
  { top: "84%", left: "2%", type: "red", rot: -8 },
  { top: "88%", left: "18%", type: "blue", rot: 6 },
  { top: "93%", left: "7%", type: "blue", rot: -11 },

  // --- RIGHT SIDE CLUSTER (left: 65% to 98%) ---
  { top: "3%", left: "70%", type: "red", rot: -8 },
  { top: "5%", left: "83%", type: "blue", rot: 6 },
  { top: "9%", left: "91%", type: "blue", rot: 5 },
  { top: "10%", left: "78%", type: "red", rot: -4 },
  { top: "15%", left: "75%", type: "red", rot: -5 },
  { top: "16%", left: "84%", type: "blue", rot: 8 },
  { top: "20%", left: "71%", type: "blue", rot: 10 },
  { top: "21%", left: "88%", type: "red", rot: -5 },
  { top: "22%", left: "95%", type: "blue", rot: -12 },
  { top: "26%", left: "66%", type: "blue", rot: 7 },
  { top: "29%", left: "79%", type: "blue", rot: -8 },
  { top: "30%", left: "97%", type: "blue", rot: 6 },
  { top: "33%", left: "93%", type: "red", rot: 10 },
  { top: "35%", left: "74%", type: "red", rot: -9 },
  { top: "39%", left: "83%", type: "blue", rot: -5 },
  { top: "43%", left: "89%", type: "blue", rot: 4 },
  { top: "45%", left: "69%", type: "red", rot: 8 },
  { top: "46%", left: "78%", type: "blue", rot: -11 },
  { top: "52%", left: "75%", type: "red", rot: 9 },
  { top: "52%", left: "84%", type: "blue", rot: -6 },
  { top: "57%", left: "95%", type: "blue", rot: 11 },
  { top: "58%", left: "70%", type: "red", rot: 6 },
  { top: "59%", left: "87%", type: "blue", rot: -4 },
  { top: "64%", left: "79%", type: "blue", rot: -4 },
  { top: "67%", left: "93%", type: "red", rot: 12 },
  { top: "69%", left: "72%", type: "blue", rot: 7 },
  { top: "70%", left: "85%", type: "red", rot: -10 },
  { top: "73%", left: "91%", type: "blue", rot: 8 },
  { top: "77%", left: "79%", type: "red", rot: -6 },
  { top: "82%", left: "95%", type: "blue", rot: 12 },
  { top: "86%", left: "71%", type: "red", rot: -5 },
  { top: "89%", left: "86%", type: "blue", rot: 7 },
  { top: "94%", left: "93%", type: "red", rot: -10 },
];

/** Stickers placed on the canvas overlapping specific areas */
export const DECORATIVE_STICKERS: StickerPosition[] = [
  {
    top: "32%",
    left: "30%",
    rot: 12,
    src: "/images/decorative-element-1.png",
    alt: "Yeah Yeah",
  },
  {
    top: "43%",
    left: "16%",
    rot: -15,
    src: "/images/decorative-element-2.png",
    alt: "Smile",
  },
  {
    top: "76%",
    left: "28%",
    rot: -8,
    src: "/images/decorative-element-3.png",
    alt: "Cool Vibe",
  },
];
