import { Foundation } from "@/components/resources/foundation";
import { Hero } from "@/components/resources/hero";
import { Rhapsody } from "@/components/resources/rhapsody";

export default function ResourcesPage() {
    return (
        <main className="pt-32">
            <Hero />
            <Rhapsody />
            <Foundation />
        </main>
    )
}