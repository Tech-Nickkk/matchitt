import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const recoletaBold = localFont({
  src: "./fonts/Recoleta-bold.otf",
  variable: "--font-recoleta-bold",
  display: "swap",
});

const recoletaLight = localFont({
  src: "./fonts/Recoleta-light.otf",
  variable: "--font-recoleta-light",
  display: "swap",
});

import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "MATCHITT | Perfectly Matched",
  description: "Strategy. Creativity. Execution. Perfectly Matched.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${recoletaBold.variable} ${recoletaLight.variable} antialiased`}
    >
      <body className="bg-[#F4F2EC]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

