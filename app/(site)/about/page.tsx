import type { Metadata } from "next";
import { Faiths } from "@/components/about/faiths";
import { Hero } from "@/components/about/hero";
import { How } from "@/components/about/how";
import { Leadership } from "@/components/about/leadership";
import { Values } from "@/components/about/values";
import { Vision } from "@/components/about/vision";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about BLW Oasis — our mission, vision, values, and leadership. Discover what drives us and meet the team behind the ministry.",
  openGraph: {
    images: [{ url: "/how.webp" }],
  },
};

export default function AboutPage() {
    return (
        <main className="pt-20 lg:pt-36">
            <Hero />
            <How />
            <Vision />
            <Values />
            <Faiths />
            <Leadership />
        </main>
    )
}