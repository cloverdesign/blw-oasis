import type { Metadata } from "next";
import { Foundation } from "@/components/resources/foundation";
import { Hero } from "@/components/resources/hero";
import { Rhapsody } from "@/components/resources/rhapsody";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access BLW Oasis resources including Rhapsody of Realities and Foundation School. Grow in your faith with our curated materials.",
  openGraph: {
    images: [{ url: "/foundation.webp" }],
  },
};

export default function ResourcesPage() {
    return (
        <main className="pt-32">
            <Hero />
            <Rhapsody />
            <Foundation />
        </main>
    )
}