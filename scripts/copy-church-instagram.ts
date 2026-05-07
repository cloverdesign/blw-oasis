import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const apply = process.argv.includes("--apply");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-05",
  useCdn: false,
  token,
});

interface ChurchRow {
  _id: string;
  name: string;
  linkUrl: string | null;
  instagram: string | null;
}

function isInstagramUrl(value: string): boolean {
  try {
    return /(?:^|\.)instagram\.com$/i.test(new URL(value).hostname);
  } catch {
    return false;
  }
}

async function run() {
  const mode = apply ? "APPLY" : "DRY-RUN";
  console.log(`[${mode}] Copying linkUrl → instagram for churches in ${projectId}/${dataset}\n`);

  const churches: ChurchRow[] = await client.fetch(
    `*[_type == "location" && type == "church"] | order(name asc) {
      _id,
      name,
      linkUrl,
      instagram
    }`,
  );

  let copied = 0;
  let skippedExisting = 0;
  let skippedNoLink = 0;
  let skippedInvalid = 0;
  let failed = 0;

  for (const church of churches) {
    if (church.instagram) {
      console.log(`⏭  ${church.name} — already has instagram, skipping`);
      skippedExisting++;
      continue;
    }
    if (!church.linkUrl) {
      console.log(`·  ${church.name} — no linkUrl, skipping`);
      skippedNoLink++;
      continue;
    }
    if (!isInstagramUrl(church.linkUrl)) {
      console.log(`⚠  ${church.name} — linkUrl is not an instagram.com URL: ${church.linkUrl}`);
      skippedInvalid++;
      continue;
    }

    if (!apply) {
      console.log(`📝 ${church.name} — would copy: ${church.linkUrl}`);
      copied++;
      continue;
    }

    try {
      await client.patch(church._id).set({ instagram: church.linkUrl }).commit();
      console.log(`✅ ${church.name} — copied: ${church.linkUrl}`);
      copied++;
    } catch (err) {
      console.error(`❌ ${church.name} — failed:`, err instanceof Error ? err.message : err);
      failed++;
    }
  }

  console.log(
    `\n[${mode}] Done. Copied: ${copied}, Skipped(existing): ${skippedExisting}, ` +
      `Skipped(no linkUrl): ${skippedNoLink}, Skipped(non-instagram): ${skippedInvalid}, Failed: ${failed}`,
  );

  if (!apply) {
    console.log(`\nThis was a dry run. Re-run with --apply to commit the changes.`);
  }
}

run();
