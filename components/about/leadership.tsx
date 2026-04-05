"use client";

import { useState } from "react";
import { optimizedImageUrl } from "@/sanity/lib/image";
import type { Leader } from "@/sanity/lib/queries/leaders";

// Hardcoded fallback leaders used when CMS has no entries
import pastorDeji from "@/public/pastor-deji.webp";
import pastorIris from "@/public/pastor-iris.webp";
import pastorDebbie from "@/public/pastor-debbie.webp";
import pastorRuky from "@/public/pastor-ruky.webp";
import pastorJoshua from "@/public/pastor-joshua.webp";
import pastorGradieu from "@/public/pastor-gradieu.webp";
import pastorKome from "@/public/pastor-kome.webp";
import pastorStephen from "@/public/pastor-stephen.webp";

const fallbackLeaders = [
  {
    name: "Pastor Deji Olubusi",
    role: "Regional Secretary",
    about:
      "Pastor Deji Olubusi provides leadership and direction for Oasis, guiding its vision and growth across campuses. He is passionate about raising leaders and building a thriving, impact-driven community of believers.",
    imageSrc: pastorDeji.src,
  },
  {
    name: "Pastor Iris Akanji",
    role: "Zonal Pastor, Oasis Midwest",
    about:
      "Pastor Iris Akanji is passionate about teaching God's Word in a clear and practical way, helping people grow in their faith and live it out daily. She is committed to raising strong, purpose-driven leaders who will make a lasting impact in their world.",
    imageSrc: pastorIris.src,
  },
  {
    name: "Pastor Debbie Onyibe",
    role: "Group Pastor, Oasis Vanguards (Georgia)",
    about:
      "Debbie Onyibe is a Pastor at Oasis Vanguards and leads Global Missions and Media, shaping the systems and strategies behind outreach and leadership growth across campuses. As a creative director and brand strategist, she operates at the intersection of strategy, culture, and impact; helping ideas grow into movements. Her focus is simple: raise bold, Spirit-filled leaders and win souls at scale.",
    imageSrc: pastorDebbie.src,
  },
  {
    name: "Pastor Ruky Akpoghiran",
    role: "Group Pastor, Oasis Mega (New York)",
    about:
      "Pastor Ruky Akpoghiran is dedicated to helping people encounter God personally, grow in their identity in Christ, and live out their purpose. She is passionate about raising leaders who will fulfill God's vision for their lives and builds systems that facilitate growth in Oasis through strategic small group organization.",
    imageSrc: pastorRuky.src,
  },
  {
    name: "Pastor Joshua Adewolu",
    role: "Group Pastor, Oasis Trailblazers (Massachusetts)",
    about:
      "Pastor Joshua Adewolu serves at Oasis Trailblazers while also working as an engineer. He is passionate about mentoring young people to discover their purpose and maximize their God-given potential.",
    imageSrc: pastorJoshua.src,
  },
  {
    name: "Pastor Gradieu Kisala",
    role: "Group Pastor, Oasis Lifesprings (Maryland)",
    about:
      "Gradieu Kisala is passionate about sharing the Gospel and helping others discover God's love and purpose for their lives. With a background in IT and data analytics, he brings both insight and passion to reaching people effectively.",
    imageSrc: pastorGradieu.src,
  },
  {
    name: "Pastor Kome Igbogidi",
    role: "Group Pastor, Oasis Capital City (Washington DC)",
    about:
      "Kome Igbogidi brings a strong background in technology and innovation, with experience leading impactful work in the AI space at a global level. She is passionate about building systems, empowering people, and driving meaningful change both within Oasis and beyond. At Oasis, she is committed to supporting growth, strengthening communities, and helping people thrive in purpose.",
    imageSrc: pastorKome.src,
  },
  {
    name: "Pastor Stephen Asiedu",
    role: "Pastor, Oasis Missions (South America)",
    about:
      "Pastor Stephen Asiedu is devoted to spreading the Gospel and impacting lives with the message of God's love and truth. He is passionate about helping people live purposefully and fully for Christ.",
    imageSrc: pastorStephen.src,
  },
];

interface LeadershipProps {
  leaders: Leader[];
}

export const Leadership = ({ leaders }: LeadershipProps) => {
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null);

  const toggleLeader = (name: string) => {
    setExpandedLeader((current) => (current === name ? null : name));
  };

  const displayLeaders =
    leaders.length > 0
      ? leaders.map((l) => ({
          name: l.name,
          role: l.role,
          about: l.about,
          imageSrc: l.image?.asset
            ? optimizedImageUrl(l.image.asset, 600, 800)
            : null,
        }))
      : fallbackLeaders;

  return (
    <section
      id="leadership"
      className="scroll-mt-24 mt-144 flex flex-col items-center gap-10 px-4 lg:gap-20 lg:px-8"
    >
      <h2 className="text-center font-heading text-4xl capitalize lg:text-6xl">
        Meet Our <br /> Leadership.
      </h2>

      <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {displayLeaders.map((leaderItem) => (
          <LeadershipCard
            key={leaderItem.name}
            name={leaderItem.name}
            title={leaderItem.role}
            imageSrc={leaderItem.imageSrc}
            about={leaderItem.about}
            isExpanded={expandedLeader === leaderItem.name}
            onToggle={() => toggleLeader(leaderItem.name)}
          />
        ))}
      </div>
    </section>
  );
};

const LeadershipCard = ({
  name,
  title,
  imageSrc,
  about,
  isExpanded,
  onToggle,
}: {
  name: string;
  title: string;
  imageSrc: string | null;
  about?: string | null;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const bio = about?.trim() || "Bio coming soon.";
  const panelId = `leader-bio-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      aria-label={`${isExpanded ? "Collapse" : "Expand"} bio for ${name}`}
      className={`group relative overflow-hidden rounded-2xl bg-primary p-2 text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isExpanded ? "min-h-[640px]" : "min-h-[500px] hover:-translate-y-1"
      }`}
      style={{
        backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {imageSrc && (
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/95 via-black/15 to-black/5" />
      )}

      {!imageSrc && (
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-6xl font-semibold text-background/20">
          {initials}
        </div>
      )}

      <div
        className={`absolute bottom-6 left-6 right-6 rounded-2xl bg-background/95 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isExpanded
            ? "translate-y-3 opacity-0"
            : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        }`}
      >
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {name}
        </h3>
      </div>

      <div
        id={panelId}
        role="region"
        aria-hidden={!isExpanded}
        className={`absolute bottom-2 left-2 right-2 rounded-2xl bg-background p-5 text-foreground shadow-xl transition-all duration-300 ${
          isExpanded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h3 className="font-heading text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>

        <div
          className={`overflow-hidden text-sm text-foreground/90 transition-[max-height,opacity] duration-300 ease-out ${
            isExpanded ? "mt-3 max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {bio}
        </div>
      </div>
    </button>
  );
};
