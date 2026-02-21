import { Events } from "@/components/home/events";
import { Hero } from "@/components/home/hero";
import { HeroGallery } from "@/components/home/hero-gallery";
import { HomeMap } from "@/components/home/home-map";
import { Who } from "@/components/home/who";
import { LiveSection } from "@/components/watch/live-section";
import { getEvents } from "@/sanity/lib/queries/events";
import { getLocations } from "@/sanity/lib/queries/locations";
import { getLiveStatus } from "@/lib/youtube";

export default async function Home() {
  const [locations, liveStatus, events] = await Promise.all([
    getLocations(),
    getLiveStatus(),
    getEvents(),
  ]);

  return (
    <main className="pt-20 lg:pt-36">
      <Hero />
      <Who />
      <HeroGallery />
      <Events events={events} />
      {liveStatus.isLive && (
        <LiveSection
          isLive={liveStatus.isLive}
          liveVideoId={liveStatus.videoId}
          liveTitle={liveStatus.title}
          liveThumbnail={liveStatus.thumbnail}
        />
      )}
      <HomeMap locations={locations} />
    </main>
  );
}
