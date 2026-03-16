import { Hero } from "@/components/churches/hero"
import { ChurchesSection } from "@/components/churches/churches-section"
import { CampusesSection } from "@/components/churches/campuses-section"
import { FindLocation } from "@/components/churches/find-location"
import { getLocations } from "@/sanity/lib/queries/locations"

export default async function ChurchesPage() {
    const locations = await getLocations()
    const churches = locations.filter((l) => l.type === "church")
    const campuses = locations.filter((l) => l.type === "campus")

    return (
        <main>
            <Hero />
            <CampusesSection campuses={campuses} />
            <ChurchesSection churches={churches} />
            <FindLocation />
        </main>
    )
}
