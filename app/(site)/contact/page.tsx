import { ContactForm } from "@/components/contact/contact-form"
import { Hero } from "@/components/contact/hero"

export default function ContactPage() {
    return (
        <main className="pt-20 lg:pt-36">
            <Hero />
            <ContactForm />
        </main>
    )
}
