import { client } from '../client'

export interface Location {
  _id: string
  name: string
  slug: string | null
  phone: string | null
  email: string | null
  address: string | null
  coordinates: { lat: number; lng: number } | null
  image: { asset: { _id: string; _ref?: string }; alt?: string } | null
  type: 'church' | 'campus'
  universities: string[] | null
  linkUrl: string | null
}

const LOCATIONS_QUERY = `*[_type == "location"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  phone,
  email,
  address,
  "coordinates": coordinates { lat, lng },
  "image": image { asset->, alt },
  type,
  universities,
  linkUrl
}`

export async function getLocations(): Promise<Location[]> {
  const data = await client.fetch<Location[]>(LOCATIONS_QUERY, {}, { next: { revalidate: 60, tags: ['location'] } })
  return data ?? []
}
