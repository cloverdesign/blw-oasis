import { FavouriteBook } from "iconoir-react"
import { CampusCard } from "./campus-card"
import type { Location } from "@/sanity/lib/queries/locations"

export function CampusesSection({ campuses }: { campuses: Location[] }) {
    return (
        <section className="px-4 lg:px-10 py-16 lg:py-24">
            <div className="flex flex-col items-center text-center gap-6 mb-12">
                <div className="bg-secondary rounded-2xl p-3 w-fit">
                    <FavouriteBook className="size-6" />
                </div>

                <h2 className="font-heading text-4xl lg:text-6xl">
                    Oasis Campuses.
                </h2>

                <p className="text-muted-foreground max-w-2xl">
                    Oasis campus fellowships operate within colleges and universities and are primarily student-led. These fellowships focus on evangelism, discipleship, leadership training, and community building on campus.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campuses.map((campus) => (
                    <CampusCard key={campus._id} location={campus} />
                ))}
            </div>
        </section>
    )
}
