import Image from "next/image"
import how from "@/public/how.webp"
import { Reveal } from "../ui/reveal"

export const How = () => {
    return (
        <section className="min-h-screen flex items-center gap-10 lg:gap-20  px-4 lg:px-8 mt-[144px]">
            <div className="bg-accent text-accent-foreground flex flex-col lg:flex-row lg:items-center lg:gap-24 gap-10 rounded-4xl overflow-hidden pt-10">
                <div className="flex flex-col lg:gap-10 lg:w-2/5">
                    <h2 className="px-10 lg:p-10 text-4xl lg:text-7xl capitalize whitespace-nowrap">How We <br /> Began.</h2>
                    <Reveal rotate={-6} className="hidden lg:block">
                        <Image src={how.src} alt="How We Began" width={700} height={700} className="rounded-4xl -ml-20 -rotate-[8deg]" />
                    </Reveal>
                </div>

                <p className="text-lg lg:text-2xl px-10 lg:p-16 lg:w-3/5">
                    Oasis began with a simple but powerful conviction: that the gospel belongs on college campuses.
                    <br />
                    <br />
                    When Pastor Deji moved to the United States for university, he began sharing the message of God&apos;s love with fellow students one conversation, one relationship, one campus at a time. What started as personal evangelism grew into organized fellowship, leadership development, and campus gatherings.
                    <br />
                    <br />
                    As students graduated, relocated, and carried the vision forward, Oasis expanded beyond a single campus into multiple states and universities. Today, Oasis continues to grow through intentional, student-led communities united by one mission and one message.
                </p>

                <Reveal rotate={-6} className="block lg:hidden">
                    <Image src={how.src} alt="How We Began" width={600} height={600} className="rounded-4xl -ml-20 -rotate-[8deg]" />
                </Reveal>
            </div>
        </section>
    )
}