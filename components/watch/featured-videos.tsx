import { Video } from "@/sanity/lib/queries/videos"
import { VideoCard } from "./video-card"

type FeaturedVideosProps = {
    videos: Video[]
}

export const FeaturedVideos = ({ videos }: FeaturedVideosProps) => {
    return (
        <section className="px-4 lg:px-8 py-20 lg:py-32">
            <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12 lg:mb-16">
                <h2 className="text-4xl lg:text-6xl capitalize">
                    Featured <br /> Videos.
                </h2>
                <p className="lg:w-2/5 lg:text-right">
                    These highlights capture the heart of Oasis — from powerful
                    messages to worship moments and everything in between.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard
                        key={video._id}
                        title={video.title}
                        slug={video.slug}
                        description={video.description}
                        thumbnailUrl={video.thumbnail?.asset?.url ?? null}
                        youtubeUrl={video.youtubeUrl}
                    />
                ))}
            </div>
        </section>
    )
}
