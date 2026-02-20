import { Button } from "../ui/button"

export const Hero = () => {
    return (
        <section className="flex flex-col items-center gap-10 lg:gap-20  px-4 lg:px-10">
            <h1 className="text-5xl lg:text-8xl text-center capitalize">Welcome to oasis.</h1>
            <div
                style={{
                    backgroundImage: "url('/hero.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                className="lg:h-[60vh] w-full rounded-t-4xl flex flex-col items-center justify-between gap-10 lg:gap-20 px-8 lg:px-20 py-20"
            >
                <h1 className="text-background text-5xl lg:text-8xl text-center capitalize">Miracles happen here.</h1>
                <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
                    <p className="text-background text-center lg:text-left w-full lg:w-1/2">Oasis is a Christian campus ministry reaching students across the United States, creating spaces where faith comes alive, purpose is discovered, and lives are transformed.</p>

                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
                        <Button variant="primary">
                            Plan your visit
                        </Button>
                        <Button variant="ghost" className="text-background">
                            Find a Campus Near You
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}