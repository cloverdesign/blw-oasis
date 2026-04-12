import type { Metadata } from "next";
import { Hero } from "@/components/churches/hero"
import { ChurchesSection } from "@/components/churches/churches-section"
import { CampusesSection } from "@/components/churches/campuses-section"
import { FindLocation } from "@/components/churches/find-location"
import { getLocations } from "@/sanity/lib/queries/locations"

export const metadata: Metadata = {
  title: "Fellowships",
  description:
    "Find BLW Oasis campuses and churches near you. Join our fellowships and be part of a vibrant community of believers.",
};

export default async function ChurchesPage() {
    const locations = await getLocations()
    const churches = locations.filter((l) => l.type === "church")
    const campuses = locations.filter((l) => l.type === "campus")

    return (
        <main>
            <Hero />
            <ChurchesSection churches={churches} />
            <CampusesSection campuses={campuses} />
            <FindLocation />
        </main>
    )
}
