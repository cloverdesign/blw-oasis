import { Button } from "@/components/ui/button"

interface StaticMapSectionProps {
    children?: React.ReactNode
}

export function StaticMapSection({ children }: StaticMapSectionProps) {
    return (
        <section className="relative flex flex-col gap-10 pt-44 lg:gap-20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <h1 className="font-heading text-4xl capitalize lg:text-6xl">
                    Your Campus <br /> Could Be Next.
                </h1>
                <div className="flex max-w-md flex-col gap-6 text-right">
                    <p className="text-muted-foreground">
                        Oasis is growing across the United States. Join a campus
                        fellowship, attend an event, or help us bring Oasis to
                        your university.
                    </p>
                    <div className="flex flex-wrap justify-end gap-3">
                        <Button variant="primary">Join Oasis</Button>
                        <Button variant="default">
                            Start Oasis on My Campus
                        </Button>
                    </div>
                </div>
            </div>

            <div className="relative h-screen w-full overflow-hidden rounded-3xl bg-muted">
                {children}
            </div>
        </section>
    )
}
