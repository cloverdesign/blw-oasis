import type { Metadata } from "next";
import { Hero } from "@/components/watch/hero"
import { FeaturedVideos } from "@/components/watch/featured-videos"
import { LiveSection } from "@/components/watch/live-section"
import { getVideos } from "@/sanity/lib/queries/videos"
import { getLiveStatus } from "@/lib/youtube"

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch sermons, teachings, and live services from BLW Oasis. Stay connected and grow in the Word from anywhere.",
};

export default async function WatchPage() {
    const [videos, liveStatus] = await Promise.all([
        getVideos(),
        getLiveStatus(),
    ])

    return (
        <main className="pt-20 lg:pt-36">
            <Hero />
            <FeaturedVideos videos={videos} />
            {liveStatus.isLive && (
                <LiveSection
                    isLive={liveStatus.isLive}
                    liveVideoId={liveStatus.videoId}
                    liveTitle={liveStatus.title}
                    liveThumbnail={liveStatus.thumbnail}
                />
            )}
        </main>
    )
}
