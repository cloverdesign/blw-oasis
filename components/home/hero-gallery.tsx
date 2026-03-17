"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export const HeroGallery = () => {
    const gallery = [
        {
            src: "/gallery-1.webp",
            alt: "Gallery Image 1",
        },
        {
            src: "/gallery-2.webp",
            alt: "Gallery Image 2",
        },
        {
            src: "/gallery-3.webp",
            alt: "Gallery Image 3",
        },
        {
            src: "/gallery-4.webp",
            alt: "Gallery Image 4",
        },
    ]

    return (
        <section className={cn(
            "-mt-32 flex items-center justify-center gap-10 lg:gap-20 px-4 lg:px-10",
            "[&>*:nth-child(4n+1)]:-rotate-11",
            "[&>*:nth-child(4n+2)]:rotate-11",
            "[&>*:nth-child(4n+3)]:-rotate-15",
            "[&>*:nth-child(4n+4)]:rotate-15"
        )}>
            {gallery.map((image, index) => (
                <GalleryImage
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    isFirst={index === 0}
                />
            ))}
        </section>
    )
}

const GalleryImage = ({
    src,
    alt,
    isFirst,
}: {
    src: string;
    alt: string;
    isFirst?: boolean;
}) => {
    return (
        <div
            className={cn(
                "w-[20%] h-[425px] shrink-0 border-[5px] border-background rounded-lg overflow-hidden",
                !isFirst && "-ml-12"
            )}
        >
            <Image
                src={src}
                alt={alt}
                width={300}
                height={425}
                className={cn(
                    "object-cover w-full h-full",
                    isFirst && "object-right"
                )}
            />
        </div>
    )
}