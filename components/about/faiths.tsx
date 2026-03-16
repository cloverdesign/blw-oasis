import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

export const Faiths = () => {
    const faiths = [
        "The Bible is the inspired Word of God and the final authority for faith and life.",
        "There is one God eternally existing in three persons: Father, Son, and Holy Spirit.",
        "We believe in the deity of Jesus Christ — His virgin birth, sinless life, miracles, death, resurrection, and exaltation.",
        "We Believe in the rapture of the Church and the second coming of Christ.",
        "We Believe in repentance and salvation through faith in Jesus Christ.",
        "We Believe in the sanctifying and empowering work of the Holy Spirit.",
        "We Believe that believers are empowered by the Holy Spirit to live victorious Christian lives.",
        "We Believe in eternal life for the saved and eternal judgment for the lost."
    ]
    return (
        <section className="flex flex-col items-center gap-10 lg:gap-20  px-4 lg:px-8 mt-[144px]">
            <div className="w-full flex flex-col gap-8 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                <h2 className="font-heading text-4xl capitalize lg:text-6xl">
                    Grounded in <br />Faith, Guided by <br /> Truth.
                </h2>
                <div className="flex max-w-md flex-col gap-6">
                    <h3 className="text-2xl font-medium">Statement of Faith</h3>
                    <p className="text-muted-foreground">
                        Our beliefs are founded on the Bible, the inspired and infallible Word of God, and are in full alignment with the doctrines of Christ.
                    </p>
                </div>
            </div>

            <Carousel opts={{ align: "start" }} className="w-full relative">
                <CarouselContent className="-ml-4">
                    {faiths.map((faith, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-full md:basis-1/2 lg:basis-1/4"
                        >
                            <FaithCard faith={faith} pos={index + 1} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 p-4 bg-foreground text-background rounded-full border-[5px] border-background" />
                <CarouselNext className="right-2 top-1/2 -translate-y-1/2 p-4 bg-foreground text-background rounded-full border-[5px] border-background" />
            </Carousel>
        </section>
    )
}

const FaithCard = ({ faith, pos }: { faith: string, pos: number }) => {
    return (
        <div className="h-[300px] bg-primary text-background p-8 rounded-2xl flex flex-col justify-between pointer-events-none">
            <h4 className="text-8xl">{pos}</h4>
            <p>{faith}</p>
        </div>
    )
}