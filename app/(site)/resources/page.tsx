import type { Metadata } from "next";
import { Foundation } from "@/components/resources/foundation";
import { Hero } from "@/components/resources/hero";
import { Rhapsody } from "@/components/resources/rhapsody";
import { getSiteSettings } from "@/sanity/lib/queries/siteSettings";
import { getResourcesPageImages } from "@/sanity/lib/queries/pageImages";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access BLW Oasis resources including Rhapsody of Realities and Foundation School. Grow in your faith with our curated materials.",
  openGraph: {
    images: [{ url: "/foundation.webp" }],
  },
};

export default async function ResourcesPage() {
    const [siteSettings, resourcesImages] = await Promise.all([
        getSiteSettings(),
        getResourcesPageImages(),
    ])

    return (
        <main className="pt-32">
            <Hero resourcesImages={resourcesImages} />
            <Rhapsody siteSettings={siteSettings} resourcesImages={resourcesImages} />
            <Foundation resourcesImages={resourcesImages} />
        </main>
    )
}
