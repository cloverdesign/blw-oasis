import { Button } from "../ui/button"
import foundation from "@/public/foundation.png"
import Image from "next/image"

export const Foundation = () => {
    return (
        <section className="p-4 lg:p-8">
            <div className="h-[80vh] p-4 lg:p-8 bg-primary text-background flex overflow-hidden gap-10 rounded-4xl relative">
                <div className="flex flex-col justify-between w-3/5 h-full pb-5">
                    <h2 className="text-4xl lg:text-7xl capitalize whitespace-nowrap">
                        Foundation <br /> School.
                    </h2>
                    <div className="flex flex-col gap-10">
                        <p className="text-lg lg:text-2xl">
                            Foundation School is a structured discipleship program designed to help believers understand the fundamentals of the Christian faith.
                            <br />
                            <br />
                            Duration: 7 weeks
                            <br />
                            Format: Group-based learning
                            <br />
                            Focus: Core doctrines, spiritual growth, and Christian living
                            <br />
                            <br />
                            Foundation School is offered across various Oasis locations and campuses.
                        </p>
                        <Button className="w-fit">
                            Read Rhapsody of Realities
                        </Button>
                    </div>
                </div>
                <Image src={foundation.src} alt="Foundation School" width={500} height={500} className="rounded-4xl absolute -right-8 -top-10 -rotate-8" />
            </div>
        </section>
    )
}