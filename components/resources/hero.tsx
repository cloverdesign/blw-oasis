import hero from "@/public/resources-hero.png"

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
                <h1 className="text-5xl lg:text-8xl capitalize">
                    Grow in <br /> Your Faith.
                </h1>
                <p className="lg:w-1/2">Oasis provides resources designed to help students deepen their walk with God, strengthen their understanding of Scripture, and grow spiritually.</p>
            </div>
        </section>
    )
}