'use client'
import { useRef, useState, type FormEvent } from "react";
import FooterLogo from "@/assets/footerlogo.svg";
import { ArrowRight, Instagram, Tiktok, Youtube } from "iconoir-react";
import Link from "next/link";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";

export const Footer = () => {

    const footerLinks = [
        {
            title: "Oasis",
            links: [
                { label: "About", href: "/about" },
                { label: "Mission & Vision", href: "/about#mission" },
                { label: "Leadership", href: "/about#leadership" },
                { label: "Get Connected", href: "/contact" },
                { label: "Find a Campus", href: "/locations?type=campus" },
                { label: "Find a Church", href: "/locations?type=church" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Rhapsody of Realities", href: "/resources#rhapsody" },
                { label: "Foundation School", href: "/resources#foundation-school" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Give", href: "/give" },
                { label: "Contact", href: "/contact" },
            ],
        },
    ];

    const socialLinks = [
        {
            title: "instagram",
            link: "https://www.instagram.com/blw_oasis/",
            icon: <Instagram />
        },
        {
            title: "youtube",
            link: "https://www.youtube.com/@blw_oasis/",
            icon: <Youtube />
        },
        {
            title: "tiktok",
            link: "https://www.tiktok.com/@blw_oasis/",
            icon: <Tiktok />
        }
    ]

    return (
        <footer className="p-4 lg:p-8 flex flex-col lg:gap-20 gap-16 mt-[150px]">
            <section className="bg-secondary overflow-hidden rounded-4xl pb-16 lg:px-16 px-8 pt-16 flex flex-col gap-32 justify-between">
                <div className="flex lg:flex-row flex-col-reverse justify-between gap-16">
                    <CTA />
                    <div className="flex flex-wrap gap-16 lg:gap-32">
                        <LinkSection section={footerLinks[0]} />
                        <div className="flex flex-col gap-16">
                            <LinkSection section={footerLinks[1]} />
                            <LinkSection section={footerLinks[2]} />
                        </div>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col items-center justify-between gap-8 text-xs relative">
                    <p className="text-center lg:text-left lg:w-1/5">© BLW Oasis Campus Ministry. All rights reserved.</p>
                    <FooterLogo className="opacity-50 lg:w-1/2 lg:absolute -bottom-35 right-[48%] lg:translate-x-1/2" />
                    <ul className="flex gap-2 items-center justify-end">
                        {socialLinks.map((link) => (
                            <li key={link.title}>
                                <Link href={link.link} className="hover:text-primary">
                                    {link.icon}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </footer >
    )
}

function LinkSection({
    section,
}: {
    section: { title: string; links: { label: string; href: string }[] };
}) {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-xl font-heading uppercase">{section.title}.</h3>
            <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="hover:text-primary">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const COOLDOWN_MS = 10_000;

const CTA = () => {
    const newsletterFormAction = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION;
    const isNewsletterConfigured = Boolean(newsletterFormAction);
    const lastSubmitTime = useRef(0);
    const [cooldownMsg, setCooldownMsg] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        if (!isNewsletterConfigured) {
            e.preventDefault();
            return;
        }
        const now = Date.now();
        if (now - lastSubmitTime.current < COOLDOWN_MS) {
            e.preventDefault();
            setCooldownMsg("Please wait a few seconds before subscribing again.");
            return;
        }
        lastSubmitTime.current = now;
        setCooldownMsg("");
    }

    return (
        <section className="flex flex-col lg:gap-16 gap-8">
            <div className="flex flex-col gap-8 md:w-1/2">
                <h1 className="lg:text-6xl text-4xl">
                    Stay Connected <br /> with Oasis.
                </h1>
                <p className="text-sm md:text-base">Stay informed about upcoming events, ministry opportunities, and inspiring stories from the Oasis community.</p>
            </div>

            <form
                action={isNewsletterConfigured ? newsletterFormAction : undefined}
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
            >
                <input type="hidden" name="_subject" value="New BLW Oasis newsletter subscriber" />
                <InputGroup size="default" className="max-w-[350px] text-sm md:text-base border-foreground/10">
                    <InputGroupInput
                        placeholder="me@example.com"
                        type="email"
                        name="email"
                        required
                        className="px-4 py-3 text-sm md:text-base"
                    />
                    <InputGroupAddon align="inline-end-flush">
                        <InputGroupButton
                            type="submit"
                            size="icon-pill"
                            disabled={!isNewsletterConfigured}
                            className="rounded-full bg-foreground text-background hover:bg-accent my-3 mx-4 group size-8"
                        >
                            <ArrowRight strokeWidth={2} className="size-4 text-background group-hover:text-accent-foreground" />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
                {cooldownMsg && (
                    <p className="text-xs text-muted-foreground text-center">{cooldownMsg}</p>
                )}
                {!isNewsletterConfigured && (
                    <p className="text-xs text-destructive text-center">
                        Newsletter form is not configured yet. Please set `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION`.
                    </p>
                )}
            </form>
        </section>
    )
}