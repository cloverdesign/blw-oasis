"use client"

import { useState } from "react"
import type { StaticImageData } from "next/image"
import leader from "@/public/hero.png"

import pastorDebbie from "@/public/pastor-debbie.webp"
import pastorJoshua from "@/public/pastor-joshua.webp"
import pastorRuky from "@/public/pastor-ruky.webp"

type Leader = {
    name: string
    role: string
    about: string
    image?: StaticImageData
}

const leaders: Leader[] = [
    { name: "Pastor Deji Olubusi", role: "Regional Secretary", about: "" },
    { name: "Pastor Iris Akanji", role: "Zonal Pastor", about: "" },
    {
        name: "Pastor Debbie Onyibe",
        role: "Group Pastor & Lead, Global Missions & Media",
        about: "Hello :) I currently serve as the Group Pastor of Oasis Vanguards which is headquartered in Georgia. I also lead two of the most awesome teams at Oasis; Global Missions & Media, where I help shape the systems, teams, and strategies that drive our soul-winning work across campuses. I'm passionate about raising sharp, confident, Spirit-filled leaders who know their identity in Christ and are bold enough to change their world. My focus is simple: win souls, strengthen leaders, and create excellence everywhere we plant our feet.",
        image: pastorDebbie,
    },
    {
        name: "Pastor Ruky Akpoghiran",
        role: "Group Pastor & PFCC Lead",
        about: "I serve as the Group Pastor of BLW Oasis Mega which is headquartered in New York, and the Head of the Pastoral Care Fellowship Coordinating Center. I'm inspired to win souls and see people encounter God for themselves, walk in their identity, and live out their lives in Christ. I'm also deeply passionate about raising leaders who fulfill God's dream for their lives.",
        image: pastorRuky,
    },
    {
        name: "Pastor Joshua Adewolu",
        role: "Group Pastor",
        about: "I currently serve as the Group Pastor of BLW Oasis Trailblazers, which is headquartered in Massachusetts. I'm also an Engineering fellow who is passionate about mentoring young people to fulfill all of their God-given potential.",
        image: pastorJoshua,
    },
    { name: "Pastor Gradieu Kisala", role: "Group Pastor", about: "" },
    { name: "Pastor Kome Igbogidi", role: "Group Pastor & Finance Lead", about: "" },
    { name: "Pastor Stephen Aisedu", role: "Pastor, Oasis Missions", about: "" },
]

export const Leadership = () => {
    const [expandedLeader, setExpandedLeader] = useState<string | null>(null)

    const toggleLeader = (name: string) => {
        setExpandedLeader((current) => (current === name ? null : name))
    }

    return (
        <section id="leadership" className="scroll-mt-24 mt-[144px] flex flex-col items-center gap-10 px-4 lg:gap-20 lg:px-8">
            <h2 className="text-center font-heading text-4xl capitalize lg:text-6xl">
                Meet Our <br /> Leadership.
            </h2>

            <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {leaders.map((leaderItem) => (
                    <LeadershipCard
                        key={leaderItem.name}
                        name={leaderItem.name}
                        title={leaderItem.role}
                        image={leaderItem.image}
                        about={leaderItem.about}
                        isExpanded={expandedLeader === leaderItem.name}
                        onToggle={() => toggleLeader(leaderItem.name)}
                    />
                ))}
            </div>
        </section>
    )
}

const LeadershipCard = ({
    name,
    title,
    image,
    about,
    isExpanded,
    onToggle,
}: {
    name: string
    title: string
    image?: StaticImageData
    about?: string
    isExpanded: boolean
    onToggle: () => void
}) => {
    const bio = about?.trim() || "Bio coming soon."
    const panelId = `leader-bio-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(-2)
        .map((part) => part[0]?.toUpperCase())
        .join("")

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} bio for ${name}`}
            className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-primary p-2 text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isExpanded ? "min-h-[640px]" : "min-h-[500px] hover:-translate-y-1"
                }`}
            style={{
                backgroundImage: image ? `url(${image.src})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {image && <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/95 via-black/15 to-black/5" />}

            {!image && (
                <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-6xl font-semibold text-background/20">
                    {initials}
                </div>
            )}

            <div
                className={`absolute bottom-6 left-6 right-6 rounded-2xl bg-background/95 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ${isExpanded
                    ? "translate-y-3 opacity-0"
                    : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    }`}
            >
                <h3 className="font-heading text-lg font-semibold text-foreground">{name}</h3>
            </div>

            <div
                id={panelId}
                role="region"
                aria-hidden={!isExpanded}
                className={`absolute bottom-2 left-2 right-2 rounded-2xl bg-background p-5 text-foreground shadow-xl transition-all duration-300 ${isExpanded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
            >
                <h3 className="font-heading text-lg font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{title}</p>

                <div
                    className={`overflow-hidden text-sm text-foreground/90 transition-[max-height,opacity] duration-300 ease-out ${isExpanded ? "mt-3 max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    {bio}
                </div>
            </div>
        </button>
    )
}