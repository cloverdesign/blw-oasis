import { client } from '../client'

export interface Video {
  _id: string
  title: string
  slug: string
  youtubeUrl: string
  publishedAt: string | null
  description: string | null
  thumbnail: { asset: { _id: string; url: string }; alt?: string } | null
  tags: string[] | null
}

const VIDEOS_QUERY = `*[_type == "video"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  youtubeUrl,
  publishedAt,
  description,
  "thumbnail": thumbnail { asset->, alt },
  tags
}`

export async function getVideos(): Promise<Video[]> {
  const data = await client.fetch<Video[]>(VIDEOS_QUERY, {}, { next: { revalidate: 60, tags: ['video'] } })
  return data ?? []
}

const VIDEO_BY_SLUG_QUERY = `*[_type == "video" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  youtubeUrl,
  publishedAt,
  description,
  "thumbnail": thumbnail { asset->, alt },
  tags
}`

export async function getVideoBySlug(slug: string): Promise<Video | null> {
  const data = await client.fetch<Video | null>(VIDEO_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60, tags: ['video'] } })
  return data
}
