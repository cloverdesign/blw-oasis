import { client } from '../client'

export interface CtaButton {
  key: string
  label: string
  href: string | null
  isExternal: boolean
}

export interface SiteSettings {
  _id: string
  ctas: CtaButton[]
}

const CTA_DEFAULTS: Record<string, { label: string; href: string; isExternal: boolean }> = {
  home_hero_primary: { label: 'Plan your visit', href: '/contact', isExternal: false },
  home_map_primary: { label: 'Join Oasis', href: '/contact', isExternal: false },
  home_map_secondary: { label: 'Start Oasis on My Campus', href: '/contact', isExternal: false },
  give_cta: { label: 'Give Now', href: 'https://bit.ly/giveblwoasis', isExternal: true },
  resources_rhapsody: { label: 'Read Rhapsody of Realities', href: '#', isExternal: false },
  nav_contact: { label: 'Contact Us', href: '/contact', isExternal: false },
}

export function getCta(
  settings: SiteSettings | null,
  key: string,
): { label: string; href: string; isExternal: boolean } {
  const cta = settings?.ctas?.find((c) => c.key === key)
  const defaults = CTA_DEFAULTS[key] ?? { label: key, href: '#', isExternal: false }
  return {
    label: cta?.label ?? defaults.label,
    href: cta?.href ?? defaults.href,
    isExternal: cta?.isExternal ?? defaults.isExternal,
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0] {
      _id,
      ctas[] { key, label, href, isExternal }
    }`,
    {},
    { next: { revalidate: 60 } },
  )
}
