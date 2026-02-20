import Link from "next/link"
import { Play } from "lucide-react"

type LiveSectionProps = {
    isLive: boolean
    liveVideoId?: string | null
    liveTitle?: string | null
    liveThumbnail?: string | null
}

export const LiveSection = ({
    isLive,
    liveVideoId,
    liveTitle,
    liveThumbnail,
}: LiveSectionProps) => {
    const backgroundImage = isLive && liveThumbnail ? liveThumbnail : "/hero.png"
    const liveUrl = liveVideoId
        ? `https://www.youtube.com/watch?v=${liveVideoId}`
        : "#"

    return (
        <section className="px-4 lg:px-8 pb-20 lg:pb-32">
            <div
                className="relative rounded-4xl h-[500px] lg:h-[700px] overflow-hidden flex flex-col justify-end text-background"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {isLive && (
                    <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10">
                        <span className="bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                            Live
                        </span>
                    </div>
                )}

                {isLive && liveVideoId && (
                    <Link
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                            <Play className="size-10 text-white fill-white ml-1" />
                        </div>
                    </Link>
                )}

                <div className="relative p-8 lg:p-12 flex flex-col gap-4">
                    <h2 className="text-4xl lg:text-6xl capitalize">
                        Don&apos;t Miss <br /> Out.
                    </h2>
                    <p className="lg:w-2/5 text-white/80">
                        {isLive
                            ? liveTitle ??
                              "We're live right now — join us for worship, the Word, and community."
                            : "Check back for our next live stream."}
                    </p>
                </div>
            </div>
        </section>
    )
}
