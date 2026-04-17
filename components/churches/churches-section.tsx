import { ChurchSide } from "iconoir-react"
import { ChurchCard } from "./church-card"
import type { Location } from "@/sanity/lib/queries/locations"

export function ChurchesSection({ churches }: { churches: Location[] }) {
    return (
        <section className="px-4 lg:px-10 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                {/* Left sticky panel */}
                <div className="lg:sticky lg:top-32 lg:self-start lg:w-1/2 flex flex-col gap-6">
                    <div className="bg-secondary rounded-2xl p-3 w-fit">
                        <ChurchSide className="size-6" />
                    </div>

                    <h2 className="font-heading text-4xl lg:text-6xl">
                        Oasis Churches.
                    </h2>

                    <div className="flex flex-col gap-4 text-muted-foreground max-w-lg">
                        <p>
                            Our Oasis on-campus churches are located within or directly connected to university campuses, serving students where they live, study, and gather.
                        </p>
                        <p>
                            Our Oasis off-campus churches serve graduates, young professionals, and members in surrounding cities, providing continuity beyond the university environment.
                        </p>
                        <p>
                            Together, these churches act as spiritual anchors, supporting discipleship, leadership development, and long-term community growth.
                        </p>
                    </div>
                </div>

                {/* Right scrolling cards */}
                <div className="lg:w-1/2 flex flex-col gap-7">
                    {churches.map((church) => (
                        <ChurchCard key={church._id} location={church} />
                    ))}
                </div>
            </div>
        </section>
    )
}
