"use client"

import { CrossIcon, HandHeartIcon, HandsPrayingIcon, HeartIcon, SealCheckIcon, HandCoinsIcon } from '@phosphor-icons/react/ssr'
import { Reveal } from '../ui/reveal'

export const Values = () => {
    const values = [
        {
            icon: <HandHeartIcon />,
            title: "Service",
            description: "We serve others with humility and compassion, putting their needs before our own, following the example of Christ."
        },
        {
            icon: <HeartIcon />,
            title: "Love",
            description: "We love people unconditionally, just as Christ loved us first, creating safe and welcoming communities."
        },
        {
            icon: <CrossIcon />,
            title: "Worship",
            description: "We honor God with our lives, words, and actions, worshiping Him in spirit and in truth."
        },
        {
            icon: <HandsPrayingIcon />,
            title: "Prayer",
            description: "We remain rooted in constant communication with God, relying on prayer as the foundation of our faith and direction."
        },
        {
            icon: <HandCoinsIcon />,
            title: "Giving",
            description: "We give generously of our time, resources, and talents to bless others and advance God’s work."
        },
        {
            icon: <SealCheckIcon />,
            title: "Excellence",
            description: "We do all things with integrity and diligence, reflecting the greatness of God in every detail."
        }
    ]
    return (
        <section className="flex flex-col items-center gap-10 lg:gap-20 px-4 lg:px-8 mt-16 lg:mt-24">
            <Reveal>
                <div className="relative">
                    <h2 className="text-4xl lg:text-7xl capitalize whitespace-nowrap text-center relative z-1">Our Culture & <br /> Core Values.</h2>
                    <svg className="text-accent absolute size-12 -top-1 -left-5 z-0" xmlns="http://www.w3.org/2000/svg" width="126" height="128" viewBox="0 0 126 128" fill="none">
                        <path d="M41.6461 127.372L11.6285 105.197L46.2434 71.1229L0 63.8213L10.5467 27.8542L52.4633 47.866L45.7025 0H80.3175L73.5567 47.866L115.203 27.8542L125.75 63.8213L79.5062 71.1229L114.121 105.197L84.1035 127.372L63.01 85.1852L41.6461 127.372Z" fill="currentColor" />
                    </svg>
                </div>
            </Reveal>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:p-16 px-8'>
                {
                    values.map((value, index) => (
                        <Reveal key={value.title} delay={index * 0.08}>
                            <div className="[&_svg]:size-11 p-8 border border-secondary rounded-4xl flex flex-col gap-11 h-full">
                                <span>{value.icon}</span>
                                <div className='flex flex-col gap-3'>
                                    <h3 className='text-4xl'>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))
                }
            </div>
        </section>
    )
}