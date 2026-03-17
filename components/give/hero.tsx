import Image from "next/image"
import giveHero from "@/public/give.webp"
import { Reveal } from "../ui/reveal"

export const Hero = () => {
    return (
        <section className="px-4 lg:px-10 py-8 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center">
                <Reveal rotate={-5} amount={0} className="w-full lg:w-1/2 relative aspect-3/4 max-h-[70vh] shrink-0">
                    <Image
                        src={giveHero}
                        alt="Hands holding a yellow flower"
                        fill
                        className="object-cover rounded-4xl -rotate-3"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                </Reveal>
                <Reveal delay={0.15} amount={0} className="flex flex-col gap-6 lg:gap-8 lg:w-1/3">
                    <h1 className="text-4xl lg:text-6xl capitalize font-heading">
                        Partner With Us.
                    </h1>
                    <p>
                        Your generous support empowers Oasis to create life-changing experiences for college students across the United States.
                    </p>
                    <p>
                        Through your giving, we are able to reach students with the message of Jesus Christ, build thriving campus communities, develop student leaders, and support outreach and discipleship initiatives.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}
