import { StaticMapSection } from "@/components/home/static-map-section"
import { LocationMap } from "@/components/map/location-map"
import type { Location } from "@/sanity/lib/queries/locations"

interface HomeMapProps {
    locations: Location[]
}

export function HomeMap({ locations }: HomeMapProps) {
    return (
        <div className="px-4 lg:px-10">
            <StaticMapSection>
                <LocationMap locations={locations} mode="interactive" enableClustering showControls />
            </StaticMapSection>
        </div>
    )
}
