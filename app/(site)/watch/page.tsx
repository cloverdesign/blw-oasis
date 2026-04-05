import type { Metadata } from "next";
import { Hero } from "@/components/watch/hero"
import { FeaturedVideos } from "@/components/watch/featured-videos"
import { LiveSection } from "@/components/watch/live-section"
import { getVideos } from "@/sanity/lib/queries/videos"
import { getLiveStream } from "@/sanity/lib/queries/liveStream"
import { getHighlightReel } from "@/sanity/lib/queries/highlightReel"

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch sermons, teachings, and live services from BLW Oasis. Stay connected and grow in the Word from anywhere.",
};

export default async function WatchPage() {
    const [videos, liveStream, highlightReel] = await Promise.all([
        getVideos(),
        getLiveStream(),
        getHighlightReel(),
    ])

    const showLive = liveStream?.isEnabled && liveStream.embedCode

    return (
        <main className="pt-20 lg:pt-36">
            <Hero highlightReel={highlightReel} />
            {showLive && (
                <LiveSection
                    title={liveStream.title}
                    embedCode={liveStream.embedCode!}
                />
            )}
            <FeaturedVideos videos={videos} />
        </main>
    )
}
