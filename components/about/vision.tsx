export const Vision = () => {
    const content = [
        {
            title: "our vision.",
            description: "A generation of students transformed by the Word of God — grounded in faith, bold in leadership, and committed to changing their campuses and the world."
        },
        {
            title: "our mission.",
            description: "To bring the message of God’s love to college campuses, raising students who know Christ personally, live purposefully, and influence their generation with faith and excellence."
        }
    ]
    return (
        <section id="mission" className="scroll-mt-24 flex flex-col lg:flex-row items-center gap-3 px-4 lg:px-8 mt-20">
            {
                content.map((item) => (
                    <div key={item.title} className="bg-foreground text-background flex flex-col justify-between rounded-4xl overflow-hidden p-10 min-h-[400px] lg:min-h-[500px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="126" height="128" viewBox="0 0 126 128" fill="none" className="size-16 lg:size-32">
                            <path d="M41.6461 127.372L11.6285 105.197L46.2434 71.1229L0 63.8213L10.5467 27.8542L52.4633 47.866L45.7025 0H80.3175L73.5567 47.866L115.203 27.8542L125.75 63.8213L79.5062 71.1229L114.121 105.197L84.1035 127.372L63.01 85.1852L41.6461 127.372Z" fill="#FEFFF7" />
                        </svg>
                        <div className="flex flex-col gap-8">
                            <h2 className="text-4xl lg:text-7xl capitalize whitespace-nowrap">{item.title}</h2>
                            <p className="text-balance">{item.description}</p>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}