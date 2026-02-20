import { client } from '../client'

export interface Event {
  _id: string
  title: string
  slug: string
  date: string
  endDate: string | null
  venue: string | null
  location: { name: string; address: string | null } | null
  description: string | null
  image: { asset: { _id: string; url: string }; alt?: string } | null
  registrationUrl: string | null
}

const EVENTS_QUERY = `*[_type == "event" && date >= now()] | order(date asc) {
  _id,
  title,
  "slug": slug.current,
  date,
  endDate,
  venue,
  "location": location->{ name, address },
  "description": pt::text(description),
  "image": image { asset->, alt },
  registrationUrl
}`

export async function getEvents(): Promise<Event[]> {
  const data = await client.fetch<Event[]>(EVENTS_QUERY)
  return data ?? []
}
