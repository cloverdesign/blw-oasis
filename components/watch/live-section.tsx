type LiveSectionProps = {
    title: string | null
    embedCode: string
}

export const LiveSection = ({ title, embedCode }: LiveSectionProps) => {
    return (
        <section className="px-4 lg:px-8 pb-20 lg:pb-32">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <span className="relative flex size-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full size-3 bg-red-600" />
                    </span>
                    <h2 className="text-2xl lg:text-4xl font-semibold">
                        {title ?? "We're Live"}
                    </h2>
                </div>

                <div
                    className="aspect-video w-full rounded-3xl overflow-hidden bg-foreground [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: embedCode }}
                />
            </div>
        </section>
    )
}
