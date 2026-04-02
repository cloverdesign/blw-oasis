import hero from "@/public/resources-hero.png"
import { Reveal } from "../ui/reveal"
import { optimizedImageUrl } from "@/sanity/lib/image"
import type { ResourcesPageImages } from "@/sanity/lib/queries/pageImages"

interface HeroProps {
    resourcesImages: ResourcesPageImages | null
}

export const Hero = ({ resourcesImages }: HeroProps) => {
    const bgImage = resourcesImages?.heroImage?.asset
        ? optimizedImageUrl(resourcesImages.heroImage.asset, 1920)
        : hero.src

    return (
        <section className="px-4 lg:px-8">
            <div
                className="h-[70vh] rounded-t-4xl flex flex-col items-center justify-center text-background gap-8 lg:gap-11 text-center p-4"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Reveal as="h1" amount={0} className="text-5xl lg:text-8xl capitalize">
                    Grow in <br /> Your Faith.
                </Reveal>
                <Reveal amount={0} delay={0.15} className="lg:w-1/2">
                    <p>Oasis provides resources designed to help students deepen their walk with God, strengthen their understanding of Scripture, and grow spiritually.</p>
                </Reveal>
            </div>
        </section>
    )
}
