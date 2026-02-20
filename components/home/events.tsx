import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { MapPin } from "iconoir-react"
import { ClockIcon } from "lucide-react"
import type { Event } from "@/sanity/lib/queries/events"

function formatDateBadge(dateStr: string) {
    const d = new Date(dateStr)
    const day = d.getDate().toString().padStart(2, "0")
    const monthYear = d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    return { day, monthYear }
}

function formatWhen(dateStr: string) {
    const d = new Date(dateStr)
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" })
    const dayNum = d.getDate()
    const year = d.getFullYear().toString().slice(-2)
    const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    return `${dayName} ${dayNum} '${year} - ${time}`
}

type EventsProps = {
    events: Event[]
}

export const Events = ({ events }: EventsProps) => {
    if (events.length === 0) return null

    return (
        <section className="pt-44 flex flex-col items-center gap-10 lg:gap-20 mx-10">
            <div className="w-full px-4 lg:px-10 flex justify-center">
                <div className="text-center w-[50%] lg:w-2/5 flex flex-col gap-8">
                    <h1 className="text-4xl lg:text-6xl capitalize">
                        What's Happening <br /> at Oasis.
                    </h1>
                    <p>
                        From campus gatherings to worship nights and conferences,
                        there's always something happening at Oasis.
                    </p>
                </div>
            </div>
            <div className="w-full">
                <Carousel opts={{ align: "start" }} className="w-full relative">
                    <CarouselContent className="-ml-4">
                        {events.map((event) => {
                            const { day, monthYear } = formatDateBadge(event.date)
                            const locationDisplay = [event.venue, event.location?.name].filter(Boolean).join(", ")
                            const bgImage = event.image?.asset?.url ?? "/event-1.png"

                            return (
                                <CarouselItem
                                    key={event._id}
                                    className="basis-full md:basis-1/2 lg:basis-1/3"
                                >
                                    <EventCard
                                        title={event.title}
                                        description={event.description ?? ""}
                                        location={locationDisplay}
                                        day={day}
                                        monthYear={monthYear}
                                        when={formatWhen(event.date)}
                                        image={bgImage}
                                    />
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 p-4 background-foreground text-background rounded-full border-[5px] border-background" />
                    <CarouselNext className="right-12 top-1/2 -translate-y-1/2 p-4 background-foreground text-background rounded-full border-[5px] border-background" />
                </Carousel>
            </div>
        </section>
    )
}

type EventCardProps = {
    title: string
    description: string
    location: string
    day: string
    monthYear: string
    when: string
    image: string
}

const EventCard = ({
    title,
    description,
    location,
    day,
    monthYear,
    when,
    image,
}: EventCardProps) => {
    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="relative rounded-4xl h-[800px] p-8 gap-3 flex flex-col justify-end text-background overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute -top-1 -left-1 bg-background text-foreground p-4 rounded-br-4xl z-10">
                <h1 className="text-6xl">
                    {day}
                </h1>
                <p>
                    {monthYear}
                </p>
            </span>
            <h3 className="relative z-10 font-heading text-4xl font-semibold w-[60%]">{title}</h3>
            <p className="relative z-10 text-sm">
                {description}
            </p>
            <div className="relative z-10 flex gap-3 text-xs">
                <span className="px-3 h-8 flex gap-2 items-center justify-center rounded-full bg-foreground text-background">
                    <MapPin className="size-4" />
                    {location}
                </span>
                <span className="px-3 h-8 flex gap-2 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <ClockIcon className="size-4" />
                    {when}
                </span>
            </div>
        </div>
    )
}
