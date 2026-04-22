import { getYouTubeEmbedUrl } from "@/lib/youtube"
import Image from "next/image"

type PlaceholderImage = {
  image: { _id: string; url: string } | null
  alt: string | null
} | null

type LiveSectionProps = {
  title: string | null
  isLive: boolean
  embedCode: string | null
  livePlaceholder: PlaceholderImage
  offlinePlaceholder: PlaceholderImage
}

function getEmbedUrl(embedCode: string | null): string | null {
  if (!embedCode) return null

  const trimmed = embedCode.trim()
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i)
  const candidateUrl = iframeSrcMatch?.[1] ?? trimmed

  const normalizedYoutubeUrl = getYouTubeEmbedUrl(candidateUrl)
  return normalizedYoutubeUrl ?? candidateUrl
}

export const LiveSection = ({
  title,
  isLive,
  embedCode,
  livePlaceholder,
  offlinePlaceholder,
}: LiveSectionProps) => {
  const embedUrl = getEmbedUrl(embedCode)
  const currentPlaceholder = isLive ? livePlaceholder : offlinePlaceholder

  return (
    <section className="px-4 lg:px-10">
      <div className="flex flex-col gap-6">
        {isLive && (
          <div className="flex items-center gap-3">
            <span className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full size-3 bg-red-600" />
            </span>
            <h2 className="text-2xl lg:text-4xl font-semibold">
              {title ?? "We're Live"}
            </h2>
          </div>
        )}

        {isLive && embedUrl ? (
          <div className="aspect-[4/5] w-full rounded-4xl overflow-hidden bg-foreground lg:aspect-video">
            <iframe
              src={embedUrl}
              title={title ?? "Live stream"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        ) : currentPlaceholder?.image?.url ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl bg-foreground lg:aspect-video">
            <Image
              src={currentPlaceholder.image.url}
              alt={currentPlaceholder.alt ?? (isLive ? "Live stream placeholder" : "Offline live stream placeholder")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            {!isLive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                <p className="rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white">
                  We&apos;re currently offline
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-[4/5] w-full rounded-4xl bg-foreground/90 text-white flex items-center justify-center text-center px-6 lg:aspect-video">
            <p className="text-sm lg:text-base">
              {isLive
                ? "The livestream will be available shortly."
                : "No livestream is active right now. Check back soon."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
