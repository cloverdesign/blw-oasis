import { Reveal } from "../ui/reveal"
import { optimizedImageUrl } from "@/sanity/lib/image"
import type { HighlightReel } from "@/sanity/lib/queries/highlightReel"
import { getYouTubeEmbedUrl } from "@/lib/youtube"

interface HeroProps {
    highlightReel: HighlightReel | null
}

export const Hero = ({ highlightReel }: HeroProps) => {
    const embedUrl = highlightReel?.videoUrl
        ? getYouTubeEmbedUrl(highlightReel.videoUrl)
        : null

    const bgImage = highlightReel?.thumbnail?.asset
        ? optimizedImageUrl(highlightReel.thumbnail.asset, 1920)
        : "/hero.png"

    return (
        <section className="px-4 lg:px-10">
            <div className="relative z-2 flex flex-col items-center justify-center gap-10 p-8 text-center lg:p-16">
                <Reveal as="h1" amount={0} className="text-5xl lg:text-8xl capitalize">
                    Experience <br /> Oasis.
                </Reveal>
                <Reveal amount={0} delay={0.15} className="lg:w-1/2">
                    <p>
                        {highlightReel?.description || "Watch messages, worship moments, campus highlights, and more from the Oasis community."}
                    </p>
                </Reveal>
            </div>
            {embedUrl ? (
                <div className="aspect-video w-full overflow-hidden rounded-4xl bg-foreground">
                    <iframe
                        src={embedUrl}
                        title={highlightReel?.title || "Highlight reel"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full border-0"
                    />
                </div>
            ) : (
                <div
                    className="h-[70vh] w-full rounded-4xl"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )}
        </section>
    )
}
