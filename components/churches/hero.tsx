import { getLocations } from "@/sanity/lib/queries/locations"
import { LocationMap } from "../map/location-map"

export async function Hero() {
    const locations = await getLocations()

    return (
        <section className="h-[50vh] lg:h-screen">
            <div className="overflow-hidden size-full relative">
                <div className="px-4 flex flex-col gap-8 lg:px-10 absolute bottom-20 left-10 z-[1000] text-background">
                    <h1 className="text-5xl lg:text-8xl capitalize">Our <br /> Structure.</h1>
                    <p className="lg:w-[50%]">
                        Oasis is made up of student-led fellowships across college campuses in North America, alongside church communities that operate both on campus and off campus in key regions.
                    </p>
                </div>
                <LocationMap locations={locations} mode="static" showLoading={false} />
            </div>
        </section >
    )
}
