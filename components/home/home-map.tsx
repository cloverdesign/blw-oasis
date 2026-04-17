import { StaticMapSection } from "@/components/home/static-map-section"
import { LocationMap } from "@/components/map/location-map"
import type { Location } from "@/sanity/lib/queries/locations"
import type { SiteSettings } from "@/sanity/lib/queries/siteSettings"

interface HomeMapProps {
    locations: Location[]
    siteSettings: SiteSettings | null
}

export function HomeMap({ locations, siteSettings }: HomeMapProps) {
    return (
        <div className="px-4 lg:px-10">
            <StaticMapSection siteSettings={siteSettings}>
                <LocationMap locations={locations} mode="interactive" enableClustering showControls />
            </StaticMapSection>
        </div>
    )
}
