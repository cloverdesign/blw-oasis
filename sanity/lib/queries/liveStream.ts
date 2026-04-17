import { client } from '../client'

export interface LiveStream {
  isEnabled: boolean
  title: string | null
  embedCode: string | null
  livePlaceholder: {
    image: { _id: string; url: string } | null
    alt: string | null
  } | null
  offlinePlaceholder: {
    image: { _id: string; url: string } | null
    alt: string | null
  } | null
}

export async function getLiveStream(): Promise<LiveStream | null> {
  return client.fetch(
    `*[_type == "liveStream" && _id == "liveStream"][0] {
      isEnabled,
      title,
      embedCode,
      livePlaceholder {
        "image": image.asset->,
        alt
      },
      offlinePlaceholder {
        "image": image.asset->,
        alt
      }
    }`,
    {},
    { next: { revalidate: 60, tags: ['liveStream'] } },
  )
}
