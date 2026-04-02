import { client } from '../client'

export interface HighlightReel {
  _id: string
  title: string
  videoUrl: string | null
  thumbnail: { asset: { _id: string; url: string }; alt?: string } | null
  description: string | null
}

export async function getHighlightReel(): Promise<HighlightReel | null> {
  return client.fetch(
    `*[_type == "highlightReel" && _id == "highlightReel"][0] {
      _id,
      title,
      videoUrl,
      thumbnail { asset->, alt },
      description
    }`,
    {},
    { next: { revalidate: 60 } },
  )
}
