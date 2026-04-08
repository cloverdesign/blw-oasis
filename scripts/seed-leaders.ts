import { createClient } from "next-sanity";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  console.error("Create one at: https://www.sanity.io/manage → your project → API → Tokens (Editor role)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-05",
  useCdn: false,
  token,
});

const leaders = [
  {
    name: "Pastor Deji Olubusi",
    role: "Regional Secretary",
    about:
      "Pastor Deji Olubusi provides leadership and direction for Oasis, guiding its vision and growth across campuses. He is passionate about raising leaders and building a thriving, impact-driven community of believers.",
    imageFile: "pastor-deji.webp",
  },
  {
    name: "Pastor Iris Akanji",
    role: "Zonal Pastor, Oasis Midwest",
    about:
      "Pastor Iris Akanji is passionate about teaching God's Word in a clear and practical way, helping people grow in their faith and live it out daily. She is committed to raising strong, purpose-driven leaders who will make a lasting impact in their world.",
    imageFile: "pastor-iris.webp",
  },
  {
    name: "Pastor Debbie Onyibe",
    role: "Group Pastor, Oasis Vanguards (Georgia)",
    about:
      "Debbie Onyibe is a Pastor at Oasis Vanguards and leads Global Missions and Media, shaping the systems and strategies behind outreach and leadership growth across campuses. As a creative director and brand strategist, she operates at the intersection of strategy, culture, and impact; helping ideas grow into movements. Her focus is simple: raise bold, Spirit-filled leaders and win souls at scale.",
    imageFile: "pastor-debbie.webp",
  },
  {
    name: "Pastor Ruky Akpoghiran",
    role: "Group Pastor, Oasis Mega (New York)",
    about:
      "Pastor Ruky Akpoghiran is dedicated to helping people encounter God personally, grow in their identity in Christ, and live out their purpose. She is passionate about raising leaders who will fulfill God's vision for their lives and builds systems that facilitate growth in Oasis through strategic small group organization.",
    imageFile: "pastor-ruky.webp",
  },
  {
    name: "Pastor Joshua Adewolu",
    role: "Group Pastor, Oasis Trailblazers (Massachusetts)",
    about:
      "Pastor Joshua Adewolu serves at Oasis Trailblazers while also working as an engineer. He is passionate about mentoring young people to discover their purpose and maximize their God-given potential.",
    imageFile: "pastor-joshua.webp",
  },
  {
    name: "Pastor Gradieu Kisala",
    role: "Group Pastor, Oasis Lifesprings (Maryland)",
    about:
      "Gradieu Kisala is passionate about sharing the Gospel and helping others discover God's love and purpose for their lives. With a background in IT and data analytics, he brings both insight and passion to reaching people effectively.",
    imageFile: "pastor-gradieu.webp",
  },
  {
    name: "Pastor Kome Igbogidi",
    role: "Group Pastor, Oasis Capital City (Washington DC)",
    about:
      "Kome Igbogidi brings a strong background in technology and innovation, with experience leading impactful work in the AI space at a global level. She is passionate about building systems, empowering people, and driving meaningful change both within Oasis and beyond. At Oasis, she is committed to supporting growth, strengthening communities, and helping people thrive in purpose.",
    imageFile: "pastor-kome.webp",
  },
  {
    name: "Pastor Stephen Asiedu",
    role: "Pastor, Oasis Missions (South America)",
    about:
      "Pastor Stephen Asiedu is devoted to spreading the Gospel and impacting lives with the message of God's love and truth. He is passionate about helping people live purposefully and fully for Christ.",
    imageFile: "pastor-stephen.webp",
  },
];

async function seed() {
  console.log(`Seeding ${leaders.length} leaders into Sanity (${projectId}/${dataset})...\n`);

  // Check for existing leaders to avoid duplicates
  const existing: { name: string }[] = await client.fetch('*[_type == "leader"]{name}');
  const existingNames = new Set(existing.map((l) => l.name));

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < leaders.length; i++) {
    const leader = leaders[i];

    if (existingNames.has(leader.name)) {
      console.log(`⏭  Skipped "${leader.name}" (already exists)`);
      skipped++;
      continue;
    }

    try {
      // Upload image
      const imagePath = path.resolve(__dirname, "..", "public", leader.imageFile);
      const imageStream = fs.createReadStream(imagePath);
      const asset = await client.assets.upload("image", imageStream, {
        filename: leader.imageFile,
        contentType: "image/webp",
      });

      // Create leader document
      await client.create({
        _type: "leader",
        name: leader.name,
        role: leader.role,
        about: leader.about,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: leader.name,
        },
        order: i,
      });

      console.log(`✅  Created "${leader.name}"`);
      created++;
    } catch (err) {
      console.error(`❌  Failed "${leader.name}":`, err instanceof Error ? err.message : err);
      failed++;
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`);
}

seed();
