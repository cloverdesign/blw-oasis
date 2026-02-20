import Link from "next/link"
import { Button } from "../ui/button"

export const CTA = () => {
    return (
        <section className="px-4 lg:px-10 py-12 lg:py-20">
            <div className="max-w-2xl mx-auto text-center flex flex-col gap-8">
                <p className="text-lg lg:text-xl text-muted-foreground">
                    Join us in making a difference! Your generosity fuels our mission to spread love, hope, and positive change in our community and beyond. Give today and be a part of something bigger.
                </p>
                <div>
                    <Button variant="primary" asChild>
                        <Link href="#give-today">Give Now</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
