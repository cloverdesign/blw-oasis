"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCta, type SiteSettings } from "@/sanity/lib/queries/siteSettings"

interface StaticMapSectionProps {
    children?: React.ReactNode
    siteSettings: SiteSettings | null
}

export function StaticMapSection({ children, siteSettings }: StaticMapSectionProps) {
    const primaryCta = getCta(siteSettings, 'home_map_primary')
    const secondaryCta = getCta(siteSettings, 'home_map_secondary')

    return (
        <section className="relative flex flex-col gap-10 pt-44 lg:gap-20">
            <div className="flex flex-col gap-8 items-center lg:flex-row lg:items-end lg:justify-between">
                <h1 className="font-heading text-center lg:text-left text-4xl capitalize lg:text-6xl">
                    Your Campus <br /> Could Be Next.
                </h1>
                <div className="flex max-w-md flex-col gap-6 text-center lg:text-right">
                    <p className="text-muted-foreground">
                        Oasis is growing across the United States. Join a campus
                        fellowship, attend an event, or help us bring Oasis to
                        your university.
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-end gap-3">
                        <Button variant="primary" asChild>
                            <Link href={primaryCta.href} target={primaryCta.isExternal ? "_blank" : undefined}>
                                {primaryCta.label}
                            </Link>
                        </Button>
                        <Button variant="default" asChild>
                            <Link href={secondaryCta.href} target={secondaryCta.isExternal ? "_blank" : undefined}>
                                {secondaryCta.label}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="relative h-screen w-full overflow-hidden rounded-3xl bg-muted">
                {children}
            </div>
        </section>
    )
}
