import Image from "next/image"
import { cn } from "@/lib/utils"

export const HeroGallery = () => {
    const gallery = [
        {
            src: "/gallery-1.png",
            alt: "Gallery Image 1",
        },
        {
            src: "/gallery-2.png",
            alt: "Gallery Image 2",
        },
        {
            src: "/gallery-3.png",
            alt: "Gallery Image 3",
        },
        {
            src: "/gallery-4.png",
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
                "w-[20%] shrink-0 border-[5px] border-background rounded-lg overflow-hidden",
                !isFirst && "-ml-12"
            )}
        >
            <Image
                src={src}
                alt={alt}
                width={300}
                height={425}
                className="w-full h-auto"
            />
        </div>
    )
}