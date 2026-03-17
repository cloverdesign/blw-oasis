import hero from "@/public/hero.png"
import { Reveal } from "../ui/reveal"

export const Hero = () => {
    return (
        <section className="px-4 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-10 text-center p-8 lg:p-16 relative z-2">
                <Reveal as="h1" amount={0} className="text-5xl lg:text-8xl capitalize">
                    Experience <br /> Oasis.
                </Reveal>
                <Reveal amount={0} delay={0.15} className="lg:w-1/2">
                    <p>
                        Watch messages, worship moments, campus highlights, and more
                        from the Oasis community.
                    </p>
                </Reveal>
            </div>
            <div
                className="h-[70vh] rounded-4xl"
                style={{
                    backgroundImage: `url(${hero.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
        </section>
    )
}
