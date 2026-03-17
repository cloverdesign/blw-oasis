import type { MetadataRoute } from "next";
import { getVideos } from "@/sanity/lib/queries/videos";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://blwoasis.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const videos = await getVideos();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/watch`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/give`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/fellowship`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/locations`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/resources`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const videoRoutes: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${BASE_URL}/watch/${video.slug}`,
    lastModified: video.publishedAt ? new Date(video.publishedAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...videoRoutes];
}
