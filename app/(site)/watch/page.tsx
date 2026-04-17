import type { Metadata } from "next";
import { FeaturedVideos } from "@/components/watch/featured-videos"
import { LiveSection } from "@/components/watch/live-section"
import { getVideos } from "@/sanity/lib/queries/videos"
import { getLiveStream } from "@/sanity/lib/queries/liveStream"

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch sermons, teachings, and live services from BLW Oasis. Stay connected and grow in the Word from anywhere.",
};

export default async function WatchPage() {
    const [videos, liveStream] = await Promise.all([
        getVideos(),
        getLiveStream(),
    ])
    const isLive = Boolean(liveStream?.isEnabled)

    return (
        <main className="pt-20 lg:pt-36">
            <LiveSection
                title={liveStream?.title ?? null}
                isLive={isLive}
                embedCode={liveStream?.embedCode ?? null}
                livePlaceholder={liveStream?.livePlaceholder ?? null}
                offlinePlaceholder={liveStream?.offlinePlaceholder ?? null}
            />
            <FeaturedVideos videos={videos} />
        </main>
    )
}
