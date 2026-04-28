import Image from "next/image"
import how from "@/public/how.webp"
import { Reveal } from "../ui/reveal"
import { optimizedImageUrl } from "@/sanity/lib/image"
import type { AboutPageImages } from "@/sanity/lib/queries/pageImages"

interface HowProps {
    aboutImages: AboutPageImages | null
}

export const How = ({ aboutImages }: HowProps) => {
    const imgSrc = aboutImages?.howWeBegan?.asset
        ? optimizedImageUrl(aboutImages.howWeBegan.asset, 1400)
        : how.src
    const imgAlt = aboutImages?.howWeBegan?.alt || "How We Began"

    return (
        <section className="min-h-screen flex items-center gap-10 lg:gap-20  px-4 lg:px-8 mt-[144px]">
            <div className="bg-accent text-accent-foreground flex flex-col lg:flex-row lg:items-center lg:gap-24 gap-16 rounded-4xl overflow-hidden pt-10">
                <div className="flex flex-col lg:gap-10 lg:w-2/5">
                    <h2 className="px-10 lg:p-10 text-4xl lg:text-7xl capitalize whitespace-nowrap">Our <br /> Foundation.</h2>
                    <Reveal rotate={-6} className="hidden lg:block">
                        <Image src={imgSrc} alt={imgAlt} width={700} height={700} className="rounded-4xl -ml-20 -rotate-[8deg]" />
                    </Reveal>
                </div>

                <p className="text-lg lg:text-2xl px-10 lg:p-16 lg:w-3/5">
                    Oasis is built on the global vision of Chris Oyakhilome, whose ministry, LoveWorld Inc., has impacted millions around the world with the message of faith, hope, and salvation through Jesus Christ.
                    <br />
                    <br />
                    With a strong emphasis on evangelism, discipleship, and spiritual growth, this vision extends to college campuses; raising students who are bold in their faith and committed to transforming their world.
                    <br />
                    <br />
                    Oasis represents this vision in action across universities in the United States, building student-led communities where the Word of God is taught, lived, and shared consistently.
                </p>

                <Reveal rotate={-6} className="block lg:hidden">
                    <Image src={imgSrc} alt={imgAlt} width={600} height={600} className="rounded-4xl -ml-20 -rotate-[8deg]" />
                </Reveal>
            </div>
        </section>
    )
}
