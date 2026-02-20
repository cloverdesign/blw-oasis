import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FindLocation() {
    return (
        <section className="px-4 lg:px-10 py-16 lg:py-24">
            <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
                <h2 className="font-heading text-4xl lg:text-6xl">
                    Find A Location Near You.
                </h2>

                <p className="text-muted-foreground">
                    Whether you&apos;re looking for a campus fellowship or a church community, Oasis makes it easy to find a location near you.
                </p>

                <div className="flex gap-4">
                    <Button variant="primary" asChild>
                        <Link href="/churches#campuses">Find a Campus</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link href="/churches#churches">Find a Church</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
