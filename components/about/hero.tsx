import { Button } from "../ui/button"

export const Hero = () => {
    return (
        <section className="flex flex-col items-center gap-10 lg:gap-20  px-4 lg:px-10">
            <h1 className="text-5xl lg:text-8xl text-center capitalize">Who We Are.</h1>

            <p className="text-center text-lg lg:text-2xl font-medium lg:w-[60%]">
                Oasis is a Christian campus ministry committed to taking the message of Jesus Christ to students across the United States.
                <br />
                <br />
                What began as the faith of one man armed with the Word of God and a deep desire to reach young people on his campus has grown into a movement impacting thousands of students across multiple states, campuses, and communities.
                <br />
                <br />
If you are in the U.S. and searching for a place to grow spiritually, build community, and live out your faith boldly, we look forward to being part of your journey.
                </p>
        </section>
    )
}