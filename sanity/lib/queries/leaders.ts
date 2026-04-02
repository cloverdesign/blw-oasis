import { client } from '../client'

export interface Leader {
  _id: string
  name: string
  role: string
  about: string | null
  image: { asset: { _id: string; url: string }; alt?: string } | null
  order: number
}

export async function getLeaders(): Promise<Leader[]> {
  return client.fetch(
    `*[_type == "leader"] | order(order asc) {
      _id,
      name,
      role,
      about,
      image { asset->, alt },
      order
    }`,
    {},
    { next: { revalidate: 60 } },
  )
}
