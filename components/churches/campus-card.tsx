import Link from "next/link"
import { MapPin } from "lucide-react"
import { ArrowUpRight, FavouriteBook } from "iconoir-react"
import { Button } from "@/components/ui/button"
import type { Location } from "@/sanity/lib/queries/locations"
import { getLocationColor } from "@/components/map/use-location-colors"

export function CampusCard({ location }: { location: Location }) {
    const color = getLocationColor(location._id)
    const mapHref = `/locations?type=${location.type}&id=${encodeURIComponent(location._id)}`

    return (
        <article className="flex h-full flex-col gap-6 rounded-2xl border border-secondary bg-background p-6">
            <div className="flex items-start justify-between gap-4">
                <div
                    className="w-fit rounded-2xl p-3"
                    style={{ backgroundColor: color.bg }}
                    aria-hidden
                >
                    <FavouriteBook className="size-6" color={color.icon} />
                </div>
                {location.linkUrl && (
                    <Button
                        variant="primary"
                        size="icon-sm"
                        className="shrink-0 rounded-full"
                        asChild
                    >
                        <a
                            href={location.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${location.name}`}
                        >
                            <ArrowUpRight />
                        </a>
                    </Button>
                )}
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2">
                <h3 className="font-heading text-xl lg:text-2xl">{location.name}</h3>
                {location.universities && location.universities.length > 0 && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {location.universities.join(", ")}
                    </p>
                )}
            </div>

            <div className="mt-auto border-t border-secondary pt-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 gap-2 px-2 text-foreground -ml-2"
                    asChild
                >
                    <Link href={mapHref}>
                        <MapPin className="size-4 shrink-0" aria-hidden />
                        View on map
                    </Link>
                </Button>
            </div>
        </article>
    )
}
