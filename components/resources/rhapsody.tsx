import Image from "next/image"
import Link from "next/link"
import rhapsody1 from "@/public/rhapsody-1.png"
import rhapsody2 from "@/public/rhapsody-2.png"
import { Button } from "../ui/button"
import { optimizedImageUrl } from "@/sanity/lib/image"
import { getCta, type SiteSettings } from "@/sanity/lib/queries/siteSettings"
import type { ResourcesPageImages } from "@/sanity/lib/queries/pageImages"

interface RhapsodyProps {
    siteSettings: SiteSettings | null
    resourcesImages: ResourcesPageImages | null
}

export const Rhapsody = ({ siteSettings, resourcesImages }: RhapsodyProps) => {
    const cta = getCta(siteSettings, 'resources_rhapsody')
    const img1Src = resourcesImages?.rhapsodyImage1?.asset
        ? optimizedImageUrl(resourcesImages.rhapsodyImage1.asset, 800)
        : rhapsody1.src
    const img2Src = resourcesImages?.rhapsodyImage2?.asset
        ? optimizedImageUrl(resourcesImages.rhapsodyImage2.asset, 400)
        : rhapsody2.src

    return (
        <section id="rhapsody" className="scroll-mt-24 min-h-[70vh] px-4 lg:px-8 bg-foreground text-background grid grid-cols-1 lg:grid-cols-2 overflow-hidden pt-10 gap-10 relative">
            <Image src={img2Src} alt={resourcesImages?.rhapsodyImage2?.alt || "Rhapsody of Realities"} width={300} height={300} className="rounded-4xl -mt-12 rotate-20 absolute top-0 right-0 hidden lg:block" />
            <div className="flex flex-col justify-between lg:gap-10 lg:w-3/5 w-full">
                <h2 className="lg:p-10 text-4xl lg:text-7xl capitalize whitespace-nowrap">
                    Rhapsody <br /> of Realities.
                </h2>
                <Image src={img1Src} alt={resourcesImages?.rhapsodyImage1?.alt || "Rhapsody of Realities"} width={800} height={800} className="rounded-4xl -ml-20 -rotate-[8deg] hidden lg:block" />
            </div>
            <div className="flex flex-col gap-10 justify-end lg:pb-24 w-[90%]">
                <p className="text-lg lg:text-2xl">Rhapsody of Realities is a daily devotional offering inspired teaching, Scripture-based insights, and practical application for everyday Christian living.</p>
                <Button
                    variant="primary"
                    className="w-fit"
                    asChild
                >
                    <Link
                        href={cta.href}
                        target={cta.isExternal ? "_blank" : undefined}
                        rel={cta.isExternal ? "noopener noreferrer" : undefined}
                    >
                        {cta.label}
                    </Link>
                </Button>
            </div>
            <Image src={img1Src} alt={resourcesImages?.rhapsodyImage1?.alt || "Rhapsody of Realities"} width={500} height={500} className="rounded-4xl -rotate-[8deg] block lg:hidden" />

        </section>
    )
}
