import { Button } from "../ui/button"
import foundation from "@/public/foundation.webp"
import Image from "next/image"

export const Foundation = () => {
    return (
        <section id="foundation-school" className="scroll-mt-24 p-4 lg:p-8">
            <div className="lg:h-[80vh] p-4 lg:p-8 bg-primary text-background flex lg:flex-row flex-col-reverse overflow-hidden gap-10 rounded-4xl relative">
                <div className="flex flex-col justify-between lg:w-3/5 h-full lg:pb-5 gap-8">
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
                <Image src={foundation.src} alt="Foundation School" width={600} height={600} className="xl:w-[800px] rounded-4xl lg:absolute -right-16 -top-32 -rotate-8" />
            </div>
        </section>
    )
}