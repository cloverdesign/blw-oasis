import hero from "@/public/resources-hero.png"
import { Reveal } from "../ui/reveal"

export const Hero = () => {
    return (
        <section className="px-4 lg:px-8">
            <div
                className="h-[70vh] rounded-t-4xl flex flex-col items-center justify-center text-background gap-8 lg:gap-11 text-center p-4"
                style={{
                    backgroundImage: `url(${hero.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Reveal as="h1" amount={0} className="text-5xl lg:text-8xl capitalize">
                    Grow in <br /> Your Faith.
                </Reveal>
                <Reveal amount={0} delay={0.15} className="lg:w-1/2">
                    <p>Oasis provides resources designed to help students deepen their walk with God, strengthen their understanding of Scripture, and grow spiritually.</p>
                </Reveal>
            </div>
        </section>
    )
}