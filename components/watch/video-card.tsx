import Link from "next/link"
import { Play } from "lucide-react"
import { getYouTubeThumbnailUrl } from "@/lib/youtube"

type VideoCardProps = {
    title: string
    slug: string
    description: string | null
    thumbnailUrl: string | null
    youtubeUrl: string
}

export const VideoCard = ({
    title,
    slug,
    description,
    thumbnailUrl,
    youtubeUrl,
}: VideoCardProps) => {
    const bgImage = thumbnailUrl || getYouTubeThumbnailUrl(youtubeUrl)

    return (
        <Link href={`/watch/${slug}`}>
            <div
                className="relative rounded-4xl h-[500px] lg:h-[600px] overflow-hidden flex flex-col justify-end text-background group cursor-pointer"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Play className="size-8 text-white fill-white ml-1" />
                    </div>
                </div>

                <div className="relative p-8 flex flex-col gap-3">
                    <h3 className="font-heading text-3xl lg:text-4xl font-semibold">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-white/80 line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}
