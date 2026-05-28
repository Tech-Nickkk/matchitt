import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const recoleta = localFont({
  src: "./fonts/Recoleta.otf",
  variable: "--font-recoleta",
  display: "swap",
});

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
      className={`${recoleta.variable} antialiased`}
    >
      <body className="bg-[#F4F2EC]">{children}</body>
    </html>
  );
}

