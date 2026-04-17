"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HomePageImages } from "@/sanity/lib/queries/pageImages";
import { optimizedImageUrl } from "@/sanity/lib/image";

interface HeroGalleryProps {
  homeImages: HomePageImages | null
}

const defaultGallery = [
  { src: "/gallery-1.webp", alt: "Gallery Image 1" },
  { src: "/gallery-2.webp", alt: "Gallery Image 2" },
  { src: "/gallery-3.webp", alt: "Gallery Image 3" },
  { src: "/gallery-4.webp", alt: "Gallery Image 4" },
];

export const HeroGallery = ({ homeImages }: HeroGalleryProps) => {
  const imageKeys = ['galleryImage1', 'galleryImage2', 'galleryImage3', 'galleryImage4'] as const

  const gallery = defaultGallery.map((item, i) => {
    const cmsImage = homeImages?.[imageKeys[i]]
    return cmsImage?.asset
      ? { src: optimizedImageUrl(cmsImage.asset, 600, 850), alt: cmsImage.alt || item.alt }
      : item
  })

  return (
    <section
      className={cn(
        "-mt-12 flex items-center justify-center -gap-4 px-4 lg:px-10",
        "[&>*:nth-child(4n+1)]:-rotate-11",
        "[&>*:nth-child(4n+2)]:rotate-11",
        "[&>*:nth-child(4n+3)]:-rotate-15",
        "[&>*:nth-child(4n+4)]:rotate-15",
      )}
    >
      {gallery.map((image, index) => (
        <GalleryImage
          key={index}
          src={image.src}
          alt={image.alt}
          isFirst={index === 0}
          hiddenOnMobile={index >= 2}
        />
      ))}
    </section>
  );
};

const GalleryImage = ({
  src,
  alt,
  isFirst,
  hiddenOnMobile,
}: {
  src: string;
  alt: string;
  isFirst?: boolean;
  hiddenOnMobile?: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-[50%] md:w-[35%] lg:w-[24%] lg:h-[425px] h-[300px] shrink-0 border-[5px] border-background rounded-lg overflow-hidden",
        !isFirst && "-ml-12 lg:ml-0",
        hiddenOnMobile && "hidden lg:block",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={425}
        className={cn("object-cover w-full h-full", isFirst && "object-right")}
      />
    </div>
  );
};
