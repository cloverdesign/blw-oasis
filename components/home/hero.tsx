import { Button } from "../ui/button"
import { Reveal } from "../ui/reveal"
import Link from "next/link"
import { optimizedImageUrl } from "@/sanity/lib/image"
import { getCta, type SiteSettings } from "@/sanity/lib/queries/siteSettings"
import type { HomePageImages } from "@/sanity/lib/queries/pageImages"

interface HeroProps {
    siteSettings: SiteSettings | null
    homeImages: HomePageImages | null
}

export const Hero = ({ siteSettings, homeImages }: HeroProps) => {
    const heroCtа = getCta(siteSettings, 'home_hero_primary')
    const bgImage = homeImages?.heroBackground?.asset
        ? optimizedImageUrl(homeImages.heroBackground.asset, 1920)
        : "/hero.webp"

    return (
        <section className="flex flex-col items-center gap-10 lg:gap-20 lg:px-10 lg:min-h-[calc(100vh-144px)] justify-between relative">
            <Reveal as="h1" amount={0} className="text-5xl lg:text-8xl text-center capitalize sticky top-0 mt-20">Welcome to oasis.</Reveal>
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                className="relative lg:h-[60vh] w-full lg:rounded-t-4xl flex flex-col items-center justify-between gap-10 lg:gap-20 px-8 lg:px-20 py-20"
            >
                <Reveal as="h1" delay={0.15} amount={0} className="relative z-2 text-background text-5xl lg:text-8xl text-center capitalize">Miracles happen here.</Reveal>
                <div className="relative z-2 flex flex-col lg:flex-row gap-10 items-center justify-between">
                    <p className="text-background text-center lg:text-left w-full lg:w-1/2">Oasis is a Christian campus ministry reaching students across the United States, creating spaces where faith comes alive, purpose is discovered, and lives are transformed.</p>

                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
                        <Button variant="primary" asChild>
                            <Link href={heroCtа.href} target={heroCtа.isExternal ? "_blank" : undefined}>
                                {heroCtа.label}
                            </Link>
                        </Button>
                        <Button variant="ghost" className="text-background" asChild>
                            <Link href="/locations?type=campus">
                                Find a Campus Near You
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="bg-gradient-to-t from-[#000000ab] to-[#00242b00] h-full w-full absolute top-0 left-0 z-[1]" />
            </div>
        </section>
    )
}
