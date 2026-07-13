import type { Metadata } from "next";
import { Geist, Germania_One, Patrick_Hand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// The VEILED wordmark — Germania One (Google Fonts), per the design.
const veiledFont = Germania_One({
  variable: "--font-veiled",
  weight: "400",
  subsets: ["latin"],
});

// Two distinct hand faces, matching the design:
//  • Halloween Wonders (all-caps, thin) → tagline, LEARN MORE, description,
//    team roles.
//  • Rounded hand (mixed-case) → pull quote, team names. Fallback: Patrick Hand.
const halloweenWonders = localFont({
  src: "../../public/fonts/HalloweenWonders.woff",
  variable: "--font-halloween",
});

const handFallback = Patrick_Hand({
  variable: "--font-hand-fallback",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elder Studios — VEILED",
  description:
    "Elder Studios — defining the new way of storytelling in gaming. VEILED: traverse the untold reality.",
  openGraph: {
    title: "Elder Studios — VEILED",
    description: "Traverse the untold reality. A narrative-driven horror puzzle platformer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${veiledFont.variable} ${halloweenWonders.variable} ${handFallback.variable} h-full antialiased`}
    >
      <body className="min-h-full text-mist font-sans">{children}</body>
    </html>
  );
}
