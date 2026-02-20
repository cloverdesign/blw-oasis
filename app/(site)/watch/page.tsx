import { Hero } from "@/components/watch/hero"
import { FeaturedVideos } from "@/components/watch/featured-videos"
import { LiveSection } from "@/components/watch/live-section"
import { getVideos } from "@/sanity/lib/queries/videos"
import { getLiveStatus } from "@/lib/youtube"

export default async function WatchPage() {
    const [videos, liveStatus] = await Promise.all([
        getVideos(),
        getLiveStatus(),
    ])

    return (
        <main className="pt-20 lg:pt-36">
            <Hero />
            <FeaturedVideos videos={videos} />
            <LiveSection
                isLive={liveStatus.isLive}
                liveVideoId={liveStatus.videoId}
                liveTitle={liveStatus.title}
                liveThumbnail={liveStatus.thumbnail}
            />
        </main>
    )
}
