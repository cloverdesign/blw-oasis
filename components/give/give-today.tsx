import EspeesLogo from "@/assets/espees.png"
import ZelleLogo from "@/assets/zelle.png"
import CashappLogo from "@/assets/cashapp.png"
import PayPalLogo from "@/assets/paypal.png"
import Image from "next/image"
import { cn } from "@/lib/utils"

const paymentMethods = [
    { logo: EspeesLogo, name: "Espees", detail: "GIVOASIS", id: "espees" },
    { logo: ZelleLogo, name: "Zelle", detail: "give@theoasisusa.com", id: "zelle" },
    { logo: CashappLogo, name: "Cashapp", detail: "$partnershipoasis", id: "cashapp" },
    { logo: PayPalLogo, name: "PayPal", detail: "blwusa3.finance@gmail.com", id: "paypal" },
] as const

export const GiveToday = () => {
    return (
        <section id="give-today" className="px-4 lg:px-10 py-12 lg:py-20 scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="hover:rotate-3 bg-background transition-all duration-300 border border-border rounded-2xl p-6 lg:p-8 min-h-[150px] flex items-center justify-center gap-6"
                            data-give-method={method.id}
                        >
                            <Image src={method.logo} alt={method.name} width={100} height={100} className={cn(
                                "w-40",
                                method.id === "espees" && "w-32",
                                method.id === "cashapp" && "w-44",
                            )} />
                            <div className="flex flex-col items-start justify-start gap-2">
                                <span className="text-base lg:text-2xl font-medium">
                                    {method.name}
                                </span>
                                <span className="text-xl text-muted-foreground">
                                    {method.detail}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
