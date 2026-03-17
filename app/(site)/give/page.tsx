import type { Metadata } from "next";
import { CTA } from "@/components/give/cta"
import { GiveToday } from "@/components/give/give-today"
import { Hero } from "@/components/give/hero"
import { WhyWeGive } from "@/components/give/why-we-give"

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support the ministry at BLW Oasis. Your generous giving helps us reach more people and make a lasting impact.",
  openGraph: {
    images: [{ url: "/give.webp" }],
  },
};

export default function GivePage() {
    return (
        <main className="pt-20 lg:pt-36">
            <Hero />
            <WhyWeGive />
            <GiveToday />
            <CTA />
        </main>
    )
}
