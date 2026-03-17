import contactHero from "@/public/contact-hero.webp"
import { Reveal } from "../ui/reveal"

export const Hero = () => {
    return (
        <section className="px-4 lg:px-10 py-8">
            <div
                className="h-screen min-h-[60vh] relative flex flex-col items-center justify-center rounded-4xl overflow-hidden"
                style={{
                    backgroundImage: `url(${contactHero.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-linear-to-t from-[#001d2372] to-[#00242b00] h-full w-full absolute top-0 left-0 z-1" />
                <div className="flex flex-col items-center justify-center gap-10 text-center text-background p-8 lg:p-16 relative z-2">
                    <Reveal as="h1" amount={0} className="text-4xl lg:text-6xl xl:text-8xl font-heading capitalize">
                        Get In Touch.
                    </Reveal>
                    <Reveal amount={0} delay={0.1}>
                        <p className="text-lg lg:text-xl mt-4 font-medium">
                            We&apos;d love to hear from you.
                        </p>
                    </Reveal>
                    <Reveal amount={0} delay={0.2}>
                        <p className="text-base lg:text-lg mt-4 max-w-2xl opacity-95">
                            Whether you have questions, want to get connected, are interested in starting Oasis at your university, or simply want to learn more, our team is here to help.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
