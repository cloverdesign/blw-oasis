import type { Metadata } from "next";
import { Events } from "@/components/home/events";
import { Hero } from "@/components/home/hero";
import { HeroGallery } from "@/components/home/hero-gallery";
import { DeferredHomeMap } from "@/components/home/deferred-home-map";
import { Who } from "@/components/home/who";
import { LiveSection } from "@/components/watch/live-section";
import { getEvents } from "@/sanity/lib/queries/events";
import { getLocations } from "@/sanity/lib/queries/locations";
import { getLiveStream } from "@/sanity/lib/queries/liveStream";
import { getSiteSettings } from "@/sanity/lib/queries/siteSettings";
import { getHomePageImages } from "@/sanity/lib/queries/pageImages";

export const metadata: Metadata = {
  title: { absolute: "BLW Oasis | Miracles Happen Here" },
  description:
    "Welcome to BLW Oasis — a campus ministry where miracles happen. Join us for life-changing services, events, and community.",
  openGraph: {
    images: [{ url: "/hero.webp" }],
  },
};

export default async function Home() {
  const [locations, liveStream, events, siteSettings, homeImages] = await Promise.all([
    getLocations(),
    getLiveStream(),
    getEvents(),
    getSiteSettings(),
    getHomePageImages(),
  ]);

  const showLive = liveStream?.isEnabled && liveStream.embedCode

  return (
    <main className="pt-20 lg:pt-36">
      <Hero siteSettings={siteSettings} homeImages={homeImages} />
      <Who />
      <HeroGallery homeImages={homeImages} />
      <Events events={events} />
      {showLive && (
        <LiveSection
          title={liveStream.title}
          isLive={Boolean(liveStream.isEnabled)}
          embedCode={liveStream.embedCode}
          livePlaceholder={liveStream.livePlaceholder}
          offlinePlaceholder={liveStream.offlinePlaceholder}
        />
      )}
      <DeferredHomeMap locations={locations} siteSettings={siteSettings} />
    </main>
  );
}
