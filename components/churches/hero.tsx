import { getLocations } from "@/sanity/lib/queries/locations"
import { LocationMap } from "../map/location-map"
import Link from "next/link"
import { GlobeHemisphereWestIcon } from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "../ui/reveal"

export async function Hero() {
    const locations = await getLocations()

    return (
        <section className="h-[50vh] lg:h-screen">
            <div className="overflow-hidden size-full relative">
                <div className="px-4 flex flex-col gap-8 lg:px-10 absolute bottom-20 left-10 z-1000 text-background">
                    <Reveal as="h1" amount={0} className="text-5xl lg:text-8xl capitalize">Our <br /> Structure.</Reveal>
                    <Reveal amount={0} delay={0.15}>
                        <p className="lg:w-[50%]">
                            Oasis is made up of student-led fellowships across college campuses in North America, alongside church communities that operate both on campus and off campus in key regions.
                        </p>
                    </Reveal>
                </div>
                <LocationMap locations={locations} mode="static" showLoading={false} />
                <Link href="/locations" className="absolute bottom-10 right-10 z-1000 bg-accent text-foreground rounded-full p-4 active:scale-95 transition-all">
                    <GlobeHemisphereWestIcon className="size-10" />
                </Link>
            </div>
        </section >
    )
}
