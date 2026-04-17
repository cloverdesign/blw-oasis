import type { Metadata } from "next";
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getVideoBySlug } from "@/sanity/lib/queries/videos"
import { getYouTubeEmbedUrl } from "@/lib/youtube"

type Params = Promise<{ slug: string }>

export async function generateMetadata({
    params,
}: {
    params: Params
}): Promise<Metadata> {
    const { slug } = await params
    const video = await getVideoBySlug(slug)

    if (!video) return {}

    return {
        title: video.title,
        description:
            video.description || `Watch "${video.title}" on BLW Oasis.`,
        openGraph: {
            images: video.thumbnail?.asset?.url
                ? [{ url: video.thumbnail.asset.url }]
                : undefined,
        },
    }
}

export default async function VideoPage({ params }: { params: Params }) {
    const { slug } = await params
    const video = await getVideoBySlug(slug)

    if (!video) notFound()

    const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl)

    return (
        <main className="pt-20 lg:pt-36 px-4 lg:px-8 pb-20 lg:pb-32">
            <Link
                href="/watch"
                className="inline-flex items-center gap-2 text-sm mb-8 hover:underline"
            >
                <ArrowLeft className="size-4" />
                Back to Watch
            </Link>

            <div className="max-w-5xl mx-auto">
                <div className="aspect-video w-full rounded-3xl overflow-hidden bg-foreground">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-background">
                            Video unavailable
                        </div>
                    )}
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <h1 className="text-3xl lg:text-5xl">{video.title}</h1>
                    {video.publishedAt && (
                        <p className="text-sm text-muted-foreground">
                            {new Date(video.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    )}
                    {video.description && (
                        <p className="text-base lg:text-lg leading-relaxed">
                            {video.description}
                        </p>
                    )}
                    {video.tags && video.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {video.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
