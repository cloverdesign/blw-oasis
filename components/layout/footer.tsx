'use client'
import FooterLogo from "@/assets/footer-logo.svg";
import { ArrowRight, Instagram, Tiktok, Youtube } from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";

export const Footer = () => {

    const pathname = usePathname();
    const showCTA =
        pathname === "/" ||
        pathname.startsWith("/churches") ||
        pathname.startsWith("/resources") ||
        pathname.startsWith("/contact") ||
        pathname.startsWith("/watch");

    const footerLinks = [
        {
            title: "Oasis",
            links: [
                { label: "About", href: "/about" },
                { label: "Mission & Vision", href: "/about#mission" },
                { label: "Leadership", href: "/leadership" },
                { label: "Get Connected", href: "/get-connected" },
                { label: "Find a Campus", href: "/churches" },
                { label: "Find a Church", href: "/churches" },
                { label: "Start Oasis", href: "/start-oasis" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Rhapsody of Realities", href: "/resources/rhapsody" },
                { label: "Foundation School", href: "/resources/foundation-school" },
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
        <footer className="p-4 lg:p-8 flex flex-col lg:gap-20 gap-16 mt-[250px]">
            {showCTA && <CTA />}
            <section className="bg-secondary rounded-4xl px-4 lg:px-10 py-12 flex flex-col gap-20 justify-between">
                <div className="flex lg:flex-row flex-col-reverse justify-between items-center gap-16 px-16">
                    <FooterLogo className="text-secondary-foreground scale-80 lg:scale-100" />

                    <div className="flex flex-wrap gap-16 lg:gap-32">
                        <LinkSection section={footerLinks[0]} />
                        <div className="flex flex-col gap-16">
                            <LinkSection section={footerLinks[1]} />
                            <LinkSection section={footerLinks[2]} />
                        </div>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col-reverse  items-center justify-between gap-8 text-xs">
                    <p className="text-center lg:text-left w-[60%]">© BLW Oasis Campus Ministry. All rights reserved.</p>

                    <ul className="flex gap-2 items-center">
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
        <div className="text-xs flex flex-col gap-3">
            <h3 className="font-heading uppercase">{section.title}.</h3>
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

const CTA = () => {
    return (
        <section className="flex flex-col justify-center items-center lg:gap-16 gap-8 text-center">
            <div className="flex flex-col gap-8 md:w-[50%] lg:w-[30%]">
                <h1 className="lg:text-6xl text-4xl">
                    Stay Connected <br /> with Oasis.
                </h1>
                <p className="text-sm md:text-base">Stay informed about upcoming events, ministry opportunities, and inspiring stories from the Oasis community.</p>
            </div>

            <InputGroup size="default" className="w-fit min-w-[300px] text-sm md:text-base">
                <InputGroupInput placeholder="me@example.com" type="email" className="px-4 py-3 text-sm md:text-base" />
                <InputGroupAddon align="inline-end-flush">
                    <InputGroupButton
                        type="submit"
                        size="icon-pill"
                        className="rounded-full bg-foreground text-background hover:bg-accent my-3 mx-4 group size-8"
                    >
                        <ArrowRight strokeWidth={2} className="size-4 text-background group-hover:text-accent-foreground" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </section>
    )
}