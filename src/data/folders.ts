/** Position data for scattered folder icons across the page */
export interface FolderPosition {
  top: string;
  left: string;
  type: "blue" | "red";
  rot: number;
}

export const SCATTERED_FOLDERS: FolderPosition[] = [
  // Row 1 — near top
  { top: "8%", left: "1%", type: "red", rot: -3 },
  { top: "7%", left: "8%", type: "blue", rot: 5 },
  { top: "9%", left: "15%", type: "red", rot: -6 },
  { top: "7%", left: "25%", type: "blue", rot: 2 },
  { top: "8%", left: "35%", type: "blue", rot: -4 },
  { top: "9%", left: "55%", type: "blue", rot: 3 },
  { top: "7%", left: "65%", type: "red", rot: -5 },
  { top: "8%", left: "75%", type: "blue", rot: 7 },
  { top: "9%", left: "85%", type: "red", rot: -2 },
  { top: "7%", left: "93%", type: "blue", rot: 4 },
  // Row 2
  { top: "13%", left: "4%", type: "blue", rot: 6 },
  { top: "14%", left: "12%", type: "red", rot: -4 },
  { top: "12%", left: "22%", type: "blue", rot: 3 },
  { top: "13%", left: "32%", type: "red", rot: -7 },
  { top: "14%", left: "60%", type: "red", rot: 5 },
  { top: "12%", left: "70%", type: "blue", rot: -3 },
  { top: "13%", left: "80%", type: "red", rot: 6 },
  { top: "14%", left: "90%", type: "blue", rot: -5 },
  // Row 3
  { top: "19%", left: "2%", type: "red", rot: -5 },
  { top: "18%", left: "10%", type: "blue", rot: 4 },
  { top: "20%", left: "18%", type: "blue", rot: -2 },
  { top: "19%", left: "28%", type: "red", rot: 6 },
  { top: "18%", left: "58%", type: "blue", rot: -4 },
  { top: "20%", left: "68%", type: "red", rot: 3 },
  { top: "19%", left: "78%", type: "blue", rot: -6 },
  { top: "18%", left: "88%", type: "red", rot: 5 },
  { top: "20%", left: "95%", type: "blue", rot: -3 },
  // Row 4
  { top: "25%", left: "0%", type: "blue", rot: 3 },
  { top: "24%", left: "7%", type: "red", rot: -5 },
  { top: "26%", left: "16%", type: "blue", rot: 7 },
  { top: "25%", left: "62%", type: "red", rot: -4 },
  { top: "24%", left: "72%", type: "blue", rot: 5 },
  { top: "26%", left: "82%", type: "red", rot: -6 },
  { top: "25%", left: "92%", type: "blue", rot: 3 },
  // Row 5
  { top: "31%", left: "3%", type: "red", rot: -3 },
  { top: "30%", left: "11%", type: "blue", rot: 6 },
  { top: "32%", left: "20%", type: "red", rot: -5 },
  { top: "31%", left: "56%", type: "blue", rot: 4 },
  { top: "30%", left: "66%", type: "red", rot: -7 },
  { top: "32%", left: "76%", type: "blue", rot: 5 },
  { top: "31%", left: "86%", type: "red", rot: -3 },
  { top: "30%", left: "94%", type: "blue", rot: 6 },
  // Row 6
  { top: "37%", left: "1%", type: "blue", rot: 5 },
  { top: "36%", left: "9%", type: "red", rot: -6 },
  { top: "38%", left: "17%", type: "blue", rot: 3 },
  { top: "37%", left: "60%", type: "red", rot: -4 },
  { top: "36%", left: "70%", type: "blue", rot: 7 },
  { top: "38%", left: "80%", type: "red", rot: -5 },
  { top: "37%", left: "90%", type: "blue", rot: 4 },
  // Row 7
  { top: "43%", left: "4%", type: "red", rot: -4 },
  { top: "42%", left: "13%", type: "blue", rot: 5 },
  { top: "44%", left: "22%", type: "red", rot: -6 },
  { top: "43%", left: "58%", type: "blue", rot: 3 },
  { top: "42%", left: "68%", type: "red", rot: -5 },
  { top: "44%", left: "78%", type: "blue", rot: 6 },
  { top: "43%", left: "88%", type: "red", rot: -3 },
  { top: "42%", left: "96%", type: "blue", rot: 5 },
];

/** Navigation link labels */
export const NAV_LINKS = [
  "About Us",
  "What We Do",
  "How We Match",
  "Our Work",
  "Let Us Match You",
] as const;

/** Decorative sticker positions */
export interface StickerPosition {
  top: string;
  left: string;
  rot: number;
  src: string;
  alt: string;
}

export const DECORATIVE_STICKERS: StickerPosition[] = [
  {
    top: "34%",
    left: "26%",
    rot: 8,
    src: "/images/decorative-element-1.png",
    alt: "Yeah Yeah",
  },
  {
    top: "42%",
    left: "20%",
    rot: -10,
    src: "/images/decorative-element-2.png",
    alt: "Smile",
  },
];
