import Link from "next/link"

const paymentMethods = [
    { name: "Zelle", href: "#", id: "zelle" },
    { name: "Paypal", href: "#", id: "paypal" },
    { name: "Kingspay", href: "#", id: "kingspay" },
    { name: "Wire", href: "#", id: "wire" },
] as const

export const GiveToday = () => {
    return (
        <section id="give-today" className="px-4 lg:px-10 py-12 lg:py-20 scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl lg:text-6xl capitalize font-heading text-center mb-10 lg:mb-16">
                    Give Today.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {paymentMethods.map((method) => (
                        <Link
                            key={method.id}
                            href={method.href}
                            className="border border-border rounded-2xl p-6 lg:p-8 min-h-[300px] flex items-start justify-start transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            data-give-method={method.id}
                        >
                            <span className="text-base lg:text-lg font-medium">
                                {method.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
