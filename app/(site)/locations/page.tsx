import type { Metadata } from "next";
import { getLocations } from "@/sanity/lib/queries/locations"
import { LocationsPage } from "@/components/locations/locations-page"

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find a BLW Oasis campus or church near you. Browse our locations and get directions to join a service.",
}

export default async function LocationsRoute({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const [locations, params] = await Promise.all([
    getLocations(),
    searchParams,
  ])

  const initialType =
    params.type === "campus" || params.type === "church"
      ? params.type
      : undefined

  return <LocationsPage locations={locations} initialType={initialType} />
}
