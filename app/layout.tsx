import type { Metadata } from "next";
import { Poppins, Cal_Sans } from "next/font/google";
import "./globals.css";

const calSans = Cal_Sans({
  variable: "--font-cal-sans",
  weight: "400"
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://blwoasis.com"
  ),
  title: {
    template: "%s | BLW Oasis",
    default: "BLW Oasis",
  },
  description: "Miracles Happen Here.",
  openGraph: {
    type: "website",
    siteName: "BLW Oasis",
    locale: "en_US",
    images: [{ url: "/hero.webp" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://b.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://c.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://d.basemaps.cartocdn.com" />
      </head>
      <body
        className={`${poppins.variable} ${calSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
