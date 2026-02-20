import { CTA } from "@/components/give/cta"
import { GiveToday } from "@/components/give/give-today"
import { Hero } from "@/components/give/hero"
import { WhyWeGive } from "@/components/give/why-we-give"

export default function GivePage() {
    return (
        <main className="pt-20 lg:pt-36">
            <Hero />
            <WhyWeGive />
            <GiveToday />
            <CTA />
        </main>
    )
}
