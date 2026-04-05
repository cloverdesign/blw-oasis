import { client } from '../client'

export interface LiveStream {
  isEnabled: boolean
  title: string | null
  embedCode: string | null
}

export async function getLiveStream(): Promise<LiveStream | null> {
  return client.fetch(
    `*[_type == "liveStream" && _id == "liveStream"][0] {
      isEnabled,
      title,
      embedCode
    }`,
    {},
    { next: { revalidate: 60 } },
  )
}
