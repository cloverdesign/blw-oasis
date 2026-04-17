import { Button } from "../ui/button";
import foundation from "@/public/foundation.webp";
import Image from "next/image";
import { optimizedImageUrl } from "@/sanity/lib/image";
import type { ResourcesPageImages } from "@/sanity/lib/queries/pageImages";

interface FoundationProps {
  resourcesImages: ResourcesPageImages | null
}

export const Foundation = ({ resourcesImages }: FoundationProps) => {
  const imgSrc = resourcesImages?.foundationImage?.asset
    ? optimizedImageUrl(resourcesImages.foundationImage.asset, 800)
    : foundation.src
  const imgAlt = resourcesImages?.foundationImage?.alt || "Foundation School"

  return (
    <section id="foundation-school" className="scroll-mt-24 p-4 lg:p-8">
      <div className="p-4 lg:p-8 bg-primary text-background flex lg:flex-row flex-col-reverse overflow-hidden gap-10 rounded-4xl relative">
        <div className="flex flex-col justify-between lg:w-3/5 h-full lg:pb-5 gap-12">
          <h2 className="text-5xl lg:text-7xl capitalize whitespace-nowrap">
            Foundation <br /> School.
          </h2>
          <div className="flex flex-col gap-10 w-3/4">
            <p className="text-lg lg:text-2xl">
              Foundation School is a structured discipleship program designed to
              help believers understand the fundamentals of the Christian faith.
              <br />
              <br />
              <span className="font-bold">Duration</span>: 7 weeks
              <br />
              <span className="font-bold">Format</span>: Group-based learning
              <br />
              <span className="font-bold">Focus</span>: Core doctrines,
              spiritual growth, and Christian living
              <br />
              <br />
              Foundation School is offered across various Oasis locations and
              campuses.
            </p>
          </div>
        </div>
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={600}
          height={600}
          className="xl:w-[800px] rounded-4xl lg:absolute -right-16 -top-32 -rotate-8"
        />
      </div>
    </section>
  );
};
