import Link from "next/link"
import { MapPin } from "lucide-react"
import { FavouriteBook, Instagram } from "iconoir-react"
import { Button } from "@/components/ui/button"
import type { Location } from "@/sanity/lib/queries/locations"
import { getLocationColor } from "@/components/map/use-location-colors"

export function CampusCard({ location }: { location: Location }) {
    const color = getLocationColor(location._id)
    const mapHref = `/locations?type=${location.type}&id=${encodeURIComponent(location._id)}`

    return (
        <article className="flex h-full flex-col gap-6 rounded-2xl border border-secondary bg-background p-6">
            <div
                className="w-fit rounded-2xl p-3"
                style={{ backgroundColor: color.bg }}
                aria-hidden
            >
                <FavouriteBook className="size-6" color={color.icon} />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2">
                <h3 className="font-heading text-xl lg:text-2xl">{location.name}</h3>
                {location.universities && location.universities.length > 0 && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {location.universities.join(", ")}
                    </p>
                )}
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-secondary pt-4">
                {location.instagram && (
                    <Button variant="primary" size="sm" asChild>
                        <a
                            href={location.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Connect with ${location.name} on Instagram`}
                        >
                            <Instagram className="size-4" aria-hidden />
                            Tap to Connect
                        </a>
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`View ${location.name} on map`}
                    asChild
                >
                    <Link href={mapHref}>
                        <MapPin className="size-4" aria-hidden />
                    </Link>
                </Button>
            </div>
        </article>
    )
}
