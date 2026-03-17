import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form"
import { Hero } from "@/components/contact/hero"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with BLW Oasis. Reach out for questions, prayer requests, or to connect with our community.",
  openGraph: {
    images: [{ url: "/contact-hero.webp" }],
  },
};

export default function ContactPage() {
    return (
        <main className="pt-20 lg:pt-36">
            <Hero />
            <ContactForm />
        </main>
    )
}
