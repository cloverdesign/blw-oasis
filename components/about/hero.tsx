"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "../ui/reveal";
import { optimizedImageUrl } from "@/sanity/lib/image";
import type { AboutPageImages } from "@/sanity/lib/queries/pageImages";

interface HeroProps {
  aboutImages: AboutPageImages | null;
}

const defaultSections = [
  {
    text: (
      <>
        Oasis is a campus expression of LoveWorld Inc., committed to taking the message of Jesus Christ to students across the United States and beyond.
        <br />
        <br />
        As part of a global ministry founded by Pastor Chris Oyakhilome, Oasis exists to raise a generation of students who live out their faith boldly, grow in the Word, and impact their campuses with the Gospel.
      </>
    ),
    image: "/gallery-1.webp",
    alt: "Campus ministry gathering",
    rotate: -5,
    imageKey: "storyImage1" as const,
  },
  {
    text: (
      <>
        What began as a passion to reach students with the Gospel has grown into a movement impacting campuses across multiple states and communities.
        <br />
        <br />
        Through intentional evangelism, discipleship, and fellowship, students are equipped to grow spiritually, build meaningful community, and take the message of Jesus Christ to their world.
      </>
    ),
    image: "/foundation.webp",
    alt: "The foundation of Oasis ministry",
    rotate: 4,
    imageKey: "storyImage2" as const,
  },
  {
    text: "If you are in the U.S. and searching for a place to grow spiritually, build community, and live out your faith boldly, we look forward to being part of your journey.",
    image: "/gallery-2.webp",
    alt: "Students in fellowship",
    rotate: -6,
    imageKey: "storyImage3" as const,
  },
];

function StorySection({
  text,
  image,
  alt,
  reverse,
  rotate,
}: {
  text: React.ReactNode;
  image: string;
  alt: string;
  reverse: boolean;
  rotate: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-8 lg:gap-16 items-center px-4 lg:px-12",
        reverse ? "lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      <motion.div
        className="w-full lg:w-1/2 aspect-[4/3] relative rounded-4xl overflow-hidden"
        initial={
          prefersReducedMotion
            ? undefined
            : { clipPath: "inset(0 0 100% 0)", rotate: rotate * 2 }
        }
        animate={isInView ? { clipPath: "inset(0 0 0% 0)", rotate } : undefined}
        transition={{
          duration: 0.8,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>

      <motion.p
        className="w-full lg:w-1/2 lg:text-left text-center text-lg lg:text-2xl font-medium text-balance"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.2,
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}

export const Hero = ({ aboutImages }: HeroProps) => {
  const sections = defaultSections.map((section) => {
    const cmsImage = aboutImages?.[section.imageKey]
    return {
      ...section,
      image: cmsImage?.asset
        ? optimizedImageUrl(cmsImage.asset, 1200)
        : section.image,
      alt: cmsImage?.alt || section.alt,
    }
  })

  return (
    <section className="flex flex-col gap-20 lg:gap-32 px-4 lg:px-10">
      <Reveal
        as="h1"
        amount={0}
        className="text-5xl lg:text-8xl text-center capitalize"
      >
        Who We Are.
      </Reveal>

      {sections.map((section, index) => (
        <StorySection
          key={index}
          text={section.text}
          image={section.image}
          alt={section.alt}
          reverse={index % 2 !== 0}
          rotate={section.rotate}
        />
      ))}
    </section>
  );
};
